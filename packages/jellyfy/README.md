# Jellyfy

Soft controls from one material. Add a class, pick a color, and call `startJellyfy()` once.

## Install

```bash
npm install jellyfy
```

## Use the whole library

```css
@import "tailwindcss";
@import "jellyfy/jellyfy.css";
```

```js
import { startJellyfy } from "jellyfy";

startJellyfy();
```

Without Tailwind, link `jellyfy/jellyfy.css` or import that file from a bundler.

## Use one component

Import the material, the motion, and the components you use.

```css
@import "jellyfy/material.css";
@import "jellyfy/motion.css";
@import "jellyfy/button.css";
```

A component file that is not imported is not in the build.

## Classes

`btn`, `btn-icon`, `btn-bump`, `input`, `textarea`, `select`, `checkbox`, `radio`, `toggle`, `range`, `alert`, `badge`, `card`, `modal`, `modal-panel`, and `message`.

Slots are `primary`, `secondary`, `tertiary`, `neutral`, `success`, `warning`, `error`, and `info`. Sizes are `sm`, `md`, and `lg` on the component class. A control with no size class is medium. The icon button and the bump button use `btn-sm`, `btn-md`, and `btn-lg`.

## Variables you can change

One solid, one content color, and one surface content color for each slot:

- `--color-primary` and the same for `secondary`, `tertiary`, `neutral`, `success`, `warning`, `error`, and `info`
- `--color-primary-content` and the same suffix for the other slots
- `--color-primary-surface-content` and the same suffix for the other slots

Also `--radius-surface`, `--radius-field`, `--radius-control`, `--radius-mark`, `--material-opacity`, `--material-blur`, `--noise-size`, and `--elevation`.

Changing a solid does not change its content color or its surface content color. Set those yourself.
