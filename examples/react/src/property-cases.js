export const SAMPLES = [
  ["btn", "Button"],
  ["btn-icon", "Icon button"],
  ["btn-bump", "Bump button"],
  ["badge", "Badge"],
  ["input", "Input"],
  ["textarea", "Textarea"],
  ["select", "Select"],
  ["checkbox", "Checkbox"],
  ["radio", "Radio"],
  ["toggle", "Switch"],
  ["range", "Range"],
  ["message", "Message"],
  ["alert", "Alert"],
  ["card", "Card"],
  ["modal-panel", "Dialog panel"],
];

export const TESTS = {
  color: {
    label: "Text colour",
    classes: "text-red-500",
    afterClasses: "after:text-red-500",
    properties: ["color"],
  },
  background: {
    label: "Background colour",
    classes: "bg-orange-500",
    afterClasses: "after:bg-orange-500",
    properties: ["background-color"],
  },
  padding: {
    label: "Padding",
    classes: "p-2",
    afterClasses: "after:p-2",
    properties: [
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
    ],
  },
  radius: {
    label: "Corners",
    classes: "rounded-none",
    afterClasses: "after:rounded-none",
    properties: [
      "border-top-left-radius",
      "border-top-right-radius",
      "border-bottom-left-radius",
      "border-bottom-right-radius",
    ],
  },
  border: {
    label: "Border",
    classes: "border-4 border-red-500",
    afterClasses: "after:border-4 after:border-red-500",
    properties: ["border-top-width", "border-top-color", "border-top-style"],
  },
  shadow: {
    label: "Shadow",
    classes: "shadow-none",
    afterClasses: "after:shadow-none",
    properties: ["box-shadow"],
  },
  size: {
    label: "Width and height",
    classes: "w-32 h-20",
    afterClasses: "after:w-32 after:h-20",
    properties: ["width", "height"],
  },
  typography: {
    label: "Typography",
    classes: "text-xl font-light tracking-widest normal-case",
    afterClasses:
      "after:text-xl after:font-light after:tracking-widest after:normal-case",
    properties: [
      "font-size",
      "line-height",
      "font-weight",
      "letter-spacing",
      "text-transform",
    ],
  },
  opacity: {
    label: "Opacity",
    classes: "opacity-50",
    afterClasses: "after:opacity-50",
    properties: ["opacity"],
  },
  texture: {
    label: "Remove background texture",
    classes: "bg-none",
    afterClasses: "after:bg-none",
    properties: ["background-image"],
  },
  blur: {
    label: "Remove backdrop blur",
    classes: "backdrop-blur-none",
    afterClasses: "after:backdrop-blur-none",
    properties: ["backdrop-filter"],
  },
};

// These preferences choose the initial target only; they never exclude a test.
const MATERIAL = [
  "background",
  "radius",
  "border",
  "shadow",
  "size",
  "opacity",
  "texture",
  "blur",
];
const LABEL = {
  id: "label",
  name: "Label text",
  selector: "[data-part=label]",
  preferred: ["color", "typography", "opacity"],
};
const SURFACE = {
  id: "surface",
  name: "Component surface",
  preferred: Object.keys(TESTS),
};
const DEFAULT_PARTS = [SURFACE];
const fieldParts = (tag) => [
  {
    id: "surface",
    name: "Field surface",
    selector: `.${tag}`,
    preferred: MATERIAL,
  },
  {
    id: "value",
    name: "Native value field",
    selector: `.${tag} > ${tag === "input" ? "input" : tag}`,
    preferred: ["color", "padding", "typography", "size", "opacity"],
  },
  {
    id: "label",
    name: "Floating label",
    selector: `.${tag} > span`,
    preferred: ["color", "typography", "opacity"],
  },
];
const OUTER = {
  id: "surface",
  name: "Outer label/layout",
  preferred: ["padding"],
};

const PARTS = {
  input: fieldParts("input"),
  textarea: fieldParts("textarea"),
  select: fieldParts("select"),
  checkbox: [
    {
      id: "box",
      name: "Checkbox box",
      selector: ".checkbox-box",
      preferred: MATERIAL,
    },
    {
      id: "checkmark",
      host: "box",
      pseudo: "::after",
      name: "Checkbox checkmark",
      selector: ".checkbox-box::after",
      preferred: [],
    },
    OUTER,
    LABEL,
  ],
  radio: [
    {
      id: "ring",
      name: "Radio ring",
      selector: ".radio-ring",
      preferred: MATERIAL,
    },
    {
      id: "dot",
      host: "ring",
      pseudo: "::after",
      name: "Selected radio dot",
      selector: ".radio-ring::after",
      preferred: ["background", "radius", "border", "size", "opacity"],
    },
    OUTER,
    LABEL,
  ],
  toggle: [
    {
      id: "track",
      name: "Switch track",
      selector: ".toggle-track",
      preferred: MATERIAL,
    },
    {
      id: "thumb",
      name: "Switch thumb",
      selector: ".toggle-thumb",
      preferred: MATERIAL,
    },
    OUTER,
    LABEL,
  ],
  range: [
    {
      id: "track",
      name: "Slider track",
      selector: ".range-track",
      preferred: MATERIAL,
    },
    {
      id: "fill",
      name: "Slider fill",
      selector: ".range-fill",
      preferred: MATERIAL,
    },
    {
      id: "thumb",
      name: "Slider thumb",
      selector: ".range-thumb",
      preferred: MATERIAL,
    },
    OUTER,
    LABEL,
  ],
  "btn-icon": [
    {
      ...SURFACE,
      name: "Button surface",
      preferred: Object.keys(TESTS).filter((key) => key !== "typography"),
    },
    {
      id: "icon",
      name: "SVG symbol",
      selector: ".btn-icon > svg",
      preferred: ["size", "opacity"],
    },
  ],
  "btn-bump": [
    {
      ...SURFACE,
      name: "Button surface",
      preferred: [
        "background",
        "padding",
        "radius",
        "border",
        "shadow",
        "size",
        "opacity",
      ],
    },
    {
      id: "icon",
      name: "SVG symbol",
      selector: ".btn-bump > svg",
      preferred: ["size", "opacity"],
    },
  ],
  alert: [
    SURFACE,
    {
      id: "icon",
      name: "SVG symbol",
      selector: ".alert > svg",
      preferred: ["size", "opacity"],
    },
  ],
  message: [
    {
      ...SURFACE,
      name: "Message text",
      preferred: Object.keys(TESTS).filter(
        (key) => !["texture", "blur"].includes(key),
      ),
    },
  ],
};

export const getParts = (kind) => PARTS[kind] ?? DEFAULT_PARTS;
export const getDefaultPart = (kind, property) =>
  getParts(kind).find((part) => part.preferred.includes(property)) ??
  getParts(kind)[0];

export const getOverrideClasses = (test, part) =>
  part.pseudo ? test.afterClasses : test.classes;

export const AUDIT_CASES = SAMPLES.flatMap(([kind, name]) =>
  getParts(kind).flatMap((part) =>
    Object.entries(TESTS).map(([property, test]) => ({
      id: `${kind}-${part.id}-${property}`,
      kind,
      name,
      part,
      property,
      test,
    })),
  ),
);
