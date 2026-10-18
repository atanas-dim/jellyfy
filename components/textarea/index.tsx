"use client";

import { useReducedMotion } from "motion/react";
import type {
  FC,
  PointerEvent,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { useId } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import { type Color, colorClass, fieldFocusRing } from "../foundation/color";
import { FloatLabel } from "../foundation/float-label";
import { playPress } from "../foundation/press";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  color?: Color;
  label?: string;
  leading?: ReactNode;
};

export const Textarea: FC<TextareaProps> = ({
  color = "neutral",
  label,
  leading,
  id,
  className,
  disabled,
  ...rest
}) => {
  const reduceMotion = Boolean(useReducedMotion());
  const autoId = useId();
  const inputId = id ?? `jellyfy-textarea-${autoId}`;
  const { placeholder, ...textareaProps } = rest;

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const onResizeHandle =
      rect.right - event.clientX < 18 && rect.bottom - event.clientY < 18;
    if (onResizeHandle || disabled || reduceMotion) return;
    playPress(event.currentTarget, "horizontal");
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onFocus={(event) => {
        if (disabled || reduceMotion) return;
        playPress(event.currentTarget, "horizontal");
      }}
      className={twMerge(
        "jellyfy-surface noise w-full overflow-hidden backdrop-blur-sm",
        fieldFocusRing(),
        "ease-out motion-safe:transition-all motion-safe:duration-300",
        disabled && "opacity-60",
        colorClass(color),
        className,
        "h-fit w-full self-start",
      )}
    >
      <div className="relative">
        {leading && (
          <div className="pointer-events-none absolute top-4.5 left-4 z-20 text-neutral-400">
            {leading}
          </div>
        )}
        <textarea
          id={inputId}
          className={twJoin(
            "peer relative z-10 block min-h-28 w-full resize-y border-0 bg-transparent px-4 pt-6 pb-3 text-base text-current outline-none",
            "placeholder:text-transparent placeholder-shown:pt-5 placeholder-shown:pb-3",
            "disabled:cursor-not-allowed",
            leading && "pl-10",
          )}
          placeholder={placeholder ?? " "}
          disabled={disabled}
          aria-invalid={color === "error"}
          {...textareaProps}
        />
        {label && (
          <FloatLabel
            htmlFor={inputId}
            leading={Boolean(leading)}
            color={color}
          >
            {label}
          </FloatLabel>
        )}
      </div>
    </div>
  );
};
