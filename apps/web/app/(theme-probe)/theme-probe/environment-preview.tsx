import { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { type AuditMode, createAuditWorker } from "./audit-environment";

type EnvironmentPreviewProps = {
  mode: AuditMode;
  children: ReactNode;
  css?: string;
  theme?: "light" | "dark";
};

// Share the audit's stylesheet/runtime loader. Bench controls stay outside this
// document, so their Tailwind styles cannot leak into plain-CSS examples.
export const EnvironmentPreview: FC<EnvironmentPreviewProps> = ({
  mode,
  children,
  css = "",
  theme = "light",
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState<HTMLElement | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!container.current) return;
    const controller = new AbortController();
    let dispose = () => {};
    setMount(null);
    setError("");
    createAuditWorker(mode, controller.signal, container.current)
      .then(({ frame, doc }) => {
        if (controller.signal.aborted) {
          frame.remove();
          return;
        }
        const root = doc.createElement("div");
        doc.body.append(root);
        const observer = new ResizeObserver(() => {
          frame.style.height = `${Math.ceil(root.getBoundingClientRect().height) + 24}px`;
        });
        observer.observe(root);
        dispose = () => {
          observer.disconnect();
          frame.remove();
        };
        // Frame documents have their own viewport and native color scheme.
        doc.body.style.cssText = "margin:0;padding:12px;background:transparent";
        doc.documentElement.style.background = "transparent";
        setMount(root);
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted)
          setError(
            cause instanceof Error ? cause.message : "Preview failed to load",
          );
      });
    return () => {
      controller.abort();
      dispose();
    };
  }, [mode]);
  useEffect(() => {
    if (mount) mount.ownerDocument.documentElement.setAttribute("class", theme);
  }, [mount, theme]);
  return (
    <div ref={container} className="min-w-0">
      {error && <p role="alert">{error}</p>}
      {!mount && !error && (
        <p role="status" className="text-sm">
          Loading preview…
        </p>
      )}
      {mount &&
        createPortal(
          <>
            <style>{css}</style>
            {children}
          </>,
          mount,
        )}
    </div>
  );
};
