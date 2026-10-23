import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { DOC_LINKS } from "@/resources/component-docs";

export const Pager = ({ href }: { href: string }) => {
  const index = DOC_LINKS.findIndex((link) => link.href === href);
  const previous = index > 0 ? DOC_LINKS[index - 1] : undefined;
  const next = index >= 0 ? DOC_LINKS[index + 1] : undefined;

  return (
    <nav className="mt-16 grid gap-3 border-t border-neutral-200 pt-6 sm:grid-cols-2 dark:border-neutral-800">
      {previous ? (
        <Link
          href={previous.href}
          className="surface px-4 py-3 hover:border-neutral-300 dark:hover:border-neutral-600"
        >
          <span className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
            <ChevronLeftIcon className="size-3.5" aria-hidden="true" />
            Previous
          </span>
          <span className="mt-1 block font-medium">{previous.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="surface px-4 py-3 text-right hover:border-neutral-300 dark:hover:border-neutral-600"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-neutral-500 dark:text-neutral-400">
            Next
            <ChevronRightIcon className="size-3.5" aria-hidden="true" />
          </span>
          <span className="mt-1 block font-medium">{next.label}</span>
        </Link>
      ) : null}
    </nav>
  );
};
