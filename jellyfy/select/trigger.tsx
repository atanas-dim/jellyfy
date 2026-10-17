"use client";

import { ChevronDownIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import type { FieldTone } from "../foundation/float-label";
import { pressProps } from "../foundation/press";

const toneClass: Record<FieldTone, string> = {
  idle: "jellyfy-tone-surface",
  error: "jellyfy-tone-error",
  success: "jellyfy-tone-success",
};

const ringClass: Record<FieldTone, string> = {
  idle: "focus-visible:ring-ring",
  error: "focus-visible:ring-ring-error",
  success: "focus-visible:ring-ring-success",
};

type SelectTriggerProps = {
  id: string;
  listId: string;
  open: boolean;
  label?: string;
  text: string;
  tone?: FieldTone;
  disabled?: boolean;
  onToggle: () => void;
};

export const SelectTrigger: FC<SelectTriggerProps> = ({
  id,
  listId,
  open,
  label,
  text,
  tone = "idle",
  disabled,
  onToggle,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      id={id}
      type="button"
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listId}
      {...pressProps("horizontal", Boolean(disabled), Boolean(shouldReduceMotion))}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (!open) onToggle();
        }
      }}
      className={twMerge(
        "jellyfy-surface noise flex h-14 w-full items-center justify-between px-4 text-left backdrop-blur-sm",
        "cursor-pointer focus-visible:ring focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        toneClass[tone],
        ringClass[tone],
      )}
    >
      <span className="flex min-w-0 flex-col">
        {label ? (
          <span className="text-[10px] font-medium tracking-wide text-neutral-500">{label}</span>
        ) : null}
        <span className="truncate text-base">{text}</span>
      </span>
      <ChevronDownIcon className="size-4 shrink-0 text-neutral-400" />
    </motion.button>
  );
};
