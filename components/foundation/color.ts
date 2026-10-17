export type Color =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "success"
  | "error"
  | "warning";

export const colorClass = (color: Color) => {
  if (color === "secondary") return "jellyfy-tone-secondary";
  if (color === "tertiary") return "jellyfy-tone-tertiary";
  if (color === "neutral") return "jellyfy-tone-neutral";
  if (color === "success") return "jellyfy-tone-success";
  if (color === "error") return "jellyfy-tone-error";
  if (color === "warning") return "jellyfy-tone-warning";
  return "jellyfy-tone-primary";
};
