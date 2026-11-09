import type { FC, ReactNode } from "react";

export const openDialog = (id: string) => {
  const dialog = document.getElementById(id);
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

export const Plus: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Info: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 8h.01" />
  </svg>
);

type OverrideExampleProps = {
  name: string;
  classes: string;
  children: ReactNode;
};

export const OverrideExample: FC<OverrideExampleProps> = ({
  name,
  classes,
  children,
}) => (
  <article className="grid content-start gap-3 rounded-xl border border-neutral-300 p-4">
    <h3 className="font-semibold">{name}</h3>
    <code className="text-sm break-words text-neutral-500">{classes}</code>
    {children}
  </article>
);

type RangeProps = { className: string; label: string; value: number };

export const Range: FC<RangeProps> = ({ className, label, value }) => (
  <label className={className}>
    {label}
    <span className="range-box">
      <span className="range-track">
        <span className="range-fill" />
      </span>
      <span className="range-thumb" />
      <input type="range" defaultValue={value} />
    </span>
  </label>
);
