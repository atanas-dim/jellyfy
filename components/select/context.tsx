"use client";

import { createContext } from "react";

import type { Color } from "../foundation/color";

export type SelectContextValue = {
  value?: string;
  color: Color;
  register: (value: string, label: string) => void;
  choose: (value: string) => void;
};

export const SelectContext = createContext<SelectContextValue>({
  color: "neutral",
  register: () => undefined,
  choose: () => undefined,
});
