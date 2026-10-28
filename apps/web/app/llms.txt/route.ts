import { COMPONENT_DOCS, GUIDE_LINKS } from "@/resources/component-docs";
import { absoluteUrl, site } from "@/resources/site";

const guides: Record<string, string> = {
  "/docs": "How to use the classes.",
  "/docs/install":
    "Import jellyfy.css for the whole library, or the component files you use, and call startJellyfy() once.",
  "/docs/colors": "The eight color classes and their defaults.",
  "/docs/customize": "The colors, radii, and grain you can set.",
};

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Site",
    `- [Home](${absoluteUrl("/")}): ${site.description}`,
    `- [Set](${absoluteUrl("/set")}): Every control, color, and size.`,
    `- [Design system](${absoluteUrl("/design-system")}): The specification.`,
    "",
    "## Docs",
    ...GUIDE_LINKS.map(
      (link) =>
        `- [${link.label}](${absoluteUrl(link.href)}): ${guides[link.href]}`,
    ),
    ...COMPONENT_DOCS.map(
      (doc) =>
        `- [${doc.name}](${absoluteUrl(`/docs/${doc.slug}`)}): ${doc.description}`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
