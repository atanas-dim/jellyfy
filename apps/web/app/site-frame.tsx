"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

import { SiteFooter } from "./site-footer";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "/set", label: "Set" },
  { href: "/design-system", label: "Design system" },
  { href: "/docs", label: "Docs" },
] as const;

const pill =
  "border border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80";

const linkClass = (active: boolean) =>
  twJoin(
    "text-sm font-medium",
    active
      ? "text-neutral-950 dark:text-neutral-100"
      : "text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100",
  );

export const SiteFrame = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex min-h-full flex-1 flex-col text-neutral-950 dark:text-neutral-100">
      <header className="fixed top-2 right-2 left-2 z-30">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <Link
            href="/"
            onClick={close}
            className={twJoin(
              pill,
              "font-display inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-lg font-semibold tracking-tight",
            )}
          >
            <span
              aria-hidden="true"
              className="mt-[3px] self-center font-[emoji] text-xl leading-none"
            >
              🪼
            </span>
            Jellyfy
          </Link>
          <button
            type="button"
            className={twJoin(
              pill,
              "grid size-11 place-items-center rounded-full md:hidden",
            )}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <XIcon aria-hidden="true" className="size-5" />
            ) : (
              <MenuIcon aria-hidden="true" className="size-5" />
            )}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
          <nav
            className={twJoin(
              pill,
              "hidden items-center gap-6 rounded-full px-5 py-2.5 md:flex",
            )}
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active(link.href) ? "page" : undefined}
                className={linkClass(active(link.href))}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
        {open ? (
          <nav
            id="site-menu"
            className={twJoin(
              pill,
              "mx-auto mt-1 flex w-full max-w-6xl flex-col gap-1 rounded-3xl p-3 md:hidden",
            )}
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active(link.href) ? "page" : undefined}
                className={twJoin(
                  linkClass(active(link.href)),
                  "rounded-2xl px-3 py-3",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>
          </nav>
        ) : null}
      </header>
      <div className="flex-1 pt-16">{children}</div>
      <SiteFooter />
    </div>
  );
};
