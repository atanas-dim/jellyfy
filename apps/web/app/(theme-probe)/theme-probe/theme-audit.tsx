"use client";

import { CheckIcon, MoonIcon, SunIcon } from "lucide-react";
import {
  type CSSProperties,
  type FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { twJoin } from "tailwind-merge";

import { TestBenchButton } from "@/components/test-bench-button";

import {
  AUDIT_LOCK_EVENT,
  AUDIT_RUN_EVENT,
  type AuditCommand,
  type RemoteSuite,
  type RemoteSuiteRunner,
} from "../../(test-bench)/test-bench/audit-plan";
import { AUDIT_MODES, type AuditMode } from "./audit-environment";
import { MaterialVariableAudit } from "./material-variable-audit";
import type { MaterialVariableReport } from "./material-variable-cases";
import { runMaterialVariableAudit } from "./run-material-variable-audit";
import { runThemeAudit } from "./run-theme-audit";
import {
  CUSTOMIZATION_CSS,
  customValues,
  type Theme,
  type ThemeReport,
  THEMES,
  tokenNames,
} from "./theme-cases";
import { ThemeFixtures } from "./theme-fixtures";

export const ThemeAudit: FC = () => {
  const [activeSuite, setActiveSuite] = useState<RemoteSuite | null>(null);
  const [lastSuite, setLastSuite] = useState<RemoteSuite>("themes");
  const [batchLocked, setBatchLocked] = useState(false);
  const running = activeSuite === "themes";
  const materialRunning = activeSuite === "materials";
  const busy = activeSuite !== null || batchLocked;
  const controller = useRef<AbortController | null>(null);
  const [progress, setProgress] = useState("");
  const [auditMode, setAuditMode] = useState<AuditMode>("tailwind");
  const [reports, setReports] = useState<
    Partial<Record<AuditMode, ThemeReport>>
  >({});
  const report = reports[auditMode] ?? null;
  const [materialReports, setMaterialReports] = useState<
    Partial<Record<AuditMode, MaterialVariableReport>>
  >({});
  const [error, setError] = useState("");
  const [outerTheme, setOuterTheme] = useState<Theme>("light");
  const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resize = () =>
      window.parent.postMessage(
        {
          type: "jellyfy-theme-height",
          height: Math.ceil(document.body.getBoundingClientRect().height),
        },
        window.location.origin,
      );
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    resize();
    return () => observer.disconnect();
  }, []);

  const runSuite = useCallback<RemoteSuiteRunner>(
    async (suite, mode, onProgress, signal) => {
      if (controller.current)
        throw new Error("Another audit is already running");
      if (signal.aborted)
        throw new DOMException("Audit cancelled", "AbortError");
      const current = new AbortController();
      controller.current = current;
      const cancel = () => current.abort();
      signal.addEventListener("abort", cancel, { once: true });
      setAuditMode(mode);
      setActiveSuite(suite);
      setLastSuite(suite);
      setError("");
      setProgress("");
      window.parent.postMessage(
        { type: "jellyfy-audit-busy", busy: true },
        window.location.origin,
      );
      const progress = (message: string) => {
        setProgress(message);
        onProgress(message);
      };
      try {
        if (suite === "themes") {
          if (!canvas.current)
            throw new Error("Theme fixtures are unavailable");
          setReports((previous) => ({ ...previous, [mode]: undefined }));
          const result = await runThemeAudit(
            canvas.current,
            progress,
            current.signal,
            mode,
          );
          if (current.signal.aborted)
            throw new DOMException("Audit cancelled", "AbortError");
          setReports((previous) => ({ ...previous, [mode]: result }));
          return { suite, report: result };
        }
        setMaterialReports((previous) => ({ ...previous, [mode]: undefined }));
        const result = await runMaterialVariableAudit(
          progress,
          current.signal,
          mode,
        );
        if (current.signal.aborted)
          throw new DOMException("Audit cancelled", "AbortError");
        setMaterialReports((previous) => ({ ...previous, [mode]: result }));
        return { suite, report: result };
      } catch (cause) {
        setError(
          current.signal.aborted
            ? "Audit cancelled"
            : cause instanceof Error
              ? cause.message
              : "Audit failed",
        );
        throw cause;
      } finally {
        signal.removeEventListener("abort", cancel);
        controller.current = null;
        setActiveSuite(null);
        window.parent.postMessage(
          { type: "jellyfy-audit-busy", busy: false },
          window.location.origin,
        );
      }
    },
    [],
  );

  useEffect(() => {
    const run = (event: Event) => {
      const command = (event as CustomEvent<AuditCommand>).detail;
      if (
        !command ||
        !["themes", "materials"].includes(command.suite) ||
        !["tailwind", "plain-css"].includes(command.mode)
      )
        return;
      runSuite(
        command.suite,
        command.mode,
        command.onProgress,
        command.signal,
      ).then(command.resolve, command.reject);
    };
    const lock = (event: Event) =>
      setBatchLocked((event as CustomEvent<boolean>).detail === true);
    window.addEventListener(AUDIT_RUN_EVENT, run);
    window.addEventListener(AUDIT_LOCK_EVENT, lock);
    document.documentElement.dataset.auditReady = "true";
    return () => {
      window.removeEventListener(AUDIT_RUN_EVENT, run);
      window.removeEventListener(AUDIT_LOCK_EVENT, lock);
      delete document.documentElement.dataset.auditReady;
      controller.current?.abort();
    };
  }, [runSuite]);

  const runLocal = (suite: RemoteSuite) => {
    void runSuite(suite, auditMode, () => {}, new AbortController().signal)
      .then((result) =>
        window.parent.postMessage(
          {
            type:
              result.suite === "themes"
                ? "jellyfy-theme-report"
                : "jellyfy-material-report",
            report: result.report,
          },
          window.location.origin,
        ),
      )
      .catch(() => {});
  };

  const selectTheme = (theme: Theme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    setOuterTheme(theme);
  };
  const failures = report?.results.filter((result) => !result.passed) ?? [];
  return (
    <div className="grid min-w-0 gap-5">
      <p>
        Library defaults and explicit per-theme customization run in a separate
        document so the earlier global overrides cannot mask a failure.
      </p>
      <div
        role="group"
        aria-label="Audit environment"
        className="flex flex-wrap gap-3"
      >
        {AUDIT_MODES.map(({ mode, label }) => (
          <TestBenchButton
            key={mode}
            disabled={busy}
            aria-pressed={auditMode === mode}
            variant={auditMode === mode ? "primary" : "secondary"}
            onClick={() => setAuditMode(mode)}
          >
            {label}
          </TestBenchButton>
        ))}
      </div>
      <p className="text-sm">
        The selected environment applies to automated tests. The fixed visual
        examples below use Tailwind.{" "}
        <a
          href="/test-bench/plain"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
        >
          Open the standalone HTML example without Tailwind
        </a>
        .
      </p>
      <div
        role="group"
        aria-label="Outer page theme"
        className="flex flex-wrap gap-3"
      >
        {THEMES.map((theme) => (
          <TestBenchButton
            key={theme}
            type="button"
            variant={outerTheme === theme ? "primary" : "secondary"}
            disabled={busy}
            aria-pressed={outerTheme === theme}
            onClick={() => selectTheme(theme)}
          >
            {theme === "light" ? (
              <SunIcon aria-hidden="true" className="size-4" />
            ) : (
              <MoonIcon aria-hidden="true" className="size-4" />
            )}
            {theme === "light" ? "Light" : "Dark"} outer page
            {outerTheme === theme && (
              <CheckIcon aria-hidden="true" className="size-4" />
            )}
          </TestBenchButton>
        ))}
      </div>
      <div
        className={twJoin(
          "grid min-w-0 gap-6 rounded-2xl border p-[1.5rem] sm:p-[2rem]",
          outerTheme === "light"
            ? "border-neutral-300 bg-neutral-100 text-neutral-950"
            : "border-neutral-700 bg-neutral-950 text-white",
        )}
      >
        <div>
          <h3 className="text-lg font-semibold">
            Outer page: {outerTheme === "light" ? "Light" : "Dark"}
          </h3>
          <p className="mt-1 text-sm">
            The background around these sections follows your selection. Each
            inner section keeps its own theme.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {THEMES.map((theme) => (
            <section
              key={theme}
              className={twJoin(
                theme,
                "grid min-w-0 content-start gap-4 rounded-xl border p-[1.25rem]",
                theme === "light"
                  ? "border-neutral-300 bg-white text-neutral-950"
                  : "border-neutral-600 bg-neutral-800 text-neutral-100",
              )}
            >
              <h3 className="font-semibold">Fixed {theme} section</h3>
              <button type="button" className="btn primary">
                Default primary
              </button>
              <div
                style={
                  Object.fromEntries(
                    tokenNames("primary").map((token, index) => [
                      token,
                      customValues("theme-custom", theme)![index],
                    ]),
                  ) as CSSProperties
                }
              >
                <button type="button" className="btn primary">
                  Blue {theme === "light" ? "600" : "400"}
                </button>
                <div className="card primary mt-4">Custom surface text</div>
              </div>
            </section>
          ))}
        </div>
      </div>
      <details>
        <summary className="cursor-pointer font-medium">
          Per-theme customization being tested
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-950 p-4 text-sm text-white">
          {CUSTOMIZATION_CSS}
        </pre>
      </details>
      <p className="text-sm">
        The audit covers 15 components, all eight slots plus plain controls,
        root overrides, per-theme overrides, local utilities, four nesting
        arrangements, and resting/checked/disabled/focus/loading states. It runs
        in an isolated document with the selected stylesheet and the package
        runtime. Without Tailwind, customization uses literal colors and
        ordinary local CSS overrides. Hover and native picker appearance remain
        manual checks.
      </p>
      <TestBenchButton
        type="button"
        className="justify-self-start"
        disabled={busy}
        onClick={() => runLocal("themes")}
      >
        {" "}
        {running ? "Running theme audit…" : "Run nested-theme tests"}
      </TestBenchButton>
      {running && (
        <p role="status" className="text-sm">
          {progress}
        </p>
      )}
      {lastSuite === "themes" && error && (
        <p role="alert" className="font-semibold text-red-700">
          {error}
        </p>
      )}
      <div
        ref={canvas}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-[-20000px] w-[640px] opacity-0"
      >
        <ThemeFixtures />
      </div>
      {report && (
        <>
          <p role="status" className="font-semibold">
            {auditMode === "tailwind" ? "With Tailwind" : "Without Tailwind"}:{" "}
            {report.passed} of {report.total} theme cases passed ·{" "}
            {report.failures} failed · {report.propertyChecks.toLocaleString()}{" "}
            property checks
          </p>
          <p className="text-sm">
            Results are included in the main bench’s Download report. Each
            comparison uses a standalone reference with the same intended inner
            theme.
          </p>
          {failures.slice(0, 100).map((result, index) => (
            <details
              key={index}
              className="rounded border border-red-300 p-3 text-sm"
            >
              <summary className="cursor-pointer text-red-700">
                {result.component} · {result.slot} · {result.profile} ·{" "}
                {result.frame} · outer {result.outerTheme} · {result.state}
              </summary>
              <pre className="mt-2 max-h-80 overflow-auto">
                {JSON.stringify(result.differences, null, 2)}
              </pre>
            </details>
          ))}
          {failures.length > 100 && (
            <p className="text-sm">
              Showing the first 100 failures. The report contains every result.
            </p>
          )}
        </>
      )}
      <MaterialVariableAudit
        disabled={busy}
        mode={auditMode}
        running={materialRunning}
        progress={progress}
        error={lastSuite === "materials" ? error : ""}
        report={materialReports[auditMode] ?? null}
        onRun={() => runLocal("materials")}
      />
    </div>
  );
};
