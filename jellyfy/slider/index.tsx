"use client";

import type { FC, InputHTMLAttributes } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

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
  const current = value ?? uncontrolled;
  const fill = ((Number(current) - min) / (max - min)) * 100;

  return (
    <label className={twMerge("flex w-full max-w-sm flex-col gap-3", className)}>
      <span className="text-sm font-medium text-surface-foreground">{label}</span>
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
        className="jellyfy-range disabled:cursor-not-allowed disabled:opacity-60"
        onChange={(event) => {
          const next = Number(event.target.value);
          if (value === undefined) setUncontrolled(next);
          onValueChange?.(next);
        }}
        {...rest}
      />
      {message ? <span className="text-xs text-error-foreground">{message}</span> : null}
    </label>
  );
};
