import type { FC, ReactNode, SVGProps } from "react";

import {
  getOverrideClasses,
  type OverrideTest,
  type TestPart,
} from "./property-cases";

const PlusIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
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

export function renderSample(
  kind: string,
  test: OverrideTest,
  part: TestPart,
  instanceId = "interactive-property",
): ReactNode {
  const props = (id: string, base = "") => ({
    className: [
      base,
      (part.host ?? part.id) === id ? getOverrideClasses(test, part) : "",
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
          <input type="radio" name={`${instanceId}-radio`} defaultChecked />
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
