import type { CSSProperties } from "react";

export type Color =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "success"
  | "error"
  | "warning";

const ringToken: Record<Color, string> = {
  primary: "--color-pink-600",
  secondary: "--color-indigo-600",
  tertiary: "--color-teal-600",
  neutral: "--color-neutral-400",
  success: "--color-green-600",
  error: "--color-red-600",
  warning: "--color-amber-600",
};

export const choiceStyle = (color: Color): CSSProperties => {
  const token = color === "neutral" ? "surface" : color;

  return {
    "--jellyfy-choice": `var(--${token})`,
    "--jellyfy-choice-foreground": `var(--${token}-foreground)`,
    "--jellyfy-ring": `var(${ringToken[color]})`,
  } as CSSProperties;
};

export const fieldFocusRing = () =>
  "jellyfy-focus motion-safe:transition-[box-shadow,background-color,outline-color] motion-safe:duration-300 motion-safe:ease-out";

export const colorClass = (color: Color) => {
  if (color === "secondary") return "jellyfy-tone-secondary";
  if (color === "tertiary") return "jellyfy-tone-tertiary";
  if (color === "neutral") return "jellyfy-tone-neutral";
  if (color === "success") return "jellyfy-tone-success";
  if (color === "error") return "jellyfy-tone-error";
  if (color === "warning") return "jellyfy-tone-warning";
  return "jellyfy-tone-primary";
};
