"use client";

import { LoaderIcon } from "lucide-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { type Color, colorClass, fieldFocusRing } from "../foundation/color";
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
        "cursor-pointer transition-[box-shadow,background-color,outline-color] duration-300 ease-out",
        fieldFocusRing(),
        "disabled:cursor-not-allowed",
        colorClass(color),
        className,
      )}
    >
      <span className="relative z-2">
        {loading && !isDisabled ? (
          <LoaderIcon className="size-4.5 motion-safe:animate-spin" />
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
};
