import { type FC, useEffect, useRef, useState } from "react";

import type { AuditMode } from "../../(theme-probe)/theme-probe/audit-environment";
import { EnvironmentPreview } from "../../(theme-probe)/theme-probe/environment-preview";
import { measureOverride, type OverrideMeasurement } from "./measure-override";
import { getPreviewOverride, PLAIN_COLOR_CSS } from "./preview-config";
import {
  getDefaultPart,
  getOverrideClasses,
  getParts,
  SAMPLES,
  TESTS,
} from "./property-cases";
import { renderSample } from "./property-sample";

type PropertyExampleProps = {
  kind: string;
  name: string;
  property: keyof typeof TESTS;
  mode: AuditMode;
};

export const PropertyExample: FC<PropertyExampleProps> = ({
  kind,
  name,
  property,
  mode,
}) => {
  const parts = getParts(kind);
  const [selection, setSelection] = useState<{
    property: keyof typeof TESTS;
    partId: string;
  } | null>(null);
  const partId =
    selection?.property === property
      ? selection.partId
      : getDefaultPart(kind, property).id;
  const part = parts.find((item) => item.id === partId) ?? parts[0];
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const override = getPreviewOverride(property, part, mode);
  const test = override.test;
  const reference = useRef<HTMLSpanElement>(null);
  const [result, setResult] = useState<OverrideMeasurement | null>(null);

  useEffect(() => {
    const test = getPreviewOverride(property, part, mode).test;
    const root = container;
    if (!root) return;
    const target = root.querySelector(`[data-part="${part.host ?? part.id}"]`);
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(
        () => setResult(measureOverride(target, reference.current, test, part)),
        400,
      );
    };
    const events = [
      "pointerover",
      "pointerout",
      "focusin",
      "focusout",
      "input",
      "change",
    ];
    events.forEach((event) => root.addEventListener(event, schedule));
    schedule();
    return () => {
      clearTimeout(timer);
      events.forEach((event) => root.removeEventListener(event, schedule));
    };
  }, [property, part, mode, container]);

  return (
    <article className="relative grid h-full min-w-0 content-start gap-3 rounded-xl border border-neutral-300 p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">{name}</h3>
        <span
          className={
            result?.supported
              ? result.passed
                ? "text-sm font-semibold text-green-700"
                : "text-sm font-semibold text-red-600"
              : "text-sm text-neutral-500"
          }
        >
          {result
            ? !result.supported
              ? "UNSUPPORTED"
              : result.passed
                ? "PASS"
                : "FAIL"
            : "Checking…"}
        </span>
      </div>
      {parts.length > 1 ? (
        <label className="grid gap-1 text-sm">
          Test target
          <select
            className="rounded border border-neutral-400 bg-white p-2 text-neutral-950"
            value={partId}
            onChange={(event) => {
              setSelection({ property, partId: event.target.value });
              setResult(null);
            }}
          >
            {parts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p className="text-sm">Test target: {part.name}</p>
      )}
      <code className="text-sm break-words text-neutral-500">
        {mode === "tailwind"
          ? `${part.selector ?? `.${kind}`} → ${getOverrideClasses(test, part)}`
          : override.label}
      </code>
      {property === "size" && part.sizeNote && (
        <p className="text-sm text-neutral-500">
          {mode === "tailwind"
            ? part.sizeNote
            : part.sizeNote
                .replaceAll("min-h-0", "min-height: 0")
                .replaceAll("h-20", "height: 80px")
                .replaceAll("shrink-0", "flex-shrink: 0")}
        </p>
      )}
      <EnvironmentPreview
        mode={mode}
        css={`
          ${mode === "plain-css" ? PLAIN_COLOR_CSS : ""}
          ${override.css}
        `}
      >
        <div ref={setContainer} style={{ minWidth: 0 }}>
          <span
            ref={reference}
            aria-hidden="true"
            style={{
              position: "absolute",
              visibility: "hidden",
              display: "block",
              pointerEvents: "none",
            }}
            className={mode === "tailwind" ? test.classes : "local-reference"}
          >
            Reference
          </span>
          {renderSample(kind, test, part)}
        </div>
      </EnvironmentPreview>
      {result && (
        <details className="text-sm">
          <summary className="cursor-pointer">Computed styles</summary>
          <dl className="mt-2 grid gap-2 break-words">
            {result.comparisons.map(({ property, actual, expected }) => (
              <div key={property}>
                <dt className="font-mono font-semibold">{property}</dt>
                <dd>Expected: {expected || "unsupported"}</dd>
                <dd>Actual: {actual || "unsupported"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 font-semibold">Layout constraints</p>
          <pre className="mt-1 overflow-x-auto text-xs">
            {JSON.stringify(result.context, null, 2)}
          </pre>
        </details>
      )}
    </article>
  );
};

const PropertyOverrides: FC<{ mode: AuditMode }> = ({ mode }) => {
  const [selected, setSelected] = useState<keyof typeof TESTS>("background");
  return (
    <section id="local-property-overrides" className="grid scroll-mt-6 gap-5">
      <h2 className="text-2xl font-semibold">Local property overrides</h2>
      <p>
        Every property can be tested on every listed part, including labels and
        pseudo-elements. The default target prioritizes common uses; it does not
        restrict other combinations.
      </p>
      <label className="grid max-w-sm gap-2 text-sm font-semibold">
        Property
        <select
          value={selected}
          onChange={(event) =>
            setSelected(event.target.value as keyof typeof TESTS)
          }
          className="rounded-lg border border-neutral-400 bg-white p-3 text-neutral-950"
        >
          {Object.entries(TESTS).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
              {mode === "tailwind" ? ` — ${value.classes}` : ""}
            </option>
          ))}
        </select>
      </label>
      <p className="text-sm text-neutral-500">
        PASS compares the exact selected part against a plain reference with the
        same {mode === "tailwind" ? "utilities" : "CSS declarations"}. A CSS
        property can be applied even when it has little visual effect. Hover,
        focus or change a control to recheck its state. FAIL means a computed
        value differs; inspect min/max sizing, layout and state before calling
        it a selector conflict. Unsupported browser properties are reported
        separately.
      </p>
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLES.map(([kind, name]) => (
          <PropertyExample
            key={kind}
            kind={kind}
            name={name}
            property={selected}
            mode={mode}
          />
        ))}
      </div>
    </section>
  );
};

export default PropertyOverrides;
