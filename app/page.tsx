"use client";

import { RocketIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { Button, type ButtonState } from "@/jellyfy/button";
import { Input } from "@/jellyfy/input";
import { COMPONENT_LIST } from "@/resources/components-registry";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState<ButtonState>("idle");
  const entrance = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 };

  const launch = async () => {
    if (state !== "idle") return;
    setState("processing");
    await delay(1600);
    setState("success");
    await delay(1200);
    setState("idle");
  };

  return (
    <main className="min-h-screen text-neutral-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16 sm:px-10 lg:px-12">
        <motion.section
          className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]"
          initial={entrance}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-xl space-y-5">
            <p className="text-sm font-medium tracking-[0.24em] text-neutral-500 uppercase">
              Jellyfy
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-5xl leading-none font-semibold tracking-tight text-balance sm:text-7xl">
              Soft controls, one material.
            </h1>
            <p className="max-w-md text-lg leading-8 text-neutral-600">
              A React set with a shared press, a shared surface, and colors you
              change once.
            </p>
          </div>
          <form
            className="jellyfy-panel noise flex flex-col gap-4 p-5 backdrop-blur-sm"
            onSubmit={(event) => {
              event.preventDefault();
              void launch();
            }}
          >
            <Input label="Work email" placeholder="you@studio.com" />
            <Button
              state={state}
              className="w-full"
              onClick={() => void launch()}
            >
              {state === "processing" && "Sending"}
              {state === "success" && "Sent"}
              {state === "idle" && (
                <>
                  <RocketIcon className="size-4.5" /> Send
                </>
              )}
            </Button>
          </form>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="jellyfy-surface jellyfy-tone-surface noise flex min-h-40 flex-col justify-end p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold tracking-wide uppercase">
              Noise
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              One grain, on every surface.
            </p>
          </div>
          <div className="jellyfy-surface jellyfy-tone-primary noise flex min-h-40 flex-col justify-end p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold tracking-wide uppercase">
              Light
            </p>
            <p className="text-primary-foreground/80 mt-2 text-sm leading-6">
              The inset is the thickness. The drop is the contact.
            </p>
          </div>
          <div className="jellyfy-raised jellyfy-tone-complete noise flex min-h-40 flex-col justify-end p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold tracking-wide uppercase">
              Press
            </p>
            <p className="text-complete-foreground/80 mt-2 text-sm leading-6">
              Buttons bulge taller. Fields bulge wider.
            </p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENT_LIST.map((component) => (
            <Link
              key={component.slug}
              href={`/components/${component.slug}`}
              className="rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold tracking-tight">
                {component.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {component.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
