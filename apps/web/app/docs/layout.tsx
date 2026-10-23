import type { ReactNode } from "react";

import { Contents } from "@/app/contents";
import { COMPONENT_DOCS, GUIDE_LINKS } from "@/resources/component-docs";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:flex-row lg:items-start lg:gap-10">
      <Contents
        groups={[
          { title: "Getting started", items: [...GUIDE_LINKS] },
          {
            title: "Components",
            items: COMPONENT_DOCS.map((doc) => ({
              href: `/docs/${doc.slug}`,
              label: doc.name,
            })),
          },
        ]}
      />
      <div className="min-w-0 flex-1 pb-16">{children}</div>
    </div>
  );
}
