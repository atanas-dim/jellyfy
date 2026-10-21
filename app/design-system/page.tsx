import type { Metadata } from "next";

import { examples } from "./examples";
import { readSpec } from "./spec";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const copyClass =
  "space-y-4 text-base leading-7 text-neutral-700 dark:text-neutral-200 [&_a]:underline [&_code]:rounded [&_code]:bg-neutral-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm dark:[&_code]:bg-neutral-800 [&_h3]:mt-8 [&_h3]:border-t [&_h3]:border-neutral-200 [&_h3]:pt-6 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:tracking-[0.16em] [&_h3]:text-neutral-400 [&_h3]:uppercase dark:[&_h3]:border-neutral-800 [&_li]:mt-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:max-w-3xl [&_strong]:font-semibold [&_table]:w-full [&_table]:text-sm [&_td]:border-t [&_td]:border-neutral-200 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top dark:[&_td]:border-neutral-800 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5";

const shown = ["principles"];

export default async function DesignSystemPage() {
  const spec = await readSpec();
  const sections = spec.sections.filter((section) =>
    shown.includes(section.id),
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
          <div
            className={`mt-4 text-neutral-600 dark:text-neutral-300 ${copyClass}`}
            dangerouslySetInnerHTML={{ __html: spec.introHtml }}
          />
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
            <div
              className={`mt-4 ${copyClass}`}
              dangerouslySetInnerHTML={{ __html: section.html }}
            />
            {examples[section.id]}
          </section>
        ))}
      </article>
    </div>
  );
}
