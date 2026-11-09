import type { CSSProperties, FC, ReactNode } from "react";

import { SAMPLES } from "../../(test-bench)/test-bench/property-cases";
import { renderSample } from "../../(test-bench)/test-bench/property-sample";
import { FRAMES } from "./theme-cases";

const NO_OVERRIDE = {
  label: "Native material",
  classes: "",
  afterClasses: "",
  properties: [],
};
const SURFACE = { id: "surface", name: "Surface", preferred: [] };

const MATERIAL_PROBES: CSSProperties[] = [
  { color: "var(--content, var(--color-plain-content))" },
  { color: "var(--surface-content, var(--color-plain-content))" },
  { color: "var(--color-disabled-text)" },
  ...["surface", "field", "field-focus", "control", "mark", "disabled"].map(
    (name) => ({ backgroundColor: `var(--fill-${name})` }),
  ),
  {
    outline: "1px solid var(--focus-color)",
    boxShadow: "0 0 0 2px var(--focus-gap)",
  },
  ...["surface", "field", "field-focus", "control", "mark"].map((name) => ({
    boxShadow: `var(--thickness-${name})`,
  })),
  ...["rest", "hover", "mark", "disabled", "overlay"].map((name) => ({
    boxShadow: `var(--elevation-${name})`,
  })),
  ...[
    "control-highlight",
    "control-shade",
    "field-highlight",
    "field-shade",
    "bump-highlight",
    "bump-shade",
    "loading-light",
    "loading-shade",
  ].map((name) => ({
    backgroundImage: `radial-gradient(var(--${name}), transparent)`,
  })),
  {
    backgroundImage: "var(--noise)",
    backgroundSize: "var(--noise-size)",
    backdropFilter: "blur(var(--material-blur))",
  },
];

export const ThemeFixtures: FC = () => (
  <>
    {FRAMES.map((frame) => {
      let content: ReactNode = (
        <div
          key={frame.id}
          data-frame={frame.id}
          className={frame.theme}
          style={{ color: "var(--color-plain-content)" }}
        >
          {SAMPLES.map(([kind, name]) => (
            <div
              key={kind}
              data-theme-sample={kind}
              data-component-name={name}
              className="p-4"
            >
              {renderSample(
                kind,
                NO_OVERRIDE,
                SURFACE,
                `theme-${frame.id}-${kind}`,
                "",
              )}
              <span className="sr-only">{name}</span>
            </div>
          ))}
          <div
            data-theme-sample="material"
            data-component-name="Material recipes"
            className="p-4"
          >
            <div>
              {MATERIAL_PROBES.map((style, index) => (
                <span key={index} style={style}>
                  Recipe {index + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
      for (const [index, parent] of [...frame.parents].reverse().entries())
        content = (
          <div key={`${frame.id}-${index}`} className={parent}>
            {content}
          </div>
        );
      return <div key={frame.id}>{content}</div>;
    })}
  </>
);
