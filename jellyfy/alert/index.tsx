import { CircleAlertIcon, CircleCheckIcon, TriangleAlertIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type AlertTone = "success" | "error" | "warning";

const toneClass: Record<AlertTone, string> = {
  success: "jellyfy-tone-success",
  error: "jellyfy-tone-error",
  warning: "jellyfy-tone-warning",
};

const icon: Record<AlertTone, FC<{ className?: string }>> = {
  success: CircleCheckIcon,
  error: CircleAlertIcon,
  warning: TriangleAlertIcon,
};

type AlertProps = {
  tone?: AlertTone;
  title: string;
  children?: ReactNode;
  className?: string;
};

export const Alert: FC<AlertProps> = ({ tone = "warning", title, children, className }) => {
  const Icon = icon[tone];

  return (
    <div
      role="status"
      className={twMerge(
        "jellyfy-surface noise flex gap-3 px-4 py-3 backdrop-blur-sm",
        toneClass[tone],
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
