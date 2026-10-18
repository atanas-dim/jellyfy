import { ChevronLeftIcon, CodeIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import { twMerge } from "tailwind-merge";

import {
  COMPONENT_LIST,
  getComponentBySlug,
} from "@/resources/components-registry";
import { loadPreviewComponent } from "@/utils/preview-loader";

type ComponentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return COMPONENT_LIST.map((component) => ({
    slug: component.slug,
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = getComponentBySlug(slug);

  if (!component) {
    notFound();
  }

  const { default: PreviewComponent } = await loadPreviewComponent(
    component.slug,
  );

  const highlightedUsageExample = await codeToHtml(component.usage, {
    lang: "tsx",
    theme: "github-dark",
  });

  return (
    <main className="min-h-screen text-neutral-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-900"
          >
            <ChevronLeftIcon /> Back to components
          </Link>
          <div className="space-y-3">
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
              {component.name}
            </h1>
            <p className="max-w-md text-base leading-7 whitespace-pre-line text-neutral-600 sm:text-lg">
              {component.description}
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <div className="rounded-4xl border border-neutral-200 bg-white p-4 pt-8 shadow-sm md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-neutral-900">
                Live preview
              </h2>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
                Interactive
              </span>
            </div>
            <div
              className={twMerge(
                "flex items-center justify-center overflow-hidden rounded-3xl border border-dashed border-neutral-200 p-6 shadow-[inset_0_0_10px_rgba(10,10,10,0.1)] min-h-64",
                (slug === "select" || slug === "dialog") && "min-h-[32rem]",
              )}
            >
              <PreviewComponent />
            </div>
          </div>

          <div>
            <section className="rounded-4xl border border-neutral-200 bg-white p-4 pt-8 shadow-sm md:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Usage
                </h2>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600"
                  href={`https://github.com/atanas-dim/react-ui-lab/tree/main/components/${component.slug}`}
                >
                  <CodeIcon className="size-4" />
                  Open on GitHub
                </a>
              </div>
              <div
                className="code-block mt-4 overflow-x-auto overscroll-none rounded-2xl border border-neutral-800/80 bg-neutral-800"
                dangerouslySetInnerHTML={{ __html: highlightedUsageExample }}
              />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
