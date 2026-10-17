"use client";

import type { FC, ReactNode } from "react";

type SelectMenuProps = {
  id: string;
  children: ReactNode;
};

export const SelectMenu: FC<SelectMenuProps> = ({ id, children }) => {
  return (
    <ul
      id={id}
      role="listbox"
      className="jellyfy-overlay noise absolute z-20 mt-2 w-full p-1.5 backdrop-blur-sm"
    >
      {children}
    </ul>
  );
};
