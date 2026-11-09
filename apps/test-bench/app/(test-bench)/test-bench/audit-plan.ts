import type { AuditMode } from "../../(theme-probe)/theme-probe/audit-environment";
import type { MaterialVariableReport } from "../../(theme-probe)/theme-probe/material-variable-cases";
import type { ThemeReport } from "../../(theme-probe)/theme-probe/theme-cases";

export const AUDIT_SUITES = [
  { suite: "overrides", label: "Local property overrides" },
  { suite: "themes", label: "Nested themes and color customization" },
  { suite: "materials", label: "Public material variables" },
] as const;
export type AuditSuite = (typeof AUDIT_SUITES)[number]["suite"];
export type RemoteSuite = Exclude<AuditSuite, "overrides">;
export type AuditJob = { suite: AuditSuite; mode: AuditMode };
export type AuditSummary = {
  total: number;
  passed: number;
  failures: number;
  unsupported?: number;
};
export type RemoteAuditRunner = (
  suite: RemoteSuite,
  mode: AuditMode,
  onProgress: (message: string) => void,
  signal: AbortSignal,
) => Promise<AuditSummary>;

export const AUDIT_RUN_EVENT = "jellyfy-run-audit";
export const AUDIT_LOCK_EVENT = "jellyfy-lock-audits";
export type RemoteAuditResult =
  | { suite: "themes"; report: ThemeReport }
  | { suite: "materials"; report: MaterialVariableReport };
export type RemoteSuiteRunner = (
  ...args: Parameters<RemoteAuditRunner>
) => Promise<RemoteAuditResult>;
export type AuditCommand = {
  suite: RemoteSuite;
  mode: AuditMode;
  signal: AbortSignal;
  onProgress: (message: string) => void;
  resolve: (result: RemoteAuditResult) => void;
  reject: (error: unknown) => void;
};

export function createAuditPlan(
  suites: readonly AuditSuite[],
  modes: readonly AuditMode[],
): AuditJob[] {
  const jobs: AuditJob[] = suites.includes("overrides")
    ? [{ suite: "overrides", mode: "tailwind" }]
    : [];
  for (const mode of ["tailwind", "plain-css"] as const)
    for (const suite of ["themes", "materials"] as const) {
      if (modes.includes(mode) && suites.includes(suite))
        jobs.push({ suite, mode });
    }
  return jobs;
}

export const auditJobLabel = ({ suite, mode }: AuditJob): string =>
  `${AUDIT_SUITES.find((item) => item.suite === suite)?.label} — ${mode === "tailwind" ? "with Tailwind" : "without Tailwind"}`;

export type AuditJobStatus = AuditJob & {
  status: "queued" | "running" | "complete" | "error" | "cancelled";
  summary?: AuditSummary;
  error?: string;
};

export async function executeAuditPlan(
  plan: AuditJob[],
  runJob: (job: AuditJob) => Promise<AuditSummary>,
  onChange: (jobs: AuditJobStatus[]) => void,
  signal: AbortSignal,
): Promise<AuditJobStatus[]> {
  const jobs: AuditJobStatus[] = plan.map((job) => ({
    ...job,
    status: "queued",
  }));
  for (let index = 0; index < jobs.length; index++) {
    if (signal.aborted) {
      for (let remaining = index; remaining < jobs.length; remaining++)
        jobs[remaining] = { ...jobs[remaining], status: "cancelled" };
      onChange([...jobs]);
      break;
    }
    jobs[index] = { ...jobs[index], status: "running" };
    onChange([...jobs]);
    try {
      const summary = await runJob(plan[index]);
      if (signal.aborted)
        throw new DOMException("Audit cancelled", "AbortError");
      jobs[index] = { ...jobs[index], status: "complete", summary };
    } catch (error) {
      jobs[index] = {
        ...jobs[index],
        status: signal.aborted ? "cancelled" : "error",
        error: error instanceof Error ? error.message : "Audit failed",
      };
    }
    onChange([...jobs]);
  }
  return jobs;
}
