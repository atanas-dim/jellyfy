"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

import { startJellyfy } from "@/components/foundation/jellyfy";
import { COMPONENT_LIST } from "@/resources/components-registry";

const TONES = [
  { id: "jellyfy-primary", label: "Primary" },
  { id: "jellyfy-secondary", label: "Secondary" },
  { id: "jellyfy-tertiary", label: "Tertiary" },
  { id: "jellyfy-neutral", label: "Neutral" },
  { id: "jellyfy-success", label: "Success" },
  { id: "jellyfy-error", label: "Error" },
  { id: "jellyfy-warning", label: "Warning" },
] as const;

type Tone = (typeof TONES)[number]["id"];

const openNote = () => {
  const dialog = document.getElementById("landing-note");
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

export const Landing = () => {
  const page = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [tone, setTone] = useState<Tone>("jellyfy-primary");
  const toneLabel = TONES.find((item) => item.id === tone)?.label ?? "Primary";

  useLayoutEffect(() => {
    const root = page.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    let removePointer: (() => void) | undefined;
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

      const stage = root.querySelector<HTMLElement>("[data-stage]");
      const plate = tilt.current;
      if (stage && plate && window.matchMedia("(pointer: fine)").matches) {
        const xTo = gsap.quickTo(plate, "x", {
          duration: 2,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(plate, "y", {
          duration: 2,
          ease: "power3.out",
        });
        const onMove = (event: PointerEvent) => {
          const rect = stage.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          xTo(px * 18);
          yTo(py * 12);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        stage.addEventListener("pointermove", onMove);
        stage.addEventListener("pointerleave", onLeave);
        removePointer = () => {
          stage.removeEventListener("pointermove", onMove);
          stage.removeEventListener("pointerleave", onLeave);
        };
      }
    }, root);

    document.fonts?.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      removePointer?.();
      track
        ?.querySelectorAll("[data-marquee-clone]")
        .forEach((node) => node.remove());
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    startJellyfy();
  }, [tone]);

  return (
    <main ref={page} className="text-neutral-950">
      <header className="sticky top-0 z-30 border-b border-white/70 bg-neutral-50/75 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <p className="font-display text-lg font-semibold tracking-tight">
            Jellyfy
          </p>
          <Link href="/set" className="jellyfy-button">
            <span>The set</span>
          </Link>
        </div>
      </header>

      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            data-blob
            className="absolute -top-24 -left-16 size-[28rem] rounded-full bg-pink-300/45 blur-3xl"
          />
          <div
            data-blob
            className="absolute top-16 -right-20 size-[34rem] rounded-full bg-indigo-300/40 blur-3xl"
          />
          <div
            data-blob
            className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-teal-200/50 blur-3xl"
          />
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 py-16 sm:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:py-24">
          <div className="max-w-xl">
            <p
              data-hero-item
              className="text-sm font-medium tracking-[0.22em] text-neutral-500 uppercase"
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
              className="mt-6 max-w-md text-lg leading-8 text-neutral-600"
            >
              Soft controls for the HTML you already write. Pick seven colors.
              The rest of the set follows.
            </p>

            <div data-hero-item className="mt-8">
              <p className="text-sm font-medium text-neutral-500">
                Try a solid
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TONES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={twJoin(
                      "jellyfy-icon-button outline-2 outline-offset-2 transition-all duration-400",
                      item.id,
                      tone === item.id
                        ? "outline-neutral-950"
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
              <p className="mt-3 text-sm text-neutral-600">{toneLabel}</p>
            </div>

            <div
              data-hero-item
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="/set" className="jellyfy-button">
                <span>Open the set</span>
              </Link>
              <button
                type="button"
                className="jellyfy-button jellyfy-secondary"
                onClick={openNote}
              >
                <span>Open a note</span>
              </button>
            </div>
          </div>

          <div data-stage>
            <div data-desk-in>
              <div ref={tilt} className="relative">
                <div
                  data-float
                  className={twJoin(
                    "jellyfy-alert mb-4 lg:absolute lg:-top-10 lg:-left-8 lg:mb-0 lg:w-60",
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

                <section className="jellyfy-card relative flex flex-col gap-4 lg:ml-8">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold tracking-tight">
                      Studio note
                    </h2>
                    <span className={twJoin("jellyfy-badge", tone)}>
                      {toneLabel}
                    </span>
                  </div>

                  <label className={twJoin("jellyfy-input", tone)}>
                    <input placeholder=" " defaultValue="studio@jellyfy.dev" />
                    <span>Email</span>
                  </label>

                  <label className={twJoin("jellyfy-select", tone)}>
                    <select defaultValue="rose">
                      <option value="mint">Mint</option>
                      <option value="rose">Rose</option>
                      <option value="ink">Ink</option>
                    </select>
                    <span>Flavor</span>
                    <ChevronDownIcon
                      className="jellyfy-chevron"
                      aria-hidden="true"
                    />
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <label className={twJoin("jellyfy-switch", tone)}>
                      <input type="checkbox" role="switch" defaultChecked />
                      <span className="jellyfy-switch-track">
                        <span className="jellyfy-switch-thumb" />
                      </span>
                      Soft press
                    </label>
                    <label className={twJoin("jellyfy-checkbox", tone)}>
                      <input type="checkbox" defaultChecked />
                      <span className="jellyfy-checkbox-box" />
                      Remember
                    </label>
                  </div>

                  <label className={twJoin("jellyfy-slider", tone)}>
                    Pressure
                    <span className="jellyfy-slider-box">
                      <span className="jellyfy-slider-track">
                        <span className="jellyfy-slider-fill" />
                      </span>
                      <span className="jellyfy-slider-handle" />
                      <input type="range" defaultValue={64} />
                    </span>
                  </label>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className={twJoin("jellyfy-button", tone)}
                    >
                      <span>Send</span>
                    </button>
                    <button
                      type="button"
                      className="jellyfy-button jellyfy-secondary jellyfy-loading"
                    >
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
                    className={twJoin("jellyfy-icon-button", tone)}
                    aria-label="Add"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="jellyfy-icon-button jellyfy-neutral"
                    aria-label="More"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/70 bg-white/40 py-8">
        <p
          data-rise
          className="px-6 text-center text-sm font-medium tracking-[0.18em] text-neutral-500 uppercase"
        >
          Every color, the same press
        </p>
        <div className="mt-6 overflow-hidden pt-8 pb-16">
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
                    className={twJoin("jellyfy-button", item.id)}
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
          <p className="mt-4 text-lg leading-8 text-neutral-600">
            One stylesheet, then a class on the element. Press it and it gives.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <article data-rise className="jellyfy-card flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-tight">
              Your button
            </h3>
            <p className="text-sm leading-6 text-neutral-600">
              Keep the element. Add the class. It comes back with a soft face
              and a press.
            </p>
            <button type="button" className="jellyfy-button jellyfy-primary">
              <span>Launch</span>
            </button>
            <p className="font-mono text-xs leading-5 text-neutral-500">
              class=&quot;jellyfy-button&quot;
            </p>
          </article>

          <article data-rise className="jellyfy-card flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-tight">
              Your colors
            </h3>
            <p className="text-sm leading-6 text-neutral-600">
              Name seven colors once. Buttons, fields, and badges in that color
              stay in the same material.
            </p>
            <label className="jellyfy-input jellyfy-success">
              <input placeholder=" " defaultValue="Ready" />
              <span>Status</span>
            </label>
            <p className="font-mono text-xs leading-5 text-neutral-500">
              --color-success
            </p>
          </article>

          <article data-rise className="jellyfy-card flex flex-col gap-4">
            <h3 className="text-xl font-semibold tracking-tight">
              Your utilities
            </h3>
            <p className="text-sm leading-6 text-neutral-600">
              Tailwind still applies. Widen it, pad it, or lay it out. The press
              stays.
            </p>
            <button
              type="button"
              className="jellyfy-button jellyfy-tertiary w-full"
            >
              <span>Continue</span>
            </button>
            <p className="font-mono text-xs leading-5 text-neutral-500">
              jellyfy-button w-full
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
            className="text-sm font-medium text-neutral-600 underline decoration-neutral-400 underline-offset-4"
          >
            Every color on one page
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENT_LIST.map((component) => (
            <Link
              key={component.slug}
              href={`/set#${component.slug}`}
              className="jellyfy-card squish block transition-transform duration-200 hover:-translate-y-0.5"
            >
              <h3 className="text-xl font-semibold tracking-tight">
                {component.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {component.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-200/80 px-6 py-8 sm:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
          <p className="font-display font-semibold">Jellyfy</p>
          <p className="text-sm text-neutral-500">
            Press one. The whole set gives the same way.
          </p>
        </div>
      </footer>

      <dialog id="landing-note" className="jellyfy-dialog">
        <div className={twJoin("jellyfy-dialog-panel", tone)}>
          <form method="dialog">
            <button
              className="jellyfy-surface-button"
              type="submit"
              aria-label="Close"
            >
              ×
            </button>
          </form>
          <h2 className="pe-8 text-lg font-semibold">A note</h2>
          <p className="mt-2 text-sm leading-6">
            Keep this note, or send it on.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <label className={twJoin("jellyfy-radio", tone)}>
              <input type="radio" name="landing-delivery" defaultChecked />
              <span className="jellyfy-radio-ring" />
              Soft
            </label>
            <label className={twJoin("jellyfy-radio", tone)}>
              <input type="radio" name="landing-delivery" />
              <span className="jellyfy-radio-ring" />
              Firm
            </label>
          </div>
        </div>
      </dialog>
    </main>
  );
};
