# Go live

Steps 1 through 8 are done. Step 9 is waiting for you. Do not publish until you say so.

## Done

1. `packages/jellyfy/jellyfy.css` imports the material, the motion, and every component. Individual imports stay. Section 15 of `docs/design-system.md` names that file.
2. `jellyfy.js` and `plugin.js` are removed. The old demo sheet is replaced by the file above.
3. `packages/jellyfy/README.md` is the npm page: install, both import paths, class names, and the public variables.
4. `examples/html/index.html` loads `jellyfy.css` and `index.js`, and the dialogs use `btn-bump`.
5. The set page was checked in Chrome, Firefox, and Safari. The select menu, the range drag, the dialog, and the disabled controls look right.
6. Surface text contrast looks right, including Warning and Info.
7. The pages under `app/docs` match the library: install, colors, customize, and the component pages, including the bump button.
8. The repository `README.md` introduces Jellyfy, how to run this app, and where the package and the docs live.

## 9. Publish

Set the version on `packages/jellyfy`. The Next.js app stays private. The library package is the package that ships.
