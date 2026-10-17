import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export const Card: FC<CardProps> = ({ title, children, className }) => {
  return (
    <section
      className={twMerge(
        "jellyfy-panel noise px-5 py-4 backdrop-blur-sm",
        className,
      )}
    >
      {title ? <h3 className="text-base font-semibold">{title}</h3> : null}
      <div className={title ? "mt-2 text-sm leading-6" : "text-sm leading-6"}>{children}</div>
    </section>
  );
};
