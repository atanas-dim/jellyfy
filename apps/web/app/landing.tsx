"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDownIcon,
  HandPlatterIcon,
  LayoutGridIcon,
  LoaderIcon,
  MinusIcon,
  PlusIcon,
  StickyNoteIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

import { COMPONENT_LIST } from "@/resources/components-registry";

const TONES = [
  { id: "primary", slot: "Primary", flavour: "Ink" },
  { id: "secondary", slot: "Secondary", flavour: "Rose" },
  { id: "tertiary", slot: "Tertiary", flavour: "Mint" },
  { id: "neutral", slot: "Neutral", flavour: "Milk" },
  { id: "success", slot: "Success", flavour: "Lime" },
  { id: "warning", slot: "Warning", flavour: "Honey" },
  { id: "error", slot: "Error", flavour: "Cherry" },
  { id: "info", slot: "Info", flavour: "Sea" },
] as const;

type Tone = (typeof TONES)[number]["id"];

const openNote = () => {
  const dialog = document.getElementById("landing-note");
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

export const Landing = () => {
  const page = useRef<HTMLElement>(null);
  const [tone, setTone] = useState<Tone>("primary");
  const selected = TONES.find((item) => item.id === tone) ?? TONES[0];

  useLayoutEffect(() => {
    const root = page.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    let alive = true;

    const ctx = gsap.context(() => {
      gsap.from("[data-line]", {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
      });

      gsap.from("[data-hero-item]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.22,
        ease: "power3.out",
      });

      gsap.from("[data-desk-in]", {
        autoAlpha: 0,
        y: 42,
        scale: 0.97,
        duration: 1.05,
        delay: 0.18,
        ease: "power3.out",
      });

      gsap.to("[data-float]", {
        y: -12,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 32,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 90%" },
        });
      });
    }, root);

    document.fonts?.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      ctx.revert();
    };
  }, []);

  return (
    <main ref={page}>
      <section className="flex h-svh max-h-[50rem] min-h-fit items-center">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 py-16 sm:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:py-8">
          <div className="max-w-xl">
            <p
              data-hero-item
              className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase dark:text-neutral-400"
            >
              Eight colours
            </p>
            <h1 className="mt-4 text-6xl leading-none font-bold tracking-tight sm:text-7xl">
              <span className="block overflow-hidden py-0.5">
                <span data-line className="block">
                  Controls with
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span data-line className="block">
                  a little flavour
                </span>
              </span>
            </h1>
            <p
              data-hero-item
              className="mt-6 max-w-md text-lg leading-8 text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">
                A colour you can press, and a control that gives.
              </span>
              <span className="block">
                Jellyfy is CSS for those controls. Add a class and build.
              </span>
            </p>

            <div data-hero-item className="mt-8">
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Pick a colour
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TONES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={twJoin(
                      "btn-icon outline-2 outline-offset-2 transition-all duration-400",
                      item.id,
                      tone === item.id
                        ? "outline-(--focus-color)"
                        : "outline-transparent",
                    )}
                    aria-label={item.slot}
                    aria-pressed={tone === item.id}
                    onClick={() => setTone(item.id)}
                  >
                    <span className="size-2 rounded-full bg-current" />
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                {selected.slot}
              </p>
            </div>

            <div
              data-hero-item
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="/set" className="btn neutral">
                <span className="inline-flex items-center gap-2">
                  <LayoutGridIcon aria-hidden="true" className="size-4" />
                  See the set
                </span>
              </Link>
              <button
                type="button"
                className="btn secondary"
                onClick={openNote}
              >
                <span className="inline-flex items-center gap-2">
                  <StickyNoteIcon aria-hidden="true" className="size-4" />
                  Open a note
                </span>
              </button>
            </div>
          </div>

          <div>
            <div data-desk-in>
              <div className="relative">
                <div
                  data-float
                  className={twJoin(
                    "alert mb-4 lg:absolute lg:-top-10 lg:-left-8 lg:mb-0 lg:w-60",
                    tone,
                  )}
                >
                  <div>
                    <p className="text-sm font-semibold">
                      {selected.flavour} is ready
                    </p>
                    <p className="mt-1 text-sm leading-6">
                      This batch stays on the counter.
                    </p>
                  </div>
                </div>

                <section className="card relative flex flex-col gap-4 lg:ml-8">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold tracking-tight">
                      Pick a flavour
                    </h2>
                    <span className={twJoin("badge", tone)}>
                      {selected.flavour}
                    </span>
                  </div>

                  <label className={twJoin("input", tone)}>
                    <input placeholder=" " defaultValue="Rose syrup" />
                    <span>Name</span>
                  </label>

                  <label className={twJoin("select", tone)}>
                    <select defaultValue="rose">
                      <option value="mint">Mint</option>
                      <option value="rose">Rose</option>
                      <option value="ink">Ink</option>
                    </select>
                    <span>Flavour</span>
                    <ChevronDownIcon
                      className="picker-icon"
                      aria-hidden="true"
                    />
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <label className={twJoin("toggle", tone)}>
                      <input type="checkbox" role="switch" defaultChecked />
                      <span className="toggle-track">
                        <span className="toggle-thumb" />
                      </span>
                      On the cone
                    </label>
                    <label className={twJoin("checkbox", tone)}>
                      <input type="checkbox" defaultChecked />
                      <span className="checkbox-box" />
                      Extra zest
                    </label>
                  </div>

                  <label className={twJoin("range", tone)}>
                    Sweetness
                    <span className="range-box">
                      <span className="range-track">
                        <span className="range-fill" />
                      </span>
                      <span className="range-thumb" />
                      <input type="range" defaultValue={64} />
                    </span>
                  </label>

                  <div className="flex flex-wrap items-center gap-3">
                    <button type="button" className={twJoin("btn", tone)}>
                      <span className="inline-flex items-center gap-2">
                        <HandPlatterIcon
                          aria-hidden="true"
                          className="size-4"
                        />
                        Serve
                      </span>
                    </button>
                    <button type="button" className="btn secondary loading">
                      <span className="inline-flex items-center gap-2">
                        <LoaderIcon
                          aria-hidden="true"
                          className="size-4 animate-spin"
                        />
                        Mixing
                      </span>
                    </button>
                  </div>
                </section>

                <div
                  data-float
                  className="mt-4 flex gap-2 lg:absolute lg:right-0 lg:-bottom-8 lg:mt-0"
                >
                  <button
                    type="button"
                    className={twJoin("btn-icon", tone)}
                    aria-label="Add a drop"
                  >
                    <PlusIcon />
                  </button>
                  <button
                    type="button"
                    className="btn-icon neutral"
                    aria-label="Take a drop"
                  >
                    <MinusIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div data-rise className="max-w-xl">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Add a class
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            Keep the element you already have. Add{" "}
            <span className="font-mono text-base">btn</span> and a colour such
            as <span className="font-mono text-base">primary</span>. Call{" "}
            <span className="font-mono text-base">startJellyfy()</span> once.
            That call runs the press, the loading lights, and the slider fill.
          </p>
        </div>
        <div data-rise className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {TONES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={twJoin("btn", item.id)}
            >
              <span>{item.slot}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div data-rise className="max-w-xl">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Install
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            One package. Import the whole library, or the material, the motion,
            and the components you use. A file you do not import stays out of
            the build.
          </p>
        </div>
        <div data-rise className="mt-10 grid gap-4 lg:grid-cols-3">
          <pre className="surface overflow-x-auto rounded-2xl p-5 font-mono text-sm leading-7 shadow-lg">
            npm install jellyfy
          </pre>
          <pre className="surface overflow-x-auto rounded-2xl p-5 font-mono text-sm leading-7 shadow-lg">
            {`@import "jellyfy/jellyfy.css";`}
          </pre>
          <pre className="surface overflow-x-auto rounded-2xl p-5 font-mono text-sm leading-7 shadow-lg">
            {`import { startJellyfy } from "jellyfy";

startJellyfy();`}
          </pre>
        </div>
        <p
          data-rise
          className="mt-6 text-sm leading-6 text-neutral-600 dark:text-neutral-300"
        >
          Without Tailwind, link <span className="font-mono">jellyfy.css</span>{" "}
          or import it from a bundler. The same classes apply.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div data-rise className="max-w-xl">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            One material
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            Depth is three separate things. A theme changes the solids. It does
            not flatten that difference.
          </p>
        </div>
        <div data-rise className="mt-10 grid gap-4 sm:grid-cols-3">
          <article className="surface flex flex-col gap-4 rounded-2xl p-5 shadow-lg">
            <div className="flex flex-col gap-3">
              <div className="primary thickness-surface h-10 rounded-2xl" />
              <div className="primary thickness-field h-10 rounded-2xl" />
              <div className="primary thickness-control h-10 rounded-full" />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                Thickness
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                The inset of the material. Surface, field, then control.
              </p>
            </div>
          </article>
          <article className="surface flex flex-col gap-4 rounded-2xl p-5 shadow-lg">
            <div className="flex flex-wrap items-center justify-center gap-3 py-2">
              <button
                type="button"
                className="btn primary"
                style={{
                  ["--jelly-elevation" as string]: "0 0 0 0 transparent",
                }}
              >
                <span>Flat</span>
              </button>
              <button type="button" className="btn primary">
                <span>Lifted</span>
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                Elevation
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                The drop shadow. It says how far the object sits off the page.
              </p>
            </div>
          </article>
          <article className="surface flex flex-col gap-4 rounded-2xl p-5 shadow-lg">
            <div className="flex flex-col gap-3">
              <button type="button" className="btn secondary">
                <span>Press</span>
              </button>
              <label className="input info">
                <input placeholder=" " />
                <span>Focus</span>
              </label>
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                Press light
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                Press the button, or focus the field. The wash appears while you
                do.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div data-rise className="grid items-center gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              With Tailwind, or without
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              Widen a control, narrow it, tilt it, or let it fade. The utility
              goes on the control. The material stays, and so does the press.
            </p>
          </div>
          <div className="flex flex-col items-start gap-5">
            <button type="button" className="btn primary w-full">
              <span>Wide</span>
            </button>
            <button type="button" className="btn warning w-3/4 -rotate-3">
              <span>Tilted</span>
            </button>
            <button type="button" className="btn info w-1/2 opacity-60">
              <span>Faded</span>
            </button>
            <button type="button" className="btn success w-40">
              <span>Narrow</span>
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div
          data-rise
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            The set
          </h2>
          <Link
            href="/set"
            className="text-sm font-medium text-neutral-600 underline decoration-neutral-400 underline-offset-4 dark:text-neutral-300"
          >
            Every color on one page
          </Link>
        </div>
        <div
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          data-rise
        >
          {COMPONENT_LIST.map((component) => (
            <Link
              key={component.slug}
              href={`/set#${component.slug}`}
              className="surface block rounded-2xl p-5 shadow-lg"
            >
              <h3 className="text-xl font-semibold tracking-tight">
                {component.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                {component.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <dialog id="landing-note" className="modal">
        <div className={twJoin("modal-panel", tone)}>
          <form method="dialog">
            <button className="btn-bump" type="submit" aria-label="Close">
              <XIcon aria-hidden="true" />
            </button>
          </form>
          <h2 className="pe-8 text-lg font-semibold">Save this flavour</h2>
          <p className="mt-2 text-sm leading-6">
            Keep {selected.flavour}, or pour it out.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <label className={twJoin("radio", tone)}>
              <input type="radio" name="landing-note" defaultChecked />
              <span className="radio-ring" />
              Keep
            </label>
            <label className={twJoin("radio", tone)}>
              <input type="radio" name="landing-note" />
              <span className="radio-ring" />
              Pour
            </label>
          </div>
        </div>
      </dialog>
    </main>
  );
};
