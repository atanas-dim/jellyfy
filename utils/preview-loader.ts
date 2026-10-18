import type { FC } from "react";

import { ComponentSlug } from "@/resources/component-slugs";

const PREVIEW_COMPONENTS = {
  [ComponentSlug.Button]: () => import("@/app/previews/button-preview"),
  [ComponentSlug.IconButton]: () => import("@/app/previews/icon-button-preview"),
  [ComponentSlug.Input]: () => import("@/app/previews/input-preview"),
  [ComponentSlug.Textarea]: () => import("@/app/previews/textarea-preview"),
  [ComponentSlug.Select]: () => import("@/app/previews/select-preview"),
  [ComponentSlug.Checkbox]: () => import("@/app/previews/checkbox-preview"),
  [ComponentSlug.Radio]: () => import("@/app/previews/radio-preview"),
  [ComponentSlug.Switch]: () => import("@/app/previews/switch-preview"),
  [ComponentSlug.Slider]: () => import("@/app/previews/slider-preview"),
  [ComponentSlug.Alert]: () => import("@/app/previews/alert-preview"),
  [ComponentSlug.Badge]: () => import("@/app/previews/badge-preview"),
  [ComponentSlug.Card]: () => import("@/app/previews/card-preview"),
  [ComponentSlug.Dialog]: () => import("@/app/previews/dialog-preview"),
} as const;

export type PreviewPath = keyof typeof PREVIEW_COMPONENTS;

export const loadPreviewComponent = async (
  slug: PreviewPath,
): Promise<{ default: FC }> => {
  return PREVIEW_COMPONENTS[slug]();
};
