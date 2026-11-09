import type { FC } from "react";

import {
  AUDIT_MODES,
  type AuditMode,
} from "../../(theme-probe)/theme-probe/audit-environment";
import type { MaterialVariableReport } from "../../(theme-probe)/theme-probe/material-variable-cases";
import type { ThemeReport } from "../../(theme-probe)/theme-probe/theme-cases";

type RemoteAuditFailuresProps = {
  themeReports: Partial<Record<AuditMode, ThemeReport>>;
  materialReports: Partial<Record<AuditMode, MaterialVariableReport>>;
};

export const RemoteAuditFailures: FC<RemoteAuditFailuresProps> = ({
  themeReports,
  materialReports,
}) => (
  <>
    {AUDIT_MODES.map(({ mode, label }) => {
      const themes =
        themeReports[mode]?.results.filter((result) => !result.passed) ?? [];
      const materials =
        materialReports[mode]?.results.filter((result) => !result.passed) ?? [];
      if (!themes.length && !materials.length) return null;
      return (
        <details key={mode} className="rounded-lg border border-red-300 p-4">
          <summary className="cursor-pointer font-semibold text-red-700">
            {label}: {themes.length + materials.length} theme and
            public-variable failures
          </summary>
          <div className="mt-4 grid gap-3">
            {themes.slice(0, 100).map((result, index) => (
              <details key={`theme-${index}`}>
                <summary className="cursor-pointer text-sm">
                  {result.component} · {result.slot} · {result.profile} ·{" "}
                  {result.frame} · outer {result.outerTheme} · {result.state}
                </summary>
                <pre className="mt-2 max-h-80 overflow-auto text-xs">
                  {JSON.stringify(result.differences, null, 2)}
                </pre>
              </details>
            ))}
            {themes.length > 100 && (
              <p className="text-sm">
                Showing the first 100 theme failures. Download the report for
                every result.
              </p>
            )}
            {materials.map((result, index) => (
              <details key={`material-${index}`}>
                <summary className="cursor-pointer text-sm">
                  {result.name} · {result.theme} · {result.scope} ·{" "}
                  {result.layer} CSS · {result.order} library
                </summary>
                <p className="mt-2 text-sm break-words">
                  {result.property}: expected {result.expected || "unsupported"}
                  ; actual {result.actual || "unsupported"}
                </p>
              </details>
            ))}
          </div>
        </details>
      );
    })}
  </>
);
