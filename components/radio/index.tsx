"use client";

import type { FC, ReactNode } from "react";
import { useId } from "react";
import { twMerge } from "tailwind-merge";

import { RadioContext } from "./context";
import { RadioItem } from "./item";

type RadioProps = {
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  message?: string;
  children: ReactNode;
  className?: string;
};

export const Radio: FC<RadioProps> = ({
  label,
  value,
  defaultValue,
  onValueChange,
  disabled,
  invalid,
  message,
  children,
  className,
}) => {
  const name = useId();

  return (
    <RadioContext
      value={{ name, value, defaultValue, disabled, invalid, onValueChange }}
    >
      <fieldset
        data-invalid={invalid ? "" : undefined}
        disabled={disabled}
        className={twMerge("flex flex-col gap-2", className)}
      >
        <legend className="text-sm font-medium text-surface-foreground">{label}</legend>
        <div className="flex flex-col gap-2">{children}</div>
        {message ? <p className="text-xs text-error-foreground">{message}</p> : null}
      </fieldset>
    </RadioContext>
  );
};

export { RadioItem };
