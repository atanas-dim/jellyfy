import type { Metadata } from "next";

import { CodeBlock } from "../code-block";
import { Pager } from "../pager";

export const metadata: Metadata = {
  title: "Colors",
  description:
    "The eight Jellyfy color classes. A control uses one only when you add the class.",
  alternates: { canonical: "/docs/colors" },
};

const ROWS = [
  ["primary", "Indigo"],
  ["secondary", "Pink"],
  ["tertiary", "Teal"],
  ["neutral", "Gray"],
  ["success", "Green"],
  ["error", "Red"],
  ["warning", "Amber"],
  ["info", "Sky"],
];

export default function ColorsPage() {
  return (
    <article>
      <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase">
        Getting started
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Colors</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
        The color is its own class, as in{" "}
        <code className="font-mono text-base">btn primary</code>. The same word
        works on every control. A control with no color class stays the plain
        surface. Indigo, pink, teal, gray, green, red, amber, and sky are the
        default solids. Set{" "}
        <code className="font-mono text-base">--color-secondary</code>, or any
        of the eight, to replace one.
      </p>
      <div className="mt-8 overflow-x-auto overflow-y-hidden overscroll-x-contain overscroll-y-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-500 dark:border-neutral-800">
              <th className="py-2 pr-4 font-medium">Class</th>
              <th className="py-2 pr-4 font-medium">Default solid</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([name, solid]) => (
              <tr
                key={name}
                className="border-b border-neutral-100 dark:border-neutral-800"
              >
                <td className="py-2 pr-4 font-mono text-[13px]">{name}</td>
                <td className="py-2 pr-4 text-neutral-600">{solid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
        A card with no color stays the panel. A dialog panel with no color stays
        the plain surface, and the close button follows that surface.
      </p>
      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        A color on a parent
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
        The color class sets a variable, and variables inherit. A message inside
        a <code className="font-mono text-sm">primary</code> card follows that
        card. Put the color on the message itself when it must stay red.
      </p>
      <CodeBlock
        lang="html"
        code={`<section class="card primary">
  <p class="message error">Required</p>
</section>`}
      />
      <Pager href="/docs/colors" />
    </article>
  );
}
