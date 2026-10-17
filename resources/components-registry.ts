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
    usage: `import { Button } from "./components/button"

<Button state="idle">Launch</Button>`,
  },
  [ComponentSlug.IconButton]: {
    slug: ComponentSlug.IconButton,
    name: "Icon button",
    description:
      "The same raised press, with an accessible name and no text label.",
    usage: `import { IconButton } from "./components/icon-button"

<IconButton label="Add">
  <PlusIcon />
</IconButton>`,
  },
  [ComponentSlug.Input]: {
    slug: ComponentSlug.Input,
    name: "Input",
    description:
      "Field surface with a floating label. Validation uses success and error.",
    usage: `import { Input } from "./components/input"

<Input label="Email" state="error" />`,
  },
  [ComponentSlug.Textarea]: {
    slug: ComponentSlug.Textarea,
    name: "Textarea",
    description:
      "The input's surface and floating label, for more than one line.",
    usage: `import { Textarea } from "./components/textarea"

<Textarea label="Note" />`,
  },
  [ComponentSlug.Select]: {
    slug: ComponentSlug.Select,
    name: "Select",
    description:
      "A field trigger and a menu. The menu uses the surface inset and the hover drop.",
    usage: `import { Select, SelectOption } from "./components/select"

<Select label="Flavor" value={value} onValueChange={setValue}>
  <SelectOption value="mint">Mint</SelectOption>
</Select>`,
  },
  [ComponentSlug.Checkbox]: {
    slug: ComponentSlug.Checkbox,
    name: "Checkbox",
    description:
      "A native checkbox. Chosen uses the brand color. Invalid uses error.",
    usage: `import { Checkbox } from "./components/checkbox"

<Checkbox label="Remember this device" />`,
  },
  [ComponentSlug.Radio]: {
    slug: ComponentSlug.Radio,
    name: "Radio",
    description: "A native radio group. One choice takes the brand color.",
    usage: `import { Radio, RadioItem } from "./components/radio"

<Radio label="Delivery" defaultValue="standard">
  <RadioItem value="standard">Standard</RadioItem>
</Radio>`,
  },
  [ComponentSlug.Switch]: {
    slug: ComponentSlug.Switch,
    name: "Switch",
    description:
      "A native checkbox presented as a switch. On uses the brand color.",
    usage: `import { Switch } from "./components/switch"

<Switch label="Notifications" defaultChecked />`,
  },
  [ComponentSlug.Slider]: {
    slug: ComponentSlug.Slider,
    name: "Slider",
    description:
      "A native range. The track is the surface. The fill is the brand color.",
    usage: `import { Slider } from "./components/slider"

<Slider label="Volume" defaultValue={62} />`,
  },
  [ComponentSlug.Alert]: {
    slug: ComponentSlug.Alert,
    name: "Alert",
    description: "Status message. Warning lives here, with success and error.",
    usage: `import { Alert } from "./components/alert"

<Alert tone="warning" title="Check the name" />`,
  },
  [ComponentSlug.Badge]: {
    slug: ComponentSlug.Badge,
    name: "Badge",
    description: "Brand and status colors at a small size.",
    usage: `import { Badge } from "./components/badge"

<Badge tone="success">Ready</Badge>`,
  },
  [ComponentSlug.Card]: {
    slug: ComponentSlug.Card,
    name: "Card",
    description:
      "A resting surface. The field radius and inset, without a press.",
    usage: `import { Card } from "./components/card"

<Card title="Studio notes">A quiet surface.</Card>`,
  },
  [ComponentSlug.Dialog]: {
    slug: ComponentSlug.Dialog,
    name: "Dialog",
    description: "A native dialog. The panel uses the overlay shadow.",
    usage: `import { Dialog } from "./components/dialog"

<Dialog trigger="Open dialog" title="Publish this draft" />`,
  },
};

export const COMPONENT_LIST = Object.values(COMPONENTS);

export const getComponentBySlug = (
  slug: string,
): ShowcaseComponent | undefined => {
  return COMPONENTS[slug as ComponentSlug];
};
