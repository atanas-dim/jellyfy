export const AUDIT_STYLESHEET_SELECTOR =
  'link[rel="stylesheet"]:not([data-bench-chrome]):not([data-bench-plain])';

export const AUDIT_MODES = [
  { mode: "tailwind", label: "With Tailwind" },
  { mode: "plain-css", label: "Without Tailwind" },
] as const;
export type AuditMode = (typeof AUDIT_MODES)[number]["mode"];
export type AuditSource = {
  mode: AuditMode;
  stylesheets: string[];
  runtime: string;
  tailwindPresent: boolean;
};
export type AuditWorker = {
  frame: HTMLIFrameElement;
  doc: Document;
  view: Window;
  source: AuditSource;
};

// The harness has only layer ordering, stable snapshots and explicit local
// overrides. Plain mode receives no palette, reset, utilities or app stylesheet.
export async function createAuditWorker(
  mode: AuditMode,
  signal: AbortSignal,
): Promise<AuditWorker> {
  const stylesheets =
    mode === "plain-css"
      ? [new URL("/test-bench/package/jellyfy.css", location.origin).href]
      : [
          ...document.querySelectorAll<HTMLLinkElement>(
            AUDIT_STYLESHEET_SELECTOR,
          ),
        ].map((link) => link.href);
  if (!stylesheets.length) throw new Error("No audit stylesheets found");
  const runtime = new URL("/test-bench/package/index.js", location.origin).href;
  const frame = await new Promise<HTMLIFrameElement>((resolve, reject) => {
    const node = document.createElement("iframe");
    node.title = `${mode} audit fixtures`;
    node.tabIndex = -1;
    node.setAttribute("aria-hidden", "true");
    node.style.cssText =
      "pointer-events:none;position:absolute;top:0;left:-20000px;height:600px;width:640px;opacity:0";
    const worker = document.implementation.createHTMLDocument("Jellyfy audit");
    const order = worker.createElement("style");
    order.textContent = "@layer theme, base, components, utilities;";
    worker.head.append(order);
    for (const id of ["override-before", "library", "override-after"]) {
      if (id === "library") {
        for (const href of stylesheets) {
          const link = worker.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          worker.head.append(link);
        }
      } else {
        const style = worker.createElement("style");
        style.id = id;
        worker.head.append(style);
      }
    }
    const harness = worker.createElement("style");
    harness.textContent =
      "*,*::before,*::after{transition:none!important;animation:none!important}.audit-local{color:#ef4444;background-color:#f97316;border-color:#ef4444}";
    worker.head.append(harness);
    const bootstrap = worker.createElement("script");
    bootstrap.type = "module";
    bootstrap.textContent = `import { startJellyfy } from ${JSON.stringify(runtime)}; document.addEventListener("jellyfy-audit-refresh", startJellyfy); startJellyfy(); document.documentElement.dataset.runtimeReady = "true";`;
    worker.body.append(bootstrap);
    node.srcdoc = `<!doctype html>${worker.documentElement.outerHTML}`;
    const timer = setTimeout(
      () => finish(new Error("Audit assets did not load")),
      15000,
    );
    const cancel = () =>
      finish(new DOMException("Audit cancelled", "AbortError"));
    const finish = (error?: Error) => {
      clearTimeout(timer);
      signal.removeEventListener("abort", cancel);
      node.onload = null;
      node.onerror = null;
      if (error) {
        node.remove();
        reject(error);
      } else resolve(node);
    };
    node.onload = () => finish();
    node.onerror = () => finish(new Error("Audit document failed to load"));
    signal.addEventListener("abort", cancel, { once: true });
    if (signal.aborted) {
      cancel();
      return;
    }
    document.body.append(node);
  });
  try {
    const doc = frame.contentDocument;
    const view = frame.contentWindow;
    if (!doc || !view) throw new Error("Audit document unavailable");
    const rootStyle = view.getComputedStyle(doc.documentElement);
    if (!rootStyle.getPropertyValue("--material-opacity").trim())
      throw new Error("Jellyfy CSS failed to load");
    if (doc.documentElement.dataset.runtimeReady !== "true")
      throw new Error("Jellyfy runtime failed to start");
    const tailwindPresent =
      rootStyle.getPropertyValue("--spacing").trim() !== "";
    if (mode === "plain-css" && tailwindPresent)
      throw new Error("Tailwind variables leaked into the plain-CSS fixture");
    if (mode === "tailwind" && !tailwindPresent)
      throw new Error("Tailwind CSS is missing from the Tailwind fixture");
    return {
      frame,
      doc,
      view,
      source: { mode, stylesheets, runtime, tailwindPresent },
    };
  } catch (error) {
    frame.remove();
    throw error;
  }
}
