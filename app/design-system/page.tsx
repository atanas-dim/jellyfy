import type { Metadata } from "next";

import { Contents } from "@/app/contents";
import { examples } from "./examples";
import { readSpec } from "./spec";
import { SpecCopy } from "./spec-copy";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const SHOWN = [
  "principles",
  "roles",
  "color",
  "material",
  "elevation",
  "shape",
  "typography",
  "spacing",
  "motion",
  "interaction-states",
  "themes",
  "components",
  "customization",
];

export default function DesignSystemPage() {
  const spec = readSpec();
  const sections = spec.sections.filter((section) =>
    SHOWN.includes(section.id),
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:flex-row lg:items-start lg:gap-10">
      <Contents
        groups={[
          {
            title: "Contents",
            items: sections.map((section, index) => ({
              href: `#${section.id}`,
              label: `${index + 1}. ${section.title.replace(/^\d+\.\s*/, "")}`,
            })),
          },
        ]}
      />
      <article className="min-w-0 flex-1 pb-24">
        <header className="max-w-3xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            {spec.title}
          </h1>
          {spec.intro ? <SpecCopy markdown={spec.intro} /> : null}
        </header>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mt-16 scroll-mt-24"
          >
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              {section.title}
            </h2>
            <SpecCopy markdown={section.markdown}>
              {examples[section.id]}
            </SpecCopy>
          </section>
        ))}
      </article>
    </div>
  );
}
