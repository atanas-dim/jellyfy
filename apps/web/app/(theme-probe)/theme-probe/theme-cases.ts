import type { AuditMode, AuditSource } from "./audit-environment";

export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];
export const SLOTS = [
  "plain",
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "success",
  "warning",
  "error",
  "info",
];
export const PROFILES = [
  "defaults",
  "root-custom",
  "theme-custom",
  "local-utilities",
] as const;
export type Profile = (typeof PROFILES)[number] | "local-css";
export const STATES = [
  "resting",
  "checked",
  "disabled",
  "focus",
  "loading",
] as const;
export type State = (typeof STATES)[number];

export const FRAMES: {
  id: string;
  theme: Theme;
  parents: Theme[];
  reference?: boolean;
}[] = [
  { id: "reference-light", theme: "light", parents: [], reference: true },
  { id: "reference-dark", theme: "dark", parents: [], reference: true },
  { id: "dark-light", theme: "light", parents: ["dark"] },
  { id: "light-dark", theme: "dark", parents: ["light"] },
  { id: "light-dark-light", theme: "light", parents: ["light", "dark"] },
  { id: "dark-light-dark", theme: "dark", parents: ["dark", "light"] },
];

export const STYLE_PROPERTIES = [
  "color",
  "background-color",
  "background-image",
  "background-size",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "border-top-style",
  "border-top-width",
  "border-right-style",
  "border-right-width",
  "border-bottom-style",
  "border-bottom-width",
  "border-left-style",
  "border-left-width",
  "outline-color",
  "outline-style",
  "outline-width",
  "outline-offset",
  "text-decoration-color",
  "caret-color",
  "accent-color",
  "box-shadow",
  "backdrop-filter",
  "color-scheme",
  "fill",
  "stroke",
  "opacity",
];

export type Difference = {
  target: string;
  property: string;
  actual: string;
  expected: string;
};
export type ThemeResult = {
  component: string;
  slot: string;
  profile: Profile;
  state: State;
  outerTheme: Theme;
  frame: string;
  innerTheme: Theme;
  passed: boolean;
  differences: Difference[];
};
export type ThemeReport = {
  environment: AuditSource;
  version: string;
  userAgent: string;
  total: number;
  passed: number;
  failures: number;
  propertyChecks: number;
  results: ThemeResult[];
  notes: string[];
};

export const CUSTOMIZATION_CSS = `.light {
  --color-primary: var(--color-blue-600);
  --color-primary-content: var(--color-blue-950);
  --color-primary-surface-content: var(--color-blue-800);
}

.dark {
  --color-primary: var(--color-blue-400);
  --color-primary-content: var(--color-blue-100);
  --color-primary-surface-content: var(--color-blue-200);
}`;

// The audit applies the same explicit theme rules to each slot, not just primary.
export const customValues = (
  profile: Profile,
  theme: Theme,
): string[] | null => {
  if (profile === "root-custom")
    return [
      "var(--color-green-700)",
      "var(--color-red-500)",
      "var(--color-purple-500)",
    ];
  if (profile === "theme-custom")
    return theme === "light"
      ? [
          "var(--color-blue-600)",
          "var(--color-blue-950)",
          "var(--color-blue-800)",
        ]
      : [
          "var(--color-blue-400)",
          "var(--color-blue-100)",
          "var(--color-blue-200)",
        ];
  return null;
};

export const tokenNames = (slot: string): string[] => [
  `--color-${slot}`,
  `--color-${slot}-content`,
  `--color-${slot}-surface-content`,
];

// Plain CSS must exercise literal colors without supplying Tailwind's palette.
export const auditValues = (
  profile: Profile,
  theme: Theme,
  mode: AuditMode,
): string[] | null => {
  if (mode === "tailwind") return customValues(profile, theme);
  if (profile === "root-custom") return ["#15803d", "#ef4444", "#a855f7"];
  if (profile === "theme-custom")
    return theme === "light"
      ? ["#2563eb", "#172554", "#1e40af"]
      : ["#60a5fa", "#dbeafe", "#bfdbfe"];
  return null;
};
