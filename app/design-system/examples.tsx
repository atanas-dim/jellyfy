import type { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

const THICKNESS = [
  ["thickness-surface", "Surface", "size-full"],
  ["thickness-field", "Field", "size-full"],
  ["thickness-control", "Control", "size-full"],
  ["thickness-mark", "Mark", "size-16"],
] as const;

const RoleSwatches = () => (
  <div className="mt-8 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
    {THICKNESS.map(([className, label, size]) => (
      <figure key={className} className="flex flex-col items-center gap-2">
        <div className="flex h-24 w-full items-center justify-center">
          <div className={twJoin(className, size, "rounded-[1rem]")} />
        </div>
        <figcaption className="text-center text-sm text-neutral-600 dark:text-neutral-300">
          {label}
        </figcaption>
      </figure>
    ))}
  </div>
);

export const examples: Record<string, ReactNode> = {
  roles: <RoleSwatches />,
};
