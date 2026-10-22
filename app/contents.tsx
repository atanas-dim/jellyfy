"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

const MARKER = 160;

export type ContentsItem = {
  href: string;
  label: string;
};

export type ContentsGroup = {
  title: string;
  items: ContentsItem[];
};

const itemClass = (active: boolean) =>
  twJoin(
    "block rounded-lg px-3 py-1.5 text-sm",
    active
      ? "text-neutral-950 underline decoration-neutral-950 underline-offset-4 dark:text-neutral-100 dark:decoration-neutral-100"
      : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-100",
  );

const Groups = ({
  groups,
  activeHref,
  onHash,
}: {
  groups: ContentsGroup[];
  activeHref: string;
  onHash: (id: string) => void;
}) => (
  <div className="flex flex-col gap-6">
    {groups.map((group) => (
      <div key={group.title}>
        <p className="px-3 text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
          {group.title}
        </p>
        <ol className="mt-2 flex flex-col">
          {group.items.map((item) => {
            const active = item.href === activeHref;
            const className = itemClass(active);
            const hash = item.href.startsWith("#");
            return (
              <li key={item.href}>
                {hash ? (
                  <a
                    href={item.href}
                    aria-current={active ? "location" : undefined}
                    onClick={() => onHash(item.href.slice(1))}
                    className={className}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={className}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    ))}
  </div>
);

export const Contents = ({ groups }: { groups: ContentsGroup[] }) => {
  const pathname = usePathname();
  const hashIds = groups
    .flatMap((group) => group.items)
    .filter((item) => item.href.startsWith("#"))
    .map((item) => item.href.slice(1));
  const hashKey = hashIds.join(" ");
  const [activeId, setActiveId] = useState(hashIds[0] ?? "");

  useEffect(() => {
    if (!hashKey) return;
    const ids = hashKey.split(" ");

    const update = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= MARKER) current = id;
      }
      const last = ids.at(-1);
      const nearEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;
      if (nearEnd && last) current = last;
      setActiveId(current);
    };

    update();
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, [hashKey]);

  const activeHref = hashKey ? `#${activeId}` : pathname;
  const current =
    groups
      .flatMap((group) => group.items)
      .find((item) => item.href === activeHref)?.label ?? groups[0]?.title;

  return (
    <>
      <details className="mb-8 rounded-2xl border border-neutral-200 bg-white lg:hidden dark:border-neutral-800 dark:bg-neutral-900">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
          {current}
        </summary>
        <div className="border-t border-neutral-100 px-2 py-3 dark:border-neutral-800">
          <Groups
            groups={groups}
            activeHref={activeHref}
            onHash={setActiveId}
          />
        </div>
      </details>
      <nav
        aria-label="Contents"
        className="sticky top-20 hidden h-[calc(100dvh-6rem)] w-52 shrink-0 overflow-y-auto px-1 lg:block"
      >
        <Groups groups={groups} activeHref={activeHref} onHash={setActiveId} />
      </nav>
    </>
  );
};
