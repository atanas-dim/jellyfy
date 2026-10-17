"use client";

import { motion } from "motion/react";
import type { FC, InputHTMLAttributes } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useMeasuredBox, usePressPlayback } from "../foundation/press";

type SliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  label: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  invalid?: boolean;
  message?: string;
};

export const Slider: FC<SliderProps> = ({
  label,
  value,
  defaultValue = 40,
  onValueChange,
  min = 0,
  max = 100,
  invalid,
  message,
  className,
  disabled,
  ...rest
}) => {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [measure, box] = useMeasuredBox();
  const press = usePressPlayback("vertical", Boolean(disabled), box);
  const current = value ?? uncontrolled;
  const fill = ((Number(current) - min) / (max - min)) * 100;

  return (
    <label className={twMerge("flex w-full max-w-sm flex-col gap-3", className)}>
      <span className="text-sm font-medium text-surface-foreground">{label}</span>
      <span className="relative flex h-8 items-center">
        <span className="jellyfy-surface noise relative h-3 w-full overflow-hidden backdrop-blur-sm">
          <span
            className={twMerge(
              "absolute inset-y-0 left-0",
              invalid ? "bg-error" : "bg-primary",
            )}
            style={{ width: `${fill}%` }}
          />
        </span>
        <motion.span
          ref={measure}
          animate={press.controls}
          aria-hidden
          className="jellyfy-nub noise absolute size-6 backdrop-blur-sm"
          style={{ left: `calc(${fill}% - 0.75rem)` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={current}
          disabled={disabled}
          aria-invalid={invalid}
          aria-valuetext={`${current}`}
          data-invalid={invalid ? "" : undefined}
          style={{ ["--fill" as string]: `${fill}%` }}
          className="jellyfy-range absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...rest}
          onPointerDown={(event) => {
            press.play();
            rest.onPointerDown?.(event);
          }}
          onFocus={(event) => {
            press.play();
            rest.onFocus?.(event);
          }}
          onChange={(event) => {
            const next = Number(event.target.value);
            if (value === undefined) setUncontrolled(next);
            onValueChange?.(next);
          }}
        />
      </span>
      {message ? <span className="text-xs text-error-foreground">{message}</span> : null}
    </label>
  );
};
