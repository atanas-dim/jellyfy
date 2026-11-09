import { type FC, useEffect, useRef, useState } from "react";

import type { AuditMode } from "../../(theme-probe)/theme-probe/audit-environment";
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
  const override = getPreviewOverride(
    property,
    part,
    mode,
    `[data-property-example="${kind}"]`,
  );
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
    <article data-property-example={kind} className="bench-example">
      <div className="bench-row">
        <h3 className="bench-strong">{name}</h3>
        <span
          className={
            result?.supported
              ? result.passed
                ? "bench-pass"
                : "bench-fail"
              : "bench-meta"
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
        <label className="bench-label">
          Test target
          <select
            className="bench-select"
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
        <p className="bench-small">Test target: {part.name}</p>
      )}
      <code className="bench-meta bench-code">
        {mode === "tailwind"
          ? `${part.selector ?? `.${kind}`} → ${getOverrideClasses(test, part)}`
          : override.label}
      </code>
      {property === "size" && part.sizeNote && (
        <p className="bench-meta">
          {mode === "tailwind"
            ? part.sizeNote
            : part.sizeNote
                .replaceAll("min-h-0", "min-height: 0")
                .replaceAll("h-20", "height: 80px")
                .replaceAll("shrink-0", "flex-shrink: 0")}
        </p>
      )}
      <style>{override.css}</style>
      <div ref={setContainer} className="bench-sample" style={{ minWidth: 0 }}>
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
      {result && (
        <details className="bench-small">
          <summary className="bench-summary">Computed styles</summary>
          <dl className="bench-details">
            {result.comparisons.map(({ property, actual, expected }) => (
              <div key={property}>
                <dt className="bench-term">{property}</dt>
                <dd>Expected: {expected || "unsupported"}</dd>
                <dd>Actual: {actual || "unsupported"}</dd>
              </div>
            ))}
          </dl>
          <p className="bench-strong">Layout constraints</p>
          <pre className="bench-code">
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
    <section id="local-property-overrides" className="bench-section light">
      <style>
        {PLAIN_COLOR_CSS.replace(":root", "#local-property-overrides")}
      </style>
      <h2 className="bench-heading">Local property overrides</h2>
      <p>
        Every property can be tested on every listed part, including labels and
        pseudo-elements. The default target prioritizes common uses; it does not
        restrict other combinations.
      </p>
      <label className="bench-label bench-property">
        Property
        <select
          value={selected}
          onChange={(event) =>
            setSelected(event.target.value as keyof typeof TESTS)
          }
          className="bench-select"
        >
          {Object.entries(TESTS).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
              {mode === "tailwind" ? ` — ${value.classes}` : ""}
            </option>
          ))}
        </select>
      </label>
      <p className="bench-meta">
        PASS compares the exact selected part against a plain reference with the
        same {mode === "tailwind" ? "utilities" : "CSS declarations"}. A CSS
        property can be applied even when it has little visual effect. Hover,
        focus or change a control to recheck its state. FAIL means a computed
        value differs; inspect min/max sizing, layout and state before calling
        it a selector conflict. Unsupported browser properties are reported
        separately.
      </p>
      <div className="bench-grid">
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
