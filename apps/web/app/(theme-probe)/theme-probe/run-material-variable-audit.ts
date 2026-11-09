import { JELLYFY_VERSION } from "@/resources/package-version";

import {
  MATERIAL_VARIABLE_CASES,
  type MaterialVariableReport,
  type MaterialVariableResult,
} from "./material-variable-cases";

// Use the actual compiled styles in a separate document: root-level tests must
// not change the visible examples or inherit another audit's custom values.
const createWorker = (signal: AbortSignal): Promise<HTMLIFrameElement> =>
  new Promise((resolve, reject) => {
    const frame = document.createElement("iframe");
    frame.title = "Public material variable audit fixtures";
    frame.tabIndex = -1;
    frame.setAttribute("aria-hidden", "true");
    frame.className =
      "pointer-events-none absolute top-0 left-[-20000px] h-[600px] w-[640px] opacity-0";
    const worker =
      document.implementation.createHTMLDocument("Material variables");
    const order = worker.createElement("style");
    order.textContent = "@layer theme, base, components, utilities;";
    worker.head.append(order);
    const before = worker.createElement("style");
    before.id = "override-before";
    worker.head.append(before);
    document
      .querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
      .forEach((source) => {
        const link = worker.createElement("link");
        link.rel = "stylesheet";
        link.href = source.href;
        worker.head.append(link);
      });
    const after = worker.createElement("style");
    after.id = "override-after";
    worker.head.append(after);
    const stable = worker.createElement("style");
    stable.textContent =
      "*,*::before,*::after{transition:none!important;animation:none!important}";
    worker.head.append(stable);
    frame.srcdoc = `<!doctype html>${worker.documentElement.outerHTML}`;
    const timer = setTimeout(
      () => finish(new Error("Material audit styles did not load")),
      15000,
    );
    const cancel = () =>
      finish(new DOMException("Audit cancelled", "AbortError"));
    const finish = (error?: Error) => {
      clearTimeout(timer);
      signal.removeEventListener("abort", cancel);
      frame.onload = null;
      frame.onerror = null;
      if (error) {
        frame.remove();
        reject(error);
      } else resolve(frame);
    };
    frame.onload = () => finish();
    frame.onerror = () =>
      finish(new Error("Material audit document failed to load"));
    signal.addEventListener("abort", cancel, { once: true });
    if (signal.aborted) {
      cancel();
      return;
    }
    document.body.append(frame);
  });

export async function runMaterialVariableAudit(
  onProgress: (message: string) => void,
  signal: AbortSignal,
): Promise<MaterialVariableReport> {
  const frame = await createWorker(signal);
  try {
    const doc = frame.contentDocument;
    const view = frame.contentWindow;
    if (!doc || !view)
      throw new Error("Material audit document is unavailable");
    if (
      !view
        .getComputedStyle(doc.documentElement)
        .getPropertyValue("--material-opacity")
        .trim()
    ) {
      throw new Error(
        "Jellyfy styles did not load in the material audit document",
      );
    }
    const before = doc.getElementById("override-before");
    const after = doc.getElementById("override-after");
    if (!before || !after) throw new Error("Missing stylesheet order fixtures");
    const results: MaterialVariableResult[] = [];
    for (const theme of ["light", "dark"] as const) {
      doc.documentElement.className = theme;
      for (const test of MATERIAL_VARIABLE_CASES) {
        for (const scope of ["root", "section", "instance"] as const) {
          for (const layer of ["unlayered", "theme"] as const) {
            for (const order of ["before", "after"] as const) {
              if (signal.aborted)
                throw new DOMException("Audit cancelled", "AbortError");
              const selector =
                scope === "root"
                  ? ":root"
                  : scope === "section"
                    ? ".override-section"
                    : "[data-material-target]";
              const rule = `${selector}{${test.variable}:${test.value}}`;
              const css = layer === "theme" ? `@layer theme{${rule}}` : rule;
              before.textContent = order === "before" ? css : "";
              after.textContent = order === "after" ? css : "";
              doc.body.innerHTML = `<section class="override-section">${test.markup}</section><span data-reference></span>`;
              const target = doc.querySelector<HTMLElement>(
                "[data-material-target]",
              );
              const reference =
                doc.querySelector<HTMLElement>("[data-reference]");
              if (!target || !reference)
                throw new Error("Missing material variable fixture");
              reference.style.setProperty(test.property, test.expected);
              const actual = view
                .getComputedStyle(target)
                .getPropertyValue(test.property)
                .trim();
              const expected = view
                .getComputedStyle(reference)
                .getPropertyValue(test.property)
                .trim();
              results.push({
                name: test.name,
                variable: test.variable,
                value: test.value,
                theme,
                scope,
                layer,
                order,
                property: test.property,
                actual,
                expected,
                passed: actual !== "" && expected !== "" && actual === expected,
              });
            }
          }
        }
        onProgress(`${theme} · ${test.name} · ${results.length} checks`);
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
      }
    }
    const passed = results.filter((result) => result.passed).length;
    return {
      version: JELLYFY_VERSION,
      total: results.length,
      passed,
      failures: results.length - passed,
      results,
      userAgent: navigator.userAgent,
    };
  } finally {
    frame.remove();
  }
}
