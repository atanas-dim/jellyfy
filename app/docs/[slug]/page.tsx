import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { COMPONENT_DOCS, getComponentDoc } from "@/resources/component-docs";

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
  };
}

export default async function ComponentDocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) notFound();

  return (
    <article>
      <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase">
        Component
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">{doc.name}</h1>
        <Link
          href={`/set#${doc.slug}`}
          className="text-sm font-medium text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-950"
        >
          See it in the set
        </Link>
      </div>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
        {doc.description}
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
        <div className="mt-10 max-w-2xl space-y-3 leading-7 text-neutral-600">
          {doc.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      ) : null}

      <Pager href={`/docs/${doc.slug}`} />
    </article>
  );
}
