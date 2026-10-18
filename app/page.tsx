import Link from "next/link";

import { COMPONENT_LIST } from "@/resources/components-registry";

export default function Home() {
  return (
    <main className="min-h-screen text-neutral-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16 sm:px-10 lg:px-12">
        <section className="jellyfy-rise grid items-end gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
          <div className="max-w-xl space-y-5">
            <p className="text-sm font-medium tracking-[0.24em] text-neutral-500 uppercase">
              Jellyfy
            </p>
            <h1 className="text-5xl leading-none font-semibold tracking-tight text-balance sm:text-7xl">
              Soft controls, one material.
            </h1>
            <p className="max-w-md text-lg leading-8 text-neutral-600">
              Class names on your own elements. Set the solid colors, and the
              jelly tones follow.
            </p>
          </div>
          <form className="jellyfy-card flex flex-col gap-4" action="#">
            <label className="jellyfy-input">
              <input placeholder=" " />
              <span>Work email</span>
            </label>
            <button className="jellyfy-button w-full" type="submit">
              <span>Send</span>
            </button>
          </form>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENT_LIST.map((component) => (
            <Link
              key={component.slug}
              href={`/dev#${component.slug}`}
              className="rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold tracking-tight">{component.name}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{component.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
