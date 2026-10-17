"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import type { ButtonState } from "../button";
import { pressProps } from "../foundation/press";

const toneClass: Record<ButtonState, string> = {
  idle: "jellyfy-tone-primary",
  processing: "jellyfy-tone-busy",
  success: "jellyfy-tone-complete",
};

type IconButtonProps = HTMLMotionProps<"button"> & {
  label: string;
  state?: ButtonState;
  children: ReactNode;
};

export const IconButton: FC<IconButtonProps> = ({
  label,
  state = "idle",
  children,
  className,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isDisabled = Boolean(rest.disabled);

  return (
    <motion.button
      type="button"
      aria-label={label}
      {...pressProps("vertical", isDisabled, Boolean(shouldReduceMotion))}
      {...rest}
      className={twMerge(
        "jellyfy-raised noise inline-flex size-12 items-center justify-center backdrop-blur-sm",
        "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed",
        toneClass[state],
        className,
      )}
    >
      {children}
    </motion.button>
  );
};
