"use client";

import { type FC, useCallback, useRef, useState } from "react";

import { TestBenchButton } from "@/components/test-bench-button";

import {
  AUDIT_MODES,
  type AuditMode,
} from "../../(theme-probe)/theme-probe/audit-environment";
import type { MaterialVariableReport } from "../../(theme-probe)/theme-probe/material-variable-cases";
import type { ThemeReport } from "../../(theme-probe)/theme-probe/theme-cases";
import type { AuditJob, RemoteAuditRunner } from "./audit-plan";
import { type NestedAuditHandle, NestedThemes } from "./nested-themes";
import PropertyAudit from "./property-audit";

const Customize: FC = () => {
  const [mode, setMode] = useState<AuditMode>("tailwind");
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
      </header>
      <div className="grid gap-8">
        <div
          role="tablist"
          aria-label="Interactive preview environment"
          className="flex flex-wrap gap-3"
        >
          {AUDIT_MODES.map((item) => (
            <TestBenchButton
              key={item.mode}
              role="tab"
              id={`tab-${item.mode}`}
              aria-selected={mode === item.mode}
              aria-controls="interactive-bench"
              tabIndex={mode === item.mode ? 0 : -1}
              onKeyDown={(event) => {
                const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
                if (!keys.includes(event.key)) return;
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? "tailwind"
                    : event.key === "End"
                      ? "plain-css"
                      : mode === "tailwind"
                        ? "plain-css"
                        : "tailwind";
                setMode(next);
                document.getElementById(`tab-${next}`)?.focus();
              }}
              variant={mode === item.mode ? "primary" : "secondary"}
              disabled={batchBusy || remoteBusy}
              onClick={() => setMode(item.mode)}
            >
              {item.label}
            </TestBenchButton>
          ))}
        </div>
        <div
          role="tabpanel"
          id="interactive-bench"
          aria-labelledby={`tab-${mode}`}
          className="grid gap-12"
        >
          <NestedThemes
            ref={remote}
            mode={mode}
            disabled={batchBusy}
            onBusyChange={setRemoteBusy}
            onReport={saveThemeReport}
            onMaterialReport={saveMaterialReport}
          />
        </div>
      </div>
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
