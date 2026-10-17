"use client";

import type { CSSProperties, FC, InputHTMLAttributes } from "react";
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
  const progress = (Number(current) - min) / (max - min);
  const fill = invalid ? "var(--error)" : "var(--primary)";
  const travel = `calc((100% - 1.5rem) * ${progress})`;

  return (
    <label
      className={twMerge("flex w-full max-w-sm flex-col gap-3", className)}
    >
      <span className="text-surface-foreground text-sm font-medium">
        {label}
      </span>
      <span className="relative h-8 w-full">
        <span
          className="noise pointer-events-none absolute top-1/2 h-3 w-full -translate-y-1/2 overflow-hidden rounded-full"
          style={{
            backgroundColor: "var(--surface)",
            boxShadow: "var(--shadow-inset-surface), var(--shadow-drop)",
          }}
        >
          <span
            className="noise absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `calc(0.75rem + ${travel})`,
              backgroundColor: fill,
            }}
          />
        </span>
        <span
          className="noise pointer-events-none absolute top-1/2 z-1 size-6 -translate-y-1/2 rounded-full"
          style={
            {
              left: travel,
              backgroundColor: fill,
              boxShadow: "var(--shadow-inset-surface), var(--shadow-drop)",
            } as CSSProperties
          }
        />
        <input
          type="range"
          min={min}
          max={max}
          value={current}
          disabled={disabled}
          aria-invalid={invalid}
          aria-valuetext={`${current}`}
          className="jellyfy-range disabled:cursor-not-allowed"
          {...rest}
          onChange={(event) => {
            const next = Number(event.target.value);
            if (value === undefined) setUncontrolled(next);
            onValueChange?.(next);
          }}
        />
      </span>
      {message ? (
        <span className="text-error-foreground text-xs">{message}</span>
      ) : null}
    </label>
  );
};
