import {
  type FC,
  type Ref,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import type { MaterialVariableReport } from "../../(theme-probe)/theme-probe/material-variable-cases";
import type { ThemeReport } from "../../(theme-probe)/theme-probe/theme-cases";
import {
  AUDIT_LOCK_EVENT,
  AUDIT_RUN_EVENT,
  type AuditCommand,
  type RemoteAuditRunner,
} from "./audit-plan";

export type NestedAuditHandle = { run: RemoteAuditRunner };

async function waitForFrame(
  getFrame: () => HTMLIFrameElement | null,
  signal: AbortSignal,
): Promise<Window> {
  const deadline = Date.now() + 30000;
  while (true) {
    if (signal.aborted) throw new DOMException("Audit cancelled", "AbortError");
    const element = getFrame();
    if (
      element?.contentDocument?.documentElement.dataset.auditReady === "true" &&
      element.contentWindow
    )
      return element.contentWindow;
    if (Date.now() > deadline)
      throw new Error(
        "Audit frame did not become ready. Reload the bench and try again.",
      );
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

type NestedThemesProps = {
  ref?: Ref<NestedAuditHandle>;
  disabled: boolean;
  onBusyChange: (busy: boolean) => void;
  onReport: (report: ThemeReport) => void;
  onMaterialReport: (report: MaterialVariableReport) => void;
};

export const NestedThemes: FC<NestedThemesProps> = ({
  ref,
  disabled,
  onBusyChange,
  onReport,
  onMaterialReport,
}) => {
  const frame = useRef<HTMLIFrameElement>(null);
  useImperativeHandle(
    ref,
    () => ({
      run: async (suite, mode, onProgress, signal) => {
        const view = await waitForFrame(() => frame.current, signal);
        return new Promise((resolve, reject) => {
          const cancel = () =>
            fail(new DOMException("Audit cancelled", "AbortError"));
          const done: AuditCommand["resolve"] = (result) => {
            signal.removeEventListener("abort", cancel);
            if (result.suite === "themes") onReport(result.report);
            else onMaterialReport(result.report);
            resolve({
              total: result.report.total,
              passed: result.report.passed,
              failures: result.report.failures,
            });
          };
          const fail: AuditCommand["reject"] = (error) => {
            signal.removeEventListener("abort", cancel);
            reject(error);
          };
          signal.addEventListener("abort", cancel, { once: true });
          if (signal.aborted) {
            cancel();
            return;
          }
          try {
            view.dispatchEvent(
              new CustomEvent<AuditCommand>(AUDIT_RUN_EVENT, {
                detail: {
                  suite,
                  mode,
                  onProgress,
                  signal,
                  resolve: done,
                  reject: fail,
                },
              }),
            );
          } catch (error) {
            fail(error);
          }
        });
      },
    }),
    [onReport, onMaterialReport],
  );
  useEffect(() => {
    const controller = new AbortController();
    waitForFrame(() => frame.current, controller.signal)
      .then((view) =>
        view.dispatchEvent(
          new CustomEvent(AUDIT_LOCK_EVENT, { detail: disabled }),
        ),
      )
      .catch(() => {});
    return () => controller.abort();
  }, [disabled]);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frame.current?.contentWindow
      )
        return;
      if (event.data?.type === "jellyfy-audit-busy")
        onBusyChange(event.data.busy === true);
      if (
        event.data?.type === "jellyfy-material-report" &&
        Array.isArray(event.data.report?.results)
      )
        onMaterialReport(event.data.report);
      if (
        event.data?.type === "jellyfy-theme-height" &&
        Number.isFinite(event.data.height)
      ) {
        if (frame.current)
          frame.current.style.height = `${Math.max(500, event.data.height)}px`;
      }
      if (
        event.data?.type === "jellyfy-theme-report" &&
        Array.isArray(event.data.report?.results)
      )
        onReport(event.data.report);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [onReport, onMaterialReport, onBusyChange]);
  return (
    <section className="grid gap-4 border-t border-neutral-300 pt-8">
      <h2 className="text-2xl font-semibold">
        Nested themes and per-theme customization
      </h2>
      <div className="min-w-0 overflow-hidden rounded-xl border border-neutral-300 bg-white">
        <iframe
          ref={frame}
          src="/theme-probe"
          title="Nested theme and color customization tests"
          className="block h-[1000px] w-full border-0 bg-white"
        />
      </div>
    </section>
  );
};
