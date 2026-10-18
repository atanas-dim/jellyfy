# What comes next

## Where this stands

Jellyfy is class names on ordinary HTML, plus one script, `startJellyfy()`. The Next app is the demo. It is not the package.

The component rules live in `@layer components`, so a Tailwind utility on the same element overrides only the property it sets. The seven solids are declared in `@theme`, and today they point at Tailwind's palette (`--color-indigo-600` and the rest). Sizes are plain lengths such as `3rem`. They do not use `--spacing`.

`app/jellyfy-boot.tsx` is only how this demo calls `startJellyfy()` after each route. Any other app calls that same function once.

## Tailwind

The goal is Tailwind-compatible, not Tailwind-dependent. This is not a DaisyUI-style requirement. DaisyUI does not run without Tailwind. Jellyfy should.

With Tailwind, a utility on the same element overrides one property, and a later `@theme` replaces a solid. Without Tailwind, the file still paints. The script is the same call either way.

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

The same idea for the rest of the set: `input`, `textarea`, `select`, `checkbox`, `radio`, `toggle`, `range`, `alert`, `badge`, `card`, `modal`. An icon button is `btn-square`. These are the vocabulary. They are not written to avoid every existing `.card` in someone else's app. They must not reuse a Tailwind utility name such as `flex`.

Internal variables stay `--jellyfy-*`. Those are not what a developer types on an element. The code still has the prefix until that rename.

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

Versions follow semantic versioning, starting at `0.1.0`. The public contract is the class names, the seven color variables, and `startJellyfy()`. A break in any of those is a major version after `1.0.0`. Before that, `0.x` may break. One package does not need a release tool.

Do not publish to npm until the packed folder has been installed, as a tarball or a `file:` dependency, into apps that are not this Next demo. Use a plain HTML page, a Vue app, and a Vite React app. Remix is optional, because it is still React. In each one, confirm three things: the classes paint with no Tailwind, a Tailwind utility such as `px-4` changes only that property, and `startJellyfy()` is called once.

## Sizes

There are three sizes. The current regular size is the default. It has no extra class. `btn-sm` is the smaller one. `btn-lg` is the larger one. A button with only `btn` stays the size it is now. These are component sizes, not Tailwind's `sm:` and `lg:` screen prefixes.

## Do these next, in this order

1. Add the aliases above once, and point the material at the `--jellyfy-*` names. Do not assign Tailwind's `--color-neutral-*` names.
2. Drop `jellyfy-` from the public classes. Do this before the sizes, so the new names are only written once.
3. Add `btn-sm` and `btn-lg`, and the same pair on the other controls, beside the current default. Use `var(--spacing, 0.25rem)` at each step. Pick steps that already exist, including half steps such as 1.5 and 2.5. Skip measurements that are not a step.
4. Decide the package shape, then write the docs pages in this site. The guide shows the class on the element, the seven colors, all three sizes, and the single `startJellyfy()` call. It shows the Tailwind install and the optional `:root` overrides. It also shows the install itself: what file to import, and from where. This is a usage guide, not an API.
5. Package the stylesheet and the script so someone can use them without this Next app. Version it `0.1.0`.
6. Install that package into a plain HTML page, a Vue app, and a Vite React app. Publish to npm only after those three pass.

## Package shape

What a person installs should not be this Next app. Today the library is three files inside `components/foundation`: `material.css`, `jellyfy.ts`, and an empty `plugin.js`. The demo lives in `app` (landing, `/set`, previews, and one page per component). `resources` is only the demo’s list of components. `docs/next.md` is this plan, not a guide. `public` still has leftover framework icons.

That mix is fine while building. It is a poor install. A user should import one stylesheet and one script, not a path through `components/foundation`.

Proposed shape, when we package:

```
jellyfy.css
jellyfy.js
plugin.js
```

Those three sit at the root of the published package. This repo can keep the Next app as the website: the landing, the set, and a docs section at `/docs`. The guide pages are part of that site, not a second folder of markdown that nobody renders. Move the library files to the package root, or to `src`, only when the package step starts. Do not rename them in the middle of the size work.

The Chrome select picker is styled where `appearance: base-select` exists. Other browsers keep the system menu. That is intentional.

## Leave for later

Dark theme comes after the sizes. A press on cards stays out. The orbit light uses the same full turn as Tailwind's spin; the sweep does not. Leave the orbit unless we choose to switch it.

## Select mark

`.jellyfy-chevron` is the positioned mark. An empty `<i class="jellyfy-chevron">` is drawn with two borders. Replacing that element with an SVG, and keeping the class, uses the icon instead. The landing page select uses Lucide's chevron that way. The set page still uses the drawn default.
