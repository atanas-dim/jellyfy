import type { CSSProperties, ReactNode } from "react";
import { twJoin } from "tailwind-merge";

const THICKNESS = [
  ["thickness-surface", "Surface", "size-full"],
  ["thickness-field", "Field", "size-full"],
  ["thickness-control", "Control", "size-full"],
  ["thickness-mark", "Mark", "size-16"],
] as const;

const RoleSwatches = () => (
  <div className="mt-8 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
    {THICKNESS.map(([className, label, size]) => (
      <figure key={className} className="flex flex-col items-center gap-2">
        <div className="flex h-24 w-full items-center justify-center">
          <div className={twJoin(className, size, "rounded-2xl")} />
        </div>
        <figcaption className="text-center text-sm text-neutral-600 dark:text-neutral-300">
          {label}
        </figcaption>
      </figure>
    ))}
  </div>
);

const SLOTS = [
  ["primary", "Primary"],
  ["secondary", "Secondary"],
  ["tertiary", "Tertiary"],
  ["neutral", "Neutral"],
  ["success", "Success"],
  ["warning", "Warning"],
  ["error", "Error"],
  ["info", "Info"],
] as const;

const RAMP = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

const Sample = ({
  label,
  className,
  style,
  fill = "size-full",
}: {
  label: string;
  className?: string;
  style?: CSSProperties;
  fill?: string;
}) => (
  <figure className="flex w-full flex-col items-center gap-2">
    <div className="flex h-20 w-full items-center justify-center">
      <div className={twJoin("rounded-2xl", className, fill)} style={style} />
    </div>
    <figcaption className="text-center text-sm text-neutral-600 dark:text-neutral-300">
      {label}
    </figcaption>
  </figure>
);

const ColorSamples = () => (
  <div className="mt-8 flex max-w-3xl flex-col gap-8">
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {SLOTS.map(([slot, label]) => (
        <Sample
          key={slot}
          label={label}
          style={{ backgroundColor: `var(--color-${slot})` }}
        />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Sample label="Plain" className="thickness-surface" />
      <Sample
        label="Wash"
        className="primary thickness-surface"
        style={{
          backgroundColor:
            "color-mix(in oklab, color-mix(in oklab, var(--color-plain) var(--wash), var(--solid)) var(--wash-opacity), transparent)",
          color: "var(--color-plain-content)",
        }}
      />
      <Sample
        label="Control"
        className="primary thickness-control"
        style={{
          backgroundColor:
            "color-mix(in oklab, var(--solid) var(--material-opacity), transparent)",
          color: "var(--content)",
        }}
      />
      <Sample
        label="Selected"
        style={{
          backgroundColor:
            "color-mix(in oklab, var(--color-primary) var(--menu-selected), var(--color-menu))",
          color: "var(--color-plain-content)",
        }}
      />
    </div>
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-11">
      {RAMP.map((step) => (
        <Sample
          key={step}
          label={step}
          fill="size-10"
          className="border border-neutral-950/20 dark:border-neutral-50/30"
          style={{ backgroundColor: `var(--color-neutral-${step})` }}
        />
      ))}
    </div>
  </div>
);

export const examples: Record<string, ReactNode> = {
  roles: <RoleSwatches />,
  color: <ColorSamples />,
};
