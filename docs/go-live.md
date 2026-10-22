# Go live

The components are implemented. This is the work left before the package is published.

The surface content colors are already in. Each slot has a `--color-*-surface-content` variable. Light is the 800 step. Dark is the 200 step. A slotted alert, card, modal panel, input, textarea, and select use it. The bump icon on a slotted surface uses it. A surface or field with no slot stays on the plain content color.

## 1. Ship one whole-library stylesheet

`packages/jellyfy/jellyfy.css` is still the old demo sheet. Replace it with a file that imports the material, the motion, and every component.

Keep the individual imports. A product can import one component or the whole library.

Update section 15 of `docs/design-system.md` so it names that file.

## 2. Remove the old entry points

Do not publish the previous library beside the new one.

- `packages/jellyfy/jellyfy.js`
- `packages/jellyfy/plugin.js`
- The old contents of `packages/jellyfy/jellyfy.css`, once the new file replaces them

## 3. Write the package readme

`packages/jellyfy/README.md` is the page npm shows. It needs:

- How to install the package.
- The whole-library import and the per-component imports.
- The class names.
- The variables a product may change: the solids, the content colors, the surface content colors, the four radii, the material opacity, the material blur, the noise tile size, and the elevation multiplier.

## 4. Point the HTML example at the new stylesheets

`examples/html/index.html` still loads the old `jellyfy.css`. It should load the stylesheets from step 1.

## 5. Check the set page in three browsers

Chrome, Firefox, and Safari.

- The select menu opens and stays open.
- The range thumb drags.
- The dialog opens, and the bump button closes it.
- Disabled controls use the disabled colors, including a checked toggle and checkbox.

## 6. Check surface text contrast

Warning and Info first, then the other slots. The surface content color must meet 4.5:1 against the washed fill in both themes.

## 7. Update the user-facing docs

The pages under `app/docs` are what a user reads in the app. They must match the library that ships.

- Install: both import paths, and `startJellyfy()` once.
- Colors: the solids, the content colors, and the surface content colors.
- Customize: the public variables, including the surface content colors.
- Each component page: the class names, sizes, and slots that exist now.

## 8. Replace the repository readme

`README.md` at the repository root is still the default Next.js readme. Replace it with a presentable introduction to Jellyfy: what it is, how to run this app, and where the package and the docs live.

The package readme from step 3 stays the npm page. This file is the GitHub page.

## 9. Publish

Set the version on `packages/jellyfy`. The Next.js app stays private. The library package is the package that ships.
