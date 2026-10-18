"use client";

import type { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

const COLORS = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "success",
  "error",
  "warning",
] as const;

const NAME: Record<(typeof COLORS)[number], string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  neutral: "Neutral",
  success: "Success",
  error: "Error",
  warning: "Warning",
};

const Block = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) => (
  <section id={id} className="flex scroll-mt-8 flex-col gap-3">
    <h2 className="text-sm font-semibold tracking-wide text-neutral-500 uppercase">
      {title}
    </h2>
    {children}
  </section>
);

const openDialog = (id: string) => {
  const dialog = document.getElementById(id);
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

export default function DevPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-col gap-10 px-6 py-12">
      <Block id="button" title="Button">
        {COLORS.map((color) => (
          <button key={color} className={twJoin("btn", color)} type="button">
            <span>{NAME[color]}</span>
          </button>
        ))}
        <button className="btn primary loading" type="button">
          <span>Loading</span>
        </button>
        <button className="btn" type="button" disabled>
          <span>Disabled</span>
        </button>
      </Block>

      <Block id="icon-button" title="Icon button">
        <div className="flex flex-wrap items-center gap-3">
          {COLORS.map((color) => (
            <button
              key={color}
              className={twJoin("btn-square", color)}
              type="button"
              aria-label={NAME[color]}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          ))}
          <button
            className="btn-square secondary loading"
            type="button"
            aria-label="Loading"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </Block>

      <Block id="input" title="Input">
        {COLORS.map((color) => (
          <label key={color} className={twJoin("input", color)}>
            <input
              placeholder=" "
              defaultValue={color === "neutral" ? "" : NAME[color]}
            />
            <span>{NAME[color]}</span>
          </label>
        ))}
      </Block>

      <Block id="textarea" title="Textarea">
        {COLORS.map((color) => (
          <label key={color} className={twJoin("textarea", color)}>
            <textarea
              placeholder=" "
              defaultValue={color === "neutral" ? "" : NAME[color]}
            />
            <span>Note</span>
          </label>
        ))}
      </Block>

      <Block id="select" title="Select">
        {COLORS.map((color) => (
          <label key={color} className={twJoin("select", color)}>
            <select defaultValue="rose">
              <option value="mint">Mint</option>
              <option value="rose">Rose</option>
            </select>
            <span>{NAME[color]}</span>
            <i className="chevron" />
          </label>
        ))}
      </Block>

      <Block id="checkbox" title="Checkbox">
        {COLORS.map((color) => (
          <label key={color} className={twJoin("checkbox", color)}>
            <input type="checkbox" defaultChecked />
            <span className="checkbox-box" />
            {NAME[color]}
          </label>
        ))}
        <label className="checkbox">
          <input type="checkbox" />
          <span className="checkbox-box" />
          Unchecked
        </label>
        <p className="message">Required</p>
      </Block>

      <Block id="radio" title="Radio">
        {COLORS.map((color) => (
          <fieldset key={color} className="flex flex-col gap-2">
            <legend className="text-sm font-medium">{NAME[color]}</legend>
            <label className={twJoin("radio", color)}>
              <input type="radio" name={color} defaultChecked />
              <span className="radio-ring" />
              One
            </label>
            <label className={twJoin("radio", color)}>
              <input type="radio" name={color} />
              <span className="radio-ring" />
              Two
            </label>
          </fieldset>
        ))}
      </Block>

      <Block id="switch" title="Switch">
        {COLORS.map((color) => (
          <label key={color} className={twJoin("toggle", color)}>
            <input type="checkbox" role="switch" defaultChecked />
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
            {NAME[color]}
          </label>
        ))}
        <label className="toggle">
          <input type="checkbox" role="switch" />
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          Off
        </label>
      </Block>

      <Block id="slider" title="Slider">
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
      </Block>

      <Block id="alert" title="Alert">
        {COLORS.map((color) => (
          <div key={color} className={twJoin("alert", color)}>
            <div>
              <p className="text-sm font-semibold">{NAME[color]}</p>
              <p className="mt-1 text-sm leading-6">
                A light surface with dark text.
              </p>
            </div>
          </div>
        ))}
      </Block>

      <Block id="badge" title="Badge">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <span key={color} className={twJoin("badge", color)}>
              {NAME[color]}
            </span>
          ))}
        </div>
      </Block>

      <Block id="card" title="Card">
        <section className="card">
          <h3 className="text-base font-semibold">Plain</h3>
          <p className="mt-2 text-sm leading-6">A white jelly panel.</p>
        </section>
        {COLORS.map((color) => (
          <section key={color} className={twJoin("card", color)}>
            <h3 className="text-base font-semibold">{NAME[color]}</h3>
            <p className="mt-2 text-sm leading-6">Tinted like the alert.</p>
          </section>
        ))}
      </Block>

      <Block id="dialog" title="Dialog">
        <button
          className="btn"
          type="button"
          onClick={() => openDialog("plain-dialog")}
        >
          <span>Open dialog</span>
        </button>
        <button
          className="btn tertiary"
          type="button"
          onClick={() => openDialog("tinted-dialog")}
        >
          <span>Open tinted</span>
        </button>
        <dialog id="plain-dialog" className="modal">
          <div className="modal-panel">
            <form method="dialog">
              <button className="btn-surface" type="submit" aria-label="Close">
                ×
              </button>
            </form>
            <h2 className="pe-8 text-lg font-semibold">A note</h2>
            <p className="mt-2 text-sm leading-6">
              Native dialog, surface panel.
            </p>
          </div>
        </dialog>
        <dialog id="tinted-dialog" className="modal">
          <div className="modal-panel tertiary">
            <form method="dialog">
              <button className="btn-surface" type="submit" aria-label="Close">
                ×
              </button>
            </form>
            <h2 className="pe-8 text-lg font-semibold">Tinted</h2>
            <p className="mt-2 text-sm leading-6">
              Same light tint as the card.
            </p>
          </div>
        </dialog>
      </Block>
    </main>
  );
}
