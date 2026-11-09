import { useEffect, useState } from "react";

import { AUDIT_STYLESHEET_SELECTOR, type AuditMode } from "./audit-environment";

// The visible gallery keeps one document. Audit workers still load a fresh copy
// of its original compiled stylesheet, even while the visual tab disables it.

export function usePreviewEnvironment(mode: AuditMode): {
  ready: boolean;
  error: string;
} {
  const [status, setStatus] = useState<{
    mode: AuditMode;
    error: string;
  } | null>(null);
  useEffect(() => {
    let disposed = false;
    const plain = document.createElement("link");
    plain.rel = "stylesheet";
    plain.href = "/test-bench/package/jellyfy.css";
    plain.setAttribute("data-bench-plain", "");
    const apply = () => {
      document
        .querySelectorAll<HTMLLinkElement>(AUDIT_STYLESHEET_SELECTOR)
        .forEach((link) => {
          link.disabled = mode === "plain-css";
        });
    };
    const validate = () => {
      if (disposed) return;
      apply();
      const style = getComputedStyle(document.documentElement);
      const hasTailwind = style.getPropertyValue("--spacing").trim() !== "";
      if (hasTailwind !== (mode === "tailwind")) {
        setStatus({
          mode,
          error:
            "Preview stylesheet isolation failed. Reload the bench before continuing.",
        });
        return;
      }
      if (!style.getPropertyValue("--material-opacity").trim()) {
        setStatus({ mode, error: "Jellyfy CSS failed to load." });
        return;
      }
      setStatus({ mode, error: "" });
    };
    if (mode === "plain-css") {
      plain.onload = validate;
      plain.onerror = () => {
        if (!disposed)
          setStatus({ mode, error: "Plain-CSS preview failed to load." });
      };
      document.head.append(plain);
    } else {
      queueMicrotask(validate);
    }
    // Next can replace stylesheet links during development; newly inserted
    // compiled styles must remain disabled in the plain-CSS tab too.
    const observer = new MutationObserver(() => {
      if (!disposed && (mode === "tailwind" || plain.sheet)) apply();
    });
    observer.observe(document.head, { childList: true, subtree: true });
    return () => {
      disposed = true;
      observer.disconnect();
      plain.onload = null;
      plain.onerror = null;
      plain.remove();
      document
        .querySelectorAll<HTMLLinkElement>(AUDIT_STYLESHEET_SELECTOR)
        .forEach((link) => {
          link.disabled = false;
        });
    };
  }, [mode]);
  return {
    ready: status?.mode === mode && !status.error,
    error: status?.mode === mode ? status.error : "",
  };
}
