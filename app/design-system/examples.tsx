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

const Plus = ({ size }: { size: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    style={{ width: size, height: size }}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const controlStyle: CSSProperties = {
  backgroundColor: CONTROL_FILL,
  borderRadius: "var(--radius-control)",
  color: "var(--color-primary-content)",
  boxShadow: "var(--thickness-control), var(--elevation-rest)",
};

const fieldStyle: CSSProperties = {
  backgroundColor: WASH,
  borderRadius: "var(--radius-field)",
  color: "var(--color-plain-content)",
  boxShadow: "var(--thickness-field)",
};

const surfaceStyle: CSSProperties = {
  backgroundColor: WASH,
  borderRadius: "var(--radius-surface)",
  color: "var(--color-plain-content)",
  boxShadow: "var(--thickness-surface), var(--elevation-rest)",
};

const ComponentSamples = () => (
  <ThemePair
    render={(theme) => (
      <div className="flex flex-col gap-8">
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Button
          </figcaption>
          <div className="flex flex-wrap items-end gap-3">
            <button className="btn btn-sm primary" type="button">
              <span>Small</span>
            </button>
            <button className="btn primary" type="button">
              <span>Save</span>
            </button>
            <button className="btn btn-lg primary" type="button">
              <span>Large</span>
            </button>
            <button className="btn primary" type="button" disabled>
              <span>Disabled</span>
            </button>
            <button className="btn primary loading" type="button">
              <span>Loading</span>
            </button>
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Icon button
          </figcaption>
          <div
            className={twJoin(
              "primary thickness-control flex size-12 items-center justify-center",
              pairEdge[theme],
            )}
            style={controlStyle}
          >
            <Plus size="1.5rem" />
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Bump button
          </figcaption>
          <div
            className="relative flex size-8 items-center justify-center"
            style={{
              borderRadius: "var(--radius-control)",
              color: "var(--color-plain-content)",
            }}
          >
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
                background:
                  "radial-gradient(var(--bump-shade), transparent 70%)",
                transform: "translate(-50%, 0)",
              }}
            />
            <Plus size="1.25rem" />
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Input
          </figcaption>
          <div className="flex w-full flex-col gap-3">
            <label className="input input-sm primary">
              <input placeholder=" " defaultValue="ada@jellyfy.dev" />
              <span>Small</span>
            </label>
            <label className="input primary">
              <input placeholder=" " defaultValue="ada@jellyfy.dev" />
              <span>Email</span>
            </label>
            <label className="input input-lg primary">
              <input placeholder=" " defaultValue="ada@jellyfy.dev" />
              <span>Large</span>
            </label>
            <label className="input primary">
              <input placeholder=" " />
              <span>Name</span>
            </label>
            <label className="input primary">
              <span className="input-start" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </span>
              <input placeholder=" " />
              <span>Search</span>
            </label>
            <label className="input primary">
              <input placeholder=" " defaultValue="ada@jellyfy.dev" disabled />
              <span>Disabled</span>
            </label>
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Textarea
          </figcaption>
          <div className="flex w-full flex-col gap-3">
            <label className="textarea textarea-sm primary">
              <textarea placeholder=" " defaultValue="A short note." />
              <span>Small</span>
            </label>
            <label className="textarea primary">
              <textarea
                placeholder=" "
                defaultValue="The pour stays quiet until you press it."
              />
              <span>Note</span>
            </label>
            <label className="textarea textarea-lg primary">
              <textarea placeholder=" " defaultValue="A longer note." />
              <span>Large</span>
            </label>
            <label className="textarea primary">
              <textarea placeholder=" " />
              <span>Message</span>
            </label>
            <label className="textarea primary">
              <textarea
                placeholder=" "
                defaultValue="The pour stays quiet until you press it."
                disabled
              />
              <span>Disabled</span>
            </label>
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Select
          </figcaption>
          <div
            className={twJoin(
              "primary thickness-field relative h-12 w-full",
              pairEdge[theme],
            )}
            style={fieldStyle}
          >
            <span
              className="absolute"
              style={{
                top: "0.75rem",
                left: "1rem",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              Tone
            </span>
            <span
              className="absolute"
              style={{ left: "1rem", bottom: "0.625rem", fontSize: "1rem" }}
            >
              Primary
            </span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="absolute top-1/2 right-4 size-5 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Checkbox
          </figcaption>
          <div className="flex items-center gap-3">
            <div
              className={twJoin(
                "primary thickness-mark flex size-6 items-center justify-center",
                pairEdge[theme],
              )}
              style={{
                backgroundColor: CONTROL_FILL,
                borderRadius: "var(--radius-mark)",
                boxShadow: "var(--thickness-mark), var(--elevation-mark)",
                color: "var(--color-primary-content)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12.5 10 17 19 7" />
              </svg>
            </div>
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
              Remember me
            </span>
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Radio
          </figcaption>
          <div className="flex items-center gap-3">
            <div
              className={twJoin(
                "primary thickness-mark flex size-6 items-center justify-center",
                pairEdge[theme],
              )}
              style={{
                borderRadius: "var(--radius-control)",
                boxShadow: "var(--thickness-mark)",
                backgroundColor: "var(--color-plain)",
              }}
            >
              <span
                className="size-3.5 rounded-full"
                style={{ backgroundColor: CONTROL_FILL }}
              />
            </div>
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
              Primary
            </span>
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Toggle
          </figcaption>
          <div className="flex items-center gap-3">
            <div
              className={twJoin(
                "primary thickness-mark relative h-7 w-12",
                pairEdge[theme],
              )}
              style={{
                borderRadius: "var(--radius-control)",
                backgroundColor: CONTROL_FILL,
                boxShadow: "var(--thickness-mark)",
              }}
            >
              <span
                className="absolute top-1 size-5 rounded-full bg-white"
                style={{
                  left: "calc(0.25rem + 1.15rem)",
                  boxShadow: "var(--thickness-mark)",
                }}
              />
            </div>
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>On</span>
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Range
          </figcaption>
          <div className="relative flex h-8 w-full max-w-96 items-center">
            <div
              className={twJoin("thickness-mark h-3 w-full", pairEdge[theme])}
              style={{
                borderRadius: "var(--radius-control)",
                backgroundColor: "var(--color-plain)",
                boxShadow: "var(--thickness-mark)",
              }}
            />
            <div
              className="primary absolute left-0 h-3 w-2/5"
              style={{
                borderRadius: "var(--radius-control)",
                backgroundColor: CONTROL_FILL,
              }}
            />
            <span
              className={twJoin(
                "primary absolute left-[40%] size-6 -translate-x-1/2 rounded-full",
                pairEdge[theme],
              )}
              style={{
                backgroundColor: CONTROL_FILL,
                boxShadow: "var(--thickness-mark), var(--elevation-mark)",
              }}
            />
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Alert
          </figcaption>
          <div
            className={twJoin(
              "primary thickness-surface flex items-center gap-3 px-4 py-3 text-base",
              pairEdge[theme],
            )}
            style={surfaceStyle}
          >
            <Plus size="1.25rem" />
            <p style={{ lineHeight: 1.5 }}>
              The pour stays quiet until you press it.
            </p>
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Badge
          </figcaption>
          <div
            className={twJoin(
              "primary thickness-surface inline-flex w-fit px-2.5 py-1",
              pairEdge[theme],
            )}
            style={{
              ...controlStyle,
              boxShadow: "var(--thickness-surface), var(--elevation-mark)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            New
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Card
          </figcaption>
          <div
            className={twJoin(
              "primary thickness-surface px-5 py-4 text-base",
              pairEdge[theme],
            )}
            style={surfaceStyle}
          >
            <p style={{ lineHeight: 1.5 }}>A quiet surface for a short note.</p>
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Modal
          </figcaption>
          <div
            className="relative flex min-h-40 items-center justify-center p-4"
            style={{
              backgroundColor:
                "color-mix(in oklab, var(--color-neutral-950, #0a0a0a) 40%, transparent)",
              borderRadius: "var(--radius-surface)",
            }}
          >
            <div
              className={twJoin(
                "primary thickness-surface relative w-full max-w-md px-6 py-6",
                pairEdge[theme],
              )}
              style={{
                ...surfaceStyle,
                boxShadow: "var(--thickness-surface), var(--elevation-overlay)",
              }}
            >
              <span
                className="absolute top-3 right-3 flex size-8 items-center justify-center"
                style={{
                  borderRadius: "var(--radius-control)",
                  color: "var(--color-plain-content)",
                }}
              >
                <Plus size="1.25rem" />
              </span>
              <p style={{ lineHeight: 1.5 }}>A panel over the veil.</p>
            </div>
          </div>
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className={twJoin(captionClass[theme], "text-left")}>
            Message
          </figcaption>
          <p
            className="primary"
            style={{
              marginTop: "0.375rem",
              fontSize: "0.75rem",
              color: "var(--solid)",
            }}
          >
            Use a work email.
          </p>
        </figure>
      </div>
    )}
  />
);

const CUSTOM_FACE =
  "primary thickness-control flex h-12 min-w-40 items-center justify-center px-6 text-sm font-semibold tracking-[0.04em] uppercase";

const customStyle: CSSProperties = {
  backgroundColor: CONTROL_FILL,
  borderRadius: "var(--radius-control)",
  color: "var(--color-primary-content)",
  boxShadow: "var(--thickness-control), var(--elevation-rest)",
};

const CustomizationSamples = () => (
  <ThemePair
    render={(theme) => (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        <figure className="flex flex-col items-center gap-3">
          <div className={CUSTOM_FACE} style={customStyle}>
            Save
          </div>
          <figcaption className={captionClass[theme]}>Default</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className={CUSTOM_FACE}
            style={
              {
                ...customStyle,
                "--color-primary":
                  "light-dark(var(--color-teal-100, #ccfbf1), var(--color-teal-950, #042f2e))",
              } as CSSProperties
            }
          >
            Save
          </div>
          <figcaption className={captionClass[theme]}>
            Solid changes. Text color stays.
          </figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className={CUSTOM_FACE}
            style={
              {
                ...customStyle,
                "--radius-control": "0.25rem",
              } as CSSProperties
            }
          >
            Save
          </div>
          <figcaption className={captionClass[theme]}>
            Radius 0.25rem
          </figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className={CUSTOM_FACE}
            style={
              {
                ...customStyle,
                "--material-opacity": "20%",
              } as CSSProperties
            }
          >
            Save
          </div>
          <figcaption className={captionClass[theme]}>Opacity 20%</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className={CUSTOM_FACE}
            style={
              {
                ...customStyle,
                "--elevation": "2",
                boxShadow:
                  "var(--thickness-control), 0 12px 16px -14px rgb(from var(--color-neutral-950, #0a0a0a) r g b / calc(0.55 * var(--elevation)))",
              } as CSSProperties
            }
          >
            Save
          </div>
          <figcaption className={captionClass[theme]}>Elevation 2</figcaption>
        </figure>
      </div>
    )}
  />
);

const ContractSamples = () => (
  <ThemePair
    render={(theme) => (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <figure className="flex flex-col items-center gap-3">
          <div
            className="flex h-12 w-full items-center justify-center text-sm"
            style={{
              borderRadius: "var(--radius-control)",
              backgroundColor: "var(--color-plain)",
              color: "var(--color-plain-content)",
            }}
          >
            Plain
          </div>
          <figcaption className={captionClass[theme]}>No role</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <div
            className="thickness-control flex h-12 w-full items-center justify-center text-sm"
            style={{
              borderRadius: "var(--radius-control)",
              color: "var(--color-plain-content)",
            }}
          >
            Control
          </div>
          <figcaption className={captionClass[theme]}>
            Opted into the control role
          </figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3">
          <SquishControl />
          <figcaption className={captionClass[theme]}>
            Opted into squish
          </figcaption>
        </figure>
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
  components: <ComponentSamples />,
  customization: <CustomizationSamples />,
  "library-contract": <ContractSamples />,
};
