"use client";

import { createContext } from "react";

export type SelectContextValue = {
  value?: string;
  register: (value: string, label: string) => void;
  choose: (value: string) => void;
};

export const SelectContext = createContext<SelectContextValue>({
  register: () => undefined,
  choose: () => undefined,
});
