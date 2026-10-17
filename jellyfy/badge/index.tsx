import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type BadgeTone = "primary" | "success" | "error" | "warning";

const toneClass: Record<BadgeTone, string> = {
  primary: "jellyfy-tone-primary",
  success: "jellyfy-tone-success",
  error: "jellyfy-tone-error",
  warning: "jellyfy-tone-warning",
};

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
};

export const Badge: FC<BadgeProps> = ({ tone = "primary", children, className }) => {
  return (
    <span
      className={twMerge(
        "noise inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
};
