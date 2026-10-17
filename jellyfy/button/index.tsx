"use client";

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  type FC,
  type PropsWithChildren,
  useRef,
} from "react";
import { twJoin, twMerge } from "tailwind-merge";

import { pressProps } from "../foundation/press";

type ProcessingLight = {
  delay: number;
  duration: number;
  className: string;
};

const PROCESSING_LIGHTS: ProcessingLight[] = [
  { delay: 0, duration: 1.35, className: "bg-white/40" },
  { delay: 0.36, duration: 1.65, className: "bg-black/40" },
  { delay: 0.78, duration: 1.5, className: "bg-white/40" },
];

export type ButtonState = "idle" | "processing" | "success";

const toneClass: Record<ButtonState, string> = {
  idle: "jellyfy-tone-primary",
  processing: "jellyfy-tone-busy",
  success: "jellyfy-tone-complete",
};

type ButtonProps = PropsWithChildren<HTMLMotionProps<"button">> & {
  labelClassName?: string;
  state?: ButtonState;
  animateLabel?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children = "Label",
  className,
  labelClassName,
  state = "idle",
  animateLabel = true,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);
  const isProcessing = state === "processing";
  const isDisabled = Boolean(rest.disabled);

  const labelClasses = twMerge(
    "z-2 flex items-center justify-center gap-1 text-sm leading-none font-semibold tracking-wide text-current uppercase text-shadow-[0_0px_6px_rgba(10,10,10,0.4)]",
    labelClassName,
  );

  return (
    <motion.button
      ref={btnRef}
      type="button"
      {...pressProps("vertical", isDisabled, Boolean(shouldReduceMotion))}
      aria-busy={isProcessing}
      {...rest}
      className={twMerge(
        "jellyfy-raised noise group inline-flex h-12 min-w-40 items-center justify-center px-6 backdrop-blur-sm select-none",
        "transition-[box-shadow,background-color] duration-200 ease-out",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        "cursor-pointer disabled:cursor-not-allowed",
        "disabled:translate-y-0 disabled:scale-100 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:active:translate-y-0 disabled:active:scale-100",
        toneClass[state],
        className,
      )}
    >
      {!isDisabled && (
        <AnimatePresence initial={!animateLabel}>
          {isProcessing && (
            <motion.span
              key="processing-lights"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full motion-reduce:hidden"
            >
              {PROCESSING_LIGHTS.map(({ delay, duration, className: lightClass }, index) => (
                <motion.span
                  key={index}
                  className={twJoin(
                    "absolute top-1/2 block h-2/5 w-3/10 -translate-y-1/2 rounded-full blur-md",
                    lightClass,
                  )}
                  initial={{ x: "-100%" }}
                  animate={{ x: "300%", opacity: [0, 0.55, 0.3, 0.42, 0] }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.08, 0.55, 0.78, 1],
                  }}
                />
              ))}
            </motion.span>
          )}
        </AnimatePresence>
      )}

      {animateLabel && !isDisabled ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={state}
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 14, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: -14, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={labelClasses}
          >
            {children}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className={labelClasses}>{children}</span>
      )}
    </motion.button>
  );
};
