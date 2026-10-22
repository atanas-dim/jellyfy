export type ClassRow = {
  name: string;
  kind: "Component" | "Part" | "Size" | "Color" | "State";
  note: string;
};

export type DocExample = {
  id: string;
  title: string;
  code: string;
  note?: string;
};

export type ComponentDoc = {
  slug: string;
  name: string;
  description: string;
  classes: ClassRow[];
  examples: DocExample[];
  notes: string[];
};

const color = (): ClassRow[] =>
  (
    [
      ["primary", "Indigo"],
      ["secondary", "Pink"],
      ["tertiary", "Teal"],
      ["neutral", "Gray"],
      ["success", "Green"],
      ["error", "Red"],
      ["warning", "Amber"],
      ["info", "Sky"],
    ] as const
  ).map(([name, hue]) => ({
    name,
    kind: "Color" as const,
    note: `${hue} by default.`,
  }));

const HUES = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "success",
  "error",
  "warning",
  "info",
] as const;

const HUE_NAME: Record<(typeof HUES)[number], string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  neutral: "Neutral",
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Info",
};

const hues = (line: (name: string, label: string) => string) =>
  HUES.map((name) => line(name, HUE_NAME[name])).join("\n");

const sizes = (prefix: string): ClassRow[] => [
  {
    name: prefix,
    kind: "Size",
    note: "Regular. No extra class.",
  },
  { name: `${prefix}-sm`, kind: "Size", note: "Small." },
  { name: `${prefix}-lg`, kind: "Size", note: "Large." },
];

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    description: "The main action, with a soft press.",
    classes: [
      { name: "btn", kind: "Component", note: "The button." },
      ...sizes("btn").slice(1),
      ...color(),
      {
        name: "loading",
        kind: "State",
        note: "Shows the sweep and a spinner. Put it on with a color, as in btn primary loading.",
      },
    ],
    examples: [
      {
        id: "button-colors",
        title: "Colors",
        code: `<button class="btn primary" type="button"><span>Primary</span></button>
<button class="btn secondary" type="button"><span>Secondary</span></button>
<button class="btn tertiary" type="button"><span>Tertiary</span></button>
<button class="btn neutral" type="button"><span>Neutral</span></button>
<button class="btn success" type="button"><span>Success</span></button>
<button class="btn error" type="button"><span>Error</span></button>
<button class="btn warning" type="button"><span>Warning</span></button>
<button class="btn info" type="button"><span>Info</span></button>`,
      },
      {
        id: "button-sizes",
        title: "Sizes",
        code: `<button class="btn btn-sm" type="button"><span>Small</span></button>
<button class="btn" type="button"><span>Regular</span></button>
<button class="btn btn-lg" type="button"><span>Large</span></button>`,
        note: "Regular is btn alone. btn-sm and btn-lg are the other sizes.",
      },
      {
        id: "button-states",
        title: "Loading and disabled",
        code: `<button class="btn primary loading" type="button"><span>Loading</span></button>
<button class="btn" type="button" disabled><span>Disabled</span></button>`,
        note: "Use the disabled attribute. Put the words in a span so the press lights stay behind them.",
      },
    ],
    notes: [
      "A button with no color class uses the plain surface. A slot such as primary tints the fill. The label sits in a span so the press lights stay behind the words.",
    ],
  },
  {
    slug: "icon-button",
    name: "Icon button",
    description: "The same press, for an icon alone.",
    classes: [
      {
        name: "btn-icon",
        kind: "Component",
        note: "A square button. Pair it with btn-sm or btn-lg for the other sizes.",
      },
      { name: "btn-sm", kind: "Size", note: "Small. Use it with btn-icon." },
      { name: "btn-lg", kind: "Size", note: "Large. Use it with btn-icon." },
      ...color(),
      {
        name: "loading",
        kind: "State",
        note: "An orbit of lights, because the face is square.",
      },
    ],
    examples: [
      {
        id: "icon-colors",
        title: "Colors",
        code: `<button class="btn-icon primary" type="button" aria-label="Add">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
</button>`,
        note: "Give it an accessible name. Leave the svg without a size class. The button sets the icon size.",
      },
      {
        id: "icon-sizes",
        title: "Sizes",
        code: `<button class="btn-icon btn-sm" type="button" aria-label="Add small"></button>
<button class="btn-icon" type="button" aria-label="Add"></button>
<button class="btn-icon btn-lg" type="button" aria-label="Add large"></button>`,
      },
    ],
    notes: [],
  },
  {
    slug: "bump-button",
    name: "Bump button",
    description: "A transparent close control. The lights stay on.",
    classes: [
      {
        name: "btn-bump",
        kind: "Component",
        note: "No fill and no radius. Pair it with btn-sm or btn-lg for the other sizes.",
      },
      { name: "btn-sm", kind: "Size", note: "Small. Use it with btn-bump." },
      { name: "btn-lg", kind: "Size", note: "Large. Use it with btn-bump." },
      ...color(),
    ],
    examples: [
      {
        id: "bump-basic",
        title: "Close",
        code: `<button class="btn-bump" type="button" aria-label="Close">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
</button>`,
        note: "Leave the svg without a size. The button sets the icon size. On a modal panel it sits 0.75rem from the top and the trailing edge.",
      },
      {
        id: "bump-sizes",
        title: "Sizes",
        code: `<button class="btn-bump btn-sm" type="button" aria-label="Close"></button>
<button class="btn-bump" type="button" aria-label="Close"></button>
<button class="btn-bump btn-lg" type="button" aria-label="Close"></button>`,
      },
    ],
    notes: [
      "A bump button on a slotted card, alert, or modal panel uses that surface’s text color.",
    ],
  },
  {
    slug: "input",
    name: "Input",
    description:
      "A soft field. The label rests on the text line, then rises once you focus or type.",
    classes: [
      {
        name: "input",
        kind: "Component",
        note: "The label that wraps the field.",
      },
      ...sizes("input").slice(1),
      {
        name: "input-start",
        kind: "Part",
        note: "An icon before the text. It centers on one line.",
      },
      { name: "input-end", kind: "Part", note: "An icon after the text." },
      ...color(),
    ],
    examples: [
      {
        id: "input-basic",
        title: "Field",
        code: `<label class="input">
  <input placeholder=" ">
  <span>Email</span>
</label>`,
        note: "The placeholder is a single space. That is how the label knows the field is empty. The span is the label.",
      },
      {
        id: "input-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<label class="input ${name}">
  <input placeholder=" " value="${label}">
  <span>${label}</span>
</label>`,
        ),
      },
      {
        id: "input-sizes",
        title: "Sizes",
        code: `<label class="input input-sm">
  <input placeholder=" ">
  <span>Small</span>
</label>`,
      },
      {
        id: "input-icons",
        title: "Icons",
        code: `<label class="input">
  <span class="input-start" aria-hidden="true"><svg><!-- search --></svg></span>
  <input placeholder=" ">
  <span>Search</span>
  <span class="input-end" aria-hidden="true"><svg><!-- send --></svg></span>
</label>`,
        note: "The text and the label indent to clear the icons.",
      },
      {
        id: "input-message",
        title: "With a message",
        code: `<label class="input error">
  <input placeholder=" ">
  <span>Email</span>
</label>
<p class="message">Use a work address.</p>`,
      },
    ],
    notes: [
      "With no color class, the field stays plain and the text is the plain content color. A slot uses the surface content color. While the field is empty and not focused, the label is large and dim, on the text line. Focus, or the first letter, shrinks it to a caption and the caret is already where the letters go.",
    ],
  },
  {
    slug: "message",
    name: "Message",
    description:
      "A short note under a control. With no color it uses the plain content color. A slot uses that solid.",
    classes: [
      {
        name: "message",
        kind: "Component",
        note: "The note. Regular is 12px.",
      },
      {
        name: "message-sm",
        kind: "Size",
        note: "10px. A step under a small field.",
      },
      {
        name: "message-lg",
        kind: "Size",
        note: "14px. A step under a large field.",
      },
      ...color(),
    ],
    examples: [
      {
        id: "message-colors",
        title: "Colors",
        code: hues((name, label) => `<p class="message ${name}">${label}</p>`),
        note: "With no color class, the note uses the plain content color. Add error, success, or warning when the note should use that solid.",
      },
      {
        id: "message-sizes",
        title: "Sizes",
        code: `<p class="message message-sm">Small</p>
<p class="message">Regular</p>
<p class="message message-lg">Large</p>`,
      },
    ],
    notes: [
      "A color class on a parent is inherited. A message inside a primary card follows that card unless the message itself says error, or whichever color you mean.",
    ],
  },
  {
    slug: "textarea",
    name: "Textarea",
    description:
      "The same field, when one line is not enough. It uses the input’s top spacing and grows down.",
    classes: [
      {
        name: "textarea",
        kind: "Component",
        note: "The label that wraps the textarea.",
      },
      ...sizes("textarea").slice(1),
      {
        name: "input-start",
        kind: "Part",
        note: "An icon. On a textarea it sits with the first line.",
      },
      {
        name: "input-end",
        kind: "Part",
        note: "An icon at the end of the first line.",
      },
      ...color(),
    ],
    examples: [
      {
        id: "textarea-basic",
        title: "Field",
        code: `<label class="textarea">
  <textarea placeholder=" "></textarea>
  <span>Note</span>
</label>`,
        note: "Same empty placeholder as the input. The shell hugs the textarea.",
      },
      {
        id: "textarea-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<label class="textarea ${name}">
  <textarea placeholder=" ">${label}</textarea>
  <span>Note</span>
</label>`,
        ),
      },
      {
        id: "textarea-sizes",
        title: "Sizes",
        code: `<label class="textarea textarea-lg">
  <textarea placeholder=" "></textarea>
  <span>Large</span>
</label>`,
      },
    ],
    notes: [],
  },
  {
    slug: "select",
    name: "Select",
    description: "A native menu in the same soft field.",
    classes: [
      {
        name: "select",
        kind: "Component",
        note: "The label that wraps the select.",
      },
      ...sizes("select").slice(1),
      {
        name: "picker-icon",
        kind: "Part",
        note: "The mark. CSS calls the native one ::picker-icon. An empty i is the default shape. An svg with this class replaces it.",
      },
      ...color(),
    ],
    examples: [
      {
        id: "select-basic",
        title: "Field",
        code: `<label class="select">
  <select>
    <option>Mint</option>
    <option>Rose</option>
  </select>
  <span>Flavor</span>
  <i class="picker-icon"></i>
</label>`,
        note: "Include picker-icon. The library hides the native ::picker-icon. Chrome and Safari use the styled menu. Firefox uses the system menu.",
      },
      {
        id: "select-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<label class="select ${name}">
  <select>
    <option>${label}</option>
  </select>
  <span>${label}</span>
  <i class="picker-icon"></i>
</label>`,
        ),
      },
      {
        id: "select-mark",
        title: "Your own mark",
        code: `<svg class="picker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="m6 9 6 6 6-6" />
</svg>`,
        note: "Any svg with the class picker-icon replaces the default mark and sits in the field.",
      },
      {
        id: "select-sizes",
        title: "Sizes",
        code: `<label class="select select-sm">
  <select><option>Small</option></select>
  <span>Small</span>
  <i class="picker-icon"></i>
</label>`,
      },
    ],
    notes: [],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    description: "A small mark that fills when it is chosen.",
    classes: [
      { name: "checkbox", kind: "Component", note: "The label." },
      {
        name: "checkbox-box",
        kind: "Part",
        note: "The box. The check is drawn inside it.",
      },
      ...sizes("checkbox").slice(1),
      ...color(),
    ],
    examples: [
      {
        id: "checkbox-basic",
        title: "Checked and unchecked",
        code: `<label class="checkbox primary">
  <input type="checkbox" checked>
  <span class="checkbox-box"></span>
  Remember this device
</label>`,
      },
      {
        id: "checkbox-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<label class="checkbox ${name}">
  <input type="checkbox" checked>
  <span class="checkbox-box"></span>
  ${label}
</label>`,
        ),
      },
      {
        id: "checkbox-sizes",
        title: "Sizes",
        code: `<label class="checkbox checkbox-sm">
  <input type="checkbox" checked>
  <span class="checkbox-box"></span>
  Small
</label>`,
      },
    ],
    notes: [
      "With no color class, the box stays plain. A slot fills the chosen box with that control color. A disabled checkbox uses the disabled colors in both the checked and unchecked states.",
    ],
  },
  {
    slug: "radio",
    name: "Radio",
    description: "One choice in a group.",
    classes: [
      { name: "radio", kind: "Component", note: "The label." },
      {
        name: "radio-ring",
        kind: "Part",
        note: "The ring. The dot inside it keeps the noise.",
      },
      ...sizes("radio").slice(1),
      ...color(),
    ],
    examples: [
      {
        id: "radio-basic",
        title: "A group",
        code: `<label class="radio primary">
  <input type="radio" name="note" checked>
  <span class="radio-ring"></span>
  Keep
</label>
<label class="radio primary">
  <input type="radio" name="note">
  <span class="radio-ring"></span>
  Send
</label>`,
        note: "Share a name so the group is one choice.",
      },
      {
        id: "radio-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<label class="radio ${name}">
  <input type="radio" name="${name}" checked>
  <span class="radio-ring"></span>
  ${label}
</label>`,
        ),
      },
      {
        id: "radio-sizes",
        title: "Sizes",
        code: `<label class="radio radio-lg">
  <input type="radio" name="size" checked>
  <span class="radio-ring"></span>
  Large
</label>`,
      },
    ],
    notes: [],
  },
  {
    slug: "switch",
    name: "Switch",
    description: "On and off, with the same soft travel.",
    classes: [
      { name: "toggle", kind: "Component", note: "The label." },
      { name: "toggle-track", kind: "Part", note: "The track." },
      {
        name: "toggle-thumb",
        kind: "Part",
        note: "The thumb. It keeps the noise when it is white.",
      },
      ...sizes("toggle").slice(1),
      ...color(),
    ],
    examples: [
      {
        id: "switch-basic",
        title: "On and off",
        code: `<label class="toggle primary">
  <input type="checkbox" role="switch" checked>
  <span class="toggle-track"><span class="toggle-thumb"></span></span>
  Notifications
</label>`,
        note: 'role="switch" is what makes the checkbox a switch for assistive tech.',
      },
      {
        id: "switch-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<label class="toggle ${name}">
  <input type="checkbox" role="switch" checked>
  <span class="toggle-track"><span class="toggle-thumb"></span></span>
  ${label}
</label>`,
        ),
      },
      {
        id: "switch-sizes",
        title: "Sizes",
        code: `<label class="toggle toggle-sm">
  <input type="checkbox" role="switch" checked>
  <span class="toggle-track"><span class="toggle-thumb"></span></span>
  Small
</label>`,
      },
    ],
    notes: [],
  },
  {
    slug: "slider",
    name: "Slider",
    description: "A soft track and a handle. The fill follows the input.",
    classes: [
      { name: "range", kind: "Component", note: "The label." },
      {
        name: "range-box",
        kind: "Part",
        note: "The positioning box for the track and the handle.",
      },
      { name: "range-track", kind: "Part", note: "The track." },
      {
        name: "range-fill",
        kind: "Part",
        note: "The filled part. The script sets its width from the input.",
      },
      { name: "range-thumb", kind: "Part", note: "The handle." },
      ...sizes("range").slice(1),
      ...color(),
    ],
    examples: [
      {
        id: "slider-basic",
        title: "Track",
        code: `<label class="range primary">
  Volume
  <span class="range-box">
    <span class="range-track"><span class="range-fill"></span></span>
    <span class="range-thumb"></span>
    <input type="range" value="62">
  </span>
</label>`,
        note: "startJellyfy() reads the input and moves the fill and the handle. Without that call, the fill stays put.",
      },
      {
        id: "slider-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<label class="range ${name}">
  ${label}
  <span class="range-box">
    <span class="range-track"><span class="range-fill"></span></span>
    <span class="range-thumb"></span>
    <input type="range" value="62">
  </span>
</label>`,
        ),
      },
      {
        id: "slider-sizes",
        title: "Sizes",
        code: `<label class="range range-lg">
  Large
  <span class="range-box">
    <span class="range-track"><span class="range-fill"></span></span>
    <span class="range-thumb"></span>
    <input type="range" value="40">
  </span>
</label>`,
      },
    ],
    notes: [
      "The track and the handle both sit on the small drop shadow. The track is a jelly surface, not only the handle.",
    ],
  },
  {
    slug: "alert",
    name: "Alert",
    description:
      "A status block. The icon sits on the first line, and the heading and body sit beside it.",
    classes: [
      {
        name: "alert",
        kind: "Component",
        note: "The block. Regular text is 16px.",
      },
      { name: "alert-sm", kind: "Size", note: "14px text." },
      { name: "alert-lg", kind: "Size", note: "20px text." },
      ...color(),
    ],
    examples: [
      {
        id: "alert-basic",
        title: "With an icon",
        code: `<div class="alert warning">
  <svg aria-hidden="true"><!-- info --></svg>
  <div>
    <p class="font-semibold">Check the date</p>
    <p>This offer ends tonight.</p>
  </div>
</div>`,
        note: "The icon is the first element, and it is an svg. The text is the next element. The icon centers on the first line.",
      },
      {
        id: "alert-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<div class="alert ${name}">
  <svg aria-hidden="true"></svg>
  <div>
    <p class="font-semibold">${label}</p>
    <p>A light surface with dark text.</p>
  </div>
</div>`,
        ),
      },
      {
        id: "alert-sizes",
        title: "Sizes",
        code: `<div class="alert alert-sm">...</div>
<div class="alert">...</div>
<div class="alert alert-lg">...</div>`,
        note: "Each size sets the type as well as the padding: 14px, 16px, and 20px.",
      },
    ],
    notes: [
      "With no color class, the alert stays plain. A slot uses the wash, and the text is the surface content color.",
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    description: "A small pill in any of the eight colors.",
    classes: [
      { name: "badge", kind: "Component", note: "The pill." },
      ...sizes("badge").slice(1),
      ...color(),
    ],
    examples: [
      {
        id: "badge-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<span class="badge ${name}">${label}</span>`,
        ),
      },
      {
        id: "badge-sizes",
        title: "Sizes",
        code: `<span class="badge badge-sm">Small</span>
<span class="badge">Regular</span>
<span class="badge badge-lg">Large</span>`,
      },
    ],
    notes: [
      "A badge uses the small drop shadow, the same step as a mark or a slider handle.",
    ],
  },
  {
    slug: "card",
    name: "Card",
    description: "A quiet panel. Add squish when it should press.",
    classes: [
      {
        name: "card",
        kind: "Component",
        note: "The panel. With no color class, the card stays plain.",
      },
      ...sizes("card").slice(1),
      ...color().map((row) =>
        row.name === "primary"
          ? {
              ...row,
              note: "A wash of this solid. The text is the surface content color. With no color class, the card stays plain.",
            }
          : row,
      ),
      {
        name: "squish",
        kind: "State",
        note: "Adds the press to the card.",
      },
    ],
    examples: [
      {
        id: "card-basic",
        title: "Plain",
        code: `<section class="card">
  <h3>Studio notes</h3>
  <p>A plain jelly panel.</p>
</section>`,
      },
      {
        id: "card-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<section class="card ${name}">
  <h3>${label}</h3>
</section>`,
        ),
      },
      {
        id: "card-sizes",
        title: "Sizes",
        code: `<section class="card card-sm"><h3>Small</h3></section>
<section class="card"><h3>Regular</h3></section>
<section class="card card-lg"><h3>Large</h3></section>`,
        note: "The sizes change the type as well as the padding: 14px, 16px, and 20px.",
      },
    ],
    notes: [],
  },
  {
    slug: "dialog",
    name: "Dialog",
    description: "A real dialog element, with a jelly panel inside.",
    classes: [
      { name: "modal", kind: "Component", note: "The dialog element." },
      { name: "modal-panel", kind: "Part", note: "The panel." },
      {
        name: "modal-sm",
        kind: "Size",
        note: "Less padding. Put it on modal-panel. The width stays the same.",
      },
      {
        name: "modal-lg",
        kind: "Size",
        note: "More padding. Put it on modal-panel. The width stays the same.",
      },
      {
        name: "btn-bump",
        kind: "Part",
        note: "The close control. It sits 0.75rem from the top and the trailing edge of the panel.",
      },
      {
        name: "btn-sm",
        kind: "Size",
        note: "A smaller close control. Use it with btn-bump.",
      },
      {
        name: "btn-lg",
        kind: "Size",
        note: "A larger close control. Use it with btn-bump.",
      },
      ...color().map((row) =>
        row.name === "primary"
          ? {
              ...row,
              note: "Put the color on the panel. It tints the panel, and the close control uses the surface content color. With no color, both stay plain.",
            }
          : row,
      ),
    ],
    examples: [
      {
        id: "dialog-basic",
        title: "Open and close",
        code: `<button class="btn" type="button">Open</button>
<dialog class="modal">
  <div class="modal-panel">
    <form method="dialog">
      <button class="btn-bump" type="submit" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </form>
    <h2>A note</h2>
    <p>Surface panel.</p>
  </div>
</dialog>`,
        note: 'Open it with showModal() on the dialog element. The form method="dialog" closes it. With no color, the panel and the close control stay plain.',
      },
      {
        id: "dialog-colors",
        title: "Colors",
        code: hues(
          (name, label) => `<div class="modal-panel ${name}">
  <h2>${label}</h2>
</div>`,
        ),
        note: "The color goes on modal-panel. It tints the panel and the close control.",
      },
    ],
    notes: [],
  },
];

export const getComponentDoc = (slug: string) =>
  COMPONENT_DOCS.find((doc) => doc.slug === slug);

export const COMPONENT_STYLESHEETS: Record<string, string> = {
  button: "button.css",
  "icon-button": "icon-button.css",
  "bump-button": "bump-button.css",
  input: "input.css",
  message: "message.css",
  textarea: "textarea.css",
  select: "select.css",
  checkbox: "checkbox.css",
  radio: "radio.css",
  switch: "toggle.css",
  slider: "range.css",
  alert: "alert.css",
  badge: "badge.css",
  card: "card.css",
  dialog: "modal.css",
};

export const GUIDE_LINKS = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/install", label: "Install" },
  { href: "/docs/colors", label: "Colors" },
  { href: "/docs/customize", label: "Customize" },
] as const;

export const DOC_LINKS = [
  ...GUIDE_LINKS,
  ...COMPONENT_DOCS.map((doc) => ({
    href: `/docs/${doc.slug}`,
    label: doc.name,
  })),
];
