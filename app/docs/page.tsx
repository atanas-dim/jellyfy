import type { Metadata } from "next";
import Link from "next/link";

import { COMPONENT_DOCS } from "@/resources/component-docs";

import { Pager } from "./pager";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Jellyfy is class names on ordinary HTML, plus one call to startJellyfy().",
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
        Jellyfy is a set of class names for the HTML you already write, and one
        function, <code className="font-mono text-base">startJellyfy()</code>.
        It is not a React kit. A button is{" "}
        <code className="font-mono text-base">btn</code>. A color is a second
        class, <code className="font-mono text-base">primary</code>. The press
        is the function, called once.
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
          so you know what a missing color class does.
        </li>
        <li>
          Open a component.{" "}
          <Link
            href="/docs/button"
            className="font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4"
          >
            Button
          </Link>{" "}
          is the short one. Each page lists the classes, shows them, and gives
          the markup.
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
