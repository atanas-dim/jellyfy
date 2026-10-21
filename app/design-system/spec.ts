import { readFileSync } from "node:fs";
import path from "node:path";

import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export type SpecSection = {
  id: string;
  title: string;
  html: string;
};

const toHtml = async (markdown: string) =>
  String(await remark().use(remarkGfm).use(remarkHtml).process(markdown));

const sectionId = (title: string) =>
  title
    .replace(/^\d+\.\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const readSpec = async () => {
  const file = readFileSync(
    path.join(process.cwd(), "docs/design-system.md"),
    "utf8",
  );
  const [preamble, ...parts] = file.split(/^## /m);
  const title = preamble.match(/^# (.+)$/m)?.[1] ?? "Jellyfy Design System";
  const intro = preamble.replace(/^# .+\n+/, "").trim();

  const sections: SpecSection[] = [];
  for (const part of parts) {
    const [heading, ...body] = part.split("\n");
    const sectionTitle = heading.trim();
    sections.push({
      id: sectionId(sectionTitle),
      title: sectionTitle,
      html: await toHtml(body.join("\n").trim()),
    });
  }

  return {
    title,
    introHtml: await toHtml(intro),
    sections,
  };
};
