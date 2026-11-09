import "./test-bench/test-bench.css";

import type { Metadata } from "next";
import type { FC, ReactNode } from "react";

import { JellyfyBoot } from "@/components/jellyfy-boot";

export const metadata: Metadata = {
  title: "Jellyfy test bench",
  robots: { index: false, follow: false },
};

type TestBenchLayoutProps = { children: ReactNode };

const TestBenchLayout: FC<TestBenchLayoutProps> = ({ children }) => (
  <html lang="en" className="light">
    <body>
      <JellyfyBoot />
      {children}
    </body>
  </html>
);

export default TestBenchLayout;
