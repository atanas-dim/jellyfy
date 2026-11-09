import { type CSSProperties, type FC, useEffect, useState } from "react";

import { TestBenchButton } from "@/components/test-bench-button";

import type { AuditMode } from "./audit-environment";
import {
  MATERIAL_VARIABLE_CASES,
  type MaterialVariableReport,
} from "./material-variable-cases";
import { runMaterialVariableAudit } from "./run-material-variable-audit";

type MaterialVariableAuditProps = {
  disabled: boolean;
  mode: AuditMode;
  onRunningChange: (running: boolean) => void;
};

export const MaterialVariableAudit: FC<MaterialVariableAuditProps> = ({
  disabled,
  mode,
  onRunningChange,
}) => {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState("");
  const [reports, setReports] = useState<
    Partial<Record<AuditMode, MaterialVariableReport>>
  >({});
  const report = reports[mode] ?? null;
  const [error, setError] = useState("");
  useEffect(() => {
    if (!running) return;
    const controller = new AbortController();
    onRunningChange(true);
    runMaterialVariableAudit(setProgress, controller.signal, mode)
      .then((result) => {
        if (controller.signal.aborted) return;
        setReports((previous) => ({ ...previous, [mode]: result }));
        window.parent.postMessage(
          { type: "jellyfy-material-report", report: result },
          window.location.origin,
        );
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted)
          setError(
            cause instanceof Error
              ? cause.message
              : "Material variable audit failed",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          onRunningChange(false);
          setRunning(false);
        }
      });
    return () => controller.abort();
  }, [running, mode, onRunningChange]);
  const failures = report?.results.filter((result) => !result.passed) ?? [];
  return (
    <section className="light grid gap-5 border-t border-neutral-300 pt-8">
      <h2 className="text-2xl font-semibold">Public material variables</h2>
      <p>
        Each row compares defaults with a local section override. The audit
        checks all eight documented settings at the root, on a containing
        section, and on the component itself, in both themes. Each setting is
        tested with ordinary and layered CSS before and after the library
        stylesheet.
      </p>
      <p className="text-sm font-semibold">
        Audit environment:{" "}
        {mode === "tailwind" ? "With Tailwind" : "Without Tailwind"}. Visual
        examples below use Tailwind.
      </p>
      <div className="grid gap-6">
        {MATERIAL_VARIABLE_CASES.slice(0, 8).map((test) => (
          <article
            key={test.variable}
            className="grid min-w-0 gap-3 rounded-xl border border-neutral-300 p-4"
          >
            <h3 className="font-semibold">{test.name}</h3>
            <code className="text-sm">
              {test.variable}: {test.value}
            </code>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid min-w-0 content-start gap-2">
                <p className="text-sm">Default</p>
                <div dangerouslySetInnerHTML={{ __html: test.markup }} />
              </div>
              <div className="grid min-w-0 content-start gap-2">
                <p className="text-sm">Scoped override</p>
                <div
                  style={{ [test.variable]: test.value } as CSSProperties}
                  dangerouslySetInnerHTML={{ __html: test.markup }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
      <TestBenchButton
        disabled={disabled || running}
        className="justify-self-start"
        onClick={() => {
          setError("");
          setReports((previous) => ({ ...previous, [mode]: undefined }));
          setRunning(true);
        }}
      >
        {running ? "Running material tests…" : "Run public-variable tests"}
      </TestBenchButton>
      {running && (
        <p role="status" className="text-sm">
          {progress}
        </p>
      )}
      {error && (
        <p role="alert" className="font-semibold text-red-700">
          {error}
        </p>
      )}
      {report && (
        <>
          <p role="status" className="font-semibold">
            {report.passed} of {report.total} public-variable checks passed ·{" "}
            {report.failures} failed
          </p>
          <p className="text-sm">
            Results are included in the main bench’s combined report download.
          </p>
          {failures.map((result, index) => (
            <details
              key={index}
              className="rounded border border-red-300 p-3 text-sm"
            >
              <summary className="cursor-pointer text-red-700">
                {result.name} · {result.theme} · {result.scope} · {result.layer}{" "}
                CSS · {result.order} library
              </summary>
              <p className="mt-2 break-words">
                {result.property}: expected {result.expected || "unsupported"};
                actual {result.actual || "unsupported"}
              </p>
            </details>
          ))}
        </>
      )}
    </section>
  );
};
