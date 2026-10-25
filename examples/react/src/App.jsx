import { startJellyfy } from "jellyfy";
import { useEffect } from "react";

const COLORS = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "success",
  "error",
  "warning",
  "info",
];

const NAME = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  neutral: "Neutral",
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Info",
};

const SIZES = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
];

const sizeClass = (prefix, id) => (id ? `${prefix}-${id}` : "");

const openDialog = (id) => {
  const dialog = document.getElementById(id);
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

const Plus = () => (
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

const Close = () => (
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

const Info = () => (
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

const Section = ({ title, children }) => (
  <section className="grid gap-4">
    <h2 className="text-sm font-semibold tracking-wide text-neutral-500 uppercase">
      {title}
    </h2>
    {children}
  </section>
);

const Range = ({ className, label, value }) => (
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

export default function App() {
  useEffect(() => {
    startJellyfy();
  }, []);

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Jellyfy</h1>

      <Section title="Button">
        <div className="flex flex-wrap items-center gap-3">
          {COLORS.map((color) => (
            <button key={color} className={`btn ${color}`} type="button">
              {NAME[color]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-x-3 gap-y-8">
          {SIZES.map((size) => (
            <button
              key={size.label}
              className={`btn ${sizeClass("btn", size.id)}`}
              type="button"
            >
              {size.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn primary loading" type="button">
            Loading
          </button>
          <button className="btn" type="button" disabled>
            Disabled
          </button>
        </div>
      </Section>

      <Section title="Icon button">
        <div className="flex flex-wrap items-center gap-3">
          {COLORS.map((color) => (
            <button
              key={color}
              className={`btn-icon ${color}`}
              type="button"
              aria-label={NAME[color]}
            >
              <Plus />
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-3">
          {SIZES.map((size) => (
            <button
              key={size.label}
              className={`btn-icon ${sizeClass("btn", size.id)}`}
              type="button"
              aria-label={size.label}
            >
              <Plus />
            </button>
          ))}
        </div>
        <button
          className="btn-icon secondary loading"
          type="button"
          aria-label="Loading"
        >
          <Plus />
        </button>
      </Section>

      <Section title="Badge">
        <div className="flex flex-wrap items-center gap-2">
          {COLORS.map((color) => (
            <span key={color} className={`badge ${color}`}>
              {NAME[color]}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {SIZES.map((size) => (
            <span
              key={size.label}
              className={`badge ${sizeClass("badge", size.id)}`}
            >
              {size.label}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Input">
        <div className="grid gap-3 sm:grid-cols-2">
          {COLORS.map((color) => (
            <label key={color} className={`input ${color}`}>
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
              key={size.label}
              className={`input ${sizeClass("input", size.id)}`}
            >
              <input placeholder=" " />
              <span>{size.label}</span>
            </label>
          ))}
        </div>
        <label className="input">
          <span className="input-start" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input placeholder=" " />
          <span>Search</span>
          <span className="input-end" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </label>
      </Section>

      <Section title="Textarea">
        <div className="grid items-start gap-3 sm:grid-cols-2">
          {COLORS.map((color) => (
            <label key={color} className={`textarea ${color}`}>
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
              key={size.label}
              className={`textarea ${sizeClass("textarea", size.id)}`}
            >
              <textarea placeholder=" " />
              <span>{size.label}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Select">
        <div className="grid gap-3 sm:grid-cols-2">
          {COLORS.map((color) => (
            <label key={color} className={`select ${color}`}>
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
              key={size.label}
              className={`select ${sizeClass("select", size.id)}`}
            >
              <select defaultValue="rose">
                <option value="rose">Rose</option>
              </select>
              <span>{size.label}</span>
              <i className="picker-icon" />
            </label>
          ))}
        </div>
      </Section>

      <Section title="Checkbox">
        <div className="flex flex-col gap-2">
          {COLORS.map((color) => (
            <label key={color} className={`checkbox ${color}`}>
              <input type="checkbox" defaultChecked />
              <span className="checkbox-box" />
              {NAME[color]}
            </label>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {SIZES.map((size) => (
            <label
              key={size.label}
              className={`checkbox ${sizeClass("checkbox", size.id)}`}
            >
              <input type="checkbox" defaultChecked />
              <span className="checkbox-box" />
              {size.label}
            </label>
          ))}
        </div>
        <label className="checkbox">
          <input type="checkbox" />
          <span className="checkbox-box" />
          Unchecked
        </label>
      </Section>

      <Section title="Message">
        <div className="flex flex-col">
          <p className="message">Required</p>
          {COLORS.map((color) => (
            <p key={color} className={`message ${color}`}>
              {NAME[color]}
            </p>
          ))}
        </div>
        <div className="flex flex-col">
          {SIZES.map((size) => (
            <p
              key={size.label}
              className={`message ${sizeClass("message", size.id)}`}
            >
              {size.label}
            </p>
          ))}
        </div>
      </Section>

      <Section title="Radio">
        <div className="flex flex-col gap-3">
          {COLORS.map((color) => (
            <label key={color} className={`radio ${color}`}>
              <input type="radio" name={color} defaultChecked />
              <span className="radio-ring" />
              {NAME[color]}
            </label>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {SIZES.map((size) => (
            <label
              key={size.label}
              className={`radio ${sizeClass("radio", size.id)}`}
            >
              <input type="radio" name={`size-${size.label}`} defaultChecked />
              <span className="radio-ring" />
              {size.label}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Switch">
        <div className="flex flex-col gap-3">
          {COLORS.map((color) => (
            <label key={color} className={`toggle ${color}`}>
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
              key={size.label}
              className={`toggle ${sizeClass("toggle", size.id)}`}
            >
              <input type="checkbox" role="switch" defaultChecked />
              <span className="toggle-track">
                <span className="toggle-thumb" />
              </span>
              {size.label}
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
      </Section>

      <Section title="Slider">
        <div className="grid gap-4 sm:grid-cols-2">
          {COLORS.map((color) => (
            <Range
              key={color}
              className={`range ${color}`}
              label={NAME[color]}
              value={62}
            />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {SIZES.map((size) => (
            <Range
              key={size.label}
              className={`range ${sizeClass("range", size.id)}`}
              label={size.label}
              value={40}
            />
          ))}
        </div>
      </Section>

      <Section title="Alert">
        <div className="grid items-start gap-3 sm:grid-cols-2">
          {COLORS.map((color) => (
            <div key={color} className={`alert ${color}`}>
              <Info />
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
              key={size.label}
              className={`alert ${sizeClass("alert", size.id)}`}
            >
              <Info />
              <div>
                <p className="font-semibold">{size.label}</p>
                <p>A light surface with dark text.</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Card">
        <div className="grid items-start gap-3 sm:grid-cols-2">
          <section className="card">
            <h3 className="font-semibold">Plain</h3>
            <p className="mt-2">A white jelly panel.</p>
          </section>
          <section className="card squish">
            <h3 className="font-semibold">Press</h3>
            <p className="mt-2">The same panel, with a press.</p>
          </section>
          {COLORS.map((color) => (
            <section key={color} className={`card ${color}`}>
              <h3 className="font-semibold">{NAME[color]}</h3>
            </section>
          ))}
        </div>
        <div className="grid items-start gap-3 sm:grid-cols-3">
          {SIZES.map((size) => (
            <section
              key={size.label}
              className={`card ${sizeClass("card", size.id)}`}
            >
              <h3 className="font-semibold">{size.label}</h3>
            </section>
          ))}
        </div>
      </Section>

      <Section title="Dialog">
        <div className="flex flex-wrap gap-3">
          <button
            className="btn"
            type="button"
            onClick={() => openDialog("dialog-plain")}
          >
            Plain
          </button>
          {COLORS.map((color) => (
            <button
              key={color}
              className={`btn ${color}`}
              type="button"
              onClick={() => openDialog(`dialog-${color}`)}
            >
              {NAME[color]}
            </button>
          ))}
        </div>
        <dialog id="dialog-plain" className="modal">
          <div className="modal-panel">
            <form method="dialog">
              <button className="btn-bump" type="submit" aria-label="Close">
                <Close />
              </button>
            </form>
            <h2 className="pe-8 text-lg font-semibold">Plain</h2>
            <p className="mt-2 text-sm leading-6">A white panel.</p>
          </div>
        </dialog>
        {COLORS.map((color) => (
          <dialog key={color} id={`dialog-${color}`} className="modal">
            <div className={`modal-panel ${color}`}>
              <form method="dialog">
                <button className="btn-bump" type="submit" aria-label="Close">
                  <Close />
                </button>
              </form>
              <h2 className="pe-8 text-lg font-semibold">{NAME[color]}</h2>
              <p className="mt-2 text-sm leading-6">
                The same light tint as the card.
              </p>
            </div>
          </dialog>
        ))}
      </Section>
    </main>
  );
}
