# Project: Jellyfy

Jellyfy is a pnpm workspace. `packages/jellyfy` is the CSS library that ships to npm. `apps/web` is the Next.js site. `examples/` holds the HTML, React, and Vue proofs. `docs/` holds the specification.

## Core Principles

- Components must be copy-paste friendly
- Each component must be self-contained
- Avoid unnecessary dependencies
- Prioritise clean, readable code over cleverness
- Keep files small and focused

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Project Structure

```
- apps/web/                         # Next.js site
  - app/                            # Routes: /, /set, /docs, /design-system
  - resources/                      # Site constants and the component registry
  - utils/
- packages/jellyfy/                 # The npm package
- examples/                         # html, react, vue
- docs/                             # design-system.md and maintainer notes
```

## Component Rules

Each component must:

1. Be exported as default
2. Work when copied into another project without modification
3. Avoid external config dependencies
4. Use Tailwind for styling by default
   - If extra CSS is needed (e.g., complex animations or styles not easily handled by Tailwind), create a **component-scoped `.css` file** inside the component folder
   - Do **not** modify global styles (`globals.css`)
5. Include clear and explicit props typing

## Registry Rules

- All components must be registered in `components-registry.ts`
- Each entry must include:
  - slug
  - name
  - description
  - dynamic import function

```
type ComponentConfig = {
  slug: string;
  name: string;
  description: string;
  component: () => Promise<{ default: FC<ComponentProps> }>;
  github: string;
};

export const COMPONENTS: ComponentConfig[] = [
  {
    slug: "pill-button",
    name: "Pill Button",
    description: "Animated pill-style button with hover states",
    component: () => import("@/components/pill-button/PillButton"),
    github: "https://github.com/your-repo/pill-button",
  }
];
```

## UI Requirements

Each component page must include:

- Title
- Description
- Live preview
- Usage example
- Copyable code block
- Link to GitHub folder

## Naming Conventions

- **Files**: PascalCase for components (`PillButton.tsx`)
- **Directories**: kebab-case (`pill-button/`)
- **Constants**: SCREAMING_SNAKE_CASE (`HOVER_CLASSES`)
- **Types**: PascalCase (`ButtonProps`, `ToolDef`)
- **Enums**: PascalCase (`ConvertFormat`, `ToolSlug`)

## TypeScript & Typing Standards

- Use strict TypeScript typing
- Prefer `type` over `interface`
- Always type component props
- Avoid `any` unless absolutely necessary
- Use explicit return types for exported functions when helpful

## Component Structure Pattern

Use this as the default structure for all components:

```typescript
"use client"; // Only if needed
import type { FC } from "react";
import { twJoin } from "tailwind-merge";

type ComponentProps = {
  // Define props here
};

const ComponentName: FC<ComponentProps> = ({ ...props }) => {
  // Component logic

  return (
    <div className={twJoin("base-classes", conditionalClasses && "conditional-classes")}>
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```
