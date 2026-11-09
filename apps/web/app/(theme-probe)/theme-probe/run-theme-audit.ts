import { JELLYFY_VERSION } from "@/resources/package-version";

import {
  customValues,
  type Difference,
  FRAMES,
  type Profile,
  PROFILES,
  SLOTS,
  type State,
  STATES,
  STYLE_PROPERTIES,
  type Theme,
  type ThemeReport,
  type ThemeResult,
  THEMES,
  tokenNames,
} from "./theme-cases";

type Snapshot = Record<string, string>;
type SampleSnapshot = { component: string; values: Snapshot };
type Capture = Omit<ThemeResult, "passed" | "differences"> & {
  values: Snapshot;
};

const nextPaint = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );

const applyTokens = (element: HTMLElement, values: string[] | null) => {
  for (const slot of SLOTS.filter((slot) => slot !== "plain")) {
    tokenNames(slot).forEach((token, index) => {
      if (values) element.style.setProperty(token, values[index]);
      else element.style.removeProperty(token);
    });
  }
};

const setState = (sample: HTMLElement, state: State) => {
  sample.classList.toggle(
    "loading",
    state === "loading" && sample.matches("button"),
  );
  for (const control of [
    sample,
    ...sample.querySelectorAll("input, textarea, select, button"),
  ]) {
    if (control instanceof HTMLInputElement) {
      control.disabled = state === "disabled";
      if (control.type === "checkbox" || control.type === "radio")
        control.checked = state !== "resting";
    } else if (
      control instanceof HTMLButtonElement ||
      control instanceof HTMLTextAreaElement ||
      control instanceof HTMLSelectElement
    ) {
      control.disabled = state === "disabled";
    }
  }
};

const snapshot = (sample: HTMLElement, state: State): Snapshot => {
  const control = sample.matches("button, input, textarea, select")
    ? sample
    : sample.querySelector<HTMLElement>("input, textarea, select, button");
  if (state === "focus") control?.focus({ preventScroll: true });
  const values: Snapshot = {};
  [sample, ...sample.querySelectorAll("*")].forEach((node, index) => {
    for (const pseudo of [null, "::before", "::after"]) {
      const style = getComputedStyle(node, pseudo);
      for (const property of STYLE_PROPERTIES)
        values[`${index}:${node.localName}${pseudo ?? ""}|${property}`] = style
          .getPropertyValue(property)
          .trim();
    }
  });
  control?.blur();
  return values;
};

const compare = (actual: Snapshot, expected: Snapshot): Difference[] => {
  const differences: Difference[] = [];
  for (const key of new Set([
    ...Object.keys(actual),
    ...Object.keys(expected),
  ])) {
    if (actual[key] === expected[key]) continue;
    const [target, property] = key.split("|");
    differences.push({
      target,
      property,
      actual: actual[key] ?? "missing",
      expected: expected[key] ?? "missing",
    });
  }
  return differences;
};

const referenceKey = (
  profile: Profile,
  slot: string,
  state: State,
  theme: Theme,
  component: string,
) => `${profile}/${slot}/${state}/${theme}/${component}`;

export async function runThemeAudit(
  canvas: HTMLElement,
  onProgress: (message: string) => void,
  signal: AbortSignal,
): Promise<ThemeReport> {
  if (!CSS.supports("color", "light-dark(white, black)")) {
    throw new Error(
      "This audit requires native light-dark(): Chrome/Edge 123+, Firefox 120+, Safari/iOS Safari 17.5+",
    );
  }
  const root = document.documentElement;
  const previousClass = root.className;
  const previousStyle = root.style.cssText;
  const active = document.activeElement;
  const references = new Map<string, Snapshot>();
  const pending: Capture[] = [];
  const results: ThemeResult[] = [];
  const customResults: ThemeResult[] = [];
  let propertyChecks = 0;
  const record = ({ values, ...capture }: Capture, expected: Snapshot) => {
    propertyChecks += Object.keys(values).length;
    const differences = compare(values, expected);
    results.push({ ...capture, passed: differences.length === 0, differences });
  };
  const frameElements = FRAMES.map((frame) => {
    const element = canvas.querySelector<HTMLElement>(
      `[data-frame="${frame.id}"]`,
    );
    if (!element) throw new Error(`Missing theme frame: ${frame.id}`);
    const samples = [
      ...element.querySelectorAll<HTMLElement>("[data-theme-sample]"),
    ].map((wrapper) => {
      const sample = wrapper.firstElementChild;
      if (!(sample instanceof HTMLElement))
        throw new Error("Missing component fixture");
      sample.dataset.themeComponent = wrapper.dataset.componentName;
      return sample;
    });
    return { ...frame, element, samples };
  });
  const themeBoundaries = [
    ...canvas.querySelectorAll<HTMLElement>(".light, .dark"),
  ];
  canvas.dataset.auditing = "true";
  try {
    for (const profile of PROFILES) {
      for (const slot of SLOTS) {
        for (const outerTheme of THEMES) {
          root.classList.remove("light", "dark");
          root.classList.add(outerTheme);
          applyTokens(root, customValues(profile, outerTheme));
          // Match explicit .light/.dark rules on every boundary, including
          // intermediate ancestors and the document root.
          for (const boundary of themeBoundaries)
            applyTokens(
              boundary,
              profile === "theme-custom"
                ? customValues(
                    profile,
                    boundary.classList.contains("dark") ? "dark" : "light",
                  )
                : null,
            );
          for (const frame of frameElements) {
            frame.samples.forEach((sample) => {
              for (const name of SLOTS)
                if (name !== "plain") sample.classList.remove(name);
              if (slot !== "plain") sample.classList.add(slot);
              sample.classList.toggle(
                "text-red-500",
                profile === "local-utilities",
              );
              sample.classList.toggle(
                "bg-orange-500",
                profile === "local-utilities",
              );
              sample.classList.toggle(
                "border-red-500",
                profile === "local-utilities",
              );
            });
          }
          for (const state of STATES) {
            if (signal.aborted)
              throw new DOMException("Audit cancelled", "AbortError");
            onProgress(`${profile} · ${slot} · ${outerTheme} page · ${state}`);
            frameElements.forEach((frame) =>
              frame.samples.forEach((sample) => setState(sample, state)),
            );
            await nextPaint();
            for (const frame of frameElements) {
              const samples: SampleSnapshot[] = frame.samples.map((sample) => ({
                component: sample.dataset.themeComponent ?? "unknown",
                values: snapshot(sample, state),
              }));
              for (const { component, values } of samples) {
                if (frame.reference) {
                  if (frame.theme === outerTheme)
                    references.set(
                      referenceKey(
                        profile,
                        slot,
                        state,
                        frame.theme,
                        component,
                      ),
                      values,
                    );
                } else {
                  const capture = {
                    component,
                    values,
                    slot,
                    profile,
                    state,
                    outerTheme,
                    frame: frame.id,
                    innerTheme: frame.theme,
                  };
                  const expected = references.get(
                    referenceKey(profile, slot, state, frame.theme, component),
                  );
                  if (expected) record(capture, expected);
                  else pending.push(capture);
                }
              }
              // Check explicit customization against an independent ordinary CSS color probe.
              // Matrix consistency alone could otherwise pass if customization failed everywhere.
              const expectedColors = customValues(profile, frame.theme);
              if (state === "resting" && slot !== "plain" && expectedColors) {
                const probe = document.createElement("span");
                frame.element.append(probe);
                const differences: Difference[] = [];
                tokenNames(slot).forEach((token, index) => {
                  const paletteToken = expectedColors[index].slice(4, -1);
                  if (
                    !getComputedStyle(probe)
                      .getPropertyValue(paletteToken)
                      .trim()
                  )
                    throw new Error(
                      `Missing palette reference: ${paletteToken}`,
                    );
                  probe.style.color = `var(${token})`;
                  const actual = getComputedStyle(probe).color;
                  probe.style.color = expectedColors[index];
                  const expected = getComputedStyle(probe).color;
                  propertyChecks++;
                  if (actual !== expected)
                    differences.push({
                      target: token,
                      property: "color",
                      actual,
                      expected,
                    });
                });
                // Also verify that controls consume the chosen colors, rather than
                // merely checking that the custom properties exist on the frame.
                probe.style.backgroundColor = `color-mix(in oklab, ${expectedColors[0]} var(--material-opacity), transparent)`;
                probe.style.color = expectedColors[1];
                const expectedControl = getComputedStyle(probe);
                const expectedFill = expectedControl.backgroundColor;
                const expectedText = expectedControl.color;
                for (const sample of frame.samples.filter((sample) =>
                  ["Button", "Icon button", "Badge"].includes(
                    sample.dataset.themeComponent ?? "",
                  ),
                )) {
                  const actual = getComputedStyle(sample);
                  for (const [property, value, expected] of [
                    ["background-color", actual.backgroundColor, expectedFill],
                    ["color", actual.color, expectedText],
                  ]) {
                    propertyChecks++;
                    if (value !== expected)
                      differences.push({
                        target: sample.dataset.themeComponent ?? "control",
                        property,
                        actual: value,
                        expected,
                      });
                  }
                }
                probe.remove();
                customResults.push({
                  component: "Explicit customization tokens and controls",
                  slot,
                  profile,
                  state,
                  outerTheme,
                  frame: frame.id,
                  innerTheme: frame.theme,
                  passed: differences.length === 0,
                  differences,
                });
              }
            }
          }
        }
        for (const capture of pending) {
          const expected = references.get(
            referenceKey(
              capture.profile,
              capture.slot,
              capture.state,
              capture.innerTheme,
              capture.component,
            ),
          );
          if (!expected) throw new Error("Missing standalone theme reference");
          record(capture, expected);
        }
        pending.length = 0;
        references.clear();
      }
    }
    results.push(...customResults);
    const passed = results.filter((result) => result.passed).length;
    return {
      version: JELLYFY_VERSION,
      userAgent: navigator.userAgent,
      total: results.length,
      passed,
      failures: results.length - passed,
      propertyChecks,
      results,
      notes: [
        "Each nested frame is compared with a standalone reference captured with the document using the intended inner theme.",
        "Every element and its ::before/::after styles are checked. Focus uses the actual native control; loading uses Jellyfy's runtime.",
        "Animations and transitions are paused in the audit fixtures to compare stable material values.",
        "Hover and operating-system native picker rendering require manual review in the visible examples.",
      ],
    };
  } finally {
    root.className = previousClass;
    root.style.cssText = previousStyle;
    delete canvas.dataset.auditing;
    if (active instanceof HTMLElement) active.focus({ preventScroll: true });
  }
}
