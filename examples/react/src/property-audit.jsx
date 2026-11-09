import { useEffect, useRef, useState } from "react";

import { AUDIT_CASES, getOverrideClasses } from "./property-cases.js";
import { renderSample } from "./property-sample.jsx";
import { measureOverride } from "./measure-override.js";

export default function PropertyAudit() {
  const canvas = useRef(null);
  const [running, setRunning] = useState(false);
  const [report, setReport] = useState(null);
  const [failuresOnly, setFailuresOnly] = useState(true);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      const results = AUDIT_CASES.map(
        ({ id, kind, name, part, property, test }) => {
          const root = canvas.current.querySelector(
            `[data-audit-case="${id}"]`,
          );
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
  const shown = failuresOnly ? failures : (report?.results ?? []);
  const exportReport = () =>
    JSON.stringify(
      {
        ...report,
        total: report.results.length,
        failures: failures.length,
        unsupported: unsupported.length,
      },
      null,
      2,
    );
  const copyFailures = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(
          {
            state: report.state,
            total: report.results.length,
            failures,
            unsupported,
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
      <h3 className="text-xl font-semibold">Full override audit</h3>
      <p>
        Run all {AUDIT_CASES.length} component-part/property combinations in
        this browser. This checks resting and checked states; use the
        interactive examples above for hover and focus. A failure is a finding
        to investigate, not automatically a library bug.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={running}
          onClick={() => setRunning(true)}
          className="rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
          {running ? "Running…" : "Run all tests"}
        </button>
        {report && (
          <>
            <button
              type="button"
              onClick={copyFailures}
              className="rounded-lg border border-neutral-400 px-4 py-2"
            >
              Copy failures
            </button>
            <button
              type="button"
              onClick={download}
              className="rounded-lg border border-neutral-400 px-4 py-2"
            >
              Download report
            </button>
          </>
        )}
      </div>
      {copyStatus && (
        <p role="status" className="text-sm">
          {copyStatus}
        </p>
      )}
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
            {report.results.length - failures.length - unsupported.length}{" "}
            passed · {failures.length} failed · {unsupported.length} unsupported
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
}
