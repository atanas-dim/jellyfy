import type { Metadata } from "next";

import { examples } from "./examples";
import { readSpec } from "./spec";
import { SpecCopy } from "./spec-copy";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const SHOWN = ["principles"];

export default function DesignSystemPage() {
  const spec = readSpec();
  const sections = spec.sections.filter((section) =>
    SHOWN.includes(section.id),
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:flex-row lg:items-start lg:gap-10">
      <nav
        aria-label="Contents"
        className="sticky top-20 z-20 mb-10 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur-md lg:mb-0 lg:h-[calc(100dvh-6rem)] lg:w-52 lg:shrink-0 lg:overflow-y-auto lg:border-0 lg:bg-transparent lg:px-1 lg:py-0 lg:backdrop-blur-none dark:border-neutral-800 dark:bg-neutral-950/90"
      >
        <p className="px-3 text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
          Contents
        </p>
        <ol className="mt-2 flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block rounded-lg px-3 py-1.5 text-sm whitespace-nowrap text-neutral-600 hover:text-neutral-950 lg:whitespace-normal dark:text-neutral-300 dark:hover:text-neutral-100"
              >
                {index + 1}. {section.title.replace(/^\d+\.\s*/, "")}
              </a>
            </li>
          ))}
        </ol>
      </nav>
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
