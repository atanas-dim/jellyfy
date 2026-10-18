import type { Metadata } from "next";

import { CodeBlock } from "../code-block";
import { Pager } from "../pager";

export const metadata: Metadata = {
  title: "Install",
  description: "Add the Jellyfy stylesheet and call startJellyfy() once.",
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
        Import the stylesheet after Tailwind. You do not need a plugin. A
        utility on the same element changes only the property it sets, so{" "}
        <code className="font-mono text-sm">px-4</code> changes the padding and
        the press stays.
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
        Link the same stylesheet. The controls still paint. Nothing in the file
        asks Tailwind to exist.
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
        after the controls are in the page. A pointer press squashes the control
        under the pointer. Keyboard focus does not. Calling it again does not
        add a second listener.
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
        <code className="font-mono text-sm">squish</code> on any element opts
        that element into the same press. A Jellyfy control already has a face,
        so adding <code className="font-mono text-sm">squish</code> there does
        not start a second animation. A card does not press unless it wears the
        class.
      </p>
      <CodeBlock
        lang="html"
        code={`<article class="card squish">Notes</article>`}
      />

      <Pager href="/docs/install" />
    </article>
  );
}
