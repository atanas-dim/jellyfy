"use client";

import { motion } from "motion/react";
import type { FC, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { useMeasuredBox, usePressPlayback } from "../foundation/press";

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
  const [measure, box] = useMeasuredBox();
  const press = usePressPlayback("horizontal", Boolean(disabled), box);

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
            disabled={disabled}
            aria-invalid={invalid}
            className="peer absolute inset-0 z-10 cursor-pointer appearance-none rounded-full focus-visible:outline-none"
            {...rest}
            onPointerDown={(event) => {
              press.play();
              rest.onPointerDown?.(event);
            }}
            onFocus={(event) => {
              press.play();
              rest.onFocus?.(event);
            }}
          />
          <motion.span
            ref={measure}
            animate={press.controls}
            className="pointer-events-none absolute inset-0 rounded-full peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
          >
            <span className="jellyfy-switch noise absolute inset-0 rounded-full shadow-[var(--shadow-inset-surface),var(--shadow-drop)] backdrop-blur-sm transition-colors" />
            <span className="jellyfy-switch-thumb jellyfy-nub noise absolute top-1 left-1 size-5 rounded-full transition-transform" />
          </motion.span>
        </span>
        {label}
      </span>
      {message ? <span className="text-xs text-error-foreground">{message}</span> : null}
    </label>
  );
};
