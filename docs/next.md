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

## Sizes

There are three sizes. The current regular size is the default. It has no extra class. `jellyfy-sm` is the smaller one. `jellyfy-lg` is the larger one. A button with only `jellyfy-button` stays the size it is now.

## Do these next, in this order

1. Add the aliases above once, and point the material at the `--jellyfy-*` names. Do not assign Tailwind's `--color-neutral-*` names.
2. Add `jellyfy-sm` and `jellyfy-lg` beside the current default. Use `var(--spacing, 0.25rem)` at each step. Pick steps that already exist, including half steps such as 1.5 and 2.5. Skip measurements that are not a step. These class names are component sizes, not Tailwind's `sm:` and `lg:` screen prefixes.
3. Write the usage guide after the sizes exist, so it is written once. Show the class on the element, the seven colors, all three sizes, and the single `startJellyfy()` call. Show the Tailwind install and the optional `:root` overrides. This is a usage guide, not an API.
4. Package the stylesheet and the script so someone can use them without this Next app.

## Leave for later

Dark theme comes after the sizes. A press on cards stays out. The orbit light uses the same full turn as Tailwind's spin; the sweep does not. Leave the orbit unless we choose to switch it.

## Select mark

`.jellyfy-chevron` is the positioned mark. An empty `<i class="jellyfy-chevron">` is drawn with two borders. Replacing that element with an SVG, and keeping the class, uses the icon instead. The landing page select uses Lucide's chevron that way. The set page still uses the drawn default.
