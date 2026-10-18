# What comes next

## Where this stands

Jellyfy is class names on ordinary HTML, plus one script, `startJellyfy()`. The Next app is the demo. It is not the package.

The component rules live in `@layer components`, so a Tailwind utility on the same element overrides only the property it sets. The seven solids are declared in `@theme`, so a later `@theme` can replace one. Components read the `--jellyfy-*` aliases, which use that variable or a hex. Sizes are plain lengths such as `3rem`. They do not use `--spacing`.

`app/jellyfy-boot.tsx` is only how this demo calls `startJellyfy()` after each route. Any other app calls that same function once.

## Tailwind

The goal is Tailwind-compatible, not Tailwind-dependent. This is not a DaisyUI-style requirement. DaisyUI does not run without Tailwind. Jellyfy should.

With Tailwind, a utility on the same element overrides one property, and a later `@theme` replaces a solid. Without Tailwind, the file still paints. The script is the same call either way. Loading lights are library classes, not Tailwind utilities, so the sweep and the spinner still run when Tailwind is absent.

The library carries the gray scale and the spacing unit as fallbacks. It does not assign `--color-neutral-50` or the other Tailwind names. That assignment would replace Tailwind. Each hex is written once, on a Jellyfy name, and that name reads the Tailwind variable first:

```css
:root {
  --jellyfy-neutral-50: var(--color-neutral-50, #fafafa);
}
```

Surfaces use `var(--jellyfy-neutral-50)` only. The hex is not repeated. When Tailwind or the developer has set `--color-neutral-50`, that value is used. When nobody has, the hex is used. The same shape fits the seven solids: `--jellyfy-primary: var(--color-primary, #4f46e5)`. A developer who wants a different primary still sets `--color-primary` only.

Ship the full neutral scale, 50 through 950, as those fallbacks, even though the material uses only 50, 100, 400, 500, 800, and 900 today. A short list looks unfinished, and the next shade would otherwise be a new requirement. Do not ship the rest of Tailwind's hues. Indigo, pink, teal, green, red, and amber exist only as the default values of the seven names.

Do not ask anyone to set `--spacing`, and do not set it ourselves on `:root`. At each size, write `var(--spacing, 0.25rem)`. Tailwind's value wins when it exists. `0.25rem` is used when it does not. That is Tailwind's own default.

Do not use `@apply`.

### Fallbacks, written once

Each hex appears once. The components use the `--jellyfy-*` name. Nothing here assigns a Tailwind color name.

```css
:root {
  --jellyfy-neutral-50: var(--color-neutral-50, #fafafa);
  --jellyfy-neutral-100: var(--color-neutral-100, #f5f5f5);
  --jellyfy-neutral-200: var(--color-neutral-200, #e5e5e5);
  --jellyfy-neutral-300: var(--color-neutral-300, #d4d4d4);
  --jellyfy-neutral-400: var(--color-neutral-400, #a3a3a3);
  --jellyfy-neutral-500: var(--color-neutral-500, #737373);
  --jellyfy-neutral-600: var(--color-neutral-600, #525252);
  --jellyfy-neutral-700: var(--color-neutral-700, #404040);
  --jellyfy-neutral-800: var(--color-neutral-800, #262626);
  --jellyfy-neutral-900: var(--color-neutral-900, #171717);
  --jellyfy-neutral-950: var(--color-neutral-950, #0a0a0a);

  --jellyfy-primary: var(--color-primary, #4f46e5);
  --jellyfy-secondary: var(--color-secondary, #db2777);
  --jellyfy-tertiary: var(--color-tertiary, #0d9488);
  --jellyfy-neutral: var(--color-neutral, var(--jellyfy-neutral-400));
  --jellyfy-success: var(--color-success, #16a34a);
  --jellyfy-error: var(--color-error, #dc2626);
  --jellyfy-warning: var(--color-warning, #d97706);
}
```

Used today: neutral 50, 100, 400, 500, 800, and 900. The other neutral steps are there so the scale is whole. A later `@theme` that sets `--color-primary` still changes the solid, because the Jellyfy name reads that variable.

### What a developer writes

Nothing, until they want a different solid. Then only the names they are changing:

```css
:root {
  --color-primary: #1d4ed8;
  --color-secondary: #7c3aed;
}
```

## Name

The package name is Jellyfy, with two y's. `jellyfy` is free on npm. `jellify` is also free there, but it is already a music app, so that spelling stays unused. JellyCSS is a description of the file, and `jelly-css` is already an npm package, so that name is not safe. `jlf` is taken. The classes do not use a `jlf-` abbreviation.

The public classes drop the `jellyfy-` prefix before the sizes are added. They follow DaisyUI's short names, not the HTML tag. A button is `btn`. A small one is `btn-sm`. A large one is `btn-lg`. The size is not a lone `sm` class.

The same idea for the rest of the set: `input`, `textarea`, `select`, `checkbox`, `radio`, `toggle`, `range`, `alert`, `badge`, `card`, `modal`. An icon button is `btn-square`. A button that sits on a surface, with the bump under its icon, is `btn-surface`. These are the vocabulary. They are not written to avoid every existing `.card` in someone else's app. They must not reuse a Tailwind utility name such as `flex`.

`squish` opts any element into the press. It is already the public word. Cards do not get it unless someone adds it. One press still moves one element. On a Jellyfy control, that element is the face the control already uses, so the class does not start a second animation.

Internal variables stay `--jellyfy-*`. Those are not what a developer types on an element. The public classes no longer use the prefix.

Other names taken from jelly, and why they lose:

- Jellify. Easier to spell, and it is the same verb with one y. It drops the mark that makes Jellyfy a name rather than a typo.
- Jellyfied, or jellified. A past tense of a word that is not an ordinary verb. Harder to say and to search.
- Jellyfish. The animal. Already used by other projects, and it does not mean a control that gives.
- Jellybean, or Jellybean UI. A theme pack. The “UI” ending pulls it back toward a component kit.
- Jelly. Too short, and already generic.
- Jellypress. Names the press and loses the material.
- Jellycss. Names the file format, not the feel.

The cost of Jellyfy is the double y. People will type jellyfish or jellify. That is accepted.

## Version and a trial install

Versions follow semantic versioning. `0.1.0` is the first public version, and it is not used until a local install has been tried and confirmed. The public contract is the class names, the seven color variables, and `startJellyfy()`. A break in any of those is a major version after `1.0.0`. Before that, `0.x` may break. One package does not need a release tool.

Nothing is published to npm until that confirmation. A local trial does not need a release. Pack the library folder into a tarball, or point a test app at it with a `file:` dependency. Use a plain HTML page, a Vue app, and a Vite React app. Remix is optional, because it is still React. In each one, confirm three things: the classes paint with no Tailwind, a Tailwind utility such as `px-4` changes only that property, and `startJellyfy()` is called once. Set `0.1.0` and publish only after that trial looks right.

## Sizes

There are three sizes. The current regular size is the default. It has no extra class. `btn-sm` is the smaller one. `btn-lg` is the larger one. A button with only `btn` stays the size it is now. These are component sizes, not Tailwind's `sm:` and `lg:` screen prefixes.

## Do these next, in this order

1. Add the aliases above once, and point the material at the `--jellyfy-*` names. Do not assign Tailwind's `--color-neutral-*` names.
2. Drop `jellyfy-` from the public classes. Do this before the sizes, so the new names are only written once.
3. Add the three sizes. First, `/design-system` states the visual rules: radii, inset thickness, the press, focus, color, the public knobs, and the three sizes. That page is served only when `NODE_ENV` is `development`. Any other environment calls `notFound()`. Then add `btn-sm` and `btn-lg`, and the same pair on the other controls, beside the current default. Use `var(--spacing, 0.25rem)` at each step. Pick steps that already exist, including half steps such as 1.5 and 2.5. Skip measurements that are not a step. The regular size stays as it is.
4. Rebuild `/set` as a responsive grid, not a narrow column. Every component is on the page at once, with its colors and states, including the three sizes. This is the display. It does not explain how to use the classes.
5. Write the docs pages on this site, at `/docs`. That is the classic guide, separate from the display. It shows the class on the element, the three sizes, the single `startJellyfy()` call, the Tailwind install, and which file to import. It also shows how to replace the select mark: keep the `chevron` class on your own SVG. The default mark is the rounded chevron. This is a usage guide, not an API. The only variables it teaches people to set are the public ones below.
6. Give the site a real header and footer once those pages exist. The header links to the set and the docs. The footer has a short line about Jellyfy and the copyright. Class names in this site are built with `twJoin` and `twMerge`, not string templates. Use `twMerge` when Tailwind utilities can override each other. Use `twJoin` otherwise.
7. Put the stylesheet and the script in `packages/jellyfy`, so they can be installed without this Next app. Do not set `0.1.0` yet, and do not publish.
8. Prepare the marketing site for search engines and for agents that read pages. Each public page gets a title and a description. Add a sitemap, JSON-LD, and an llms file, and make the pages a crawler should find easy to reach.
9. Install that folder into a plain HTML page, a Vue app, and a Vite React app. Do not set `0.1.0`. Do not publish.
10. Only after that trial is confirmed: set `0.1.0` and publish to npm.

## Package shape

What a person installs should not be this Next app. Today the library is three files inside `components/foundation`: `material.css`, `jellyfy.ts`, and an empty `plugin.js`. The demo lives in `app` (landing, `/set`, previews, and one page per component). `resources` is only the demo’s list of components. `docs/next.md` is this plan, not a guide. `public` still has leftover framework icons.

That mix is fine while building. It is a poor install. A user should import one stylesheet and one script, not a path through `components/foundation`.

Do not name that folder `package`. The usual place is `packages/jellyfy`, with its own `package.json`. The Next app stays at the repo root and is the website: the landing, the set, and `/docs`. It is not what gets published.

```
packages/jellyfy/
  package.json
  jellyfy.css
  jellyfy.js
  plugin.js
```

`pnpm pack` inside that folder builds a tarball without uploading it. A test app installs the tarball, or `"jellyfy": "file:../packages/jellyfy"`. Publishing is a later command, `npm publish`, run only after the trial is confirmed, and that is when the version becomes `0.1.0`.

Move the library files there only when the package step starts. Do not rename them in the middle of the size work.

The Chrome select picker is styled where `appearance: base-select` exists. Other browsers keep the system menu. That is intentional.

## Leave for later

Dark theme comes after the sizes. A press on cards stays out unless the card wears `squish`. The orbit light uses the same full turn as Tailwind's spin; the sweep does not. Leave the orbit unless we choose to switch it.

## What a developer can customize

These are the public variables. Everything else, including `--jellyfy-solid`, the derived surfaces, and the shadow tokens, stays internal.

```css
:root {
  --color-primary: #4f46e5;
  --color-secondary: #db2777;
  --color-tertiary: #0d9488;
  --color-neutral: #a3a3a3;
  --color-success: #16a34a;
  --color-error: #dc2626;
  --color-warning: #d97706;

  --radius-control: 999px;
  --radius-surface: 1rem;
  --jellyfy-noise-size: 360px;

  --spacing: 0.25rem;
}
```

`--spacing` is optional. Tailwind already sets it. Someone without Tailwind can set it to change the size scale. They do not have to.

The select mark is part of the same guide. An empty element with the class `chevron` is the rounded chevron. An SVG with that same class replaces it. The landing page does that with Lucide. The set page keeps the default.

## Select mark

`.chevron` positions the mark and gives it the field color. The default element is an empty `<i>`, painted with the rounded chevron path. An SVG with the same class replaces that shape. The landing page select uses Lucide that way.
