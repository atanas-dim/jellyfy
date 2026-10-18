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
  { angle: 0, duration: 1.35, className: "bg-white/15" },
  { angle: 130, duration: 2.2, className: "bg-black/10" },
  { angle: 240, duration: 1.6, className: "bg-white/15" },
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
            ? ORBITS.map(({ angle, duration, className }, index) => (
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
                        "absolute top-0.5 left-1/2 block size-3.5 -translate-x-1/2 rounded-full blur-[4px]",
                        className,
                      )}
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
