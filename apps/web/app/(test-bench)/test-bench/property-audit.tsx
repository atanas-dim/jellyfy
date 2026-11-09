import { type FC, useEffect, useRef, useState } from "react";

import { TestBenchButton } from "@/components/test-bench-button";

import {
  AUDIT_MODES,
  type AuditMode,
} from "../../(theme-probe)/theme-probe/audit-environment";
import type { MaterialVariableReport } from "../../(theme-probe)/theme-probe/material-variable-cases";
import type { ThemeReport } from "../../(theme-probe)/theme-probe/theme-cases";
import { measureOverride, type OverrideMeasurement } from "./measure-override";
import { AUDIT_CASES, getOverrideClasses } from "./property-cases";
import { renderSample } from "./property-sample";

type AuditResult = OverrideMeasurement & {
  component: string;
  part: string;
  selector: string;
  property: string;
  classes: string;
};

type AuditReport = { state: string; results: AuditResult[] };

function failureReports<T extends { results: { passed: boolean }[] }>(
  reports: Partial<Record<AuditMode, T>>,
) {
  return Object.fromEntries(
    Object.entries(reports).flatMap(([mode, report]) => {
      const value = report as T | undefined;
      return value
        ? [
            [
              mode,
              {
                ...value,
                results: value.results.filter((result) => !result.passed),
              },
            ],
          ]
        : [];
    }),
  );
}

const PropertyAudit: FC<{
  themeReports: Partial<Record<AuditMode, ThemeReport>>;
  materialReports: Partial<Record<AuditMode, MaterialVariableReport>>;
}> = ({ themeReports, materialReports }) => {
  const canvas = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [failuresOnly, setFailuresOnly] = useState(true);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      const canvasRoot = canvas.current;
      if (!canvasRoot) return;
      const results = AUDIT_CASES.map(
        ({ id, kind, name, part, property, test }) => {
          const root = canvasRoot.querySelector(`[data-audit-case="${id}"]`);
          if (!root) throw new Error(`Missing audit case: ${id}`);
          const target = root.querySelector(
            `[data-part="${part.host ?? part.id}"]`,
          );
          const reference = root.querySelector("[data-audit-reference]");
          return {
            component: name,
            part: part.name,
            selector: part.selector ?? `.${kind}`,
            property,
            classes: getOverrideClasses(test, part),
            ...measureOverride(target, reference, test, part),
          };
        },
      );
      setReport({
        state:
          "Resting controls; checkbox, radio and switch checked; slider at 62%",
        results,
      });
      setRunning(false);
      setCopyStatus("");
    }, 500);
    return () => clearTimeout(timer);
  }, [running]);

  const failures =
    report?.results.filter((result) => result.supported && !result.passed) ??
    [];
  const unsupported =
    report?.results.filter((result) => !result.supported) ?? [];
  const passed = report?.results.filter((result) => result.passed).length ?? 0;
  const shown = failuresOnly ? failures : (report?.results ?? []);
  const exportReport = () =>
    JSON.stringify(
      {
        ...report,
        total: report?.results.length ?? 0,
        passed,
        failures: failures.length,
        unsupported: unsupported.length,
        overrideEnvironment: "tailwind",
        nestedThemes: themeReports,
        materialVariables: materialReports,
      },
      null,
      2,
    );
  const copyFailures = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(
          {
            state: report?.state,
            total: report?.results.length ?? 0,
            failures,
            unsupported,
            materialVariables: failureReports(materialReports),
            nestedThemes: failureReports(themeReports),
          },
          null,
          2,
        ),
      );
      setCopyStatus("Failure report copied");
    } catch {
      setCopyStatus("Clipboard unavailable. Use Download report.");
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([exportReport()], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "jellyfy-local-overrides.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <section className="grid gap-4 border-t border-neutral-300 pt-8">
      <h2 className="text-2xl font-semibold">Audit and combined report</h2>
      <p>
        Run all {AUDIT_CASES.length} component-part/property combinations in
        this browser. This checks resting and checked states; use the
        interactive examples above for hover and focus. Run the nested-theme
        tests in the section above, then download both results here.
      </p>
      <div className="flex flex-wrap gap-3">
        <TestBenchButton
          type="button"
          disabled={running}
          onClick={() => setRunning(true)}
        >
          {running ? "Running override tests…" : "Run override tests"}
        </TestBenchButton>
        {(report ||
          Object.keys(themeReports).length > 0 ||
          Object.keys(materialReports).length > 0) && (
          <>
            <TestBenchButton
              type="button"
              onClick={copyFailures}
              variant="secondary"
            >
              Copy failures
            </TestBenchButton>
            <TestBenchButton
              type="button"
              onClick={download}
              variant="secondary"
            >
              Download report
            </TestBenchButton>
          </>
        )}
      </div>
      {copyStatus && (
        <p role="status" className="text-sm">
          {copyStatus}
        </p>
      )}
      <p className="text-sm">
        Downloads keep the latest completed results from each environment. The
        407 utility override checks always use Tailwind.
      </p>
      {AUDIT_MODES.map(({ mode, label }) => (
        <p key={mode} className="text-sm">
          {label}: nested themes{" "}
          {themeReports[mode]
            ? `${themeReports[mode]?.passed}/${themeReports[mode]?.total}`
            : "not run"}
          ; public variables{" "}
          {materialReports[mode]
            ? `${materialReports[mode]?.passed}/${materialReports[mode]?.total}`
            : "not run"}
        </p>
      ))}
      {running && (
        <div
          ref={canvas}
          aria-hidden="true"
          inert
          className="pointer-events-none invisible absolute top-0 left-[-20000px] w-[640px]"
        >
          {AUDIT_CASES.map(({ id, kind, part, test }) => (
            <div key={id} data-audit-case={id} className="relative w-full p-4">
              <span
                data-audit-reference
                className={`invisible absolute block ${test.classes}`}
              >
                Reference
              </span>
              {renderSample(kind, test, part, id)}
            </div>
          ))}
        </div>
      )}
      {report && (
        <>
          <p role="status">
            {passed} of {report.results.length} tests passed · {failures.length}{" "}
            failed · {unsupported.length} unsupported
          </p>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={failuresOnly}
              onChange={(event) => setFailuresOnly(event.target.checked)}
            />
            Show failures only
          </label>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  {[
                    "Component / target",
                    "Property / classes",
                    "Result",
                    "Computed differences",
                  ].map((title) => (
                    <th key={title} className="border-b border-neutral-300 p-3">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map((result) => (
                  <tr
                    key={`${result.component}-${result.part}-${result.property}`}
                  >
                    <td className="border-b border-neutral-200 p-3 align-top">
                      {result.component}
                      <br />
                      {result.part}
                      <br />
                      <code>{result.selector}</code>
                    </td>
                    <td className="border-b border-neutral-200 p-3 align-top">
                      {result.property}
                      <br />
                      <code>{result.classes}</code>
                    </td>
                    <td className="border-b border-neutral-200 p-3 align-top">
                      {!result.supported
                        ? "UNSUPPORTED"
                        : result.passed
                          ? "PASS"
                          : "FAIL"}
                    </td>
                    <td className="max-w-sm border-b border-neutral-200 p-3 align-top break-words">
                      {result.comparisons
                        .filter((value) => value.actual !== value.expected)
                        .map((value) => (
                          <div key={value.property}>
                            <strong>{value.property}</strong>: expected{" "}
                            {value.expected || "unsupported"}; actual{" "}
                            {value.actual || "unsupported"}
                          </div>
                        ))}
                      <details>
                        <summary className="cursor-pointer">
                          Layout constraints
                        </summary>
                        <pre className="overflow-x-auto text-xs">
                          {JSON.stringify(result.context, null, 2)}
                        </pre>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default PropertyAudit;
