"use client";

import { type FC, useState } from "react";

import { TestBenchButton } from "@/components/test-bench-button";

import type { MaterialVariableReport } from "../../(theme-probe)/theme-probe/material-variable-cases";
import type { ThemeReport } from "../../(theme-probe)/theme-probe/theme-cases";
import {
  Close,
  Info,
  openDialog,
  OverrideExample,
  Plus,
  Range,
} from "./demo-parts";
import { NestedThemes } from "./nested-themes";
import PropertyAudit from "./property-audit";
import PropertyOverrides from "./property-overrides";

const Customize: FC = () => {
  const [themeReport, setThemeReport] = useState<ThemeReport | null>(null);
  const [materialReport, setMaterialReport] =
    useState<MaterialVariableReport | null>(null);
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-10">
      <header className="grid gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Jellyfy test bench
        </h1>
        <p>
          Primary, secondary, and tertiary solids are green, blue, and purple,
          with control text and surface text configured separately. All nine
          colour settings are configured through @theme inline in
          test-bench.css.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-neutral-950 p-4 text-sm text-neutral-100">
          <code>{`@theme inline {
  --color-primary: var(--color-green-800);
  --color-secondary: var(--color-blue-700);
  --color-tertiary: var(--color-purple-700);
  --color-primary-content: var(--color-red-400);
  --color-secondary-content: var(--color-green-900);
  --color-tertiary-content: var(--color-red-400);
  --color-primary-surface-content: #14532d;
  --color-secondary-surface-content: #14532d;
  --color-tertiary-surface-content: #14532d;
}

:root {
  --material-opacity: 70%;
}`}</code>
        </pre>
        <p>
          The remaining colour slots keep their defaults. The swatch below uses
          ordinary Tailwind utilities with the same semantic colour names.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-secondary bg-primary text-primary-content rounded-xl border-2 p-4">
            Tailwind control colours: bg-primary, text-primary-content,
            border-secondary
          </div>
          <div className="border-primary bg-primary-content text-primary-surface-content rounded-xl border-2 p-4">
            Tailwind surface colours: bg-primary-content,
            text-primary-surface-content, border-primary
          </div>
        </div>
      </header>

      <section id="local-text-overrides" className="grid scroll-mt-6 gap-5">
        <h2 className="text-2xl font-semibold">
          Local text overrides — all components
        </h2>
        <p>
          The secondary control and surface text colours are green in @theme
          inline. Every instance below adds text-red-500 directly to the
          component. Its text or icon should be red; a green result reveals an
          override conflict. Labels without a slot-specific text colour may
          otherwise use the neutral default.
        </p>
        <div className="flex flex-wrap gap-5 text-sm">
          <span className="text-secondary-content">
            Theme control text: green
          </span>
          <span className="text-secondary-surface-content">
            Theme surface text: green
          </span>
          <span className="text-red-500">Expected local text: red</span>
        </div>
        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <OverrideExample name="Button" classes="btn secondary text-red-500">
            <button type="button" className="btn secondary text-red-500">
              Button text
            </button>
          </OverrideExample>
          <OverrideExample
            name="Icon button"
            classes="btn-icon secondary text-red-500"
          >
            <button
              type="button"
              className="btn-icon secondary text-red-500"
              aria-label="Add item"
            >
              <Plus />
            </button>
          </OverrideExample>
          <OverrideExample
            name="Bump button"
            classes="btn-bump secondary text-red-500"
          >
            <button
              type="button"
              className="btn-bump secondary text-red-500"
              aria-label="Close"
            >
              <Close />
            </button>
          </OverrideExample>
          <OverrideExample name="Badge" classes="badge secondary text-red-500">
            <span className="badge secondary text-red-500">Badge text</span>
          </OverrideExample>
          <OverrideExample name="Input" classes="input secondary text-red-500">
            <label className="input secondary text-red-500">
              <input placeholder=" " defaultValue="Input value" />
              <span>Input label</span>
            </label>
          </OverrideExample>
          <OverrideExample
            name="Textarea"
            classes="textarea secondary text-red-500"
          >
            <label className="textarea secondary text-red-500">
              <textarea placeholder=" " defaultValue="Textarea value" />
              <span>Textarea label</span>
            </label>
          </OverrideExample>
          <OverrideExample
            name="Select"
            classes="select secondary text-red-500"
          >
            <label className="select secondary text-red-500">
              <select defaultValue="selected">
                <option value="selected">Selected value</option>
                <option>Another value</option>
              </select>
              <span>Select label</span>
              <i className="picker-icon" />
            </label>
          </OverrideExample>
          <OverrideExample
            name="Checkbox"
            classes="checkbox secondary text-red-500"
          >
            <label className="checkbox secondary text-red-500">
              <input type="checkbox" defaultChecked />
              <span className="checkbox-box" />
              Checkbox label
            </label>
          </OverrideExample>
          <OverrideExample name="Radio" classes="radio secondary text-red-500">
            <label className="radio secondary text-red-500">
              <input type="radio" name="local-text-radio" defaultChecked />
              <span className="radio-ring" />
              Radio label
            </label>
          </OverrideExample>
          <OverrideExample
            name="Switch"
            classes="toggle secondary text-red-500"
          >
            <label className="toggle secondary text-red-500">
              <input type="checkbox" role="switch" defaultChecked />
              <span className="toggle-track">
                <span className="toggle-thumb" />
              </span>
              Switch label
            </label>
          </OverrideExample>
          <OverrideExample name="Range" classes="range secondary text-red-500">
            <Range
              className="range secondary text-red-500"
              label="Range label"
              value={62}
            />
          </OverrideExample>
          <OverrideExample
            name="Message"
            classes="message secondary text-red-500"
          >
            <p className="message secondary text-red-500">Message text</p>
          </OverrideExample>
          <OverrideExample name="Alert" classes="alert secondary text-red-500">
            <div className="alert secondary text-red-500">
              <Info />
              <div>
                <p className="font-semibold">Alert title</p>
                <p>Alert description</p>
              </div>
            </div>
          </OverrideExample>
          <OverrideExample name="Card" classes="card secondary text-red-500">
            <section className="card secondary text-red-500">
              <h3 className="font-semibold">Card title</h3>
              <p className="mt-2">Card description</p>
            </section>
          </OverrideExample>
          <OverrideExample
            name="Dialog panel"
            classes="modal-panel secondary text-red-500"
          >
            <TestBenchButton
              type="button"
              variant="secondary"
              className="text-sm"
              onClick={() => openDialog("dialog-local-text-override")}
            >
              Open dialog test
            </TestBenchButton>
            <dialog id="dialog-local-text-override" className="modal">
              <div className="modal-panel secondary text-red-500">
                <form method="dialog">
                  <button
                    type="submit"
                    className="btn-bump"
                    aria-label="Close dialog"
                  >
                    <Close />
                  </button>
                </form>
                <h3 className="pe-8 text-lg font-semibold">Dialog title</h3>
                <p className="mt-2">Dialog description</p>
              </div>
            </dialog>
          </OverrideExample>
        </div>
      </section>
      <PropertyOverrides />
      <NestedThemes
        onReport={setThemeReport}
        onMaterialReport={setMaterialReport}
      />
      <PropertyAudit
        themeReport={themeReport}
        materialReport={materialReport}
      />
    </main>
  );
};

export default Customize;
