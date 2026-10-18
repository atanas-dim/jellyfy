"use client";

import { LoaderIcon } from "lucide-react";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useReducedMotion,
} from "motion/react";
import { type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import { type Color, colorClass, fieldFocusRing } from "../foundation/color";
import { usePress } from "../foundation/press";

type ButtonProps = PropsWithChildren<HTMLMotionProps<"button">> & {
  labelClassName?: string;
  color?: Color;
  loading?: boolean;
  animateLabel?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children = "Label",
  className,
  labelClassName,
  color = "primary",
  loading = false,
  animateLabel = true,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isDisabled = Boolean(rest.disabled);
  const press = usePress("vertical", isDisabled);

  const labelClasses = twMerge(
    "relative z-2 flex items-center justify-center gap-1 text-sm leading-none font-semibold tracking-wide text-current uppercase text-shadow-[0_0px_6px_rgba(10,10,10,0.4)]",
    labelClassName,
  );

  return (
    <motion.button
      type="button"
      whileHover={press.hover}
      {...rest}
      aria-busy={loading || undefined}
      animate={press.controls}
      onPointerDown={(event) => {
        press.play(event.currentTarget);
        rest.onPointerDown?.(event);
      }}
      onFocus={(event) => {
        press.play(event.currentTarget);
        rest.onFocus?.(event);
      }}
      className={twMerge(
        "jellyfy-raised noise group inline-flex h-12 min-w-40 items-center justify-center px-6 backdrop-blur-sm select-none",
        "transition-[box-shadow,background-color,outline-color] duration-300 ease-out",
        fieldFocusRing(),
        "cursor-pointer disabled:cursor-not-allowed",
        "disabled:translate-y-0 disabled:scale-100 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:active:translate-y-0 disabled:active:scale-100",
        colorClass(color),
        className,
      )}
    >
      {animateLabel && !isDisabled ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={color}
            initial={
              shouldReduceMotion ? { opacity: 0 } : { y: 14, opacity: 0 }
            }
            animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: -14, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={labelClasses}
          >
            {loading ? (
              <LoaderIcon className="size-4.5 motion-safe:animate-spin" />
            ) : null}
            {children}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className={labelClasses}>
          {loading ? (
            <LoaderIcon className="size-4.5 motion-safe:animate-spin" />
          ) : null}
          {children}
        </span>
      )}
    </motion.button>
  );
};
