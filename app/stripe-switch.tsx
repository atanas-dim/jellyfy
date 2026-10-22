"use client";

import { useState, type ReactNode } from "react";
import { twJoin } from "tailwind-merge";

export const STRIPES_CLASS = "set-stripes";

export const StripeSwitch = ({
  checked,
  onChange,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) => (
  <label className={twJoin("toggle", className)}>
    <input
      type="checkbox"
      role="switch"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
    <span className="toggle-track">
      <span className="toggle-thumb" />
    </span>
    Striped background
  </label>
);

export const ThemeFrame = ({
  theme,
  children,
}: {
  theme: "light" | "dark";
  children: ReactNode;
}) => {
  const [striped, setStriped] = useState(false);

  return (
    <div
      className={twJoin(
        theme === "light"
          ? "light rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-950"
          : "dark rounded-2xl border border-neutral-700 bg-neutral-900 p-6 text-neutral-100",
        striped && STRIPES_CLASS,
      )}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
          {theme === "light" ? "Light" : "Dark"}
        </p>
        <StripeSwitch checked={striped} onChange={setStriped} />
      </div>
      {children}
    </div>
  );
};
