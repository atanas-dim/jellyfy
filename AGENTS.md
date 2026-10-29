# Jellyfy

Jellyfy is a pnpm workspace.

- `packages/jellyfy` is the CSS and `index.js` that npm publishes. Controls are classes on the element the page already has. Do not add a React component for a control.
- `apps/web` is the Next.js site. It is private.
- `examples/html`, `examples/react`, and `examples/vue` are private proofs. They depend on `jellyfy` with `workspace:*`.
- `docs/design-system.md` is the specification. The site reads it. `docs/turborepo.md` records when a task runner would earn a place here. `docs/git.md` is how a change reaches `main`.
- The workspace root, the site, and the examples stay `"private": true`. Only `packages/jellyfy` is published, and only the files in its `files` list.

## Code

- Prioritise clean, readable code. Prefer a direct name over a clever one.
- Keep a file small and focused. Keep a change local and self-contained.
- Add a dependency only when the site or an example cannot do the job without it.
- A function, a variable, and a parameter use camelCase.
- A type uses PascalCase.
- A module-level constant uses `SCREAMING_SNAKE_CASE`. That includes a string of class names declared outside a component, such as `PILL`.
- A panel used in more than one place is the `surface` class in `apps/web/app/globals.css`. It is the site fill and border. It is not the Jellyfy `card` class, which is the material panel. Add a Tailwind shadow, such as `shadow-lg`, only on the surfaces that should lift.
- A directory uses kebab-case.
- On the site, use strict TypeScript. Prefer `type` over `interface`. Do not use `any`. Type the props. Add an explicit return type on an exported function when the inference is unclear.
- A site component is an `FC`. Its props type is `ComponentNameProps`.
- Join class names with `twJoin` or `twMerge` from `tailwind-merge`.
- Shared site CSS lives in `apps/web/app/globals.css`. A style that only one component needs stays with that component. Control CSS lives in `packages/jellyfy`.
- A presentational icon on the site comes from `lucide-react`. The published package does not depend on Lucide. A loading demo on the site may show a Lucide loader. The package loading state is the lights in `index.js`.
- A size demo is labeled Small, Medium, or Large. Medium is the control with no size class, and also the `md` class.

## Commands

From the repository root:

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts the site. `pnpm build` builds the site.
