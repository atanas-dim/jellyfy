"use client";

import { motion } from "motion/react";
import type { FC, InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import { type Color, colorClass, fieldFocusRing } from "../foundation/color";
import { FloatLabel } from "../foundation/float-label";
import { usePress } from "../foundation/press";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  color?: Color;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export const Input: FC<InputProps> = ({
  color = "neutral",
  label,
  leading,
  trailing,
  id,
  className,
  disabled,
  ...rest
}) => {
  const press = usePress("horizontal", Boolean(disabled));
  const autoId = useId();
  const inputId = id ?? `jellyfy-input-${autoId}`;
  const { placeholder, ...inputProps } = rest;

  return (
    <motion.div
      animate={press.controls}
      onPointerDown={(event) => press.play(event.currentTarget)}
      onFocus={(event) => press.play(event.currentTarget)}
      className={twMerge(
        "jellyfy-surface noise w-full overflow-hidden backdrop-blur-sm",
        fieldFocusRing(),
        "motion-safe:transition-all motion-safe:duration-300 ease-out",
        disabled && "opacity-60",
        colorClass(color),
        className,
      )}
    >
      <div className="relative flex items-center">
        {leading && (
          <div className="pointer-events-none absolute top-4.5 left-4 z-20 text-neutral-400">
            {leading}
          </div>
        )}

        <input
          id={inputId}
          className={twJoin(
            "peer relative z-10 block w-full border-0 bg-transparent px-4 pt-5.5 pb-2.5 text-base text-current outline-none",
            "placeholder:text-transparent placeholder-shown:pt-4 placeholder-shown:pb-4",
            "disabled:cursor-not-allowed",
            leading && "pl-10",
            trailing && "pr-10",
          )}
          placeholder={placeholder ?? " "}
          disabled={disabled}
          aria-invalid={color === "error"}
          aria-disabled={disabled}
          {...inputProps}
        />

        {trailing && (
          <div className="pointer-events-none absolute top-4.5 right-4 z-20 text-neutral-400">
            {trailing}
          </div>
        )}

        {label && (
          <FloatLabel htmlFor={inputId} leading={Boolean(leading)} color={color}>
            {label}
          </FloatLabel>
        )}
      </div>
    </motion.div>
  );
};
