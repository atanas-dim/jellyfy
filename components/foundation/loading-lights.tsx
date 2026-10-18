"use client";

import { AnimatePresence, motion } from "motion/react";
import type { FC } from "react";
import { twJoin } from "tailwind-merge";

const LIGHTS = [
  { delay: 0, duration: 1.35, className: "bg-white/40" },
  { delay: 0.36, duration: 1.65, className: "bg-black/40" },
  { delay: 0.78, duration: 1.5, className: "bg-white/40" },
];

const ORBITS = [
  { angle: 0, delay: 0, duration: 1.35, className: "bg-white/40" },
  { angle: 140, delay: 0.36, duration: 1.65, className: "bg-black/40" },
  { angle: 250, delay: 0.78, duration: 1.5, className: "bg-white/40" },
];

type LoadingLightsProps = {
  loading?: boolean;
  spin?: boolean;
};

export const LoadingLights: FC<LoadingLightsProps> = ({ loading, spin }) => {
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
          {spin
            ? ORBITS.map(({ angle, delay, duration, className }, index) => (
                <span
                  key={index}
                  className="pointer-events-none absolute inset-0"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <span
                    className="jellyfy-orbit absolute inset-0"
                    style={{ animationDuration: `${duration}s` }}
                  >
                    <span
                      className={twJoin(
                        "jellyfy-orbit-light absolute top-0 left-1/2 block h-2/5 w-3/10 -translate-x-1/2 rounded-full blur-md",
                        className,
                      )}
                      style={{
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                      }}
                    />
                  </span>
                </span>
              ))
            : LIGHTS.map(({ delay, duration, className }, index) => (
                <span
                  key={index}
                  className={twJoin(
                    "jellyfy-sweep absolute block h-2/5 w-3/10 rounded-full blur-md",
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
