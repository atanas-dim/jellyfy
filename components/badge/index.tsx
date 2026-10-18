import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { type Color, colorClass } from "../foundation/color";

type BadgeProps = {
  color?: Color;
  children: ReactNode;
  className?: string;
};

export const Badge: FC<BadgeProps> = ({
  color = "primary",
  children,
  className,
}) => {
  return (
    <span
      className={twMerge(
        "jellyfy-badge noise inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase backdrop-blur-sm",
        colorClass(color),
        className,
      )}
    >
      {children}
    </span>
  );
};
