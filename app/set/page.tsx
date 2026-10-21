"use client";

import { InfoIcon, PlusIcon, SearchIcon, SendIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { twJoin } from "tailwind-merge";

import { StripeSwitch, STRIPES_CLASS } from "@/app/stripe-switch";

const COLORS = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "success",
  "error",
  "warning",
  "info",
] as const;

const NAME: Record<(typeof COLORS)[number], string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  neutral: "Neutral",
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Info",
};

const SIZES = ["sm", "", "lg"] as const;

const SIZE_NAME: Record<(typeof SIZES)[number], string> = {
  sm: "Small",
  "": "Regular",
  lg: "Large",
};

const Tile = ({
  id,
  title,
  wide,
  children,
}: {
  id: string;
  title: string;
  wide?: boolean;
  children: ReactNode;
}) => (
  <section
    id={id}
    className={twJoin(
      "flex scroll-mt-24 flex-col gap-4",
      wide && "sm:col-span-2",
    )}
  >
    <h2 className="text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
      {title}
    </h2>
    {children}
  </section>
);

const openDialog = (id: string) => {
  const dialog = document.getElementById(id);
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

const sizeClass = (prefix: string, size: (typeof SIZES)[number]) =>
  size ? `${prefix}-${size}` : undefined;

export default function SetPage() {
  const [striped, setStriped] = useState(false);

  return (
    <main className={twJoin("w-full", striped && STRIPES_CLASS)}>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-x-8 gap-y-12 px-6 py-12 sm:grid-cols-2 sm:px-10 xl:grid-cols-3">
        <StripeSwitch
          className="sm:col-span-2 xl:col-span-3"
          checked={striped}
          onChange={setStriped}
        />
        <Tile id="button" title="Button" wide>
          <div className="flex flex-wrap items-center gap-3">
            {COLORS.map((color) => (
              <button
                key={color}
                className={twJoin("btn", color)}
                type="button"
              >
                <span>{NAME[color]}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-x-3 gap-y-8">
            {SIZES.map((size) => (
              <button
                key={size || "regular"}
                className={twJoin("btn", sizeClass("btn", size))}
                type="button"
              >
                <span>{SIZE_NAME[size]}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="btn primary loading" type="button">
              <span>Loading</span>
            </button>
            <button className="btn" type="button" disabled>
              <span>Disabled</span>
            </button>
          </div>
        </Tile>

        <Tile id="icon-button" title="Icon button">
          <div className="flex flex-wrap items-center gap-3">
            {COLORS.map((color) => (
              <button
                key={color}
                className={twJoin("btn-icon", color)}
                type="button"
                aria-label={NAME[color]}
              >
                <PlusIcon />
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-3">
            {SIZES.map((size) => (
              <button
                key={size || "regular"}
                className={twJoin("btn-icon", size && `btn-${size}`)}
                type="button"
                aria-label={SIZE_NAME[size]}
              >
                <PlusIcon />
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="btn-icon secondary loading"
              type="button"
              aria-label="Loading"
            >
              <PlusIcon />
            </button>
          </div>
        </Tile>

        <Tile id="badge" title="Badge">
          <div className="flex flex-wrap items-center gap-2">
            {COLORS.map((color) => (
              <span key={color} className={twJoin("badge", color)}>
                {NAME[color]}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SIZES.map((size) => (
              <span
                key={size || "regular"}
                className={twJoin("badge", sizeClass("badge", size))}
              >
                {SIZE_NAME[size]}
              </span>
            ))}
          </div>
        </Tile>

        <Tile id="input" title="Input" wide>
          <div className="grid gap-3 sm:grid-cols-2">
            {COLORS.map((color) => (
              <label key={color} className={twJoin("input", color)}>
                <input
                  placeholder=" "
                  defaultValue={color === "neutral" ? "" : NAME[color]}
                />
                <span>{NAME[color]}</span>
              </label>
            ))}
          </div>
          <div className="grid items-start gap-3 sm:grid-cols-3">
            {SIZES.map((size) => (
              <label
                key={size || "regular"}
                className={twJoin("input", sizeClass("input", size))}
              >
                <input placeholder=" " />
                <span>{SIZE_NAME[size]}</span>
              </label>
            ))}
          </div>
          <label className="input">
            <span className="input-start" aria-hidden="true">
              <SearchIcon />
            </span>
            <input placeholder=" " />
            <span>Search</span>
            <span className="input-end" aria-hidden="true">
              <SendIcon />
            </span>
          </label>
        </Tile>

        <Tile id="textarea" title="Textarea" wide>
          <div className="grid items-start gap-3 sm:grid-cols-2">
            {COLORS.map((color) => (
              <label key={color} className={twJoin("textarea", color)}>
                <textarea
                  placeholder=" "
                  defaultValue={color === "neutral" ? "" : NAME[color]}
                />
                <span>Note</span>
              </label>
            ))}
          </div>
          <div className="grid items-start gap-3 sm:grid-cols-3">
            {SIZES.map((size) => (
              <label
                key={size || "regular"}
                className={twJoin("textarea", sizeClass("textarea", size))}
              >
                <textarea placeholder=" " />
                <span>{SIZE_NAME[size]}</span>
              </label>
            ))}
          </div>
        </Tile>

        <Tile id="select" title="Select" wide>
          <div className="grid gap-3 sm:grid-cols-2">
            {COLORS.map((color) => (
              <label key={color} className={twJoin("select", color)}>
                <select defaultValue="rose">
                  <option value="mint">Mint</option>
                  <option value="rose">Rose</option>
                </select>
                <span>{NAME[color]}</span>
                <i className="picker-icon" />
              </label>
            ))}
          </div>
          <div className="grid items-start gap-3 sm:grid-cols-3">
            {SIZES.map((size) => (
              <label
                key={size || "regular"}
                className={twJoin("select", sizeClass("select", size))}
              >
                <select defaultValue="rose">
                  <option value="mint">Mint</option>
                  <option value="rose">Rose</option>
                  <option value="stone">Stone</option>
                </select>
                <span>{SIZE_NAME[size]}</span>
                <i className="picker-icon" />
              </label>
            ))}
          </div>
        </Tile>

        <Tile id="checkbox" title="Checkbox">
          <div className="flex flex-col gap-2">
            {COLORS.map((color) => (
              <label key={color} className={twJoin("checkbox", color)}>
                <input type="checkbox" defaultChecked />
                <span className="checkbox-box" />
                {NAME[color]}
              </label>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {SIZES.map((size) => (
              <label
                key={size || "regular"}
                className={twJoin("checkbox", sizeClass("checkbox", size))}
              >
                <input type="checkbox" defaultChecked />
                <span className="checkbox-box" />
                {SIZE_NAME[size]}
              </label>
            ))}
          </div>
          <label className="checkbox">
            <input type="checkbox" />
            <span className="checkbox-box" />
            Unchecked
          </label>
        </Tile>

        <Tile id="message" title="Message">
          <div className="flex flex-col">
            <p className="message">Required</p>
            {COLORS.map((color) => (
              <p key={color} className={twJoin("message", color)}>
                {NAME[color]}
              </p>
            ))}
          </div>
          <div className="flex flex-col">
            {SIZES.map((size) => (
              <p
                key={size || "regular"}
                className={twJoin("message", sizeClass("message", size))}
              >
                {SIZE_NAME[size]}
              </p>
            ))}
          </div>
        </Tile>

        <Tile id="radio" title="Radio">
          <div className="flex flex-col gap-3">
            {COLORS.map((color) => (
              <label key={color} className={twJoin("radio", color)}>
                <input type="radio" name={color} defaultChecked />
                <span className="radio-ring" />
                {NAME[color]}
              </label>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {SIZES.map((size) => (
              <label
                key={size || "regular"}
                className={twJoin("radio", sizeClass("radio", size))}
              >
                <input
                  type="radio"
                  name={`size-${size || "regular"}`}
                  defaultChecked
                />
                <span className="radio-ring" />
                {SIZE_NAME[size]}
              </label>
            ))}
          </div>
        </Tile>

        <Tile id="switch" title="Switch">
          <div className="flex flex-col gap-3">
            {COLORS.map((color) => (
              <label key={color} className={twJoin("toggle", color)}>
                <input type="checkbox" role="switch" defaultChecked />
                <span className="toggle-track">
                  <span className="toggle-thumb" />
                </span>
                {NAME[color]}
              </label>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {SIZES.map((size) => (
              <label
                key={size || "regular"}
                className={twJoin("toggle", sizeClass("toggle", size))}
              >
                <input type="checkbox" role="switch" defaultChecked />
                <span className="toggle-track">
                  <span className="toggle-thumb" />
                </span>
                {SIZE_NAME[size]}
              </label>
            ))}
          </div>
          <label className="toggle">
            <input type="checkbox" role="switch" />
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
            Off
          </label>
        </Tile>

        <Tile id="slider" title="Slider" wide>
          <div className="grid gap-4 sm:grid-cols-2">
            {COLORS.map((color) => (
              <label key={color} className={twJoin("range", color)}>
                {NAME[color]}
                <span className="range-box">
                  <span className="range-track">
                    <span className="range-fill" />
                  </span>
                  <span className="range-thumb" />
                  <input type="range" defaultValue={62} />
                </span>
              </label>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {SIZES.map((size) => (
              <label
                key={size || "regular"}
                className={twJoin("range", sizeClass("range", size))}
              >
                {SIZE_NAME[size]}
                <span className="range-box">
                  <span className="range-track">
                    <span className="range-fill" />
                  </span>
                  <span className="range-thumb" />
                  <input type="range" defaultValue={40} />
                </span>
              </label>
            ))}
          </div>
        </Tile>

        <Tile id="alert" title="Alert" wide>
          <div className="grid items-start gap-3 sm:grid-cols-2">
            {COLORS.map((color) => (
              <div key={color} className={twJoin("alert", color)}>
                <InfoIcon aria-hidden="true" />
                <div>
                  <p className="font-semibold">{NAME[color]}</p>
                  <p>A light surface with dark text.</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid items-start gap-3 sm:grid-cols-3">
            {SIZES.map((size) => (
              <div
                key={size || "regular"}
                className={twJoin("alert", sizeClass("alert", size))}
              >
                <InfoIcon aria-hidden="true" />
                <div>
                  <p className="font-semibold">{SIZE_NAME[size]}</p>
                  <p>A light surface with dark text.</p>
                </div>
              </div>
            ))}
          </div>
        </Tile>

        <Tile id="card" title="Card" wide>
          <div className="grid items-start gap-3 sm:grid-cols-2">
            <section className="card">
              <h3 className="font-semibold">Plain</h3>
              <p className="mt-2">A white jelly panel.</p>
            </section>
            {COLORS.map((color) => (
              <section key={color} className={twJoin("card", color)}>
                <h3 className="font-semibold">{NAME[color]}</h3>
              </section>
            ))}
          </div>
          <div className="grid items-start gap-3 sm:grid-cols-3">
            {SIZES.map((size) => (
              <section
                key={size || "regular"}
                className={twJoin("card", sizeClass("card", size))}
              >
                <h3 className="font-semibold">{SIZE_NAME[size]}</h3>
              </section>
            ))}
          </div>
        </Tile>

        <Tile id="dialog" title="Dialog">
          <div className="flex flex-wrap gap-3">
            <button
              className="btn"
              type="button"
              onClick={() => openDialog("plain-dialog")}
            >
              <span>Open</span>
            </button>
            <button
              className="btn tertiary"
              type="button"
              onClick={() => openDialog("tinted-dialog")}
            >
              <span>Tinted</span>
            </button>
          </div>
          <dialog id="plain-dialog" className="modal">
            <div className="modal-panel">
              <form method="dialog">
                <button
                  className="btn-surface"
                  type="submit"
                  aria-label="Close"
                >
                  ×
                </button>
              </form>
              <h2 className="pe-8 text-lg font-semibold">A note</h2>
              <p className="mt-2 text-sm leading-6">Surface panel.</p>
            </div>
          </dialog>
          <dialog id="tinted-dialog" className="modal">
            <div className="modal-panel tertiary">
              <form method="dialog">
                <button
                  className="btn-surface"
                  type="submit"
                  aria-label="Close"
                >
                  ×
                </button>
              </form>
              <h2 className="pe-8 text-lg font-semibold">Tinted</h2>
              <p className="mt-2 text-sm leading-6">
                Same light tint as the card.
              </p>
            </div>
          </dialog>
        </Tile>
      </div>
    </main>
  );
}
