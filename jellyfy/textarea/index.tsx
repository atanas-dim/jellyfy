"use client";

import { motion, useReducedMotion } from "motion/react";
import type { FC, ReactNode, TextareaHTMLAttributes } from "react";
import { useId } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import { type FieldTone,FloatLabel } from "../foundation/float-label";
import { pressProps } from "../foundation/press";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  state?: FieldTone;
  label?: string;
  leading?: ReactNode;
};

const toneClass: Record<FieldTone, string> = {
  idle: "jellyfy-tone-surface",
  error: "jellyfy-tone-error",
  success: "jellyfy-tone-success",
};

const ringClass: Record<FieldTone, string> = {
  idle: "focus-within:ring-ring",
  error: "focus-within:ring-ring-error",
  success: "focus-within:ring-ring-success",
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
  const shouldReduceMotion = useReducedMotion();
  const autoId = useId();
  const inputId = id ?? `jellyfy-textarea-${autoId}`;
  const { placeholder, ...textareaProps } = rest;

  return (
    <motion.div
      {...pressProps("horizontal", Boolean(disabled), Boolean(shouldReduceMotion))}
      className={twMerge(
        "jellyfy-surface noise w-full overflow-hidden backdrop-blur-sm",
        "focus-within:ring focus-within:ring-offset-2 focus-within:outline-none",
        disabled && "opacity-60",
        toneClass[state],
        ringClass[state],
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
