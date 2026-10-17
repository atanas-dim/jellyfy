"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import type { ButtonState } from "../button";
import { usePress } from "../foundation/press";

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
  const isDisabled = Boolean(rest.disabled);
  const press = usePress("vertical", isDisabled);

  return (
    <motion.button
      type="button"
      aria-label={label}
      whileHover={press.hover}
      animate={press.controls}
      {...rest}
      onPointerDown={(event) => {
        press.play(event.currentTarget);
        rest.onPointerDown?.(event);
      }}
      onFocus={(event) => {
        press.play(event.currentTarget);
        rest.onFocus?.(event);
      }}
      className={twMerge(
        "jellyfy-raised noise inline-flex size-12 items-center justify-center backdrop-blur-sm",
        "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed",
        state === "idle" && "jellyfy-tone-primary",
        state === "processing" && "jellyfy-tone-busy",
        state === "success" && "jellyfy-tone-complete",
        className,
      )}
    >
      {children}
    </motion.button>
  );
};
