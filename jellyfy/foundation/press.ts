import type { HTMLMotionProps } from "motion/react";

export type PressAxis = "vertical" | "horizontal";

type PressMotion = Pick<
  HTMLMotionProps<"button">,
  "initial" | "whileHover" | "whileTap" | "transition"
>;

export const pressProps = (
  axis: PressAxis,
  disabled: boolean,
  reduceMotion: boolean,
): PressMotion => {
  const still = reduceMotion || disabled;

  return {
    initial: still ? undefined : { y: 0, scaleX: 1, scaleY: 1 },
    whileHover:
      axis === "vertical" ? { y: still ? undefined : -2 } : undefined,
    whileTap: still
      ? undefined
      : axis === "vertical"
        ? {
            y: 0,
            scaleX: [1, 0.98, 1.02],
            scaleY: [1, 1.07, 1.01],
          }
        : {
            y: 0,
            scaleX: [1, 1.07, 1.01],
            scaleY: [1, 0.98, 1.02],
          },
    transition: {
      times: [0, 0.65, 1],
      ease: "easeOut",
    },
  };
};
