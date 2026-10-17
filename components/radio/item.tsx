"use client";

import { motion } from "motion/react";
import type { FC, ReactNode } from "react";
import { use } from "react";
import { twMerge } from "tailwind-merge";

import { fieldFocusRing } from "../foundation/color";
import { usePress } from "../foundation/press";
import { RadioContext } from "./context";

type RadioItemProps = {
  value: string;
  children: ReactNode;
  disabled?: boolean;
};

export const RadioItem: FC<RadioItemProps> = ({
  value,
  children,
  disabled,
}) => {
  const group = use(RadioContext);
  const isDisabled = disabled ?? group.disabled;
  const press = usePress("vertical", Boolean(isDisabled));

  return (
    <label className="jellyfy-choice text-surface-foreground flex items-center gap-3 text-sm font-medium">
      <motion.span
        animate={press.controls}
        onPointerDown={(event) => press.play(event.currentTarget)}
        onFocus={(event) => press.play(event.currentTarget)}
        className={twMerge(
          "relative flex size-6 shrink-0 items-center justify-center rounded-full",
          fieldFocusRing(group.invalid ? "error" : "neutral"),
        )}
      >
        <input
          type="radio"
          name={group.name}
          value={value}
          checked={
            group.value === undefined ? undefined : group.value === value
          }
          defaultChecked={group.defaultValue === value}
          disabled={isDisabled}
          onChange={() => group.onValueChange?.(value)}
          className="peer absolute inset-0 z-10 cursor-pointer appearance-none rounded-full focus-visible:outline-none"
        />
        <span className="jellyfy-nub noise pointer-events-none flex size-6 items-center justify-center rounded-full backdrop-blur-sm">
          <span className="jellyfy-radio-dot" />
        </span>
      </motion.span>
      {children}
    </label>
  );
};
