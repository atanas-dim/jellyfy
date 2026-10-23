import { ComponentSlug } from "@/resources/component-slugs";

export type ShowcaseComponent = {
  slug: ComponentSlug;
  name: string;
  description: string;
};

export const COMPONENTS: Record<ComponentSlug, ShowcaseComponent> = {
  [ComponentSlug.Button]: {
    slug: ComponentSlug.Button,
    name: "Button",
    description: "The main action, with a soft raised press.",
  },
  [ComponentSlug.IconButton]: {
    slug: ComponentSlug.IconButton,
    name: "Icon button",
    description: "The same press, for an icon alone.",
  },
  [ComponentSlug.Input]: {
    slug: ComponentSlug.Input,
    name: "Input",
    description: "A soft field. The label rises as you type.",
  },
  [ComponentSlug.Textarea]: {
    slug: ComponentSlug.Textarea,
    name: "Textarea",
    description: "The same field, when one line is not enough.",
  },
  [ComponentSlug.Select]: {
    slug: ComponentSlug.Select,
    name: "Select",
    description: "A native menu, wrapped in the same soft field.",
  },
  [ComponentSlug.Checkbox]: {
    slug: ComponentSlug.Checkbox,
    name: "Checkbox",
    description: "A small mark that fills when it is chosen.",
  },
  [ComponentSlug.Radio]: {
    slug: ComponentSlug.Radio,
    name: "Radio",
    description: "One choice in a group, in the color you set.",
  },
  [ComponentSlug.Switch]: {
    slug: ComponentSlug.Switch,
    name: "Switch",
    description: "On and off, with the same soft travel.",
  },
  [ComponentSlug.Slider]: {
    slug: ComponentSlug.Slider,
    name: "Slider",
    description: "Drag along a soft track. The fill is your color.",
  },
  [ComponentSlug.Alert]: {
    slug: ComponentSlug.Alert,
    name: "Alert",
    description: "A status line that stays easy to read.",
  },
  [ComponentSlug.Badge]: {
    slug: ComponentSlug.Badge,
    name: "Badge",
    description: "A small label in any of the eight colors.",
  },
  [ComponentSlug.Card]: {
    slug: ComponentSlug.Card,
    name: "Card",
    description: "A quiet panel for grouping what sits together.",
  },
  [ComponentSlug.Dialog]: {
    slug: ComponentSlug.Dialog,
    name: "Dialog",
    description: "A real dialog, with a jelly panel inside.",
  },
};

export const COMPONENT_LIST = Object.values(COMPONENTS);
