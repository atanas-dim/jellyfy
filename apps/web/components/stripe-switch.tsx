"use client";

import { type ReactNode, useState } from "react";
import { twJoin } from "tailwind-merge";

export const STRIPES_CLASS = "set-stripes";

export const StripeSwitch = ({
  checked,
  onChange,
  className,
  labelFirst = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  labelFirst?: boolean;
}) => (
  <label
    className={twJoin(
      "toggle",
      labelFirst && "flex-row-reverse [&_input]:right-0 [&_input]:left-auto",
      className,
    )}
  >
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
          ? "light rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-900"
          : "dark rounded-2xl border border-neutral-700 bg-neutral-900 p-6 text-neutral-100",
        striped && STRIPES_CLASS,
      )}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
          {theme === "light" ? "Light" : "Dark"}
        </p>
        <StripeSwitch labelFirst checked={striped} onChange={setStriped} />
      </div>
      {children}
    </div>
  );
};
