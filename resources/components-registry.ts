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
    description:
      "Raised brand control. Idle, busy, and complete stay on the brand tokens.",
    usage: `<button class="jellyfy-button jellyfy-primary">Launch</button>`,
  },
  [ComponentSlug.IconButton]: {
    slug: ComponentSlug.IconButton,
    name: "Icon button",
    description:
      "The same raised press, with an accessible name and no text label.",
    usage: `<button class="jellyfy-icon-button jellyfy-primary" aria-label="Add">+</button>`,
  },
  [ComponentSlug.Input]: {
    slug: ComponentSlug.Input,
    name: "Input",
    description:
      "Field surface with a floating label. Validation uses success and error.",
    usage: `<label class="jellyfy-input jellyfy-error">
  <input placeholder=" ">
  <span>Email</span>
</label>`,
  },
  [ComponentSlug.Textarea]: {
    slug: ComponentSlug.Textarea,
    name: "Textarea",
    description:
      "The input's surface and floating label, for more than one line.",
    usage: `<label class="jellyfy-textarea">
  <textarea placeholder=" "></textarea>
  <span>Note</span>
</label>`,
  },
  [ComponentSlug.Select]: {
    slug: ComponentSlug.Select,
    name: "Select",
    description:
      "A field trigger and a menu. The menu uses the surface inset and the hover drop.",
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
    description:
      "A native checkbox. Chosen uses the brand color. Invalid uses error.",
    usage: `<label class="jellyfy-checkbox jellyfy-primary">
  <input type="checkbox">
  <span class="jellyfy-checkbox-box"></span>
  Remember this device
</label>`,
  },
  [ComponentSlug.Radio]: {
    slug: ComponentSlug.Radio,
    name: "Radio",
    description: "A native radio group. One choice takes the brand color.",
    usage: `<label class="jellyfy-radio jellyfy-primary">
  <input type="radio" name="delivery">
  <span class="jellyfy-radio-ring"></span>
  Standard
</label>`,
  },
  [ComponentSlug.Switch]: {
    slug: ComponentSlug.Switch,
    name: "Switch",
    description:
      "A native checkbox presented as a switch. On uses the brand color.",
    usage: `<label class="jellyfy-switch jellyfy-primary">
  <input type="checkbox" role="switch" checked>
  <span class="jellyfy-switch-track"><span class="jellyfy-switch-thumb"></span></span>
  Notifications
</label>`,
  },
  [ComponentSlug.Slider]: {
    slug: ComponentSlug.Slider,
    name: "Slider",
    description:
      "A native range. The track is the surface. The fill is the brand color.",
    usage: `<label class="jellyfy-slider jellyfy-primary">
  Volume
  <input type="range" value="62">
</label>`,
  },
  [ComponentSlug.Alert]: {
    slug: ComponentSlug.Alert,
    name: "Alert",
    description: "Status message. Warning lives here, with success and error.",
    usage: `<div class="jellyfy-alert jellyfy-warning">Check the name</div>`,
  },
  [ComponentSlug.Badge]: {
    slug: ComponentSlug.Badge,
    name: "Badge",
    description: "Brand and status colors at a small size.",
    usage: `<span class="jellyfy-badge jellyfy-success">Ready</span>`,
  },
  [ComponentSlug.Card]: {
    slug: ComponentSlug.Card,
    name: "Card",
    description:
      "A resting surface. The field radius and inset, without a press.",
    usage: `<section class="jellyfy-card">Studio notes</section>`,
  },
  [ComponentSlug.Dialog]: {
    slug: ComponentSlug.Dialog,
    name: "Dialog",
    description: "A native dialog. The panel uses the overlay shadow.",
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
