# Jellyfy

Soft controls for the markup on the page. Add `btn`, a color such as `primary`, and call `startJellyfy()` once.

The guide is at [jellyfy.vercel.app/docs](https://jellyfy.vercel.app/docs).

## Install

```bash
npm install jellyfy
```

## With Tailwind

Import the stylesheet after Tailwind. A utility such as `px-4` sets that padding. The press stays.

```css
@import "tailwindcss";
@import "jellyfy/jellyfy.css";
```

## Without Tailwind

Link the stylesheet on its own. The controls paint the same way.

```html
<link rel="stylesheet" href="./node_modules/jellyfy/jellyfy.css" />
```

A bundler imports that same file.

```js
import "jellyfy/jellyfy.css";
```

## Call it once

Call `startJellyfy()` once, after the controls are on the page. A pointer press squashes the control under the pointer. Controls that appear later, including after a page change, are included. A later call is ignored.

```js
import { startJellyfy } from "jellyfy";

startJellyfy();
```

Plain HTML:

```html
<script type="module">
  import { startJellyfy } from "./node_modules/jellyfy/jellyfy.js";

  startJellyfy();
</script>
```

## License

[MIT](./LICENSE)
