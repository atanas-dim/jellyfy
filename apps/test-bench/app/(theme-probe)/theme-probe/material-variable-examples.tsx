import { type CSSProperties, type FC } from "react";

import type { AuditMode } from "./audit-environment";
import { MATERIAL_VARIABLE_CASES } from "./material-variable-cases";

type MaterialVariableExamplesProps = { mode: AuditMode };

export const MaterialVariableExamples: FC<MaterialVariableExamplesProps> = ({
  mode,
}) => {
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
        Preview environment:{" "}
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
    </section>
  );
};
