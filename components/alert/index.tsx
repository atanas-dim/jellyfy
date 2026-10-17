import { CircleAlertIcon, CircleCheckIcon, TriangleAlertIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { type Color, colorClass } from "../foundation/color";

type AlertProps = {
  color?: Color;
  title: string;
  children?: ReactNode;
  className?: string;
};

export const Alert: FC<AlertProps> = ({ color = "warning", title, children, className }) => {
  const Icon =
    color === "success" ? CircleCheckIcon : color === "error" ? CircleAlertIcon : TriangleAlertIcon;

  return (
    <div
      role="status"
      className={twMerge(
        "jellyfy-surface noise flex gap-3 px-4 py-3 backdrop-blur-sm",
        colorClass(color),
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        {children ? <p className="mt-1 text-sm leading-6">{children}</p> : null}
      </div>
    </div>
  );
};
