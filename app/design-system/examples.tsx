import type { CSSProperties, ReactNode } from "react";
import { twJoin } from "tailwind-merge";

import { ThemeFrame } from "@/app/stripe-switch";
import { MotionFace, SquishControl } from "@/app/motion-demo";

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
    <ThemeFrame theme="light">{render("light")}</ThemeFrame>
    <ThemeFrame theme="dark">{render("dark")}</ThemeFrame>
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
            "color-mix(in oklab, color-mix(in oklab, var(--color-plain) var(--percent-plain-resting-wash), var(--solid)) var(--percent-shown-wash), transparent)",
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
            "color-mix(in oklab, var(--color-primary) var(--percent-solid-menu-selected), var(--color-menu))",
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
  "color-mix(in oklab, color-mix(in oklab, var(--color-plain) var(--percent-plain-resting-wash), var(--solid)) var(--percent-shown-wash), transparent)";
const WASH_FOCUS =
  "color-mix(in oklab, color-mix(in oklab, var(--color-plain) var(--percent-plain-focused-wash), var(--solid)) var(--percent-shown-wash), transparent)";

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

const SHAPE = [
  ["--radius-surface", "Surface", "h-16 w-full"],
  ["--radius-field", "Field", "h-12 w-full"],
  ["--radius-control", "Control", "h-12 w-full"],
  ["--radius-mark", "Mark", "size-16"],
] as const;

const ShapeSamples = () => (
  <ThemePair
    render={(theme) => (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {SHAPE.map(([variable, label, size]) => (
          <figure key={variable} className="flex flex-col items-center gap-3">
            <div className="flex h-24 w-full items-center justify-center">
              <div
                className={twJoin(size, pairEdge[theme])}
                style={{
                  backgroundColor: "var(--color-plain)",
                  borderRadius: `var(${variable})`,
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

const TYPE: {
  label: string;
  text: string;
  style: CSSProperties;
}[] = [
  {
    label: "Button label",
    text: "Save",
    style: {
      fontSize: "0.875rem",
      fontWeight: 600,
      letterSpacing: "0.04em",
      lineHeight: 1,
      textTransform: "uppercase",
    },
  },
  {
    label: "Field value",
    text: "Jane Cooper",
    style: { fontSize: "1rem", lineHeight: 1.5 },
  },
  {
    label: "Field label, resting",
    text: "Email",
    style: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "color-mix(in oklab, currentColor 70%, transparent)",
    },
  },
  {
    label: "Field label, floated",
    text: "Email",
    style: {
      fontSize: "10px",
      fontWeight: 500,
      letterSpacing: "0.04em",
      lineHeight: 1,
    },
  },
  {
    label: "Checkbox, radio, and toggle label",
    text: "Remember me",
    style: { fontSize: "0.875rem", fontWeight: 500 },
  },
  {
    label: "Range label",
    text: "Volume",
    style: { fontSize: "0.875rem", fontWeight: 500 },
  },
  {
    label: "Message",
    text: "This field is required",
    style: { fontSize: "0.75rem" },
  },
  {
    label: "Alert and card",
    text: "The pour stays quiet until you press it.",
    style: { fontSize: "1rem", lineHeight: 1.5 },
  },
  {
    label: "Badge",
    text: "New",
    style: {
      fontSize: "10px",
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    },
  },
];

const PAGE_CAPTION = "text-sm text-neutral-600 dark:text-neutral-300";

const TypeSamples = () => (
  <div className="mt-8 flex max-w-3xl flex-col gap-5">
    <div className="flex items-center justify-between gap-6">
      <p className={PAGE_CAPTION}>Icon button icon</p>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ width: "1.5rem", height: "1.5rem" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    </div>
    {TYPE.map((row) => (
      <div
        key={row.label}
        className="flex items-baseline justify-between gap-6"
      >
        <p className={PAGE_CAPTION}>{row.label}</p>
        <p style={row.style}>{row.text}</p>
      </div>
    ))}
  </div>
);

const SPACING = "var(--spacing, 0.25rem)";

const SpacingSamples = () => (
  <div className="mt-8 grid max-w-3xl grid-cols-3 items-end gap-6">
    <figure className="flex flex-col items-center gap-3">
      <div className="flex h-24 w-full items-end justify-center">
        <div
          className={twJoin("w-full", SWATCH_EDGE)}
          style={{
            height: `calc(1 * ${SPACING})`,
            backgroundColor: "var(--color-plain)",
          }}
        />
      </div>
      <figcaption className={twJoin(PAGE_CAPTION, "text-center")}>
        1 unit tall
      </figcaption>
    </figure>
    <figure className="flex flex-col items-center gap-3">
      <div className="flex h-24 w-full items-end justify-center">
        <div
          className={twJoin("w-full", SWATCH_EDGE)}
          style={{
            height: `calc(12 * ${SPACING})`,
            borderRadius: "var(--radius-control)",
            backgroundColor: "var(--color-plain)",
          }}
        />
      </div>
      <figcaption className={twJoin(PAGE_CAPTION, "text-center")}>
        12 units tall
      </figcaption>
    </figure>
    <figure className="flex flex-col items-center gap-3">
      <div className="flex h-24 w-full items-end justify-center">
        <div
          className={twJoin("relative w-full", SWATCH_EDGE)}
          style={{
            height: `calc(12 * ${SPACING})`,
            borderRadius: "var(--radius-field)",
            backgroundColor: "var(--color-plain)",
          }}
        >
          <span
            className="absolute left-3"
            style={{
              top: `calc(3 * ${SPACING})`,
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            Email
          </span>
        </div>
      </div>
      <figcaption className={twJoin(PAGE_CAPTION, "text-center")}>
        3 units from the top
      </figcaption>
    </figure>
  </div>
);

const SHEENS = [
  ["jelly-sheen-light", "1.35s", "0s"],
  ["jelly-sheen-shade", "1.65s", "0.36s"],
  ["jelly-sheen-light", "1.5s", "0.78s"],
] as const;

const ORBITS = [
  ["jelly-orbit-light", "0deg", "1.35s"],
  ["jelly-orbit-shade", "130deg", "2.2s"],
  ["jelly-orbit-light", "240deg", "1.6s"],
] as const;

const MotionSamples = () => (
  <ThemePair
    render={(theme) => (
      <div className="grid grid-cols-2 gap-6">
        <figure className="flex flex-col items-center gap-3">
          <SquishControl className={pairEdge[theme]} />
          <figcaption className={captionClass[theme]}>
            Press and hold
          </figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <MotionFace className={twJoin("jelly-rise", pairEdge[theme])}>
            Hover
          </MotionFace>
          <figcaption className={captionClass[theme]}>Rises 2px</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <MotionFace className={twJoin("primary", pairEdge[theme])}>
            <span className="jelly-lights">
              {SHEENS.map(([tone, duration, delay]) => (
                <span
                  key={`${duration}-${delay}`}
                  className={twJoin("jelly-sheen", tone)}
                  style={
                    {
                      "--sheen-duration": duration,
                      "--sheen-delay": delay,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
          </MotionFace>
          <figcaption className={captionClass[theme]}>Loading sweep</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <MotionFace
            className={twJoin("primary mx-auto", pairEdge[theme])}
            style={{ width: "calc(12 * var(--spacing, 0.25rem))" }}
          >
            {ORBITS.map(([tone, angle, duration]) => (
              <span
                key={angle}
                className="jelly-orbit-arm"
                style={{ transform: `rotate(${angle})` }}
              >
                <span
                  className="jelly-orbit"
                  style={{ "--orbit-duration": duration } as CSSProperties}
                >
                  <span className={twJoin("jelly-orbit-dot", tone)} />
                </span>
              </span>
            ))}
          </MotionFace>
          <figcaption className={captionClass[theme]}>Loading orbit</figcaption>
        </figure>
      </div>
    )}
  />
);

const STATE_FACE =
  "primary relative flex h-12 w-full items-center justify-center overflow-hidden text-sm font-semibold tracking-[0.04em] uppercase";

const stateFill = {
  backgroundColor: CONTROL_FILL,
  borderRadius: "var(--radius-control)",
  color: "var(--color-primary-content)",
} as const;

const InteractionSamples = () => (
  <ThemePair
    render={(theme) => (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <figure className="flex flex-col items-center gap-3">
          <div
            className={twJoin(STATE_FACE, pairEdge[theme])}
            style={{ ...stateFill, boxShadow: "var(--elevation-rest)" }}
          >
            Rest
          </div>
          <figcaption className={captionClass[theme]}>Rest</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className={twJoin(STATE_FACE, pairEdge[theme])}
            style={{
              ...stateFill,
              boxShadow: "var(--elevation-hover)",
              transform: "translateY(-2px)",
            }}
          >
            Hover
          </div>
          <figcaption className={captionClass[theme]}>Hover</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className={twJoin(STATE_FACE, pairEdge[theme])}
            style={{ ...stateFill, boxShadow: "var(--elevation-rest)" }}
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
            Press
          </div>
          <figcaption className={captionClass[theme]}>Press</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className={twJoin(STATE_FACE, pairEdge[theme])}
            style={{
              ...stateFill,
              outline: "1px solid var(--solid)",
              outlineOffset: "2px",
              boxShadow: "0 0 0 2px var(--focus-gap), var(--elevation-rest)",
            }}
          >
            Focus
          </div>
          <figcaption className={captionClass[theme]}>Focus</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className={twJoin(STATE_FACE, pairEdge[theme])}
            style={{ ...stateFill, boxShadow: "var(--elevation-rest)" }}
          >
            On
          </div>
          <figcaption className={captionClass[theme]}>Selected</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className={twJoin(
              "relative flex h-12 w-full items-center justify-center text-sm font-semibold tracking-[0.04em] uppercase",
              pairEdge[theme],
            )}
            style={{
              borderRadius: "var(--radius-control)",
              backgroundColor:
                "color-mix(in oklab, var(--color-disabled) 60%, transparent)",
              color:
                "color-mix(in oklab, var(--color-disabled-content) 70%, transparent)",
              boxShadow: "var(--elevation-disabled)",
              cursor: "not-allowed",
            }}
          >
            Off
          </div>
          <figcaption className={captionClass[theme]}>Disabled</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className={twJoin(
              "error flex h-12 w-full items-center justify-center text-sm",
              pairEdge[theme],
            )}
            style={{
              borderRadius: "var(--radius-field)",
              backgroundColor: WASH,
              color: "var(--color-plain-content)",
            }}
          >
            Error
          </div>
          <figcaption className={captionClass[theme]}>Error</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <MotionFace className={twJoin("primary", pairEdge[theme])}>
            <span className="jelly-lights">
              {SHEENS.map(([tone, duration, delay]) => (
                <span
                  key={`${tone}-${delay}`}
                  className={twJoin("jelly-sheen", tone)}
                  style={
                    {
                      "--sheen-duration": duration,
                      "--sheen-delay": delay,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
            Load
          </MotionFace>
          <figcaption className={captionClass[theme]}>Loading</figcaption>
        </figure>
      </div>
    )}
  />
);

const THEME_SWATCHES = [
  ["Neutral slot", "var(--color-neutral)"],
  ["Surface", "var(--color-plain)"],
  ["Menu", "var(--color-menu)"],
  ["Plain content", "var(--color-plain-content)"],
  [
    "Disabled fill",
    "color-mix(in oklab, var(--color-disabled) 60%, transparent)",
  ],
  [
    "Disabled text",
    "color-mix(in oklab, var(--color-disabled-content) 70%, transparent)",
  ],
  ["Focus gap", "var(--focus-gap)"],
] as const;

const ThemeSamples = () => (
  <ThemePair
    render={(theme) => (
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {THEME_SWATCHES.map(([label, fill]) => (
            <figure key={label} className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-full items-center justify-center">
                <div
                  className={twJoin("size-full rounded-2xl", pairEdge[theme])}
                  style={{ backgroundColor: fill }}
                />
              </div>
              <figcaption className={captionClass[theme]}>{label}</figcaption>
            </figure>
          ))}
          <figure className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-full items-center justify-center">
              <div
                className="thickness-surface size-full rounded-2xl"
                style={{ backgroundColor: "var(--color-plain)" }}
              />
            </div>
            <figcaption className={captionClass[theme]}>Grain</figcaption>
          </figure>
        </div>
      </div>
    )}
  />
);

export const examples: Record<string, ReactNode> = {
  roles: <RoleSwatches />,
  color: <ColorSamples />,
  material: <MaterialSamples />,
  elevation: <ElevationSamples />,
  shape: <ShapeSamples />,
  typography: <TypeSamples />,
  spacing: <SpacingSamples />,
  motion: <MotionSamples />,
  "interaction-states": <InteractionSamples />,
  themes: <ThemeSamples />,
};
