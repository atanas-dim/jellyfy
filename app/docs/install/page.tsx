import type { Metadata } from "next";

import { CodeBlock } from "../code-block";
import { Pager } from "../pager";

export const metadata: Metadata = {
  title: "Install",
  description: "Add the Jellyfy stylesheet and call startJellyfy() once.",
  alternates: { canonical: "/docs/install" },
};

export default function InstallPage() {
  return (
    <article>
      <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase">
        Getting started
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Install</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
        Two files. <code className="font-mono text-base">jellyfy.css</code>{" "}
        paints the controls.{" "}
        <code className="font-mono text-base">jellyfy.js</code> runs the press
        and the loading lights, and it keeps a slider’s fill in step with the
        input.
      </p>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        With Tailwind
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
        Import the stylesheet after Tailwind. A utility such as{" "}
        <code className="font-mono text-sm">px-4</code> sets that padding. The
        press stays.
      </p>
      <CodeBlock
        lang="css"
        code={`@import "tailwindcss";
@import "jellyfy.css";`}
      />

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        Without Tailwind
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
        Link the stylesheet on its own. The controls paint the same way.
      </p>
      <CodeBlock
        lang="html"
        code={`<link rel="stylesheet" href="jellyfy.css" />`}
      />

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        Call it once
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
        Call <code className="font-mono text-sm">startJellyfy()</code> once,
        after the controls are on the page. A pointer press squashes the control
        under the pointer. A later call is ignored.
      </p>
      <CodeBlock
        lang="js"
        code={`import { startJellyfy } from "jellyfy.js";

startJellyfy();`}
      />

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        Press any element
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
        Add <code className="font-mono text-sm">squish</code> to give any
        element the same press. On a Jellyfy control it uses the face that
        control already has. Add it to a card when the card should press.
      </p>
      <CodeBlock
        lang="html"
        code={`<article class="card squish">Notes</article>`}
      />

      <Pager href="/docs/install" />
    </article>
  );
}
