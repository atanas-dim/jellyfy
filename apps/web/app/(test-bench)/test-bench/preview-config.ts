import type { AuditMode } from "../../(theme-probe)/theme-probe/audit-environment";
import { type OverrideTest, type TestPart, TESTS } from "./property-cases";

export const PREVIEW_MODE_EVENT = "jellyfy-preview-mode";

export const PLAIN_COLOR_CSS = `:root {
  --color-primary: #166534;
  --color-secondary: #1d4ed8;
  --color-tertiary: #7e22ce;
  --color-primary-content: #f87171;
  --color-secondary-content: #14532d;
  --color-tertiary-content: #f87171;
  --color-primary-surface-content: #14532d;
  --color-secondary-surface-content: #14532d;
  --color-tertiary-surface-content: #14532d;
  --material-opacity: 70%;
}`;

// Explicit CSS equivalents are local overrides, not a utility-class emulator.
const PROPERTY_CSS: Record<keyof typeof TESTS, string> = {
  color: "color:#ef4444",
  background: "background-color:#f97316",
  padding: "padding:8px",
  radius: "border-radius:0",
  border: "border:4px solid #ef4444",
  shadow: "box-shadow:none",
  size: "width:128px;height:80px",
  typography:
    "font-size:20px;line-height:28px;font-weight:300;letter-spacing:.1em;text-transform:none",
  opacity: "opacity:.5",
  texture: "background-image:none",
  blur: "backdrop-filter:none",
};

export function getPreviewOverride(
  property: keyof typeof TESTS,
  part: Pick<TestPart, "pseudo" | "sizeClasses">,
  mode: AuditMode,
): { test: OverrideTest; css: string; label: string } {
  if (mode === "tailwind") return { test: TESTS[property], css: "", label: "" };
  const sizing =
    property === "size"
      ? part.sizeClasses === "min-h-0"
        ? ";min-height:0"
        : part.sizeClasses === "shrink-0"
          ? ";flex-shrink:0"
          : ""
      : "";
  const declarations = PROPERTY_CSS[property] + sizing;
  const css = `.local-override${part.pseudo ?? ""} { ${declarations} }\n.local-reference { ${declarations} }`;
  return {
    test: {
      ...TESTS[property],
      classes: "local-override",
      afterClasses: "local-override",
    },
    css,
    label: css,
  };
}
