import { SearchIcon, SendIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import { squishRule } from "@/components/foundation/jellyfy";

import { TokenValue } from "./token-value";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const COLORS = [
  ["primary", "Primary"],
  ["secondary", "Secondary"],
  ["tertiary", "Tertiary"],
  ["neutral", "Neutral"],
  ["success", "Success"],
  ["error", "Error"],
  ["warning", "Warning"],
] as const;

const CONTENTS = [
  ["color", "Color"],
  ["radius", "Radius"],
  ["material", "Material"],
  ["press", "Press"],
  ["size", "Size"],
  ["focus", "Focus"],
  ["states", "States"],
  ["knobs", "Public knobs"],
] as const;

const THICKNESS = [
  {
    name: "Raised",
    token: "--shadow-inset-raised",
    use: "Buttons and icon buttons. The thickest jelly.",
    shadow: "var(--shadow-inset-raised), var(--shadow-drop)",
    className: "primary h-16",
    fill: "color-mix(in oklab, var(--jellyfy-solid) 60%, transparent)",
  },
  {
    name: "Surface",
    token: "--shadow-inset-surface",
    use: "Fields. The switch and the slider use this inset with the small drop.",
    shadow: "var(--shadow-inset-surface), var(--shadow-drop)",
    className: "h-16",
    fill: "var(--surface)",
  },
  {
    name: "Thin",
    token: "--shadow-inset-thin",
    use: "Cards, alerts, and the dialog. Badges use this inset with the small drop.",
    shadow: "var(--shadow-inset-thin), var(--shadow-drop)",
    className: "h-16",
    fill: "var(--panel)",
  },
  {
    name: "Mark",
    token: "--shadow-inset-mark",
    use: "Checkbox box and radio ring. A short, darker lip.",
    shadow: "var(--shadow-inset-mark), var(--shadow-drop-sm)",
    className: "size-10",
    fill: "var(--surface)",
  },
] as const;

const DROP_SIZES = [
  ["Small", "--shadow-drop-sm"],
  ["Regular", "--shadow-drop"],
] as const;

const DROP_STATES = [
  ["Hover", "--shadow-drop-hover"],
  ["Disabled", "--shadow-drop-disabled"],
] as const;

const STEPS = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 14, 16] as const;

const KNOBS = [
  ["--color-primary", "#4f46e5", "And the other six solids, the same way."],
  [
    "--radius-control",
    "999px",
    "Pills: buttons, switch, slider handle, badge.",
  ],
  ["--radius-surface", "1rem", "Fields, cards, alerts, dialog panel."],
  ["--jellyfy-noise-size", "360px", "The grain tile."],
  ["--spacing", "0.25rem", "Optional. Tailwind already sets it."],
] as const;

export default function DesignSystemPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
      <p className="text-sm font-medium text-neutral-500">Development only</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        Design system
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
        The visual rules of the material. Specimens use the live tokens, so a
        change in the stylesheet shows up here.
      </p>
      <nav className="mt-8 flex flex-wrap gap-2" aria-label="On this page">
        {CONTENTS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-[var(--shadow-drop)]"
          >
            {label}
          </a>
        ))}
      </nav>

      <Section
        id="color"
        title="Color"
        lede="Seven solids. Everything else is mixed from the solid on that element. A developer overrides a solid by setting --color-primary, or whichever of the seven they want to change."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLORS.map(([id, label]) => (
            <figure key={id} className={twJoin("card", id)}>
              <div
                className="h-16 rounded-[var(--radius-control)]"
                style={{ background: "var(--jellyfy-solid)" }}
              />
              <figcaption className="mt-3">
                <p className="font-semibold">{label}</p>
                <span className="font-mono text-xs leading-5 text-neutral-500">
                  {`--color-${id}`}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Rule
            title="Raised face"
            detail="Buttons, icon buttons, badges, checked marks."
          >
            <button type="button" className="btn primary">
              <span>Primary</span>
            </button>
            <p className="text-sm leading-6 text-neutral-600">
              Fill is the solid at 60%. Light text is white at 94%, mixed with
              the solid. Neutral buttons stay on the gray field with dark text.
            </p>
          </Rule>
          <Rule
            title="Field"
            detail="Inputs, textarea, and select default to neutral."
          >
            <label className="input">
              <input placeholder=" " />
              <span>Note</span>
            </label>
            <p className="text-sm leading-6 text-neutral-600">
              A tinted field is a light mix of its solid, with dark text. The
              ring uses that same solid.
            </p>
          </Rule>
          <Rule
            title="Quiet surface"
            detail="An untinted card is a white panel. An alert defaults to warning."
          >
            <div className="alert">
              <p>Nothing has been sent yet.</p>
            </div>
          </Rule>
        </div>
      </Section>

      <Section
        id="radius"
        title="Radius"
        lede="Two public radii. Controls that are operated as a pill use the full round. Surfaces that hold content use the softer corner."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Plate
            title="Control"
            token="--radius-control"
            style={{
              borderRadius: "var(--radius-control)",
              background:
                "color-mix(in oklab, var(--color-primary) 60%, transparent)",
            }}
          />
          <Plate
            title="Surface"
            token="--radius-surface"
            style={{
              borderRadius: "var(--radius-surface)",
              background: "var(--panel)",
              boxShadow: "var(--shadow-inset-thin), var(--shadow-drop)",
            }}
          />
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600">
          The checkbox box is 0.5rem and a select option is 0.65rem. Those are
          component corners, not knobs a developer sets.
        </p>
      </Section>

      <Section
        id="material"
        title="Material"
        lede="Thickness is an inset shadow from the bottom edge. A deeper inset is a thicker jelly. A drop shadow is only how far the piece sits off the page."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {THICKNESS.map((item) => (
            <figure key={item.token} className="flex flex-col gap-3">
              <div
                className={twMerge(
                  "w-full rounded-[var(--radius-surface)]",
                  item.className,
                )}
                style={{
                  background: item.fill,
                  boxShadow: item.shadow,
                }}
              />
              <figcaption>
                <p className="font-semibold">{item.name}</p>
                <TokenValue name={item.token} />
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  {item.use}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {DROP_SIZES.map(([label, token]) => (
            <figure key={token}>
              <div
                className="h-16 rounded-[var(--radius-surface)] bg-white"
                style={{ boxShadow: `var(${token})` }}
              />
              <figcaption className="mt-3">
                <p className="font-semibold">{label}</p>
                <TokenValue name={token} />
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {DROP_STATES.map(([label, token]) => (
            <figure key={token}>
              <div
                className="h-16 rounded-[var(--radius-surface)] bg-white"
                style={{ boxShadow: `var(${token})` }}
              />
              <figcaption className="mt-3">
                <p className="font-semibold">{label}</p>
                <TokenValue name={token} />
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600">
          Small is the drop for a mark, a switch, a slider, and a badge. Regular
          is the drop for a button, a field, a card, and an alert. Hover and
          disabled are states of the regular drop. The dialog uses the hover
          drop. Focus on a field swaps the surface inset for a shallower one,{" "}
          <TokenValue name="--shadow-inset-surface-focus" />.
        </p>
      </Section>

      <Section
        id="press"
        title="Press"
        lede="A press is two things at once: a gloss of two radial washes, and a squish measured in pixels."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Rule
            title="Gloss"
            detail="Light pool and dark pool. On a button they appear while the pointer is down, dark above light, so the face reads as pushed in. On a field they appear with focus and pin to the bottom. On a surface button they stay put: light on top, dark below, and on press those two colors swap."
          >
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn">
                <span>Hold</span>
              </button>
              <div className="modal-panel relative h-24 w-40">
                <button
                  type="button"
                  className="btn-surface"
                  aria-label="Surface"
                >
                  ×
                </button>
              </div>
            </div>
          </Rule>
          <Rule
            title="Squish"
            detail={`The bulge is ${squishRule.peakPx}px, not a percentage, so a radio and a wide button stretch by the same amount. Horizontal peak is that many pixels outward. Vertical peak is two sevenths of it, inward. The settle is one seventh outward in width and two sevenths outward in height. Both axes move together. The press takes ${squishRule.pressMs}ms, reaches the peak at ${Math.round(squishRule.peakAt * 100)}%, then eases into the settle and holds while the pointer is down. Release takes ${squishRule.releaseMs}ms from the scale already on screen. Keyboard focus does not squish.`}
          >
            <div className="flex flex-wrap items-center gap-4">
              <button type="button" className="btn secondary">
                <span>Wide</span>
              </button>
              <label className="radio">
                <input
                  type="radio"
                  name="design-system-squish"
                  defaultChecked
                />
                <span className="radio-ring" />
                Round
              </label>
              <button
                type="button"
                className="squish rounded-[var(--radius-surface)] bg-white px-4 py-3 text-sm font-medium shadow-[var(--shadow-drop)]"
              >
                Plain element
              </button>
            </div>
            <p className="text-sm leading-6 text-neutral-600">
              <code className="font-mono text-neutral-800">squish</code> opts
              any element into that press. On a Jellyfy control it is the same
              face the control already uses, so the animation still runs once.
            </p>
          </Rule>
        </div>
      </Section>

      <Section
        id="size"
        title="Size"
        lede="Three sizes. Regular is the control as it is now, and it has no extra class. Small and large are modifiers, btn-sm and btn-lg, and the same pair on the other controls. They are not the screen prefixes sm: and lg:. New measurements come from this ramp, including the half steps. The regular size is not redrawn to fit it."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <SizeSlot
            name="Small"
            note="btn-sm, and the same -sm pair on the other controls."
          >
            <button type="button" className="btn btn-sm">
              <span>Small</span>
            </button>
          </SizeSlot>
          <SizeSlot
            name="Regular"
            note="No extra class. This is the size the set uses today."
          >
            <button type="button" className="btn">
              <span>Regular</span>
            </button>
          </SizeSlot>
          <SizeSlot
            name="Large"
            note="btn-lg, and the same -lg pair on the other controls."
          >
            <button type="button" className="btn btn-lg">
              <span>Large</span>
            </button>
          </SizeSlot>
        </div>
        <div className="mt-6 flex flex-wrap items-end gap-3">
          <button
            type="button"
            className="btn-square btn-sm"
            aria-label="Small"
          >
            <span>+</span>
          </button>
          <button type="button" className="btn-square" aria-label="Regular">
            <span>+</span>
          </button>
          <button
            type="button"
            className="btn-square btn-lg"
            aria-label="Large"
          >
            <span>+</span>
          </button>
          <label className="input input-sm w-40">
            <input placeholder=" " />
            <span>Small</span>
          </label>
          <label className="input w-44">
            <input placeholder=" " />
            <span>Regular</span>
          </label>
          <label className="input input-lg w-52">
            <input placeholder=" " />
            <span>Large</span>
          </label>
        </div>
        <div className="mt-6 grid items-start gap-4 lg:grid-cols-3">
          <label className="textarea textarea-sm">
            <textarea placeholder=" " />
            <span>Small</span>
          </label>
          <label className="textarea">
            <textarea placeholder=" " />
            <span>Regular</span>
          </label>
          <label className="textarea textarea-lg">
            <textarea placeholder=" " />
            <span>Large</span>
          </label>
        </div>
        <label className="input mt-6 max-w-sm">
          <span className="input-start" aria-hidden="true">
            <SearchIcon />
          </span>
          <input placeholder=" " />
          <span>Search</span>
          <span className="input-end" aria-hidden="true">
            <SendIcon />
          </span>
        </label>
        <div className="mt-8">
          <p className="text-sm font-medium text-neutral-500">
            Spacing ramp. One step is <TokenValue name="--spacing" />. Button
            heights are 10, 12, and 14. Regular, 12, is marked in black.
          </p>
          <div className="mt-4 flex items-end gap-2 overflow-x-auto pb-2">
            {STEPS.map((step) => (
              <div
                key={step}
                className="flex w-8 shrink-0 flex-col items-center gap-2"
              >
                <div
                  className={twJoin(
                    "w-full rounded-sm",
                    step === 12 ? "bg-neutral-800" : "bg-neutral-300",
                  )}
                  style={{ height: `calc(var(--spacing, 0.25rem) * ${step})` }}
                />
                <span
                  className={twJoin(
                    "font-mono text-[10px]",
                    step === 12
                      ? "font-semibold text-neutral-800"
                      : "text-neutral-500",
                  )}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="focus"
        title="Focus"
        lede="The ring is a 1px outline in the control’s color, 2px outside the edge, with a white gap at 50% between them. Buttons, marks, cards, and the surface button show it only for keyboard focus. Fields show it whenever they are focused, including a click, because that is the typing state."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Rule
            title="Keyboard"
            detail="Tab to this button. A click does not leave the ring."
          >
            <button type="button" className="btn tertiary">
              <span>Tab here</span>
            </button>
          </Rule>
          <Rule
            title="Field"
            detail="Click or tab. The ring and the gloss both come on."
          >
            <label className="input primary">
              <input placeholder=" " />
              <span>Label</span>
            </label>
          </Rule>
        </div>
      </Section>

      <Section
        id="states"
        title="States"
        lede="Disabled is a flatter drop and no lift. Loading is a soft sweep on a wide button, and small rim lights plus a spinner on an icon button."
      >
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" className="btn" disabled>
            <span>Disabled</span>
          </button>
          <button type="button" className="btn loading">
            <span>Sending</span>
          </button>
          <button
            type="button"
            className="btn-square loading"
            aria-label="Loading"
          />
          <label className="checkbox success">
            <input type="checkbox" defaultChecked />
            <span className="checkbox-box" />
            Checked
          </label>
        </div>
      </Section>

      <Section
        id="knobs"
        title="Public knobs"
        lede="These are the only variables a developer is meant to set. Inset shadows, derived mixes, and the noise image stay internal."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="text-neutral-500">
              <tr>
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Default</th>
                <th className="py-2 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {KNOBS.map(([name, fallback, role]) => (
                <tr key={name} className="border-t border-neutral-200/80">
                  <td className="py-3 pr-4 font-mono text-xs">{name}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-neutral-500">
                    {fallback}
                  </td>
                  <td className="py-3 text-neutral-700">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="noise mt-6 h-24 rounded-[var(--radius-surface)] bg-white"
          style={{ boxShadow: "var(--shadow-inset-thin), var(--shadow-drop)" }}
        />
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          The grain, at <TokenValue name="--jellyfy-noise-size" />.
        </p>
      </Section>
    </main>
  );
}

function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-10 border-t border-neutral-200/80 py-14"
    >
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
        {lede}
      </p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Rule({
  title,
  detail,
  children,
}: {
  title: string;
  detail: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-surface)] bg-white p-5">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">{detail}</p>
      </div>
      {children}
    </div>
  );
}

function Plate({
  title,
  token,
  style,
}: {
  title: string;
  token: string;
  style: CSSProperties;
}) {
  return (
    <figure>
      <div className="h-24" style={style} />
      <figcaption className="mt-3">
        <p className="font-semibold">{title}</p>
        <TokenValue name={token} />
      </figcaption>
    </figure>
  );
}

function SizeSlot({
  name,
  note,
  children,
}: {
  name: string;
  note: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex min-h-40 flex-col justify-between gap-4 rounded-[var(--radius-surface)] bg-white p-5">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">{note}</p>
      </div>
      {children}
    </div>
  );
}
