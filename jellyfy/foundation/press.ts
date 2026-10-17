"use client";

import { useAnimation, useReducedMotion } from "motion/react";

export type PressAxis = "vertical" | "horizontal";

type Box = {
  width: number;
  height: number;
};

const PRESS_PEAK = 3.36;
const CROSS_PEAK = -3.2;

const ratio = (pixels: number, size: number) => {
  if (size <= 0) return 1;
  return 1 + pixels / size;
};

const scales = (axis: PressAxis, box: Box) => {
  const pressSize = axis === "vertical" ? box.height : box.width;
  const crossSize = axis === "vertical" ? box.width : box.height;
  const press = ratio(PRESS_PEAK, pressSize);
  const cross = ratio(CROSS_PEAK, crossSize);

  return {
    scaleX: axis === "vertical" ? [1, cross, 1] : [1, press, 1],
    scaleY: axis === "vertical" ? [1, press, 1] : [1, cross, 1],
  };
};

export const usePress = (axis: PressAxis, disabled: boolean) => {
  const reduceMotion = Boolean(useReducedMotion());
  const controls = useAnimation();

  const play = (element: HTMLElement) => {
    if (disabled || reduceMotion) return;

    const { scaleX, scaleY } = scales(axis, {
      width: element.offsetWidth,
      height: element.offsetHeight,
    });

    void controls.start({
      scaleX,
      scaleY,
      transition: {
        duration: 0.4,
        times: [0, 0.45, 1],
        ease: "easeOut",
      },
    });
  };

  return {
    controls,
    play,
    hover: axis === "vertical" && !disabled && !reduceMotion ? { y: -2 } : undefined,
  };
};
