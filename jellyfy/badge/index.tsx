import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type BadgeTone = "primary" | "success" | "error" | "warning";

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
        tone === "primary" && "jellyfy-tone-primary",
        tone === "success" && "jellyfy-tone-success",
        tone === "error" && "jellyfy-tone-error",
        tone === "warning" && "jellyfy-tone-warning",
        className,
      )}
    >
      {children}
    </span>
  );
};
