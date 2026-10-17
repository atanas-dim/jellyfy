"use client";

import type { HTMLMotionProps } from "motion/react";
import { useAnimation, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";

const observers = new WeakMap<object, ResizeObserver>();

export type PressAxis = "vertical" | "horizontal";

type Box = {
  width: number;
  height: number;
};

type PressMotion = Pick<
  HTMLMotionProps<"button">,
  "initial" | "whileHover" | "whileTap" | "transition"
>;

const PRESS_PEAK = 3.36;
const PRESS_SETTLE = 0.48;
const CROSS_PEAK = -3.2;
const CROSS_SETTLE = 3.2;

const ratio = (pixels: number, size: number) => {
  if (size <= 0) return 1;
  return 1 + pixels / size;
};

const scales = (axis: PressAxis, box: Box) => {
  const pressPeak = axis === "vertical" ? box.height : box.width;
  const crossPeak = axis === "vertical" ? box.width : box.height;

  return {
    scaleX:
      axis === "vertical"
        ? [1, ratio(CROSS_PEAK, crossPeak), ratio(CROSS_SETTLE, crossPeak)]
        : [1, ratio(PRESS_PEAK, pressPeak), ratio(PRESS_SETTLE, pressPeak)],
    scaleY:
      axis === "vertical"
        ? [1, ratio(PRESS_PEAK, pressPeak), ratio(PRESS_SETTLE, pressPeak)]
        : [1, ratio(CROSS_PEAK, crossPeak), ratio(CROSS_SETTLE, crossPeak)],
  };
};

export const pressProps = (
  axis: PressAxis,
  disabled: boolean,
  reduceMotion: boolean,
  box: Box,
): PressMotion => {
  const still = reduceMotion || disabled;
  const { scaleX, scaleY } = scales(axis, box);

  return {
    initial: still ? undefined : { y: 0, scaleX: 1, scaleY: 1 },
    whileHover: axis === "vertical" ? { y: still ? undefined : -2 } : undefined,
    whileTap: still ? undefined : { y: 0, scaleX, scaleY },
    transition: {
      times: [0, 0.65, 1],
      ease: "easeOut",
    },
  };
};

export const useMeasuredBox = () => {
  const [box, setBox] = useState<Box>({ width: 160, height: 48 });
  const [key] = useState(() => ({}));

  const measure = useCallback(
    (element: HTMLElement | null) => {
      observers.get(key)?.disconnect();
      if (!element) return;

      const read = () => {
        setBox({ width: element.offsetWidth, height: element.offsetHeight });
      };

      read();
      const observer = new ResizeObserver(read);
      observers.set(key, observer);
      observer.observe(element);
    },
    [key],
  );

  return [measure, box] as const;
};

export const usePressPlayback = (axis: PressAxis, disabled: boolean, box: Box) => {
  const reduceMotion = Boolean(useReducedMotion());
  const controls = useAnimation();

  const play = () => {
    if (disabled || reduceMotion) return;
    const { scaleX, scaleY } = scales(axis, box);
    void controls.start({
      scaleX,
      scaleY,
      transition: {
        duration: 0.4,
        times: [0, 0.65, 1],
        ease: "easeOut",
      },
    });
  };

  return {
    play,
    controls,
    gesture: pressProps(axis, disabled, reduceMotion, box),
  };
};
