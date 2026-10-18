import type { ReactNode } from "react";

import { DocsNav } from "./docs-nav";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:flex-row lg:items-start lg:gap-10">
      <DocsNav />
      <div className="min-w-0 flex-1 pb-16">{children}</div>
    </div>
  );
}
