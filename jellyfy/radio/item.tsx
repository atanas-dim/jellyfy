"use client";

import { motion } from "motion/react";
import type { FC, ReactNode } from "react";
import { use } from "react";

import { useMeasuredBox, usePressPlayback } from "../foundation/press";
import { RadioContext } from "./context";

type RadioItemProps = {
  value: string;
  children: ReactNode;
  disabled?: boolean;
};

export const RadioItem: FC<RadioItemProps> = ({ value, children, disabled }) => {
  const group = use(RadioContext);
  const isDisabled = disabled ?? group.disabled;
  const [measure, box] = useMeasuredBox();
  const press = usePressPlayback("vertical", Boolean(isDisabled), box);

  return (
    <label className="jellyfy-choice flex items-center gap-3 text-sm font-medium text-surface-foreground">
      <span className="relative flex size-6 shrink-0 items-center justify-center">
        <input
          type="radio"
          name={group.name}
          value={value}
          checked={group.value === undefined ? undefined : group.value === value}
          defaultChecked={group.defaultValue === value}
          disabled={isDisabled}
          onChange={() => group.onValueChange?.(value)}
          onPointerDown={press.play}
          onFocus={press.play}
          className="peer absolute inset-0 z-10 cursor-pointer appearance-none rounded-full focus-visible:outline-none"
        />
        <motion.span
          ref={measure}
          animate={press.controls}
          className="jellyfy-nub noise pointer-events-none flex size-6 items-center justify-center rounded-full backdrop-blur-sm peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
        >
          <span className="jellyfy-radio-dot size-2.5 scale-0 rounded-full bg-primary opacity-0" />
        </motion.span>
      </span>
      {children}
    </label>
  );
};
