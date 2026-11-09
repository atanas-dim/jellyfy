import type { AuditSource } from "./audit-environment";

export type MaterialVariableCase = {
  name: string;
  variable: string;
  value: string;
  markup: string;
  property: string;
  expected: string;
};

const CARD =
  '<section class="card primary" data-material-target>Card</section>';
const CONTROL =
  '<button type="button" class="btn primary" data-material-target>Button</button>';
const FIELD =
  '<label class="input primary" data-material-target><input placeholder=" " value="Value"><span>Label</span></label>';
const MARK =
  '<label class="checkbox primary"><input type="checkbox" checked><span class="checkbox-box" data-material-target></span>Checkbox</label>';

const shadow = (thickness: string, geometry: string, strength: number) =>
  `0 0 0 0 transparent, var(--thickness-${thickness}), ${geometry} rgb(from var(--color-neutral-950, #0a0a0a) r g b / calc(${strength} * 2))`;

export const MATERIAL_VARIABLE_CASES: MaterialVariableCase[] = [
  {
    name: "Surface radius · card",
    variable: "--radius-surface",
    value: "0.25rem",
    markup: CARD,
    property: "border-top-left-radius",
    expected: "0.25rem",
  },
  {
    name: "Field radius · input",
    variable: "--radius-field",
    value: "0.25rem",
    markup: FIELD,
    property: "border-top-left-radius",
    expected: "0.25rem",
  },
  {
    name: "Control radius · button",
    variable: "--radius-control",
    value: "0.25rem",
    markup: CONTROL,
    property: "border-top-left-radius",
    expected: "0.25rem",
  },
  {
    name: "Mark radius · checkbox",
    variable: "--radius-mark",
    value: "0.25rem",
    markup: MARK,
    property: "border-top-left-radius",
    expected: "0.25rem",
  },
  {
    name: "Material opacity · card",
    variable: "--material-opacity",
    value: "25%",
    markup: CARD,
    property: "background-color",
    expected:
      "color-mix(in oklab, color-mix(in oklab, var(--color-plain) var(--percent-surface-resting-wash), var(--color-primary)) 25%, transparent)",
  },
  {
    name: "Material blur · card",
    variable: "--material-blur",
    value: "2px",
    markup: CARD,
    property: "backdrop-filter",
    expected: "blur(2px)",
  },
  {
    name: "Noise size · card",
    variable: "--noise-size",
    value: "8rem",
    markup: CARD,
    property: "background-size",
    expected: "8rem",
  },
  {
    name: "Elevation · card",
    variable: "--elevation",
    value: "2",
    markup: CARD,
    property: "box-shadow",
    expected: shadow("surface", "0 12px 16px -14px", 0.55),
  },
  {
    name: "Elevation · plain card",
    variable: "--elevation",
    value: "2",
    markup: CARD.replace(" primary", ""),
    property: "box-shadow",
    expected: shadow("surface", "0 12px 16px -14px", 0.55),
  },
  {
    name: "Elevation · button",
    variable: "--elevation",
    value: "2",
    markup: CONTROL,
    property: "box-shadow",
    expected: shadow("control", "0 12px 16px -14px", 0.55),
  },
  {
    name: "Elevation · input",
    variable: "--elevation",
    value: "2",
    markup: FIELD,
    property: "box-shadow",
    expected: shadow("field", "0 12px 16px -14px", 0.55),
  },
  {
    name: "Elevation · checkbox",
    variable: "--elevation",
    value: "2",
    markup: MARK,
    property: "box-shadow",
    expected: shadow("mark", "0 4px 6px -3px", 0.45),
  },
  {
    name: "Elevation · badge",
    variable: "--elevation",
    value: "2",
    markup: '<span class="badge primary" data-material-target>Badge</span>',
    property: "box-shadow",
    expected: shadow("surface", "0 4px 6px -3px", 0.45),
  },
  {
    name: "Elevation · dialog panel",
    variable: "--elevation",
    value: "2",
    markup:
      '<div class="modal-panel primary" data-material-target>Dialog panel</div>',
    property: "box-shadow",
    expected: shadow("surface", "0 16px 36px -14px", 0.55),
  },
  ...["rest", "hover", "mark", "disabled", "overlay"].map(
    (name): MaterialVariableCase => ({
      name: `Elevation recipe · ${name}`,
      variable: "--elevation",
      value: "2",
      markup: `<div class="card primary" data-material-target style="box-shadow:var(--elevation-${name})">${name}</div>`,
      property: "box-shadow",
      expected: `${name === "hover" || name === "overlay" ? "0 16px 36px -14px" : name === "mark" ? "0 4px 6px -3px" : name === "disabled" ? "0 12px 12px -12px" : "0 12px 16px -14px"} rgb(from var(--color-neutral-950, #0a0a0a) r g b / calc(${name === "mark" ? 0.45 : name === "disabled" ? 0.25 : 0.55} * 2))`,
    }),
  ),
];

export type MaterialVariableResult = {
  name: string;
  variable: string;
  value: string;
  theme: "light" | "dark";
  scope: "root" | "section" | "instance";
  layer: "unlayered" | "theme";
  order: "before" | "after";
  property: string;
  actual: string;
  expected: string;
  passed: boolean;
};

export type MaterialVariableReport = {
  environment: AuditSource;
  version: string;
  total: number;
  passed: number;
  failures: number;
  results: MaterialVariableResult[];
  userAgent: string;
};
