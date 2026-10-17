"use client";

import type { FC, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  invalid?: boolean;
  message?: string;
};

export const Switch: FC<SwitchProps> = ({
  label,
  invalid,
  message,
  className,
  ...rest
}) => {
  return (
    <label
      data-invalid={invalid ? "" : undefined}
      className={twMerge("jellyfy-choice flex flex-col gap-1.5", className)}
    >
      <span className="flex items-center gap-3 text-sm font-medium text-surface-foreground">
        <span className="relative h-7 w-12 shrink-0">
          <input
            type="checkbox"
            role="switch"
            aria-invalid={invalid}
            className="peer absolute inset-0 z-10 cursor-pointer appearance-none rounded-full focus-visible:outline-none"
            {...rest}
          />
          <span className="jellyfy-switch noise pointer-events-none absolute inset-0 rounded-full backdrop-blur-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2" />
          <span className="jellyfy-switch-thumb pointer-events-none absolute top-1 left-1 size-5 rounded-full bg-white shadow-[var(--shadow-drop)] transition-transform" />
        </span>
        {label}
      </span>
      {message ? <span className="text-xs text-error-foreground">{message}</span> : null}
    </label>
  );
};
