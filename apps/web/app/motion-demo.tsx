"use client";

import type { ReactNode } from "react";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import { twJoin } from "tailwind-merge";

const time = (value: string, fallback: number) => {
  const parsed = parseFloat(value);
  if (!Number.isFinite(parsed)) return fallback;
  return value.trim().endsWith("ms") ? parsed : parsed * 1000;
};

const ratio = (value: string, fallback: number) => {
  const match = value.match(/calc\(\s*([\d.]+)\s*\/\s*([\d.]+)\s*\)/);
  if (match) return Number(match[1]) / Number(match[2]);
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const FACE =
  "relative flex w-full items-center justify-center overflow-hidden border text-sm font-semibold tracking-[0.04em] uppercase";

export const MotionFace = ({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) => (
  <div
    className={twJoin(FACE, className)}
    style={{
      height: "calc(12 * var(--spacing, 0.25rem))",
      borderRadius: "var(--radius-control)",
      backgroundColor:
        "color-mix(in oklab, var(--color-primary) var(--material-opacity), transparent)",
      color: "var(--color-primary-content)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const SquishControl = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const release = () => {
    const face = ref.current;
    if (!face) return;
    const transform = getComputedStyle(face).transform;
    face.getAnimations().forEach((animation) => animation.cancel());
    const releaseTime = time(
      getComputedStyle(face).getPropertyValue("--squish-release-time"),
      300,
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    face.animate([{ transform }, { transform: "scale(1, 1)" }], {
      duration: Number.isFinite(releaseTime) ? releaseTime : 300,
      easing: "ease-out",
      fill: "forwards",
    });
  };

  const press = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const face = ref.current;
    if (!face) return;
    face.setPointerCapture(event.pointerId);
    const styles = getComputedStyle(face);
    const distance = parseFloat(styles.getPropertyValue("--squish-distance"));
    const heightRatio = ratio(
      styles.getPropertyValue("--squish-height-ratio"),
      2 / 7,
    );
    const settleRatio = ratio(
      styles.getPropertyValue("--squish-settle-ratio"),
      1 / 7,
    );
    const peakAt = parseFloat(styles.getPropertyValue("--squish-peak-at"));
    const pressTime = time(styles.getPropertyValue("--squish-press-time"), 480);
    const width = face.offsetWidth;
    const height = face.offsetHeight;
    const scale = (across: number, down: number) =>
      `scale(${1 + across / width}, ${1 + down / height})`;
    face.getAnimations().forEach((animation) => animation.cancel());
    face.animate(
      [
        { transform: "scale(1, 1)", easing: "ease-out" },
        {
          transform: scale(distance, -(heightRatio * distance)),
          offset: peakAt,
          easing: "ease-in-out",
        },
        {
          transform: scale(settleRatio * distance, heightRatio * distance),
        },
      ],
      { duration: pressTime, fill: "forwards" },
    );
  };

  return (
    <button
      ref={ref}
      type="button"
      className={twJoin(FACE, className)}
      style={{
        height: "calc(12 * var(--spacing, 0.25rem))",
        borderRadius: "var(--radius-control)",
        backgroundColor:
          "color-mix(in oklab, var(--color-primary) var(--material-opacity), transparent)",
        color: "var(--color-primary-content)",
      }}
      onPointerDown={press}
      onPointerUp={release}
      onPointerCancel={release}
    >
      Press
    </button>
  );
};
