import type { FC } from "react";

import { ComponentSlug } from "@/resources/component-slugs";

const PREVIEW_COMPONENTS = {
  [ComponentSlug.Button]: () => import("@/components/previews/button-preview"),
  [ComponentSlug.IconButton]: () =>
    import("@/components/previews/icon-button-preview"),
  [ComponentSlug.Input]: () => import("@/components/previews/input-preview"),
  [ComponentSlug.Textarea]: () =>
    import("@/components/previews/textarea-preview"),
  [ComponentSlug.Select]: () => import("@/components/previews/select-preview"),
  [ComponentSlug.Checkbox]: () =>
    import("@/components/previews/checkbox-preview"),
  [ComponentSlug.Radio]: () => import("@/components/previews/radio-preview"),
  [ComponentSlug.Switch]: () => import("@/components/previews/switch-preview"),
  [ComponentSlug.Range]: () => import("@/components/previews/range-preview"),
  [ComponentSlug.Alert]: () => import("@/components/previews/alert-preview"),
  [ComponentSlug.Badge]: () => import("@/components/previews/badge-preview"),
  [ComponentSlug.Card]: () => import("@/components/previews/card-preview"),
  [ComponentSlug.Dialog]: () => import("@/components/previews/dialog-preview"),
} as const;

export type PreviewPath = keyof typeof PREVIEW_COMPONENTS;

export const loadPreviewComponent = async (
  slug: PreviewPath,
): Promise<{ default: FC }> => {
  return PREVIEW_COMPONENTS[slug]();
};
