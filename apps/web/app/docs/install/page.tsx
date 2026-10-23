import type { Metadata } from "next";

import { CodeBlock } from "@/components/docs/code-block";
import { Pager } from "@/components/docs/pager";

export const metadata: Metadata = {
  title: "Install",
  description:
    "Import jellyfy.css for the whole library, or import the component files you use. Call startJellyfy() once.",
  alternates: { canonical: "/docs/install" },
};

export default function InstallPage() {
  return (
    <article>
      <p className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase dark:text-neutral-400">
        Getting started
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Install</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
        Import <code className="font-mono text-base">jellyfy.css</code> for
        every control, or import the component files you use.{" "}
        <code className="font-mono text-base">startJellyfy()</code> runs the
        press and the loading lights, and it keeps a slider’s fill in step with
        the input.
      </p>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        Install the package
      </h2>
      <CodeBlock lang="bash" code={`npm install jellyfy`} />

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        The whole library
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        One file. It imports the material, the motion, and every component. Put
        it after Tailwind. A utility such as{" "}
        <code className="font-mono text-sm">px-4</code> still sets that padding.
        The press stays.
      </p>
      <CodeBlock
        lang="css"
        code={`@import "tailwindcss";
@import "jellyfy/jellyfy.css";`}
      />
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        Without Tailwind, link that file or import it from a bundler.
      </p>
      <CodeBlock
        lang="html"
        code={`<link rel="stylesheet" href="./node_modules/jellyfy/jellyfy.css" />`}
      />
      <CodeBlock lang="js" code={`import "jellyfy/jellyfy.css";`} />

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        One component
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        Import the material, the motion, and the components you use. A component
        file that is not imported is not in the build. Do not also import{" "}
        <code className="font-mono text-sm">jellyfy.css</code>. That file
        already contains these.
      </p>
      <CodeBlock
        lang="css"
        code={`@import "tailwindcss";
@import "jellyfy/material.css";
@import "jellyfy/motion.css";
@import "jellyfy/button.css";
@import "jellyfy/input.css";`}
      />
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        Without Tailwind, drop the Tailwind line. The same files work from a
        link tag or a bundler.
      </p>
      <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 leading-7 text-neutral-600 dark:text-neutral-300">
        <li>
          <code className="font-mono text-sm">material.css</code> is required.
          It holds the grain, the blur, and the colors.
        </li>
        <li>
          <code className="font-mono text-sm">motion.css</code> is required. It
          holds the press.
        </li>
        <li>
          <code className="font-mono text-sm">button.css</code> is{" "}
          <code className="font-mono text-sm">btn</code>.
        </li>
        <li>
          <code className="font-mono text-sm">icon-button.css</code> is{" "}
          <code className="font-mono text-sm">btn-icon</code>.
        </li>
        <li>
          <code className="font-mono text-sm">bump-button.css</code> is{" "}
          <code className="font-mono text-sm">btn-bump</code>.
        </li>
        <li>
          <code className="font-mono text-sm">input.css</code>,{" "}
          <code className="font-mono text-sm">textarea.css</code>,{" "}
          <code className="font-mono text-sm">select.css</code>,{" "}
          <code className="font-mono text-sm">checkbox.css</code>,{" "}
          <code className="font-mono text-sm">radio.css</code>,{" "}
          <code className="font-mono text-sm">toggle.css</code>,{" "}
          <code className="font-mono text-sm">range.css</code>,{" "}
          <code className="font-mono text-sm">alert.css</code>,{" "}
          <code className="font-mono text-sm">badge.css</code>,{" "}
          <code className="font-mono text-sm">card.css</code>,{" "}
          <code className="font-mono text-sm">modal.css</code>, and{" "}
          <code className="font-mono text-sm">message.css</code> match those
          class names. The switch is{" "}
          <code className="font-mono text-sm">toggle.css</code>. The slider is{" "}
          <code className="font-mono text-sm">range.css</code>. The dialog is{" "}
          <code className="font-mono text-sm">modal.css</code>.
        </li>
      </ul>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        Call it once
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        Call <code className="font-mono text-sm">startJellyfy()</code> once,
        after the controls are on the page. A pointer press squashes the control
        under the pointer. Controls that appear later, including after a page
        change, are included. A later call is ignored. The full pages are in{" "}
        <code className="font-mono text-sm">examples</code>.
      </p>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">Plain HTML</h3>
      <CodeBlock
        lang="html"
        code={`<script type="module">
  import { startJellyfy } from "./node_modules/jellyfy/index.js";

  startJellyfy();
</script>`}
      />

      <h3 className="mt-8 text-lg font-semibold tracking-tight">Vue</h3>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        Import the CSS in the entry. Use{" "}
        <code className="font-mono text-sm">jellyfy/jellyfy.css</code> for the
        whole library, or the material, the motion, and the component files.
        Call the function when the app is mounted.
      </p>
      <CodeBlock
        lang="js"
        code={`import { createApp } from "vue";

import App from "./App.vue";
import "jellyfy/jellyfy.css";

createApp(App).mount("#app");`}
      />
      <CodeBlock
        lang="vue"
        code={`<script setup>
import { startJellyfy } from "jellyfy";
import { onMounted } from "vue";

onMounted(() => {
  startJellyfy();
});
</script>`}
      />

      <h3 className="mt-8 text-lg font-semibold tracking-tight">React</h3>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        Import the CSS after Tailwind. Use{" "}
        <code className="font-mono text-sm">jellyfy/jellyfy.css</code>, or the
        component files. Call the function once from the root component.
      </p>
      <CodeBlock
        lang="jsx"
        code={`import "jellyfy/jellyfy.css";
import { startJellyfy } from "jellyfy";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    startJellyfy();
  }, []);
}`}
      />

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        Press any element
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        Add <code className="font-mono text-sm">squish</code> to give any
        element the same press. On a Jellyfy control it uses the face that
        control already has. Add it to a card when the card should press. A
        disabled control does not squish.
      </p>
      <CodeBlock
        lang="html"
        code={`<article class="card squish">Notes</article>`}
      />
      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        Your own element
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
        The thickness classes paint the jelly on an element that is not a
        Jellyfy component. They need the material file, which the whole library
        already includes.
      </p>
      <CodeBlock
        lang="html"
        code={`<div class="thickness-surface">A surface</div>
<div class="thickness-field">A field</div>
<div class="thickness-control">A control</div>
<div class="thickness-mark">A mark</div>`}
      />

      <Pager href="/docs/install" />
    </article>
  );
}
