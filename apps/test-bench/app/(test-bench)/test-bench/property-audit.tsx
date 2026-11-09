import { type FC, useCallback, useEffect, useRef, useState } from "react";

import { TestBenchButton } from "@/components/test-bench-button";

import {
  AUDIT_MODES,
  type AuditMode,
} from "../../(theme-probe)/theme-probe/audit-environment";
import type { MaterialVariableReport } from "../../(theme-probe)/theme-probe/material-variable-cases";
import type { ThemeReport } from "../../(theme-probe)/theme-probe/theme-cases";
import {
  AUDIT_SUITES,
  type AuditJob,
  auditJobLabel,
  type AuditJobStatus,
  type AuditSuite,
  type AuditSummary,
  createAuditPlan,
  executeAuditPlan,
  type RemoteAuditRunner,
} from "./audit-plan";
import { measureOverride, type OverrideMeasurement } from "./measure-override";
import { AUDIT_CASES, getOverrideClasses } from "./property-cases";
import { renderSample } from "./property-sample";
import { RemoteAuditFailures } from "./remote-audit-failures";

type AuditResult = OverrideMeasurement & {
  component: string;
  part: string;
  selector: string;
  property: string;
  classes: string;
};

type AuditReport = { state: string; results: AuditResult[] };
type PendingOverride = {
  resolve: (summary: AuditSummary) => void;
  reject: (error: unknown) => void;
  cleanup: () => void;
};
type BatchReport = {
  startedAt: string;
  finishedAt?: string;
  jobs: AuditJobStatus[];
};

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
  runRemote: RemoteAuditRunner;
  remoteBusy: boolean;
  onBusyChange: (busy: boolean) => void;
  onResetReports: (jobs: AuditJob[]) => void;
  themeReports: Partial<Record<AuditMode, ThemeReport>>;
  materialReports: Partial<Record<AuditMode, MaterialVariableReport>>;
}> = ({
  themeReports,
  materialReports,
  runRemote,
  remoteBusy,
  onBusyChange,
  onResetReports,
}) => {
  const canvas = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [overrideRunning, setOverrideRunning] = useState(false);
  const [selectedSuites, setSelectedSuites] = useState<AuditSuite[]>(
    AUDIT_SUITES.map((item) => item.suite),
  );
  const [selectedModes, setSelectedModes] = useState<AuditMode[]>(
    AUDIT_MODES.map((item) => item.mode),
  );
  const [batchReport, setBatchReport] = useState<BatchReport | null>(null);
  const [progress, setProgress] = useState("");
  const batchController = useRef<AbortController | null>(null);
  const pendingOverride = useRef<PendingOverride | null>(null);
  const plan = createAuditPlan(selectedSuites, selectedModes);
  const controlsDisabled = running || remoteBusy;
  const [report, setReport] = useState<AuditReport | null>(null);
  const [failuresOnly, setFailuresOnly] = useState(true);
  const [copyStatus, setCopyStatus] = useState("");

  const runOverrides = useCallback(
    (signal: AbortSignal): Promise<AuditSummary> =>
      new Promise((resolve, reject) => {
        if (pendingOverride.current) {
          reject(new Error("Override audit is already running"));
          return;
        }
        const cancel = () => {
          if (pendingOverride.current !== operation) return;
          pendingOverride.current = null;
          operation.cleanup();
          setOverrideRunning(false);
          reject(new DOMException("Audit cancelled", "AbortError"));
        };
        const operation: PendingOverride = {
          resolve,
          reject,
          cleanup: () => signal.removeEventListener("abort", cancel),
        };
        pendingOverride.current = operation;
        signal.addEventListener("abort", cancel, { once: true });
        if (signal.aborted) {
          cancel();
          return;
        }
        setOverrideRunning(true);
      }),
    [],
  );

  useEffect(() => {
    if (!overrideRunning) return;
    const timer = setTimeout(() => {
      const pending = pendingOverride.current;
      if (!pending) return;
      try {
        const canvasRoot = canvas.current;
        if (!canvasRoot) throw new Error("Override fixtures are unavailable");
        const results = AUDIT_CASES.map(
          ({ id, kind, name, part, property, test }) => {
            const root = canvasRoot.querySelector(`[data-audit-case="${id}"]`);
            if (!root) throw new Error(`Missing override fixture: ${id}`);
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
        pending.resolve({
          total: results.length,
          passed: results.filter((item) => item.passed).length,
          failures: results.filter((item) => item.supported && !item.passed)
            .length,
          unsupported: results.filter((item) => !item.supported).length,
        });
      } catch (error) {
        pending.reject(error);
      } finally {
        pending.cleanup();
        pendingOverride.current = null;
        setOverrideRunning(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [overrideRunning]);

  useEffect(() => () => batchController.current?.abort(), []);

  const runSelected = async () => {
    if (batchController.current || remoteBusy || !plan.length) return;
    const controller = new AbortController();
    batchController.current = controller;
    setRunning(true);
    onBusyChange(true);
    onResetReports(plan);
    if (plan.some((job) => job.suite === "overrides")) setReport(null);
    setCopyStatus("");
    const startedAt = new Date().toISOString();
    setBatchReport({
      startedAt,
      jobs: plan.map((job) => ({ ...job, status: "queued" })),
    });
    try {
      const jobs = await executeAuditPlan(
        plan,
        async (job) => {
          const label = auditJobLabel(job);
          setProgress(label);
          if (job.suite === "overrides") return runOverrides(controller.signal);
          return runRemote(
            job.suite,
            job.mode,
            (message) => setProgress(`${label}: ${message}`),
            controller.signal,
          );
        },
        (jobs) => setBatchReport({ startedAt, jobs }),
        controller.signal,
      );
      setBatchReport({ startedAt, finishedAt: new Date().toISOString(), jobs });
      setProgress(
        controller.signal.aborted
          ? "Run cancelled"
          : jobs.some((job) => job.status === "error")
            ? "Run finished with execution errors"
            : "Selected tests finished",
      );
    } finally {
      batchController.current = null;
      setRunning(false);
      onBusyChange(false);
    }
  };

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
        lastRun: batchReport,
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
            lastRun: batchReport,
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
        Choose the suites and environments to run. One action runs every
        selected job in sequence; no separate buttons above are required. Hover
        and native picker appearance remain manual checks.
      </p>
      <fieldset disabled={controlsDisabled} className="grid gap-3">
        <legend className="mb-2 font-semibold">Test suites</legend>
        {AUDIT_SUITES.map(({ suite, label }) => (
          <label key={suite} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedSuites.includes(suite)}
              onChange={(event) =>
                setSelectedSuites((previous) =>
                  event.target.checked
                    ? [...previous, suite]
                    : previous.filter((value) => value !== suite),
                )
              }
            />
            {label}
            {suite === "overrides"
              ? ` (${AUDIT_CASES.length}, Tailwind only)`
              : ""}
          </label>
        ))}
      </fieldset>
      <fieldset disabled={controlsDisabled} className="grid gap-3">
        <legend className="mb-2 font-semibold">
          Environments for themes and public variables
        </legend>
        {AUDIT_MODES.map(({ mode, label }) => (
          <label key={mode} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedModes.includes(mode)}
              onChange={(event) =>
                setSelectedModes((previous) =>
                  event.target.checked
                    ? [...previous, mode]
                    : previous.filter((value) => value !== mode),
                )
              }
            />
            {label}
          </label>
        ))}
      </fieldset>
      <div className="flex flex-wrap gap-3">
        <TestBenchButton
          type="button"
          disabled={controlsDisabled || plan.length === 0}
          onClick={() => void runSelected()}
        >
          {running ? "Running selected tests…" : "Run selected tests"}
        </TestBenchButton>
        {running && (
          <TestBenchButton
            variant="secondary"
            onClick={() => batchController.current?.abort()}
          >
            Cancel run
          </TestBenchButton>
        )}
        {(report ||
          Object.keys(themeReports).length > 0 ||
          Object.keys(materialReports).length > 0) && (
          <>
            <TestBenchButton
              type="button"
              onClick={copyFailures}
              disabled={running}
              variant="secondary"
            >
              Copy failures
            </TestBenchButton>
            <TestBenchButton
              type="button"
              onClick={download}
              disabled={running}
              variant="secondary"
            >
              Download report
            </TestBenchButton>
          </>
        )}
      </div>
      {batchReport && (
        <div className="grid gap-2">
          <p role="status" className="text-sm font-semibold">
            {progress}
          </p>
          <ul className="grid gap-2 text-sm">
            {batchReport.jobs.map((job) => (
              <li key={`${job.suite}-${job.mode}`}>
                <strong>{auditJobLabel(job)}</strong>: {job.status}
                {job.summary
                  ? ` · ${job.summary.passed}/${job.summary.total} passed · ${job.summary.failures} failed${job.summary.unsupported ? ` · ${job.summary.unsupported} unsupported` : ""}`
                  : ""}
                {job.error ? ` · ${job.error}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
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
      <RemoteAuditFailures
        themeReports={themeReports}
        materialReports={materialReports}
      />
      {overrideRunning && (
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
            Utility overrides: {passed} of {report.results.length} tests passed
            · {failures.length} failed · {unsupported.length} unsupported
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
