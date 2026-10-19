"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";

import { COMPONENT_DOCS, GUIDE_LINKS } from "@/resources/component-docs";

const Links = ({ pathname }: { pathname: string }) => (
  <div className="flex flex-col gap-6">
    <div>
      <p className="px-3 text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
        Getting started
      </p>
      <ul className="mt-2 flex flex-col">
        {GUIDE_LINKS.map((link) => (
          <li key={link.href}>
            <Item href={link.href} pathname={pathname}>
              {link.label}
            </Item>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <p className="px-3 text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
        Components
      </p>
      <ul className="mt-2 flex flex-col">
        {COMPONENT_DOCS.map((doc) => (
          <li key={doc.slug}>
            <Item href={`/docs/${doc.slug}`} pathname={pathname}>
              {doc.name}
            </Item>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Item = ({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: string;
}) => {
  const active = pathname === href;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={twJoin(
        "block rounded-lg px-3 py-1.5 text-sm",
        active
          ? "bg-white font-medium text-neutral-950 shadow-sm dark:bg-neutral-800 dark:text-neutral-100"
          : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-100",
      )}
    >
      {children}
    </Link>
  );
};

export const DocsNav = () => {
  const pathname = usePathname();
  const current =
    GUIDE_LINKS.find((link) => link.href === pathname)?.label ??
    COMPONENT_DOCS.find((doc) => `/docs/${doc.slug}` === pathname)?.name ??
    "Docs";

  return (
    <>
      <details className="mb-8 rounded-2xl border border-neutral-200 bg-white lg:hidden dark:border-neutral-800 dark:bg-neutral-900">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
          {current}
        </summary>
        <div className="border-t border-neutral-100 px-2 py-3 dark:border-neutral-800">
          <Links pathname={pathname} />
        </div>
      </details>
      <aside className="sticky top-20 hidden h-[calc(100dvh-6rem)] w-52 shrink-0 overflow-y-auto px-1 lg:block">
        <Links pathname={pathname} />
      </aside>
    </>
  );
};
