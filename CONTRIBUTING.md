# Contributing

The workspace has four places to change.

- Package edits go in `packages/jellyfy`. That folder is what npm publishes.
- A visible change also updates `apps/web` in the same pull request.
- Specification edits go in `docs/design-system.md`. The site reads that file.
- A framework proof goes in `examples/html`, `examples/react`, or `examples/vue`.

`apps/web`, the examples, and the workspace root are private. Do not publish them.

From the repository root:

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts the site. The examples use the local package through the workspace.
