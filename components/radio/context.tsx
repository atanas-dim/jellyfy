"use client";

import { createContext } from "react";

import type { Color } from "../foundation/color";

export type RadioContextValue = {
  name: string;
  value?: string;
  defaultValue?: string;
  color?: Color;
  disabled?: boolean;
  invalid?: boolean;
  onValueChange?: (value: string) => void;
};

export const RadioContext = createContext<RadioContextValue>({
  name: "jellyfy-radio",
});
