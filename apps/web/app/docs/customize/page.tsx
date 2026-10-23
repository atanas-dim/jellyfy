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
      <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase dark:text-neutral-400">
        Getting started
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Customize</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
        Set only the names you want to change. The hexes below are the defaults.
      </p>
      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        Without Tailwind
      </h2>
      <CodeBlock
        lang="css"
        code={`:root {
  --color-primary: #6366f1;
  --color-primary-content: #1e1b4b;
  --color-primary-surface-content: #3730a3;
  --color-secondary: #db2777;
  --color-secondary-content: #500724;
  --color-secondary-surface-content: #9d174d;
  --color-tertiary: #0d9488;
  --color-tertiary-content: #042f2e;
  --color-tertiary-surface-content: #115e59;
  --color-neutral: #d4d4d4;
  --color-neutral-content: #0a0a0a;
  --color-neutral-surface-content: #262626;
  --color-success: #16a34a;
  --color-success-content: #052e16;
  --color-success-surface-content: #166534;
  --color-warning: #d97706;
  --color-warning-content: #451a03;
  --color-warning-surface-content: #92400e;
  --color-error: #dc2626;
  --color-error-content: #450a0a;
  --color-error-surface-content: #991b1b;
  --color-info: #0284c7;
  --color-info-content: #082f49;
  --color-info-surface-content: #075985;

  --radius-surface: 1rem;
  --radius-field: 1rem;
  --radius-control: 999px;
  --radius-mark: 0.5rem;
  --material-opacity: 60%;
  --material-blur: 4px;
  --noise-size: 22.5rem;
  --elevation: 1;
}`}
      />
      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        With Tailwind
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        Put the solids in <code className="font-mono text-sm">@theme</code>.
        That is Tailwind’s token list, and Jellyfy reads those names. Content
        colors, surface content colors, radius, opacity, blur, grain, and the
        elevation multiplier are set on{" "}
        <code className="font-mono text-sm">:root</code>. Tailwind already sets{" "}
        <code className="font-mono text-sm">--spacing</code>.
      </p>
      <CodeBlock
        lang="css"
        code={`@theme {
  --color-primary: #6366f1;
  --color-secondary: #db2777;
  --color-tertiary: #0d9488;
  --color-neutral: #d4d4d4;
  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-error: #dc2626;
  --color-info: #0284c7;
}

:root {
  --color-primary-content: #1e1b4b;
  --color-primary-surface-content: #3730a3;
  --color-secondary-content: #500724;
  --color-secondary-surface-content: #9d174d;
  --color-tertiary-content: #042f2e;
  --color-tertiary-surface-content: #115e59;
  --color-neutral-content: #0a0a0a;
  --color-neutral-surface-content: #262626;
  --color-success-content: #052e16;
  --color-success-surface-content: #166534;
  --color-warning-content: #451a03;
  --color-warning-surface-content: #92400e;
  --color-error-content: #450a0a;
  --color-error-surface-content: #991b1b;
  --color-info-content: #082f49;
  --color-info-surface-content: #075985;

  --radius-surface: 1rem;
  --radius-field: 1rem;
  --radius-control: 999px;
  --radius-mark: 0.5rem;
  --material-opacity: 60%;
  --material-blur: 4px;
  --noise-size: 22.5rem;
  --elevation: 1;
}`}
      />
      <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 leading-7 text-neutral-600 dark:text-neutral-300">
        <li>
          Each slot has three names.{" "}
          <code className="font-mono text-sm">--color-primary</code> is the
          solid.{" "}
          <code className="font-mono text-sm">--color-primary-content</code> is
          the text on a button or badge.{" "}
          <code className="font-mono text-sm">
            --color-primary-surface-content
          </code>{" "}
          is the text on a field, card, alert, or dialog panel. The same two
          suffixes exist for every slot, and the samples list them. The hexes
          are the light defaults. A single hex replaces the light and dark pair.
          Changing a solid does not change those text colors.
        </li>
        <li>
          <code className="font-mono text-sm">--radius-control</code> is the
          pill on buttons, the switch, the slider handle, and badges.{" "}
          <code className="font-mono text-sm">999px</code> keeps that corner
          fully round.
        </li>
        <li>
          <code className="font-mono text-sm">--radius-surface</code> is the
          corner on cards, alerts, and the dialog panel.
        </li>
        <li>
          <code className="font-mono text-sm">--noise-size</code> is how large
          the grain tiles. It is in rem so the grain scales with the root font.
        </li>
        <li>
          <code className="font-mono text-sm">--radius-field</code> is the
          corner on inputs, textareas, and selects.{" "}
          <code className="font-mono text-sm">--radius-mark</code> is the
          checkbox.{" "}
          <code className="font-mono text-sm">--material-opacity</code> and{" "}
          <code className="font-mono text-sm">--material-blur</code> are the
          jelly. <code className="font-mono text-sm">--elevation</code> scales
          every drop shadow together.
        </li>
      </ul>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Dark</h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        Jellyfy follows the operating system. Primary is Indigo 500 in both
        themes. The other solids stay the ones you set. Surface text is the 800
        step in light and the 200 step in dark. Control text is the 950 step in
        light and the 100 step in dark. Neutral is Neutral 300 in light and
        Neutral 500 in dark.
      </p>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        To choose for the page, add the class{" "}
        <code className="font-mono text-sm">dark</code> on the root, or on any
        section. It forces the dark paper. The class{" "}
        <code className="font-mono text-sm">light</code> on the root keeps the
        light paper even when the system is dark.
      </p>
      <CodeBlock lang="html" code={`<html class="dark">`} />
      <Pager href="/docs/customize" />
    </article>
  );
}
