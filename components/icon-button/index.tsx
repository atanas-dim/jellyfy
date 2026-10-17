"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { type Color, colorClass } from "../foundation/color";
import { LoadingLights } from "../foundation/loading-lights";
import { usePress } from "../foundation/press";

type IconButtonProps = HTMLMotionProps<"button"> & {
  label: string;
  color?: Color;
  loading?: boolean;
  children: ReactNode;
};

export const IconButton: FC<IconButtonProps> = ({
  label,
  color = "primary",
  loading = false,
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
      aria-busy={loading || undefined}
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
        "transition-[box-shadow,background-color] duration-300 ease-out",
        "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed",
        colorClass(color),
        className,
      )}
    >
      <LoadingLights loading={loading && !isDisabled} />
      <span className="relative z-2">{children}</span>
    </motion.button>
  );
};
