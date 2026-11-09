import { type CSSProperties, type FC } from "react";

import { TestBenchButton } from "@/components/test-bench-button";

import type { AuditMode } from "./audit-environment";
import {
  MATERIAL_VARIABLE_CASES,
  type MaterialVariableReport,
} from "./material-variable-cases";

type MaterialVariableAuditProps = {
  disabled: boolean;
  mode: AuditMode;
  running: boolean;
  progress: string;
  error: string;
  report: MaterialVariableReport | null;
  onRun: () => void;
};

export const MaterialVariableAudit: FC<MaterialVariableAuditProps> = ({
  disabled,
  mode,
  running,
  progress,
  error,
  report,
  onRun,
}) => {
  const failures = report?.results.filter((result) => !result.passed) ?? [];
  return (
    <section className="bench-section light">
      <h2 className="bench-heading">Public material variables</h2>
      <p>
        Each row compares defaults with a local section override. The audit
        checks all eight documented settings at the root, on a containing
        section, and on the component itself, in both themes. Each setting is
        tested with ordinary and layered CSS before and after the library
        stylesheet.
      </p>
      <p className="bench-strong bench-small">
        Preview and individual audit environment:{" "}
        {mode === "tailwind" ? "With Tailwind" : "Without Tailwind"}. Both
        columns use the selected environment.
      </p>
      <div className="bench-stack">
        {MATERIAL_VARIABLE_CASES.slice(0, 8).map((test) => (
          <article key={test.variable} className="bench-example">
            <h3 className="bench-strong">{test.name}</h3>
            <code className="bench-small">
              {test.variable}: {test.value}
            </code>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "grid",
                  minWidth: 0,
                  alignContent: "start",
                  gap: 8,
                }}
              >
                <p style={{ fontSize: 14, margin: 0 }}>Default</p>
                <div dangerouslySetInnerHTML={{ __html: test.markup }} />
              </div>
              <div
                style={{
                  display: "grid",
                  minWidth: 0,
                  alignContent: "start",
                  gap: 8,
                }}
              >
                <p style={{ fontSize: 14, margin: 0 }}>Scoped override</p>
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
        className="bench-button"
        onClick={onRun}
      >
        {running ? "Running material tests…" : "Run public-variable tests"}
      </TestBenchButton>
      {running && (
        <p role="status" className="bench-small">
          {progress}
        </p>
      )}
      {error && (
        <p role="alert" className="bench-fail">
          {error}
        </p>
      )}
      {report && (
        <>
          <p role="status" className="bench-strong">
            {report.passed} of {report.total} public-variable checks passed ·{" "}
            {report.failures} failed
          </p>
          <p className="bench-small">
            Results are included in the main bench’s combined report download.
          </p>
          {failures.map((result, index) => (
            <details key={index} className="bench-failure">
              <summary className="bench-fail bench-summary">
                {result.name} · {result.theme} · {result.scope} · {result.layer}{" "}
                CSS · {result.order} library
              </summary>
              <p className="bench-code">
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
