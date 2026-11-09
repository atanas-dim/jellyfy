"use client";

import { CheckIcon, MoonIcon, SunIcon } from "lucide-react";
import {
  type CSSProperties,
  type FC,
  useEffect,
  useRef,
  useState,
} from "react";
import { twJoin } from "tailwind-merge";

import { TestBenchButton } from "@/components/test-bench-button";

import { MaterialVariableAudit } from "./material-variable-audit";
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
  const [running, setRunning] = useState(false);
  const [materialRunning, setMaterialRunning] = useState(false);
  const [progress, setProgress] = useState("");
  const [report, setReport] = useState<ThemeReport | null>(null);
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

  useEffect(() => {
    if (!running || !canvas.current) return;
    const controller = new AbortController();
    runThemeAudit(canvas.current, setProgress, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setReport(result);
        window.parent.postMessage(
          { type: "jellyfy-theme-report", report: result },
          window.location.origin,
        );
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted)
          setError(
            cause instanceof Error ? cause.message : "Theme audit failed",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setRunning(false);
      });
    return () => controller.abort();
  }, [running]);

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
        aria-label="Outer page theme"
        className="flex flex-wrap gap-3"
      >
        {THEMES.map((theme) => (
          <TestBenchButton
            key={theme}
            type="button"
            variant={outerTheme === theme ? "primary" : "secondary"}
            disabled={running || materialRunning}
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
        arrangements, and resting/checked/disabled/focus/loading states. It
        temporarily switches this document’s root theme and restores it
        afterward. Hover and native picker appearance remain manual checks.
      </p>
      <TestBenchButton
        type="button"
        className="justify-self-start"
        disabled={running || materialRunning}
        onClick={() => {
          setError("");
          setReport(null);
          setRunning(true);
        }}
      >
        {" "}
        {running ? "Running theme audit…" : "Run nested-theme tests"}
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
      {running && (
        <div
          ref={canvas}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-[-20000px] w-[640px] opacity-0"
        >
          <ThemeFixtures />
        </div>
      )}
      {report && (
        <>
          <p role="status" className="font-semibold">
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
        disabled={running}
        onRunningChange={setMaterialRunning}
      />
    </div>
  );
};
