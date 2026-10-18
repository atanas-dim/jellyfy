import "./globals.css";

import type { Metadata } from "next";
import { Figtree, Geist_Mono, Rubik } from "next/font/google";
import { twJoin } from "tailwind-merge";

import { site } from "@/resources/site";

import { JellyfyBoot } from "./jellyfy-boot";
import { SiteFrame } from "./site-frame";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: site.url,
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={twJoin(
        "size-full antialiased",
        figtree.variable,
        rubik.variable,
        geistMono.variable,
      )}
    >
      <body>
        <JellyfyBoot />
        <div className="isolate flex min-h-full flex-col">
          <SiteFrame>{children}</SiteFrame>
        </div>
      </body>
    </html>
  );
}
