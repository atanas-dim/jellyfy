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
      <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase dark:text-neutral-400">
        Getting started
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Colors</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
        The color is its own class, as in{" "}
        <code className="font-mono text-base">btn primary</code>. The same word
        works on every control. A control with no color class stays plain. Each
        slot has a solid, a content color for text on a button or badge, and a
        surface content color for text on a field, card, alert, or dialog panel.
        Primary is Indigo 500 in both themes. Neutral is Neutral 300 in light
        and Neutral 500 in dark. Secondary, tertiary, success, warning, error,
        and info are the 600 step in both themes.
      </p>
      <div className="table-scroll mt-8">
        <table className="text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
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
                <td className="py-2 pr-4 text-neutral-600 dark:text-neutral-300">
                  {solid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        A card, an alert, or a dialog panel with no color stays plain, and the
        close button follows that text. A slot tints that text with the surface
        content color: the 800 step in light, the 200 step in dark. Text on a
        button or a badge is the content color: the 950 step in light, the 100
        step in dark. A message with a slot uses the solid itself. A message
        with no slot stays the plain content color. It is not an error style.
      </p>
      <p className="mt-4 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        A disabled control replaces its fill and its text with the disabled
        colors. It does not keep its slot. The slider track keeps its own color.
        A disabled bump button has no fill. It fades, and its icon stays the
        plain content color.
      </p>
      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        A color on a parent
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        The color class sets a variable, and variables inherit. A message inside
        a <code className="font-mono text-sm">primary</code> card follows that
        card. Put the color on the message itself when it should use its own
        solid.
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
