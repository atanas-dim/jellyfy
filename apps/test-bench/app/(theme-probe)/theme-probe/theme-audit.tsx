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

import { TestBenchButton } from "@/components/test-bench-button";

import {
  AUDIT_LOCK_EVENT,
  AUDIT_RUN_EVENT,
  type AuditCommand,
  type RemoteSuite,
  type RemoteSuiteRunner,
} from "../../(test-bench)/test-bench/audit-plan";
import {
  PLAIN_COLOR_CSS,
  PREVIEW_MODE_EVENT,
} from "../../(test-bench)/test-bench/preview-config";
import PropertyOverrides from "../../(test-bench)/test-bench/property-overrides";
import { type AuditMode } from "./audit-environment";
import { MaterialVariableExamples } from "./material-variable-examples";
import { runMaterialVariableAudit } from "./run-material-variable-audit";
import { runThemeAudit } from "./run-theme-audit";
import { auditValues, type Theme, THEMES, tokenNames } from "./theme-cases";
import { ThemeFixtures } from "./theme-fixtures";
import { usePreviewEnvironment } from "./use-preview-environment";

const THEME_PREVIEW_CSS = `
.theme-preview { display:grid; gap:24px; border:1px solid #737373; border-radius:16px; padding:24px; }
.theme-preview h3, .theme-preview p { margin:0; }
.theme-sections { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr)); gap:24px; }
.theme-section { display:grid; min-width:0; align-content:start; gap:16px; padding:20px; border:1px solid #737373; border-radius:12px; }
`;

export const ThemeAudit: FC = () => {
  const [activeSuite, setActiveSuite] = useState<RemoteSuite | null>(null);
  const [batchLocked, setBatchLocked] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const [auditMode, setAuditMode] = useState<AuditMode>("tailwind");
  const environment = usePreviewEnvironment(auditMode);
  const busy = activeSuite !== null || batchLocked || !environment.ready;
  const [previewTheme, setPreviewTheme] = useState<Theme>("light");
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
      setActiveSuite(suite);
      window.parent.postMessage(
        { type: "jellyfy-audit-busy", busy: true },
        window.location.origin,
      );
      try {
        if (suite === "themes") {
          if (!canvas.current)
            throw new Error("Theme fixtures are unavailable");
          const result = await runThemeAudit(
            canvas.current,
            onProgress,
            current.signal,
            mode,
          );
          if (current.signal.aborted)
            throw new DOMException("Audit cancelled", "AbortError");
          return { suite, report: result };
        }
        const result = await runMaterialVariableAudit(
          onProgress,
          current.signal,
          mode,
        );
        if (current.signal.aborted)
          throw new DOMException("Audit cancelled", "AbortError");
        return { suite, report: result };
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
    const preview = (event: Event) => {
      const mode = (event as CustomEvent<AuditMode>).detail;
      if (mode === "tailwind" || mode === "plain-css") setAuditMode(mode);
    };
    window.addEventListener(PREVIEW_MODE_EVENT, preview);
    window.addEventListener(AUDIT_RUN_EVENT, run);
    window.addEventListener(AUDIT_LOCK_EVENT, lock);
    document.documentElement.dataset.auditReady = "true";
    return () => {
      window.removeEventListener(PREVIEW_MODE_EVENT, preview);
      window.removeEventListener(AUDIT_RUN_EVENT, run);
      window.removeEventListener(AUDIT_LOCK_EVENT, lock);
      delete document.documentElement.dataset.auditReady;
      controller.current?.abort();
    };
  }, [runSuite]);

  const selectTheme = (theme: Theme) => {
    setOuterTheme(theme);
  };
  return (
    <div className="bench-visual">
      {!environment.ready && (
        <p role={environment.error ? "alert" : "status"} className="bench-meta">
          {environment.error || "Loading preview environment…"}
        </p>
      )}
      <div className="bench-section">
        <h2 className="bench-heading">Component preview theme</h2>
        <div
          role="group"
          aria-label="Component preview theme"
          className="bench-actions"
        >
          {THEMES.map((theme) => (
            <TestBenchButton
              key={theme}
              className="bench-button"
              aria-pressed={previewTheme === theme}
              disabled={busy}
              onClick={() => setPreviewTheme(theme)}
            >
              {theme === "light" ? (
                <SunIcon aria-hidden="true" className="bench-icon" />
              ) : (
                <MoonIcon aria-hidden="true" className="bench-icon" />
              )}
              {theme === "light" ? "Light" : "Dark"} components
            </TestBenchButton>
          ))}
        </div>
        <p className="bench-meta">
          Applies to property and public material examples. The nested-theme
          comparison below keeps its independent outer-theme controls.
        </p>
      </div>
      <header className="bench-section">
        <p>
          Primary, secondary, and tertiary solids are green, blue, and purple,
          with control text and surface text configured separately. The palette
          applies only to the property examples. Equivalent configuration using{" "}
          {auditMode === "tailwind"
            ? "Tailwind’s @theme inline"
            : "ordinary CSS"}
          .
        </p>
        <pre className="bench-source">
          <code>
            {auditMode === "plain-css"
              ? PLAIN_COLOR_CSS
              : `@theme inline {
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
}`}
          </code>
        </pre>
      </header>

      <PropertyOverrides mode={auditMode} theme={previewTheme} />

      <section className="bench-section">
        <h2 className="bench-heading">
          Nested themes and per-theme customization
        </h2>
        <p>
          These examples keep the library defaults. The automated audit uses
          fresh documents so visual customizations cannot mask a failure.
        </p>
        <div
          role="group"
          aria-label="Outer page theme"
          className="bench-actions"
        >
          {THEMES.map((theme) => (
            <TestBenchButton
              key={theme}
              className="bench-button"
              type="button"
              variant={outerTheme === theme ? "primary" : "secondary"}
              disabled={busy}
              aria-pressed={outerTheme === theme}
              onClick={() => selectTheme(theme)}
            >
              {theme === "light" ? (
                <SunIcon aria-hidden="true" className="bench-icon" />
              ) : (
                <MoonIcon aria-hidden="true" className="bench-icon" />
              )}
              {theme === "light" ? "Light" : "Dark"} outer page
              {outerTheme === theme && (
                <CheckIcon aria-hidden="true" className="bench-icon" />
              )}
            </TestBenchButton>
          ))}
        </div>
        <style>{THEME_PREVIEW_CSS}</style>
        <div
          className={`theme-preview ${outerTheme}`}
          style={{
            background: outerTheme === "light" ? "#f5f5f5" : "#0a0a0a",
            color: outerTheme === "light" ? "#0a0a0a" : "#fafafa",
          }}
        >
          <h3>Outer page: {outerTheme === "light" ? "Light" : "Dark"}</h3>
          <p>
            The background follows your selection. Each inner section keeps its
            own theme.
          </p>
          <div className="theme-sections">
            {THEMES.map((theme) => (
              <section
                key={theme}
                className={`theme-section ${theme}`}
                style={{
                  background: theme === "light" ? "white" : "#262626",
                  color: theme === "light" ? "#0a0a0a" : "#f5f5f5",
                }}
              >
                <h3>Fixed {theme} section</h3>
                <button type="button" className="btn primary">
                  Default primary
                </button>
                <div
                  style={
                    Object.fromEntries(
                      tokenNames("primary").map((token, index) => [
                        token,
                        auditValues("theme-custom", theme, auditMode)![index],
                      ]),
                    ) as CSSProperties
                  }
                >
                  <button type="button" className="btn primary">
                    Blue {theme === "light" ? "600" : "400"}
                  </button>
                  <div className="card primary" style={{ marginTop: 16 }}>
                    Custom surface text
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
        <details>
          <summary className="bench-summary">
            Per-theme customization being tested
          </summary>
          <pre className="bench-source">
            {THEMES.map(
              (theme) =>
                `.${theme} {\n${tokenNames("primary")
                  .map(
                    (name, index) =>
                      `  ${name}: ${auditValues("theme-custom", theme, auditMode)![index]};`,
                  )
                  .join("\n")}\n}`,
            ).join("\n\n")}
          </pre>
        </details>
        <p className="bench-small">
          The audit covers 15 components, all eight slots plus plain controls,
          root overrides, per-theme overrides, local utilities, four nesting
          arrangements, and resting/checked/disabled/focus/loading states. It
          runs in an isolated document with the selected stylesheet and the
          package runtime. Without Tailwind, customization uses literal colors
          and ordinary local CSS overrides. Hover and native picker appearance
          remain manual checks.
        </p>
        <div
          ref={canvas}
          aria-hidden="true"
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: -20000,
            width: 640,
            opacity: 0,
          }}
        >
          <ThemeFixtures />
        </div>
      </section>
      <MaterialVariableExamples mode={auditMode} theme={previewTheme} />
    </div>
  );
};
