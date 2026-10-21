import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const CONTENTS = [{ id: "principles", label: "Principles" }] as const;

export default function DesignSystemPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:flex-row lg:items-start lg:gap-10">
      <nav
        aria-label="Contents"
        className="sticky top-20 z-20 mb-10 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur-md lg:mb-0 lg:h-[calc(100dvh-6rem)] lg:w-52 lg:shrink-0 lg:overflow-y-auto lg:border-0 lg:bg-transparent lg:px-1 lg:py-0 lg:backdrop-blur-none dark:border-neutral-800 dark:bg-neutral-950/90"
      >
        <p className="px-3 text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
          Contents
        </p>
        <ol className="mt-2 flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {CONTENTS.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block rounded-lg px-3 py-1.5 text-sm whitespace-nowrap text-neutral-600 hover:text-neutral-950 lg:whitespace-normal dark:text-neutral-300 dark:hover:text-neutral-100"
              >
                {index + 1}. {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <article className="min-w-0 flex-1 pb-24">
        <header className="max-w-3xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            Jellyfy Design System
          </h1>
          <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-300">
            Implementation notes under a section name the variables and classes
            that build the rule. They can be split out of this document without
            changing the rules.
          </p>
        </header>

        <section id="principles" className="mt-16 max-w-3xl scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            1. Principles
          </h2>
          <div className="mt-4 space-y-4 text-base leading-7 text-neutral-700 dark:text-neutral-200">
            <p>
              Jellyfy is a soft control material. A control looks poured, not
              painted: it is translucent, it carries a fine grain, and its edge
              is thick enough to catch light.
            </p>
            <p>Depth has three separate jobs.</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Thickness is the inset depth of the material. It says what kind
                of thing the object is.
              </li>
              <li>
                Elevation is the drop shadow. It says how far the object sits
                off the page.
              </li>
              <li>
                Press light is the pair of radial washes that appear while a
                control is pressed, or while a field is focused. It says the
                object is being acted on.
              </li>
            </ul>
            <p>
              Color is quiet on surfaces and fields, and stronger on controls.
              That difference is the hierarchy. A custom theme changes the
              solids. It does not flatten the hierarchy.
            </p>
            <p>The typeface belongs to the app. Jellyfy inherits it.</p>
            <p>
              Small marks use a shallower inset than buttons, because the button
              inset collapses at checkbox and handle size. The radio bullet is
              jelly with the grain. It is opaque, and it has no blur and no
              thickness.
            </p>
          </div>
          <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <h3 className="text-sm font-semibold tracking-[0.16em] text-neutral-400 uppercase">
              Implementation notes
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              Jellyfy is a CSS component library. It is inspired by Tailwind and
              daisyUI. It does not require Tailwind. It stays compatible with
              Tailwind by reading Tailwind color and spacing variables and
              supplying hex and length fallbacks when those variables are
              absent.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
