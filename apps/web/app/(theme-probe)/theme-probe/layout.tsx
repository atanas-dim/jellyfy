import "./theme-probe.css";

import type { Metadata } from "next";
import type { FC, ReactNode } from "react";

import { JellyfyBoot } from "@/components/jellyfy-boot";

export const metadata: Metadata = {
  title: "Jellyfy nested theme audit",
  robots: { index: false, follow: false },
};
const ThemeProbeLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" className="light">
    <body className="m-0 min-w-0 bg-white p-[1rem] text-neutral-950">
      <JellyfyBoot />
      {children}
    </body>
  </html>
);
export default ThemeProbeLayout;
