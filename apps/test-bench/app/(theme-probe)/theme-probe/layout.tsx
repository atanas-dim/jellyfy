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
    <head>
      {/* Keep chrome separate from the compiled stylesheet disabled by the plain-CSS tab. */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="/test-bench/preview.css"
        data-bench-chrome=""
      />
    </head>
    <body
      style={{
        margin: 0,
        minWidth: 0,
        background: "white",
        padding: 16,
        color: "#0a0a0a",
      }}
    >
      <JellyfyBoot />
      {children}
    </body>
  </html>
);
export default ThemeProbeLayout;
