import { readFileSync } from "node:fs";
import path from "node:path";

export type SpecSection = {
  id: string;
  title: string;
  markdown: string;
};

const sectionId = (title: string) =>
  title
    .replace(/^\d+\.\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const readSpec = () => {
  const file = readFileSync(
    path.join(process.cwd(), "docs/design-system.md"),
    "utf8",
  );
  const [preamble, ...parts] = file.split(/^## /m);
  const title = preamble.match(/^# (.+)$/m)?.[1] ?? "Jellyfy Design System";
  const intro = preamble.replace(/^# .+\n+/, "").trim();

  const sections: SpecSection[] = parts.map((part) => {
    const [heading, ...body] = part.split("\n");
    const sectionTitle = heading.trim();
    return {
      id: sectionId(sectionTitle),
      title: sectionTitle,
      markdown: body.join("\n").trim(),
    };
  });

  return { title, intro, sections };
};
