"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDownIcon, MinusIcon, PlusIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

import { COMPONENT_LIST } from "@/resources/components-registry";

const TONES = [
  { id: "primary", label: "Primary" },
  { id: "secondary", label: "Secondary" },
  { id: "tertiary", label: "Tertiary" },
  { id: "neutral", label: "Neutral" },
  { id: "success", label: "Success" },
  { id: "error", label: "Error" },
  { id: "warning", label: "Warning" },
  { id: "info", label: "Info" },
] as const;

type Tone = (typeof TONES)[number]["id"];

const openNote = () => {
  const dialog = document.getElementById("landing-note");
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

export const Landing = () => {
  const page = useRef<HTMLElement>(null);
  const [tone, setTone] = useState<Tone>("primary");
  const toneLabel = TONES.find((item) => item.id === tone)?.label ?? "Primary";

  useLayoutEffect(() => {
    const root = page.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    let alive = true;
    const track = root.querySelector<HTMLElement>("[data-marquee]");
    const group = track?.querySelector<HTMLElement>("[data-marquee-group]");

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

      gsap.utils.toArray<HTMLElement>("[data-blob]").forEach((blob) => {
        gsap.to(blob, {
          x: gsap.utils.random(-36, 36),
          y: gsap.utils.random(-28, 28),
          duration: gsap.utils.random(6, 9),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      gsap.to("[data-float]", {
        y: -12,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      if (track && group) {
        const distance = group.offsetWidth;
        let guard = 0;
        while (track.scrollWidth < window.innerWidth + distance && guard < 8) {
          const clone = group.cloneNode(true) as HTMLElement;
          clone.setAttribute("data-marquee-clone", "");
          clone.setAttribute("aria-hidden", "true");
          clone.querySelectorAll("button").forEach((button) => {
            button.tabIndex = -1;
          });
          track.appendChild(clone);
          guard += 1;
        }
        gsap.to(track, {
          x: -distance,
          duration: distance / 80,
          ease: "none",
          repeat: -1,
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 32,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%" },
        });
      });
    }, root);

    document.fonts?.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      track
        ?.querySelectorAll("[data-marquee-clone]")
        .forEach((node) => node.remove());
      ctx.revert();
    };
  }, []);

  return (
    <main ref={page}>
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            data-blob
            className="absolute -top-24 -left-16 size-[28rem] rounded-full bg-pink-300/45 blur-3xl dark:bg-pink-800/35"
          />
          <div
            data-blob
            className="absolute top-16 -right-20 size-[34rem] rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-800/30"
          />
          <div
            data-blob
            className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-teal-200/50 blur-3xl dark:bg-teal-800/35"
          />
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 py-16 sm:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:py-24">
          <div className="max-w-xl">
            <p
              data-hero-item
              className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase dark:text-neutral-400"
            >
              One material
            </p>
            <h1 className="mt-4 text-6xl leading-none font-bold tracking-tight sm:text-7xl">
              <span className="block overflow-hidden pt-1 pb-3">
                <span data-line className="block">
                  The control
                </span>
              </span>
              <span className="block overflow-hidden pt-1 pb-3">
                <span data-line className="block">
                  gives a little.
                </span>
              </span>
            </h1>
            <p
              data-hero-item
              className="mt-6 max-w-md text-lg leading-8 text-neutral-600 dark:text-neutral-300"
            >
              Soft controls. Pick eight colors. The rest of the set follows.
            </p>

            <div data-hero-item className="mt-8">
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Try a solid
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
                        ? "outline-neutral-950 dark:outline-neutral-100"
                        : "outline-transparent",
                    )}
                    aria-label={item.label}
                    aria-pressed={tone === item.id}
                    onClick={() => setTone(item.id)}
                  >
                    <span className="size-2 rounded-full bg-current" />
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                {toneLabel}
              </p>
            </div>

            <div
              data-hero-item
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="/set" className="btn neutral">
                <span>Open the set</span>
              </Link>
              <button
                type="button"
                className="btn secondary"
                onClick={openNote}
              >
                <span>Open a note</span>
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
                    <p className="text-sm font-semibold">Still on the desk</p>
                    <p className="mt-1 text-sm leading-6">
                      Nothing has been sent yet.
                    </p>
                  </div>
                </div>

                <section className="card relative flex flex-col gap-4 lg:ml-8">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold tracking-tight">
                      Studio note
                    </h2>
                    <span className={twJoin("badge", tone)}>{toneLabel}</span>
                  </div>

                  <label className={twJoin("input", tone)}>
                    <input placeholder=" " defaultValue="studio@jellyfy.dev" />
                    <span>Email</span>
                  </label>

                  <label className={twJoin("select", tone)}>
                    <select defaultValue="rose">
                      <option value="mint">Mint</option>
                      <option value="rose">Rose</option>
                      <option value="ink">Ink</option>
                    </select>
                    <span>Flavor</span>
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
                      Soft press
                    </label>
                    <label className={twJoin("checkbox", tone)}>
                      <input type="checkbox" defaultChecked />
                      <span className="checkbox-box" />
                      Remember
                    </label>
                  </div>

                  <label className={twJoin("range", tone)}>
                    Pressure
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
                      <span>Send</span>
                    </button>
                    <button type="button" className="btn secondary loading">
                      <span>Saving</span>
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
                    aria-label="Add"
                  >
                    <PlusIcon />
                  </button>
                  <button
                    type="button"
                    className="btn-icon neutral"
                    aria-label="More"
                  >
                    <MinusIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/70 bg-white/40 py-8 dark:border-white/10 dark:bg-neutral-900/50">
        <p
          data-rise
          className="px-6 text-center text-sm font-medium tracking-[0.18em] text-neutral-500 uppercase sm:px-10 dark:text-neutral-400"
        >
          Every color, the same press
        </p>
        <div data-rise className="mt-6 overflow-hidden pt-8 pb-16">
          <div data-marquee className="flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                data-marquee-group={copy === 0 ? "" : undefined}
                className="flex gap-3 pr-3"
                aria-hidden={copy === 1}
              >
                {TONES.map((item) => (
                  <button
                    key={`${copy}-${item.id}`}
                    type="button"
                    tabIndex={copy === 1 ? -1 : undefined}
                    className={twJoin("btn", item.id)}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
        <div data-rise className="max-w-xl">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Drop it on your markup
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            One stylesheet, then a class on the element. Press it and it gives.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <article data-rise className="card flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-tight">
              Your button
            </h3>
            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              Keep the element. Add the class. It comes back with a soft face
              and a press.
            </p>
            <button type="button" className="btn primary">
              <span>Launch</span>
            </button>
            <p className="font-mono text-xs leading-5 text-neutral-500 dark:text-neutral-400">
              class=&quot;btn&quot;
            </p>
          </article>

          <article data-rise className="card flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-tight">
              Your colors
            </h3>
            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              Name eight colors once. Buttons, fields, and badges in that color
              stay in the same material.
            </p>
            <label className="input success">
              <input placeholder=" " defaultValue="Ready" />
              <span>Status</span>
            </label>
            <p className="font-mono text-xs leading-5 text-neutral-500 dark:text-neutral-400">
              --color-success
            </p>
          </article>

          <article data-rise className="card flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-tight">
              Your utilities
            </h3>
            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              Tailwind still applies. Widen it, pad it, or lay it out. The press
              stays.
            </p>
            <button type="button" className="btn tertiary w-full">
              <span>Continue</span>
            </button>
            <p className="font-mono text-xs leading-5 text-neutral-500 dark:text-neutral-400">
              btn w-full
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10">
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
              className="card squish block transition-transform duration-200 hover:-translate-y-0.5"
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
          <h2 className="pe-8 text-lg font-semibold">A note</h2>
          <p className="mt-2 text-sm leading-6">
            Keep this note, or send it on.
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
              Send
            </label>
          </div>
        </div>
      </dialog>
    </main>
  );
};
