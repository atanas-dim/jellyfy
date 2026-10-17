"use client";

import { motion } from "motion/react";
import type { FC, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { usePress } from "../foundation/press";

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
  disabled,
  ...rest
}) => {
  const press = usePress("horizontal", Boolean(disabled));

  return (
    <label
      data-invalid={invalid ? "" : undefined}
      className={twMerge("jellyfy-choice flex flex-col gap-1.5", className)}
    >
      <span className="text-surface-foreground flex items-center gap-3 text-sm font-medium">
        <motion.span
          animate={press.controls}
          onPointerDown={(event) => press.play(event.currentTarget)}
          onFocus={(event) => press.play(event.currentTarget)}
          className="relative h-7 w-12 shrink-0"
        >
          <input
            type="checkbox"
            role="switch"
            disabled={disabled}
            aria-invalid={invalid}
            className="peer absolute inset-0 z-10 cursor-pointer appearance-none rounded-full focus-visible:outline-none"
            {...rest}
          />
          <span className="jellyfy-switch noise peer-focus-visible:ring-ring pointer-events-none absolute inset-0 rounded-full shadow-[var(--shadow-inset-surface),var(--shadow-drop)] backdrop-blur-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2" />
          <span className="jellyfy-switch-thumb jellyfy-nub noise pointer-events-none absolute top-1 left-1 size-5 rounded-full transition-transform" />
        </motion.span>
        {label}
      </span>
      {message ? <span className="text-error-foreground text-xs">{message}</span> : null}
    </label>
  );
};
