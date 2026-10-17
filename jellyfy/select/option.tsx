"use client";

import type { FC } from "react";
import { use, useEffect } from "react";

import { SelectContext } from "./context";

type SelectOptionProps = {
  value: string;
  children: string;
  disabled?: boolean;
};

export const SelectOption: FC<SelectOptionProps> = ({
  value,
  children,
  disabled,
}) => {
  const select = use(SelectContext);

  useEffect(() => {
    select.register(value, children);
  }, [children, select, value]);

  const selected = select.value === value;

  return (
    <li role="presentation">
      <button
        type="button"
        role="option"
        aria-selected={selected}
        disabled={disabled}
        className="text-surface-foreground aria-selected:bg-primary aria-selected:text-primary-foreground flex w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => select.choose(value)}
      >
        {children}
      </button>
    </li>
  );
};
