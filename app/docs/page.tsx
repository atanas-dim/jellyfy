import type { Metadata } from "next";
import Link from "next/link";

import { COMPONENT_DOCS } from "@/resources/component-docs";

import { Pager } from "./pager";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Soft controls. Add a class, pick a color, and call startJellyfy() once.",
  alternates: { canonical: "/docs" },
};

export default function DocsPage() {
  return (
    <article>
      <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase">
        Getting started
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Introduction
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
        Soft controls for the markup on the page. Add{" "}
        <code className="font-mono text-base">btn</code>, a color such as{" "}
        <code className="font-mono text-base">primary</code>, and call{" "}
        <code className="font-mono text-base">startJellyfy()</code> once.
      </p>
      <ol className="mt-8 max-w-2xl list-decimal space-y-3 pl-5 leading-7 text-neutral-700">
        <li>
          <Link
            href="/docs/install"
            className="font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4"
          >
            Install
          </Link>{" "}
          the stylesheet and call{" "}
          <code className="font-mono text-sm">startJellyfy()</code> once.
        </li>
        <li>
          Read{" "}
          <Link
            href="/docs/colors"
            className="font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4"
          >
            Colors
          </Link>{" "}
          to see the defaults.
        </li>
        <li>
          Open{" "}
          <Link
            href="/docs/button"
            className="font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4"
          >
            Button
          </Link>
          , or any component below, for the classes and the markup.
        </li>
      </ol>
      <h2 className="mt-12 text-xl font-semibold tracking-tight">Components</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {COMPONENT_DOCS.map((doc) => (
          <li key={doc.slug} className="flex">
            <Link
              href={`/docs/${doc.slug}`}
              className="block h-full w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 hover:border-neutral-300"
            >
              <span className="font-medium">{doc.name}</span>
              <span className="mt-1 block text-sm leading-6 text-neutral-600">
                {doc.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Pager href="/docs" />
    </article>
  );
}
