"use client";

import { type FC, useCallback, useRef, useState } from "react";

import type { AuditMode } from "../../(theme-probe)/theme-probe/audit-environment";
import type { MaterialVariableReport } from "../../(theme-probe)/theme-probe/material-variable-cases";
import type { ThemeReport } from "../../(theme-probe)/theme-probe/theme-cases";
import type { AuditJob, RemoteAuditRunner } from "./audit-plan";
import { type NestedAuditHandle, NestedThemes } from "./nested-themes";
import PropertyAudit from "./property-audit";
import PropertyOverrides from "./property-overrides";

const Customize: FC = () => {
  const remote = useRef<NestedAuditHandle>(null);
  const [batchBusy, setBatchBusy] = useState(false);
  const [remoteBusy, setRemoteBusy] = useState(false);
  const [themeReports, setThemeReports] = useState<
    Partial<Record<AuditMode, ThemeReport>>
  >({});
  const [materialReports, setMaterialReports] = useState<
    Partial<Record<AuditMode, MaterialVariableReport>>
  >({});
  const runRemote: RemoteAuditRunner = useCallback(
    (suite, mode, progress, signal) => {
      if (!remote.current)
        return Promise.reject(new Error("Theme audit frame is unavailable"));
      return remote.current.run(suite, mode, progress, signal);
    },
    [],
  );
  const resetReports = useCallback((jobs: AuditJob[]) => {
    setThemeReports((previous) => {
      const next = { ...previous };
      for (const job of jobs) if (job.suite === "themes") delete next[job.mode];
      return next;
    });
    setMaterialReports((previous) => {
      const next = { ...previous };
      for (const job of jobs)
        if (job.suite === "materials") delete next[job.mode];
      return next;
    });
  }, []);
  const saveThemeReport = useCallback(
    (report: ThemeReport) =>
      setThemeReports((previous) => ({
        ...previous,
        [report.environment.mode]: report,
      })),
    [],
  );
  const saveMaterialReport = useCallback(
    (report: MaterialVariableReport) =>
      setMaterialReports((previous) => ({
        ...previous,
        [report.environment.mode]: report,
      })),
    [],
  );
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-10">
      <header className="grid gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Jellyfy test bench
        </h1>
        <p>
          Primary, secondary, and tertiary solids are green, blue, and purple,
          with control text and surface text configured separately. All nine
          colour settings are configured through @theme inline in
          test-bench.css.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-neutral-950 p-4 text-sm text-neutral-100">
          <code>{`@theme inline {
  --color-primary: var(--color-green-800);
  --color-secondary: var(--color-blue-700);
  --color-tertiary: var(--color-purple-700);
  --color-primary-content: var(--color-red-400);
  --color-secondary-content: var(--color-green-900);
  --color-tertiary-content: var(--color-red-400);
  --color-primary-surface-content: #14532d;
  --color-secondary-surface-content: #14532d;
  --color-tertiary-surface-content: #14532d;
}

:root {
  --material-opacity: 70%;
}`}</code>
        </pre>
        <p>
          The remaining colour slots keep their defaults. The swatch below uses
          ordinary Tailwind utilities with the same semantic colour names.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-secondary bg-primary text-primary-content rounded-xl border-2 p-4">
            Tailwind control colours: bg-primary, text-primary-content,
            border-secondary
          </div>
          <div className="border-primary bg-primary-content text-primary-surface-content rounded-xl border-2 p-4">
            Tailwind surface colours: bg-primary-content,
            text-primary-surface-content, border-primary
          </div>
        </div>
      </header>

      <PropertyOverrides />
      <NestedThemes
        ref={remote}
        disabled={batchBusy}
        onBusyChange={setRemoteBusy}
        onReport={saveThemeReport}
        onMaterialReport={saveMaterialReport}
      />
      <PropertyAudit
        runRemote={runRemote}
        remoteBusy={remoteBusy}
        onBusyChange={setBatchBusy}
        onResetReports={resetReports}
        themeReports={themeReports}
        materialReports={materialReports}
      />
    </main>
  );
};

export default Customize;
