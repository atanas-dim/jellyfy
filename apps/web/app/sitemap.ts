import type { MetadataRoute } from "next";

import { DOC_LINKS } from "@/resources/component-docs";
import { absoluteUrl } from "@/resources/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/set",
    "/design-system",
    ...DOC_LINKS.map((link) => link.href),
  ];

  return pages.map((path) => ({
    url: absoluteUrl(path),
    priority:
      path === "/"
        ? 1
        : path === "/set" || path === "/docs" || path === "/design-system"
          ? 0.8
          : 0.6,
  }));
}
