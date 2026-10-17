"use client";

import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";
import type { FC, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { choiceStyle, type Color, fieldFocusRing } from "../foundation/color";
import { usePress } from "../foundation/press";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  color?: Color;
  invalid?: boolean;
  message?: string;
};

export const Checkbox: FC<CheckboxProps> = ({
  label,
  color = "primary",
  invalid,
  message,
  className,
  disabled,
  ...rest
}) => {
  const press = usePress("vertical", Boolean(disabled));

  return (
    <label
      data-invalid={invalid ? "" : undefined}
      style={choiceStyle(invalid ? "error" : color)}
      className={twMerge("jellyfy-choice flex flex-col gap-1.5", className)}
    >
      <span className="text-surface-foreground flex items-center gap-3 text-sm font-medium">
        <motion.span
          animate={press.controls}
          onPointerDown={(event) => press.play(event.currentTarget)}
          onFocus={(event) => press.play(event.currentTarget)}
          className={twMerge(
            "relative flex size-6 shrink-0 items-center justify-center rounded-lg",
            fieldFocusRing(invalid ? "error" : color),
          )}
        >
          <input
            type="checkbox"
            disabled={disabled}
            aria-invalid={invalid}
            className="peer absolute inset-0 z-10 cursor-pointer appearance-none rounded-lg focus-visible:outline-none"
            {...rest}
          />
          <span className="jellyfy-nub jellyfy-check noise pointer-events-none flex size-6 items-center justify-center rounded-lg backdrop-blur-sm">
            <CheckIcon className="jellyfy-mark size-3.5" strokeWidth={3} />
          </span>
        </motion.span>
        {label}
      </span>
      {message ? (
        <span className="text-error-foreground text-xs">{message}</span>
      ) : null}
    </label>
  );
};
