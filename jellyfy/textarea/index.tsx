"use client";

import { motion } from "motion/react";
import type { FC, ReactNode, TextareaHTMLAttributes } from "react";
import { useId } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import { type FieldTone, FloatLabel } from "../foundation/float-label";
import { useMeasuredBox, usePressPlayback } from "../foundation/press";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  state?: FieldTone;
  label?: string;
  leading?: ReactNode;
};

export const Textarea: FC<TextareaProps> = ({
  state = "idle",
  label,
  leading,
  id,
  className,
  disabled,
  ...rest
}) => {
  const [measure, box] = useMeasuredBox();
  const press = usePressPlayback("horizontal", Boolean(disabled), box);
  const autoId = useId();
  const inputId = id ?? `jellyfy-textarea-${autoId}`;
  const { placeholder, ...textareaProps } = rest;

  return (
    <motion.div
      ref={measure}
      {...press.gesture}
      className={twMerge(
        "jellyfy-surface noise w-full overflow-hidden backdrop-blur-sm",
        "focus-within:ring focus-within:ring-offset-2 focus-within:outline-none",
        disabled && "opacity-60",
        state === "idle" && "jellyfy-tone-surface",
        state === "error" && "jellyfy-tone-error",
        state === "success" && "jellyfy-tone-success",
        state === "idle" && "focus-within:ring-ring",
        state === "error" && "focus-within:ring-ring-error",
        state === "success" && "focus-within:ring-ring-success",
        className,
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
          aria-invalid={state === "error"}
          {...textareaProps}
          onFocus={(event) => {
            press.play();
            textareaProps.onFocus?.(event);
          }}
        />
        {label && (
          <FloatLabel htmlFor={inputId} leading={Boolean(leading)} tone={state}>
            {label}
          </FloatLabel>
        )}
      </div>
    </motion.div>
  );
};
