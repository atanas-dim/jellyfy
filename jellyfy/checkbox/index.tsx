"use client";

import { CheckIcon } from "lucide-react";
import type { FC, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  invalid?: boolean;
  message?: string;
};

export const Checkbox: FC<CheckboxProps> = ({
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
        <span className="relative flex size-6 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            aria-invalid={invalid}
            className="peer absolute inset-0 z-10 cursor-pointer appearance-none rounded-lg focus-visible:outline-none"
            {...rest}
          />
          <span className="jellyfy-check noise pointer-events-none flex size-6 items-center justify-center rounded-lg backdrop-blur-sm peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
            <CheckIcon className="jellyfy-mark size-3.5 scale-75 opacity-0" strokeWidth={3} />
          </span>
        </span>
        {label}
      </span>
      {message ? <span className="text-xs text-error-foreground">{message}</span> : null}
    </label>
  );
};
