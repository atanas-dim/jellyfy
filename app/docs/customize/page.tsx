import type { Metadata } from "next";

import { CodeBlock } from "../code-block";
import { Pager } from "../pager";

export const metadata: Metadata = {
  title: "Customize",
  description: "The Jellyfy variables a developer is meant to set.",
  alternates: { canonical: "/docs/customize" },
};

export default function CustomizePage() {
  return (
    <article>
      <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase">
        Getting started
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Customize</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
        Set only the names you want to change. The hexes below are the defaults.
      </p>
      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        Without Tailwind
      </h2>
      <CodeBlock
        lang="css"
        code={`:root {
  --color-primary: #4f46e5;
  --color-secondary: #db2777;
  --color-tertiary: #0d9488;
  --color-neutral: #a3a3a3;
  --color-success: #16a34a;
  --color-error: #dc2626;
  --color-warning: #d97706;
  --color-info: #0284c7;

  --radius-control: 999px;
  --radius-surface: 1rem;
  --noise-size: 22.5rem;

  --spacing: 0.25rem;
}`}
      />
      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        With Tailwind
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
        Put the eight solids in{" "}
        <code className="font-mono text-sm">@theme</code>. That is Tailwind’s
        token list, and Jellyfy reads those names. Radius and grain are set on{" "}
        <code className="font-mono text-sm">:root</code> in the stylesheet. A{" "}
        <code className="font-mono text-sm">@theme</code> value sits in
        Tailwind's theme layer, and that{" "}
        <code className="font-mono text-sm">:root</code> rule wins, so a change
        to those three goes on <code className="font-mono text-sm">:root</code>{" "}
        as well. Tailwind already sets{" "}
        <code className="font-mono text-sm">--spacing</code>.
      </p>
      <CodeBlock
        lang="css"
        code={`@theme {
  --color-primary: #4f46e5;
  --color-secondary: #db2777;
  --color-tertiary: #0d9488;
  --color-neutral: #a3a3a3;
  --color-success: #16a34a;
  --color-error: #dc2626;
  --color-warning: #d97706;
  --color-info: #0284c7;
}

:root {
  --radius-control: 999px;
  --radius-surface: 1rem;
  --noise-size: 22.5rem;
}`}
      />
      <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 leading-7 text-neutral-600">
        <li>
          The eight <code className="font-mono text-sm">--color-*</code> names
          are the solids. A button, a field, and a badge in{" "}
          <code className="font-mono text-sm">primary</code> all read{" "}
          <code className="font-mono text-sm">--color-primary</code>.
        </li>
        <li>
          <code className="font-mono text-sm">--radius-control</code> is the
          pill on buttons, the switch, the slider handle, and badges.{" "}
          <code className="font-mono text-sm">999px</code> keeps that corner
          fully round.
        </li>
        <li>
          <code className="font-mono text-sm">--radius-surface</code> is the
          corner on fields, cards, alerts, and the dialog panel.
        </li>
        <li>
          <code className="font-mono text-sm">--noise-size</code> is how large
          the grain tiles. It is in rem so the grain scales with the root font.
        </li>
        <li>
          <code className="font-mono text-sm">--spacing</code> is optional.
          Tailwind already sets it. Without Tailwind, leave it unset and the
          sizes use <code className="font-mono text-sm">0.25rem</code>.
        </li>
      </ul>
      <Pager href="/docs/customize" />
    </article>
  );
}
