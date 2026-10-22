# Jellyfy

Jellyfy is a pnpm workspace.

- `packages/jellyfy` is the CSS and `index.js` that npm publishes. Controls are classes on the element the page already has. Do not add a React component for a control.
- `apps/web` is the Next.js site. It is private.
- `examples/html`, `examples/react`, and `examples/vue` are private proofs. They depend on `jellyfy` with `workspace:*`.
- `docs/design-system.md` is the specification. The site reads it. `docs/turborepo.md` records when a task runner would earn a place here.
- The workspace root, the site, and the examples stay `"private": true`. Only `packages/jellyfy` is published, and only the files in its `files` list.

## Code

- Keep a file small and the change local.
- Prefer a direct name over a clever one.
- Add a dependency only when the site or an example cannot do the job without it.
- On the site, use strict TypeScript. Prefer `type` over `interface`. Do not use `any`. Type the props. Add an explicit return type on an exported function when the inference is unclear.
- Join class names with `twJoin` or `twMerge` from `tailwind-merge`.
- Site-wide CSS lives in `apps/web/app/globals.css`. Control CSS lives in `packages/jellyfy`.
- A presentational icon on the site comes from `lucide-react`. The published package does not depend on Lucide. A loading demo on the site may show a Lucide spinner. The package loading state is the lights in `index.js`.
- A size demo is labeled Small, Medium, or Large. Medium is the control with no size class.

## Commands

From the repository root:

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts the site. `pnpm build` builds the site.
