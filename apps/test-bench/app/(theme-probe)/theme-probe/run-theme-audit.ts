import { JELLYFY_VERSION } from "@/resources/package-version";

import { type AuditMode,createAuditWorker } from "./audit-environment";
import {
  auditValues,
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
    if (control.tagName === "INPUT") {
      const input = control as HTMLInputElement;
      input.disabled = state === "disabled";
      if (input.type === "checkbox" || input.type === "radio")
        input.checked = state !== "resting";
    } else if (["BUTTON", "TEXTAREA", "SELECT"].includes(control.tagName)) {
      (
        control as HTMLButtonElement | HTMLTextAreaElement | HTMLSelectElement
      ).disabled = state === "disabled";
    }
  }
};

const snapshot = (
  sample: HTMLElement,
  state: State,
  view: Window,
): Snapshot => {
  const control = sample.matches("button, input, textarea, select")
    ? sample
    : sample.querySelector<HTMLElement>("input, textarea, select, button");
  if (state === "focus") control?.focus({ preventScroll: true });
  const values: Snapshot = {};
  [sample, ...sample.querySelectorAll("*")].forEach((node, index) => {
    for (const pseudo of [null, "::before", "::after"]) {
      const style = view.getComputedStyle(node, pseudo);
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
  mode: AuditMode,
): Promise<ThemeReport> {
  if (!CSS.supports("color", "light-dark(white, black)")) {
    throw new Error(
      "This audit requires native light-dark(): Chrome/Edge 123+, Firefox 120+, Safari/iOS Safari 17.5+",
    );
  }
  const {
    frame: workerFrame,
    doc,
    view,
    source,
  } = await createAuditWorker(mode, signal);
  try {
    const fixtures = doc.importNode(canvas, true);
    doc.body.append(fixtures);
    canvas = fixtures;
    const root = doc.documentElement;
    const references = new Map<string, Snapshot>();
    const pending: Capture[] = [];
    const results: ThemeResult[] = [];
    const customResults: ThemeResult[] = [];
    let propertyChecks = 0;
    const record = ({ values, ...capture }: Capture, expected: Snapshot) => {
      propertyChecks += Object.keys(values).length;
      const differences = compare(values, expected);
      results.push({
        ...capture,
        passed: differences.length === 0,
        differences,
      });
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
        if (!sample || sample.namespaceURI !== "http://www.w3.org/1999/xhtml")
          throw new Error("Missing component fixture");
        const element = sample as HTMLElement;
        element.dataset.themeComponent = wrapper.dataset.componentName;
        return element;
      });
      return { ...frame, element, samples };
    });
    const themeBoundaries = [
      ...canvas.querySelectorAll<HTMLElement>(".light, .dark"),
    ];
    canvas.dataset.auditing = "true";
    const profiles: Profile[] = PROFILES.map((profile) =>
      mode === "plain-css" && profile === "local-utilities"
        ? "local-css"
        : profile,
    );
    for (const profile of profiles) {
      for (const slot of SLOTS) {
        for (const outerTheme of THEMES) {
          root.classList.remove("light", "dark");
          root.classList.add(outerTheme);
          applyTokens(root, auditValues(profile, outerTheme, mode));
          // Match explicit .light/.dark rules on every boundary, including
          // intermediate ancestors and the document root.
          for (const boundary of themeBoundaries)
            applyTokens(
              boundary,
              profile === "theme-custom"
                ? auditValues(
                    profile,
                    boundary.classList.contains("dark") ? "dark" : "light",
                    mode,
                  )
                : null,
            );
          for (const frame of frameElements) {
            frame.samples.forEach((sample) => {
              sample.classList.toggle("audit-local", profile === "local-css");
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
            // Refresh synchronously: offscreen frames may throttle their own rAF.
            doc.dispatchEvent(new Event("jellyfy-audit-refresh"));
            await nextPaint();
            for (const frame of frameElements) {
              const samples: SampleSnapshot[] = frame.samples.map((sample) => ({
                component: sample.dataset.themeComponent ?? "unknown",
                values: snapshot(sample, state, view),
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
              const expectedColors = auditValues(profile, frame.theme, mode);
              if (state === "resting" && profile === "local-css") {
                const probe = doc.createElement("span");
                probe.style.cssText =
                  "color:#ef4444;background-color:#f97316;border-color:#ef4444";
                frame.element.append(probe);
                const expected = view.getComputedStyle(probe);
                const properties = [
                  "color",
                  "background-color",
                  "border-top-color",
                ];
                const differences: Difference[] = [];
                for (const sample of frame.samples)
                  for (const property of properties) {
                    const actual = view
                      .getComputedStyle(sample)
                      .getPropertyValue(property);
                    const value = expected.getPropertyValue(property);
                    propertyChecks++;
                    if (actual !== value)
                      differences.push({
                        target: sample.dataset.themeComponent ?? "component",
                        property,
                        actual,
                        expected: value,
                      });
                  }
                probe.remove();
                customResults.push({
                  component: "Local CSS overrides",
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
              if (state === "resting" && slot !== "plain" && expectedColors) {
                const probe = doc.createElement("span");
                frame.element.append(probe);
                const differences: Difference[] = [];
                tokenNames(slot).forEach((token, index) => {
                  const paletteToken = expectedColors[index].slice(4, -1);
                  if (
                    expectedColors[index].startsWith("var(") &&
                    !view
                      .getComputedStyle(probe)
                      .getPropertyValue(paletteToken)
                      .trim()
                  )
                    throw new Error(
                      `Missing palette reference: ${paletteToken}`,
                    );
                  probe.style.color = `var(${token})`;
                  const actual = view.getComputedStyle(probe).color;
                  probe.style.color = expectedColors[index];
                  const expected = view.getComputedStyle(probe).color;
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
                const expectedControl = view.getComputedStyle(probe);
                const expectedFill = expectedControl.backgroundColor;
                const expectedText = expectedControl.color;
                for (const sample of frame.samples.filter((sample) =>
                  ["Button", "Icon button", "Badge"].includes(
                    sample.dataset.themeComponent ?? "",
                  ),
                )) {
                  const actual = view.getComputedStyle(sample);
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
      environment: source,
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
        mode === "plain-css"
          ? "Plain mode loads only raw package CSS and runtime. Local overrides use ordinary CSS and customization uses literal colors."
          : "Tailwind mode uses compiled app CSS, palette variables and utility overrides.",
      ],
    };
  } finally {
    workerFrame.remove();
  }
}
