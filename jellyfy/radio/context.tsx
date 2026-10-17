"use client";

import { createContext } from "react";

export type RadioContextValue = {
  name: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
};

export const RadioContext = createContext<RadioContextValue>({
  name: "jellyfy-radio",
});
