import { useEffect, useRef, useState } from "react";

import { SAMPLES, TESTS, getParts, getDefaultPart } from "./property-cases.js";

const PlusIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

function renderSample(kind, test, part, applicable) {
  const props = (id, base = "") => ({
    className: [
      base,
      applicable && (part.host ?? part.id) === id
        ? part.pseudo
          ? test.afterClasses
          : test.classes
        : "",
    ]
      .filter(Boolean)
      .join(" "),
    "data-part": id,
  });
  const root = props("surface", `${kind} secondary`);
  switch (kind) {
    case "btn":
      return (
        <button {...root} type="button">
          Button
        </button>
      );
    case "btn-icon":
    case "btn-bump":
      return (
        <button {...root} type="button" aria-label="Add item">
          <PlusIcon {...props("icon")} />
        </button>
      );
    case "badge":
      return <span {...root}>Badge</span>;
    case "input":
      return (
        <label {...root}>
          <input
            {...props("value")}
            placeholder=" "
            defaultValue="Input value"
          />
          <span {...props("label")}>Input label</span>
        </label>
      );
    case "textarea":
      return (
        <label {...root}>
          <textarea
            {...props("value")}
            placeholder=" "
            defaultValue="Textarea value"
          />
          <span {...props("label")}>Textarea label</span>
        </label>
      );
    case "select":
      return (
        <label {...root}>
          <select {...props("value")} defaultValue="one">
            <option value="one">Selected value</option>
            <option value="two">Other value</option>
          </select>
          <span {...props("label")}>Select label</span>
          <i className="picker-icon" />
        </label>
      );
    case "checkbox":
      return (
        <label {...root}>
          <input type="checkbox" defaultChecked />
          <span {...props("box", "checkbox-box")} />
          <span {...props("label")}>Checkbox label</span>
        </label>
      );
    case "radio":
      return (
        <label {...root}>
          <input type="radio" name="property-override-radio" defaultChecked />
          <span {...props("ring", "radio-ring")} />
          <span {...props("label")}>Radio label</span>
        </label>
      );
    case "toggle":
      return (
        <label {...root}>
          <input type="checkbox" role="switch" defaultChecked />
          <span {...props("track", "toggle-track")}>
            <span {...props("thumb", "toggle-thumb")} />
          </span>
          <span {...props("label")}>Switch label</span>
        </label>
      );
    case "range":
      return (
        <label {...root}>
          <span {...props("label")}>Range label</span>
          <span className="range-box">
            <span {...props("track", "range-track")}>
              <span {...props("fill", "range-fill")} />
            </span>
            <span {...props("thumb", "range-thumb")} />
            <input type="range" defaultValue={62} />
          </span>
        </label>
      );
    case "message":
      return <p {...root}>Message text</p>;
    case "alert":
      return (
        <div {...root}>
          <PlusIcon {...props("icon")} />
          <div>
            <p className="font-semibold">Alert title</p>
            <p>Alert text</p>
          </div>
        </div>
      );
    case "card":
      return (
        <section {...root}>
          <h4 className="font-semibold">Card title</h4>
          <p>Card text</p>
        </section>
      );
    case "modal-panel":
      return (
        <div {...root}>
          <h4 className="font-semibold">Dialog panel</h4>
          <p>Inline preview of the modal panel.</p>
        </div>
      );
  }
}

export function PropertyExample({ kind, name, test, property }) {
  const parts = getParts(kind);
  const [partId, setPartId] = useState(() => getDefaultPart(kind, property).id);
  const part = parts.find((item) => item.id === partId);
  const applicable = part.tests.includes(property);
  const container = useRef(null);
  const reference = useRef(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const root = container.current;
    if (!applicable) return;
    const target = root.querySelector(`[data-part="${part.host ?? part.id}"]`);
    let timer;
    const measure = () => {
      const actual = getComputedStyle(target, part.pseudo ?? null);
      const expected = getComputedStyle(reference.current);
      const comparisons = test.properties.map((property) => ({
        property,
        actual: actual.getPropertyValue(property).trim(),
        expected: expected.getPropertyValue(property).trim(),
      }));
      const supported = comparisons.every(
        (value) => value.actual !== "" && value.expected !== "",
      );
      setResult({
        supported,
        passed:
          supported &&
          comparisons.every((value) => value.actual === value.expected),
        comparisons,
      });
    };
    const schedule = () => {
      clearTimeout(timer);
      // Allow the component's existing colour and shadow transitions to finish.
      timer = setTimeout(measure, 400);
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
  }, [test, part, applicable]);

  return (
    <article
      ref={container}
      className="relative grid content-start gap-3 rounded-xl border border-neutral-300 p-4"
    >
      <span
        ref={reference}
        aria-hidden="true"
        className={`pointer-events-none invisible absolute block ${test.classes}`}
      >
        Reference
      </span>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">{name}</h3>
        <span
          className={
            applicable && result?.supported
              ? result.passed
                ? "text-sm font-semibold text-green-700"
                : "text-sm font-semibold text-red-600"
              : "text-sm text-neutral-500"
          }
        >
          {!applicable
            ? "N/A"
            : result
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
              setPartId(event.target.value);
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
        {part.selector ?? `.${kind}`} →{" "}
        {applicable
          ? part.pseudo
            ? test.afterClasses
            : test.classes
          : "Not applied (N/A)"}
      </code>
      {!applicable && (
        <p className="text-sm text-neutral-500">
          This property is not a meaningful test for {part.name.toLowerCase()}.
          Choose another target or property.
        </p>
      )}
      <div className="min-w-0">
        {renderSample(kind, test, part, applicable)}
      </div>
      {applicable && result && (
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
        </details>
      )}
    </article>
  );
}

export default function PropertyOverrides() {
  const [selected, setSelected] = useState("background");
  const test = TESTS[selected];
  return (
    <section id="local-property-overrides" className="grid scroll-mt-6 gap-5">
      <h2 className="text-2xl font-semibold">Local property overrides</h2>
      <p>
        Choose a property and inspect the named component part. Utilities are
        applied to that exact element, without !important or custom variables.
      </p>
      <label className="grid max-w-sm gap-2 text-sm font-semibold">
        Property
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          className="rounded-lg border border-neutral-400 bg-white p-3 text-neutral-950"
        >
          {Object.entries(TESTS).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label} — {value.classes}
            </option>
          ))}
        </select>
      </label>
      <p className="text-sm text-neutral-500">
        PASS compares the selected part against a plain reference with the same
        utilities. Boxes, rings, tracks, fills and thumbs receive surface tests;
        native fields receive padding tests; labels receive typography tests.
        Use each target selector to inspect another part. N/A means that test
        does not apply. Hover, focus or change a control to recheck its state.
        FAIL means the computed result differs; inspect state and min/max size
        constraints before treating it as a selector conflict.
      </p>
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLES.map(([kind, name]) => (
          <PropertyExample
            key={`${selected}-${kind}`}
            kind={kind}
            name={name}
            test={test}
            property={selected}
          />
        ))}
      </div>
    </section>
  );
}
