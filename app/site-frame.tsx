"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

import { SiteFooter } from "./site-footer";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "/set", label: "Set" },
  { href: "/docs", label: "Docs" },
] as const;

export const SiteFrame = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-1 flex-col text-neutral-950 dark:text-neutral-100">
      <header className="sticky top-0 z-30 border-b border-white/70 bg-neutral-50/75 backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/75">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight"
          >
            Jellyfy
          </Link>
          <nav className="flex items-center gap-6">
            {LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={twJoin(
                    "text-sm font-medium",
                    active
                      ? "text-neutral-950 dark:text-neutral-100"
                      : "text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
};
