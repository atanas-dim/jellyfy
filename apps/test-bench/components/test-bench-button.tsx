import type { ButtonHTMLAttributes, FC } from "react";
import { twJoin } from "tailwind-merge";

type TestBenchButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const TestBenchButton: FC<TestBenchButtonProps> = ({
  variant = "primary",
  className,
  type = "button",
  ...props
}) => (
  <button
    type={type}
    className={twJoin(
      "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-50",
      variant === "primary"
        ? "border-neutral-900 bg-neutral-900 text-white enabled:hover:border-neutral-700 enabled:hover:bg-neutral-700 enabled:active:border-neutral-950 enabled:active:bg-neutral-950"
        : "border-neutral-300 bg-white text-neutral-900 enabled:hover:border-neutral-400 enabled:hover:bg-neutral-100 enabled:active:bg-neutral-200",
      className,
    )}
    {...props}
  />
);
