# Turborepo

Jellyfy is a pnpm workspace. It does not use Turborepo.

Turborepo runs package tasks in dependency order and skips a package whose inputs did not change. It is the right tool when one package must be built before another package or app can build. shadcn/ui and HeroUI use it because several packages compile and the apps wait on those outputs.

Add Turborepo when a package in this repo grows a compile step that another package or app must wait on, or when a second deployed app makes that cache worth the config. `packages/jellyfy` is the CSS and JavaScript that npm publishes, so nothing waits on a package build today.
