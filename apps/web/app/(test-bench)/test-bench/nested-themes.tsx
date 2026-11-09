import { type FC, useEffect, useRef } from "react";

import type { MaterialVariableReport } from "../../(theme-probe)/theme-probe/material-variable-cases";
import type { ThemeReport } from "../../(theme-probe)/theme-probe/theme-cases";

type NestedThemesProps = {
  onReport: (report: ThemeReport) => void;
  onMaterialReport: (report: MaterialVariableReport) => void;
};

export const NestedThemes: FC<NestedThemesProps> = ({
  onReport,
  onMaterialReport,
}) => {
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frame.current?.contentWindow
      )
        return;
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
  }, [onReport, onMaterialReport]);
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
