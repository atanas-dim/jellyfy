export type Color =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "success"
  | "error"
  | "warning";

const fieldRing =
  "focus-within:ring focus-within:ring-offset-2 focus-within:outline-none";

export const fieldFocusRing = (color: Color, open = false) => {
  if (color === "error") {
    return open
      ? `${fieldRing} focus-within:ring-ring-error ring ring-offset-2 outline-none ring-ring-error`
      : `${fieldRing} focus-within:ring-ring-error`;
  }

  if (color === "success") {
    return open
      ? `${fieldRing} focus-within:ring-ring-success ring ring-offset-2 outline-none ring-ring-success`
      : `${fieldRing} focus-within:ring-ring-success`;
  }

  return open
    ? `${fieldRing} focus-within:ring-ring ring ring-offset-2 outline-none ring-ring`
    : `${fieldRing} focus-within:ring-ring`;
};

export const colorClass = (color: Color) => {
  if (color === "secondary") return "jellyfy-tone-secondary";
  if (color === "tertiary") return "jellyfy-tone-tertiary";
  if (color === "neutral") return "jellyfy-tone-neutral";
  if (color === "success") return "jellyfy-tone-success";
  if (color === "error") return "jellyfy-tone-error";
  if (color === "warning") return "jellyfy-tone-warning";
  return "jellyfy-tone-primary";
};
