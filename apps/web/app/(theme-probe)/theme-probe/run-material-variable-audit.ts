import { JELLYFY_VERSION } from "@/resources/package-version";

import { type AuditMode,createAuditWorker } from "./audit-environment";
import {
  MATERIAL_VARIABLE_CASES,
  type MaterialVariableReport,
  type MaterialVariableResult,
} from "./material-variable-cases";

export async function runMaterialVariableAudit(
  onProgress: (message: string) => void,
  signal: AbortSignal,
  mode: AuditMode,
): Promise<MaterialVariableReport> {
  const { frame, doc, view, source } = await createAuditWorker(mode, signal);
  try {
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
              doc.dispatchEvent(new Event("jellyfy-audit-refresh"));
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
      environment: source,
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
