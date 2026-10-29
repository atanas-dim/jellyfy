import type { ReactNode } from "react";

import { CodeBlock } from "@/components/code-block";

export const Example = async ({
  title,
  code,
  note,
  lang,
  children,
}: {
  title: string;
  code: string;
  note?: string;
  lang?: string;
  children: ReactNode;
}) => (
  <section className="mt-12">
    <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    {note ? (
      <p className="mt-2 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        {note}
      </p>
    ) : null}
    <div className="surface mt-4 p-6">{children}</div>
    <CodeBlock code={code} lang={lang} />
  </section>
);
