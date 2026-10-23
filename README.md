# Jellyfy

Soft controls from one material.

A control looks poured, not painted. It is translucent, it carries a fine grain, and the edge is thick enough to catch light. Press it and it gives.

Keep the element you already have. Add a class. Pick one of eight colors. Call `startJellyfy()` once. That call runs the press, the loading lights, and the slider fill.

## The material

Depth is three separate things.

- Thickness is the inset of the material. It says what kind of thing the object is.
- Elevation is the drop shadow. It says how far the object sits off the page.
- Press light is the wash that appears while a control is pressed, or while a field is focused.

Color is quiet on surfaces and fields, and stronger on buttons and badges. A theme changes the solids. It does not flatten that difference.

The typeface belongs to the page. Jellyfy inherits it. Light and dark follow the operating system, or the `light` and `dark` classes on the page.

## The set

Button, icon button, bump button, input, textarea, select, checkbox, radio, toggle, range, alert, badge, card, modal, and message.

Slots are `primary`, `secondary`, `tertiary`, `neutral`, `success`, `warning`, `error`, and `info`. Sizes are `sm`, `md`, and `lg`. A control with no size class is medium. The icon button and the bump button share `btn-sm`, `btn-md`, and `btn-lg` with the text button.

## With Tailwind, or without

Jellyfy is not a Tailwind plugin. It reads Tailwind color and spacing variables when they exist, and uses its own fallbacks when they do not. A utility such as `w-full` still applies. The press stays.

Import the whole library with `jellyfy/jellyfy.css`, or import the material, the motion, and the components you use. A component file that is not imported is not in the build.

## This repository

- `packages/jellyfy` is the package that ships to npm.
- `apps/web` is the product site, at [jellyfy.vercel.app](https://jellyfy.vercel.app).
- `examples/` holds the HTML, React, and Vue proofs.
- `docs/` holds the specification and the maintainer notes.

On the site:

- `/` is the introduction.
- `/set` is every component, color, and size.
- `/docs` is the guide.
- `/design-system` is the specification.

The specification source is `docs/design-system.md`.

## Install

```bash
npm install jellyfy
```

```css
@import "tailwindcss";
@import "jellyfy/jellyfy.css";
```

```js
import { startJellyfy } from "jellyfy";

startJellyfy();
```

The npm page, with the per-component imports and the variables you can change, is `packages/jellyfy/README.md`.

To run this site locally:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).
