import {
  ChevronDownIcon,
  InfoIcon,
  LoaderIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  XIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

import { ButtonLoadingSample } from "./button-loading-sample";
import { DialogSample } from "./dialog-sample";
import { IconButtonLoadingSample } from "./icon-button-loading-sample";

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

const Row = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-3">{children}</div>
);

const Mark = () => (
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

export const Sample = ({ id }: { id: string }) => {
  switch (id) {
    case "button-colors":
      return (
        <Row>
          {COLORS.map((color) => (
            <button key={color} className={twJoin("btn", color)} type="button">
              {NAME[color]}
            </button>
          ))}
        </Row>
      );
    case "button-sizes":
      return (
        <div className="flex flex-wrap items-end gap-3">
          <button className="btn btn-sm" type="button">
            Small
          </button>
          <button className="btn btn-md" type="button">
            Medium
          </button>
          <button className="btn btn-lg" type="button">
            Large
          </button>
        </div>
      );
    case "button-states":
      return (
        <Row>
          <button className="btn primary loading" type="button">
            <LoaderIcon aria-hidden="true" className="size-4 animate-spin" />
            Loading
          </button>
          <button className="btn" type="button" disabled>
            Disabled
          </button>
        </Row>
      );
    case "button-loading":
      return <ButtonLoadingSample />;
    case "icon-colors":
      return (
        <Row>
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
        </Row>
      );
    case "icon-sizes":
      return (
        <div className="flex flex-wrap items-end gap-3">
          <button className="btn-icon btn-sm" type="button" aria-label="Small">
            <Mark />
          </button>
          <button className="btn-icon btn-md" type="button" aria-label="Medium">
            <Mark />
          </button>
          <button className="btn-icon btn-lg" type="button" aria-label="Large">
            <Mark />
          </button>
        </div>
      );
    case "icon-loading":
      return <IconButtonLoadingSample />;
    case "bump-basic":
      return (
        <button className="btn-bump" type="button" aria-label="Close">
          <XIcon aria-hidden="true" />
        </button>
      );
    case "bump-sizes":
      return (
        <div className="flex flex-wrap items-end gap-3">
          <button className="btn-bump btn-sm" type="button" aria-label="Small">
            <XIcon aria-hidden="true" />
          </button>
          <button className="btn-bump btn-md" type="button" aria-label="Medium">
            <XIcon aria-hidden="true" />
          </button>
          <button className="btn-bump btn-lg" type="button" aria-label="Large">
            <XIcon aria-hidden="true" />
          </button>
        </div>
      );
    case "input-colors":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {COLORS.map((color) => (
            <label key={color} className={twJoin("input", color)}>
              <input placeholder=" " defaultValue={NAME[color]} />
              <span>{NAME[color]}</span>
            </label>
          ))}
        </div>
      );
    case "input-basic":
      return (
        <label className="input max-w-sm">
          <input placeholder=" " />
          <span>Name</span>
        </label>
      );
    case "input-sizes":
      return (
        <div className="grid items-start gap-3 sm:grid-cols-3">
          <label className="input input-sm">
            <input placeholder=" " />
            <span>Small</span>
          </label>
          <label className="input input-md">
            <input placeholder=" " />
            <span>Medium</span>
          </label>
          <label className="input input-lg">
            <input placeholder=" " />
            <span>Large</span>
          </label>
        </div>
      );
    case "input-icons":
      return (
        <label className="input max-w-sm">
          <span className="input-start" aria-hidden="true">
            <SearchIcon />
          </span>
          <input placeholder=" " />
          <span>Search</span>
          <span className="input-end" aria-hidden="true">
            <SendIcon />
          </span>
        </label>
      );
    case "input-message":
      return (
        <div className="max-w-sm">
          <label className="input error">
            <input placeholder=" " />
            <span>Name</span>
          </label>
          <p className="message">A short note.</p>
        </div>
      );
    case "message-colors":
      return (
        <div>
          {COLORS.map((color) => (
            <p key={color} className={twJoin("message", color)}>
              {NAME[color]}
            </p>
          ))}
        </div>
      );
    case "message-sizes":
      return (
        <div>
          <p className="message message-sm">Small</p>
          <p className="message message-md">Medium</p>
          <p className="message message-lg">Large</p>
        </div>
      );
    case "textarea-colors":
      return (
        <div className="grid items-start gap-3 sm:grid-cols-2">
          {COLORS.map((color) => (
            <label key={color} className={twJoin("textarea", color)}>
              <textarea placeholder=" " defaultValue={NAME[color]} />
              <span>Note</span>
            </label>
          ))}
        </div>
      );
    case "textarea-basic":
      return (
        <label className="textarea max-w-sm">
          <textarea placeholder=" " />
          <span>Note</span>
        </label>
      );
    case "textarea-sizes":
      return (
        <div className="grid items-start gap-3 sm:grid-cols-3">
          <label className="textarea textarea-sm">
            <textarea placeholder=" " />
            <span>Small</span>
          </label>
          <label className="textarea textarea-md">
            <textarea placeholder=" " />
            <span>Medium</span>
          </label>
          <label className="textarea textarea-lg">
            <textarea placeholder=" " />
            <span>Large</span>
          </label>
        </div>
      );
    case "select-colors":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {COLORS.map((color) => (
            <label key={color} className={twJoin("select", color)}>
              <select defaultValue={color}>
                <option value={color}>{NAME[color]}</option>
              </select>
              <span>{NAME[color]}</span>
              <i className="picker-icon" />
            </label>
          ))}
        </div>
      );
    case "select-basic":
      return (
        <label className="select max-w-sm">
          <select defaultValue="mint">
            <option value="mint">Mint</option>
            <option value="rose">Rose</option>
          </select>
          <span>Flavor</span>
          <i className="picker-icon" />
        </label>
      );
    case "select-mark":
      return (
        <label className="select max-w-sm">
          <select defaultValue="rose">
            <option value="rose">Rose</option>
          </select>
          <span>Flavor</span>
          <ChevronDownIcon className="picker-icon" aria-hidden="true" />
        </label>
      );
    case "select-sizes":
      return (
        <div className="grid items-start gap-3 sm:grid-cols-3">
          <label className="select select-sm">
            <select defaultValue="small">
              <option value="small">Small</option>
            </select>
            <span>Small</span>
            <i className="picker-icon" />
          </label>
          <label className="select select-md">
            <select defaultValue="medium">
              <option value="medium">Medium</option>
            </select>
            <span>Medium</span>
            <i className="picker-icon" />
          </label>
          <label className="select select-lg">
            <select defaultValue="large">
              <option value="large">Large</option>
            </select>
            <span>Large</span>
            <i className="picker-icon" />
          </label>
        </div>
      );
    case "checkbox-colors":
      return (
        <div className="flex flex-col gap-3">
          {COLORS.map((color) => (
            <label key={color} className={twJoin("checkbox", color)}>
              <input type="checkbox" defaultChecked />
              <span className="checkbox-box" />
              {NAME[color]}
            </label>
          ))}
        </div>
      );
    case "checkbox-basic":
      return (
        <div className="flex flex-col gap-3">
          <label className="checkbox primary">
            <input type="checkbox" defaultChecked />
            <span className="checkbox-box" />
            Remember this device
          </label>
          <label className="checkbox">
            <input type="checkbox" />
            <span className="checkbox-box" />
            Unchecked
          </label>
        </div>
      );
    case "checkbox-sizes":
      return (
        <Row>
          <label className="checkbox checkbox-sm">
            <input type="checkbox" defaultChecked />
            <span className="checkbox-box" />
            Small
          </label>
          <label className="checkbox checkbox-md">
            <input type="checkbox" defaultChecked />
            <span className="checkbox-box" />
            Medium
          </label>
          <label className="checkbox checkbox-lg">
            <input type="checkbox" defaultChecked />
            <span className="checkbox-box" />
            Large
          </label>
        </Row>
      );
    case "radio-colors":
      return (
        <div className="flex flex-col gap-3">
          {COLORS.map((color) => (
            <label key={color} className={twJoin("radio", color)}>
              <input type="radio" name={color} defaultChecked />
              <span className="radio-ring" />
              {NAME[color]}
            </label>
          ))}
        </div>
      );
    case "radio-basic":
      return (
        <div className="flex flex-col gap-3">
          <label className="radio primary">
            <input type="radio" name="docs-note" defaultChecked />
            <span className="radio-ring" />
            Keep
          </label>
          <label className="radio primary">
            <input type="radio" name="docs-note" />
            <span className="radio-ring" />
            Send
          </label>
        </div>
      );
    case "radio-sizes":
      return (
        <Row>
          <label className="radio radio-sm">
            <input type="radio" name="docs-radio-size" defaultChecked />
            <span className="radio-ring" />
            Small
          </label>
          <label className="radio radio-md">
            <input type="radio" name="docs-radio-size-medium" defaultChecked />
            <span className="radio-ring" />
            Medium
          </label>
          <label className="radio radio-lg">
            <input type="radio" name="docs-radio-size-large" defaultChecked />
            <span className="radio-ring" />
            Large
          </label>
        </Row>
      );
    case "switch-colors":
      return (
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
      );
    case "switch-basic":
      return (
        <div className="flex flex-col gap-3">
          <label className="toggle primary">
            <input type="checkbox" role="switch" defaultChecked />
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
            Notifications
          </label>
          <label className="toggle">
            <input type="checkbox" role="switch" />
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
            Off
          </label>
        </div>
      );
    case "switch-sizes":
      return (
        <Row>
          {(
            [
              ["toggle-sm", "Small"],
              ["toggle-md", "Medium"],
              ["toggle-lg", "Large"],
            ] as const
          ).map(([size, label]) => (
            <label key={label} className={twJoin("toggle", size)}>
              <input type="checkbox" role="switch" defaultChecked />
              <span className="toggle-track">
                <span className="toggle-thumb" />
              </span>
              {label}
            </label>
          ))}
        </Row>
      );
    case "range-colors":
      return (
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
      );
    case "range-basic":
      return (
        <label className="range primary max-w-sm">
          Volume
          <span className="range-box">
            <span className="range-track">
              <span className="range-fill" />
            </span>
            <span className="range-thumb" />
            <input type="range" defaultValue={62} />
          </span>
        </label>
      );
    case "range-sizes":
      return (
        <div className="grid max-w-lg gap-4">
          <label className="range range-sm">
            Small
            <span className="range-box">
              <span className="range-track">
                <span className="range-fill" />
              </span>
              <span className="range-thumb" />
              <input type="range" defaultValue={40} />
            </span>
          </label>
          <label className="range range-md">
            Medium
            <span className="range-box">
              <span className="range-track">
                <span className="range-fill" />
              </span>
              <span className="range-thumb" />
              <input type="range" defaultValue={40} />
            </span>
          </label>
          <label className="range range-lg">
            Large
            <span className="range-box">
              <span className="range-track">
                <span className="range-fill" />
              </span>
              <span className="range-thumb" />
              <input type="range" defaultValue={40} />
            </span>
          </label>
        </div>
      );
    case "alert-colors":
      return (
        <div className="grid gap-3">
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
      );
    case "alert-basic":
      return (
        <div className="alert warning max-w-lg">
          <InfoIcon aria-hidden="true" />
          <div>
            <p className="font-semibold">Check the date</p>
            <p>This offer ends tonight.</p>
          </div>
        </div>
      );
    case "alert-sizes":
      return (
        <div className="grid max-w-lg gap-3">
          <div className="alert alert-sm">
            <InfoIcon aria-hidden="true" />
            <div>
              <p className="font-semibold">Small</p>
              <p>14px type.</p>
            </div>
          </div>
          <div className="alert alert-md">
            <InfoIcon aria-hidden="true" />
            <div>
              <p className="font-semibold">Medium</p>
              <p>16px type.</p>
            </div>
          </div>
          <div className="alert alert-lg">
            <InfoIcon aria-hidden="true" />
            <div>
              <p className="font-semibold">Large</p>
              <p>20px type.</p>
            </div>
          </div>
        </div>
      );
    case "badge-colors":
      return (
        <Row>
          {COLORS.map((color) => (
            <span key={color} className={twJoin("badge", color)}>
              {NAME[color]}
            </span>
          ))}
        </Row>
      );
    case "card-colors":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {COLORS.map((color) => (
            <section key={color} className={twJoin("card", color)}>
              <h3 className="font-semibold">{NAME[color]}</h3>
            </section>
          ))}
        </div>
      );
    case "dialog-colors":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {COLORS.map((color) => (
            <div key={color} className={twJoin("modal-panel w-full", color)}>
              <h2 className="text-lg font-semibold">{NAME[color]}</h2>
            </div>
          ))}
        </div>
      );
    case "badge-sizes":
      return (
        <Row>
          <span className="badge badge-sm">Small</span>
          <span className="badge badge-md">Medium</span>
          <span className="badge badge-lg">Large</span>
        </Row>
      );
    case "card-basic":
      return (
        <section className="card max-w-sm">
          <h3 className="font-semibold">Studio notes</h3>
          <p className="mt-2">A white jelly panel.</p>
        </section>
      );
    case "card-sizes":
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          <section className="card card-sm">
            <h3 className="font-semibold">Small</h3>
          </section>
          <section className="card card-md">
            <h3 className="font-semibold">Medium</h3>
          </section>
          <section className="card card-lg">
            <h3 className="font-semibold">Large</h3>
          </section>
        </div>
      );
    case "dialog-basic":
      return <DialogSample />;
    default:
      return null;
  }
};
