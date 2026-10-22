import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  COMPONENT_DOCS,
  COMPONENT_STYLESHEETS,
  getComponentDoc,
} from "@/resources/component-docs";

import { ClassTable } from "../class-table";
import { Example } from "../example";
import { Pager } from "../pager";
import { Sample } from "../samples";

type DocPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return COMPONENT_DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  return {
    title: doc?.name ?? "Docs",
    description: doc?.description,
    alternates: { canonical: `/docs/${slug}` },
  };
}

export default async function ComponentDocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) notFound();

  return (
    <article>
      <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase dark:text-neutral-400">
        Component
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">{doc.name}</h1>
      </div>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
        {doc.description}
      </p>
      <p className="mt-4 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        Import{" "}
        <code className="font-mono text-sm">
          jellyfy/{COMPONENT_STYLESHEETS[doc.slug]}
        </code>{" "}
        with <code className="font-mono text-sm">jellyfy/material.css</code> and{" "}
        <code className="font-mono text-sm">jellyfy/motion.css</code>. Or import{" "}
        <code className="font-mono text-sm">jellyfy/jellyfy.css</code>, which
        already includes this file and every other component.
      </p>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Classes</h2>
      <ClassTable rows={doc.classes} />

      {doc.examples.map((example) => (
        <Example
          key={example.id}
          title={example.title}
          code={example.code}
          note={example.note}
        >
          <Sample id={example.id} />
        </Example>
      ))}

      {doc.notes.length > 0 ? (
        <div className="mt-10 max-w-2xl space-y-3 leading-7 text-neutral-600 dark:text-neutral-300">
          {doc.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      ) : null}

      <Pager href={`/docs/${doc.slug}`} />
    </article>
  );
}
