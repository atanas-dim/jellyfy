"use client";

import {
  type CSSProperties,
  type FC,
  useEffect,
  useRef,
  useState,
} from "react";

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

const BUTTON =
  "rounded-lg border border-neutral-400 px-4 py-2 disabled:opacity-50";

export const ThemeAudit: FC = () => {
  const [running, setRunning] = useState(false);
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
          height: Math.ceil(document.body.getBoundingClientRect().height) + 16,
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
    <div className="grid gap-5 rounded-xl bg-white p-4 text-neutral-950">
      <p>
        Library defaults and explicit per-theme customization run in a separate
        document so the earlier global overrides cannot mask a failure.
      </p>
      <div className="flex flex-wrap gap-3">
        {THEMES.map((theme) => (
          <button
            key={theme}
            type="button"
            className={BUTTON}
            disabled={running}
            aria-pressed={outerTheme === theme}
            onClick={() => selectTheme(theme)}
          >
            {theme} outer page
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {THEMES.map((theme) => (
          <section
            key={theme}
            className={`${theme} grid gap-4 rounded-xl p-5 ${theme === "light" ? "bg-neutral-100 text-neutral-950" : "bg-neutral-900 text-neutral-100"}`}
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
      <button
        type="button"
        className={`${BUTTON} justify-self-start bg-neutral-900 font-semibold text-white`}
        disabled={running}
        onClick={() => {
          setError("");
          setReport(null);
          setRunning(true);
        }}
      >
        {" "}
        {running ? "Running theme audit…" : "Run nested-theme tests"}
      </button>
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
    </div>
  );
};
