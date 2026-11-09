import type { Metadata } from "next";
import type { FC } from "react";
import Markdown from "react-markdown";

import { Contents } from "@/components/contents";
import { JELLYFY_VERSION } from "@/resources/package-version";
import { readChangelog } from "@/utils/read-changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Release notes for Jellyfy, from the latest fixes to earlier releases.",
  alternates: { canonical: "/changelog" },
};

const ChangelogPage: FC = () => {
  const entries = readChangelog();
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col pt-16 pb-10 md:pt-20 lg:flex-row lg:items-start lg:gap-10">
      <Contents
        caption={`Jellyfy ${JELLYFY_VERSION}`}
        groups={[
          {
            title: "Releases",
            items: entries.map(({ version }) => ({
              href: `#v${version}`,
              label: version,
            })),
          },
        ]}
      />
      <main className="w-full min-w-0 flex-1 pb-16">
        <h1 className="text-4xl font-semibold tracking-tight">Changelog</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
          What changed in each Jellyfy release.
        </p>
        <div className="mt-10 grid gap-12">
          {entries.map(({ version, date, markdown }) => (
            <article
              key={version}
              id={`v${version}`}
              className="scroll-mt-24 border-t border-neutral-200 pt-8 dark:border-neutral-800"
            >
              <header className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h2 className="text-2xl font-semibold">{version}</h2>
                <time
                  dateTime={date}
                  className="text-sm text-neutral-500 dark:text-neutral-400"
                >
                  {new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </header>
              <div className="mt-5 space-y-4 leading-7 text-neutral-700 dark:text-neutral-200 [&_code]:rounded [&_code]:bg-neutral-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm dark:[&_code]:bg-neutral-800 [&_h3]:mt-6 [&_h3]:font-semibold [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
                <Markdown
                  components={{ h2: ({ children }) => <h3>{children}</h3> }}
                >
                  {markdown}
                </Markdown>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChangelogPage;
