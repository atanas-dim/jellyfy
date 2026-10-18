"use client";

import { AnimatePresence, motion } from "motion/react";
import type { FC } from "react";
import { twJoin } from "tailwind-merge";

const LIGHTS = [
  { delay: 0, duration: 1.35, className: "bg-white/70" },
  { delay: 0.36, duration: 1.65, className: "bg-black/35" },
  { delay: 0.78, duration: 1.5, className: "bg-white/70" },
];

type LoadingLightsProps = {
  loading?: boolean;
};

export const LoadingLights: FC<LoadingLightsProps> = ({ loading }) => {
  return (
    <AnimatePresence initial={false}>
      {loading ? (
        <motion.span
          key="loading-lights"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-1 overflow-hidden rounded-full"
        >
          {LIGHTS.map(({ delay, duration, className }, index) => (
            <span
              key={index}
              className={twJoin(
                "jellyfy-sweep absolute block h-3/5 w-2/5 rounded-full blur-md",
                className,
              )}
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          ))}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
};
