"use client";

import type { FC, ReactNode } from "react";
import { useId } from "react";
import { twMerge } from "tailwind-merge";

import { choiceStyle,type Color } from "../foundation/color";
import { RadioContext } from "./context";
import { RadioItem } from "./item";

type RadioProps = {
  label: string;
  value?: string;
  defaultValue?: string;
  color?: Color;
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
  color = "primary",
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
      value={{
        name,
        value,
        defaultValue,
        color,
        disabled,
        invalid,
        onValueChange,
      }}
    >
      <fieldset
        data-invalid={invalid ? "" : undefined}
        disabled={disabled}
        style={choiceStyle(invalid ? "error" : color)}
        className={twMerge("flex flex-col gap-2", className)}
      >
        <legend className="text-surface-foreground text-sm font-medium">
          {label}
        </legend>
        <div className="flex flex-col gap-2">{children}</div>
        {message ? (
          <p className="text-error-text text-xs">{message}</p>
        ) : null}
      </fieldset>
    </RadioContext>
  );
};

export { RadioItem };
