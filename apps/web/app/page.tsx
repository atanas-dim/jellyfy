import type { Metadata } from "next";

import { InstallSnippets } from "@/components/home/install-snippets";
import { Landing } from "@/components/home/landing";
import { site } from "@/resources/site";

export const metadata: Metadata = {
  title: { absolute: site.name },
  description: site.description,
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description: site.description,
  url: site.url.origin,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Landing install={<InstallSnippets />} />
    </>
  );
}
