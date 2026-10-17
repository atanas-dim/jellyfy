import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type FieldTone = "idle" | "error" | "success";

type FloatLabelProps = {
  htmlFor: string;
  leading?: boolean;
  tone?: FieldTone;
  children: ReactNode;
};

export const FloatLabel: FC<FloatLabelProps> = ({
  htmlFor,
  leading = false,
  tone = "idle",
  children,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        "pointer-events-none absolute top-2 left-4 z-20 origin-left font-medium tracking-wide",
        leading && "left-10",
        "text-[10px] font-medium text-neutral-500",
        "peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal",
        "ease-out motion-safe:transition-all motion-safe:duration-300",
        tone === "error" && "text-error-foreground",
        tone === "success" && "text-success-foreground",
      )}
    >
      {children}
    </label>
  );
};
