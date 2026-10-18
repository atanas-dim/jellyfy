import { ComponentSlug } from "@/resources/component-slugs";

export type ShowcaseComponent = {
  slug: ComponentSlug;
  name: string;
  description: string;
  usage: string;
};

export const COMPONENTS: Record<ComponentSlug, ShowcaseComponent> = {
  [ComponentSlug.Button]: {
    slug: ComponentSlug.Button,
    name: "Button",
    description: "The main action, with a soft raised press.",
    usage: `<button class="jellyfy-button jellyfy-primary">Launch</button>`,
  },
  [ComponentSlug.IconButton]: {
    slug: ComponentSlug.IconButton,
    name: "Icon button",
    description: "The same press, for an icon alone.",
    usage: `<button class="jellyfy-icon-button jellyfy-primary" aria-label="Add">+</button>`,
  },
  [ComponentSlug.Input]: {
    slug: ComponentSlug.Input,
    name: "Input",
    description: "A soft field. The label rises as you type.",
    usage: `<label class="jellyfy-input jellyfy-error">
  <input placeholder=" ">
  <span>Email</span>
</label>`,
  },
  [ComponentSlug.Textarea]: {
    slug: ComponentSlug.Textarea,
    name: "Textarea",
    description: "The same field, when one line is not enough.",
    usage: `<label class="jellyfy-textarea">
  <textarea placeholder=" "></textarea>
  <span>Note</span>
</label>`,
  },
  [ComponentSlug.Select]: {
    slug: ComponentSlug.Select,
    name: "Select",
    description: "A native menu, wrapped in the same soft field.",
    usage: `<label class="jellyfy-select jellyfy-neutral">
  <select>
    <option>Mint</option>
  </select>
  <span>Flavor</span>
</label>`,
  },
  [ComponentSlug.Checkbox]: {
    slug: ComponentSlug.Checkbox,
    name: "Checkbox",
    description: "A small mark that fills when it is chosen.",
    usage: `<label class="jellyfy-checkbox jellyfy-primary">
  <input type="checkbox">
  <span class="jellyfy-checkbox-box"></span>
  Remember this device
</label>`,
  },
  [ComponentSlug.Radio]: {
    slug: ComponentSlug.Radio,
    name: "Radio",
    description: "One choice in a group, in the color you set.",
    usage: `<label class="jellyfy-radio jellyfy-primary">
  <input type="radio" name="delivery">
  <span class="jellyfy-radio-ring"></span>
  Standard
</label>`,
  },
  [ComponentSlug.Switch]: {
    slug: ComponentSlug.Switch,
    name: "Switch",
    description: "On and off, with the same soft travel.",
    usage: `<label class="jellyfy-switch jellyfy-primary">
  <input type="checkbox" role="switch" checked>
  <span class="jellyfy-switch-track"><span class="jellyfy-switch-thumb"></span></span>
  Notifications
</label>`,
  },
  [ComponentSlug.Slider]: {
    slug: ComponentSlug.Slider,
    name: "Slider",
    description: "Drag along a soft track. The fill is your color.",
    usage: `<label class="jellyfy-slider jellyfy-primary">
  Volume
  <input type="range" value="62">
</label>`,
  },
  [ComponentSlug.Alert]: {
    slug: ComponentSlug.Alert,
    name: "Alert",
    description: "A status line that stays easy to read.",
    usage: `<div class="jellyfy-alert jellyfy-warning">Check the name</div>`,
  },
  [ComponentSlug.Badge]: {
    slug: ComponentSlug.Badge,
    name: "Badge",
    description: "A small label in any of the seven colors.",
    usage: `<span class="jellyfy-badge jellyfy-success">Ready</span>`,
  },
  [ComponentSlug.Card]: {
    slug: ComponentSlug.Card,
    name: "Card",
    description: "A quiet panel for grouping what sits together.",
    usage: `<section class="jellyfy-card">Studio notes</section>`,
  },
  [ComponentSlug.Dialog]: {
    slug: ComponentSlug.Dialog,
    name: "Dialog",
    description: "A real dialog, with a jelly panel inside.",
    usage: `<dialog class="jellyfy-dialog">
  <div class="jellyfy-dialog-panel">Publish this draft</div>
</dialog>`,
  },
};

export const COMPONENT_LIST = Object.values(COMPONENTS);

export const getComponentBySlug = (
  slug: string,
): ShowcaseComponent | undefined => {
  return COMPONENTS[slug as ComponentSlug];
};
