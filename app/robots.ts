import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/resources/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system", "/dev"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
