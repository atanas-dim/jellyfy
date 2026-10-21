import type { CSSProperties, ReactNode } from "react";
import { twJoin } from "tailwind-merge";

const THICKNESS = [
  ["--thickness-surface", "Surface", "size-full"],
  ["--thickness-field", "Field", "size-full"],
  ["--thickness-control", "Control", "size-full"],
  ["--thickness-mark", "Mark", "size-16"],
] as const;

type ThemeName = "light" | "dark";

const captionClass = {
  light: "text-center text-sm text-neutral-600",
  dark: "text-center text-sm text-neutral-300",
} as const;

const pairEdge = {
  light: "border border-neutral-950/20",
  dark: "border border-neutral-50/30",
} as const;

const ThemePair = ({ render }: { render: (theme: ThemeName) => ReactNode }) => (
  <div className="mt-8 flex max-w-3xl flex-col gap-8">
    <div className="light rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-950">
      <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
        Light
      </p>
      {render("light")}
    </div>
    <div className="dark rounded-2xl border border-neutral-800 bg-black p-6 text-neutral-100">
      <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-neutral-400 uppercase">
        Dark
      </p>
      {render("dark")}
    </div>
  </div>
);

const RoleSwatches = () => (
  <ThemePair
    render={(theme) => (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {THICKNESS.map(([variable, label, size]) => (
          <figure key={variable} className="flex flex-col items-center gap-2">
            <div className="flex h-24 w-full items-center justify-center">
              <div
                className={twJoin(size, "rounded-2xl", pairEdge[theme])}
                style={{
                  backgroundColor: "var(--color-plain)",
                  boxShadow: `var(${variable})`,
                }}
              />
            </div>
            <figcaption className={captionClass[theme]}>{label}</figcaption>
          </figure>
        ))}
      </div>
    )}
  />
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

const SWATCH_EDGE = "border border-neutral-950/20 dark:border-neutral-50/30";

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
          className={SWATCH_EDGE}
          style={{ backgroundColor: `var(--color-${slot})` }}
        />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Sample
        label="Plain"
        className={SWATCH_EDGE}
        style={{
          backgroundColor:
            "color-mix(in oklab, var(--color-plain) var(--material-opacity), transparent)",
        }}
      />
      <Sample
        label="Wash"
        className={twJoin("primary", SWATCH_EDGE)}
        style={{
          backgroundColor:
            "color-mix(in oklab, color-mix(in oklab, var(--color-plain) var(--wash), var(--solid)) var(--wash-opacity), transparent)",
          color: "var(--color-plain-content)",
        }}
      />
      <Sample
        label="Control"
        className={twJoin("primary", SWATCH_EDGE)}
        style={{
          backgroundColor:
            "color-mix(in oklab, var(--solid) var(--material-opacity), transparent)",
          color: "var(--content)",
        }}
      />
      <Sample
        label="Selected"
        className={SWATCH_EDGE}
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
          className={SWATCH_EDGE}
          style={{ backgroundColor: `var(--color-neutral-${step})` }}
        />
      ))}
    </div>
  </div>
);

const CONTROL_FILL =
  "color-mix(in oklab, var(--solid) var(--material-opacity), transparent)";
const WASH =
  "color-mix(in oklab, color-mix(in oklab, var(--color-plain) var(--wash), var(--solid)) var(--wash-opacity), transparent)";
const WASH_FOCUS =
  "color-mix(in oklab, color-mix(in oklab, var(--color-plain) var(--wash-focus), var(--solid)) var(--wash-opacity), transparent)";

const LightSwatches = ({
  slot,
  name,
  theme,
}: {
  slot?: string;
  name: string;
  theme: ThemeName;
}) => (
  <>
    <figure className="flex flex-col items-center gap-2">
      <div
        className={twJoin(
          slot,
          "thickness-control relative h-12 w-full overflow-hidden rounded-full",
        )}
        style={slot ? { backgroundColor: CONTROL_FILL } : undefined}
      >
        <span
          className="pointer-events-none absolute top-[60%] left-1/2 h-[60%] w-[90%] rounded-full"
          style={{
            background:
              "radial-gradient(var(--control-highlight), transparent 60%)",
            transform: "translate(-50%, -40%)",
          }}
        />
        <span
          className="pointer-events-none absolute top-[42%] left-1/2 h-1/2 w-[90%] rounded-full"
          style={{
            background:
              "radial-gradient(var(--control-shade), transparent 60%)",
            transform: "translate(-50%, -75%)",
          }}
        />
      </div>
      <figcaption className={captionClass[theme]}>{name} pressed</figcaption>
    </figure>
    <figure className="flex flex-col items-center gap-2">
      <div
        className={twJoin(
          slot,
          "thickness-field relative h-24 w-full overflow-hidden rounded-2xl",
        )}
        style={
          {
            "--jelly-thickness": "var(--thickness-field-focus)",
            ...(slot ? { backgroundColor: WASH_FOCUS } : {}),
          } as CSSProperties
        }
      >
        <span
          className="pointer-events-none absolute bottom-[-1rem] left-1/2 h-[1.75rem] w-[70%] rounded-full"
          style={{
            background:
              "radial-gradient(var(--field-highlight), transparent 60%)",
            transform: "translate(-50%, -40%)",
          }}
        />
        <span
          className="pointer-events-none absolute top-[1.4rem] left-1/2 h-[2.1rem] w-[90%] rounded-full"
          style={{
            background: "radial-gradient(var(--field-shade), transparent 60%)",
            transform: "translate(-50%, -75%)",
          }}
        />
      </div>
      <figcaption className={captionClass[theme]}>{name} focused</figcaption>
    </figure>
    <figure className="flex flex-col items-center gap-2">
      <div
        className={twJoin(
          slot,
          "thickness-surface flex h-24 w-full items-center justify-center rounded-2xl",
        )}
        style={slot ? { backgroundColor: WASH } : undefined}
      >
        <div className="relative size-8">
          <span
            className="pointer-events-none absolute top-[0.15rem] left-1/2 h-4 w-[1.75rem] rounded-full"
            style={{
              background:
                "radial-gradient(var(--bump-highlight), transparent 70%)",
              transform: "translate(-50%, 0)",
            }}
          />
          <span
            className="pointer-events-none absolute top-[0.85rem] left-1/2 h-4 w-[1.75rem] rounded-full"
            style={{
              background: "radial-gradient(var(--bump-shade), transparent 70%)",
              transform: "translate(-50%, 0)",
            }}
          />
        </div>
      </div>
      <figcaption className={captionClass[theme]}>{name} bump</figcaption>
    </figure>
  </>
);

const MaterialSamples = () => (
  <ThemePair
    render={(theme) => (
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
          {(
            [
              ["thickness-surface", "Surface", "size-full", undefined],
              ["thickness-field", "Field", "size-full", undefined],
              [
                "thickness-field",
                "Field focused",
                "size-full",
                "var(--thickness-field-focus)",
              ],
              ["thickness-control", "Control", "size-full", undefined],
              ["thickness-mark", "Mark", "size-16", undefined],
            ] as const
          ).map(([className, label, size, thickness]) => (
            <figure key={label} className="flex flex-col items-center gap-2">
              <div className="flex h-24 w-full items-center justify-center">
                <div
                  className={twJoin(className, size, "rounded-2xl")}
                  style={
                    thickness
                      ? ({ "--jelly-thickness": thickness } as CSSProperties)
                      : undefined
                  }
                />
              </div>
              <figcaption className={captionClass[theme]}>{label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <LightSwatches name="Plain" theme={theme} />
          <LightSwatches slot="primary" name="Primary" theme={theme} />
        </div>
      </div>
    )}
  />
);

const ELEVATION = [
  ["--elevation-rest", "Rest", "h-16 w-full", false],
  ["--elevation-hover", "Hover", "h-16 w-full", true],
  ["--elevation-mark", "Mark", "size-16", false],
  ["--elevation-overlay", "Overlay", "h-16 w-full", false],
  ["--elevation-disabled", "Disabled", "h-16 w-full", false],
] as const;

const ElevationSamples = () => (
  <ThemePair
    render={(theme) => (
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
        {ELEVATION.map(([variable, label, size, risen]) => (
          <figure key={variable} className="flex flex-col items-center gap-3">
            <div className="flex h-24 w-full items-end justify-center pb-2">
              <div
                className={twJoin(size, "rounded-2xl", pairEdge[theme])}
                style={{
                  backgroundColor: "var(--color-plain)",
                  boxShadow: `var(${variable})`,
                  transform: risen ? "translateY(-2px)" : undefined,
                }}
              />
            </div>
            <figcaption className={captionClass[theme]}>{label}</figcaption>
          </figure>
        ))}
      </div>
    )}
  />
);

export const examples: Record<string, ReactNode> = {
  roles: <RoleSwatches />,
  color: <ColorSamples />,
  material: <MaterialSamples />,
  elevation: <ElevationSamples />,
};
