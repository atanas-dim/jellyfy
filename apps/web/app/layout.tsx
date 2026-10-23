import "./globals.css";

import type { Metadata } from "next";
import { Figtree, Geist_Mono, Rubik } from "next/font/google";
import { twJoin } from "tailwind-merge";

import { JellyfyBoot } from "@/components/jellyfy-boot";
import { SiteFrame } from "@/components/site-frame";
import { site } from "@/resources/site";
import { THEME_SCRIPT } from "@/utils/theme";

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
      suppressHydrationWarning
      className={twJoin(
        "size-full antialiased",
        figtree.variable,
        rubik.variable,
        geistMono.variable,
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <JellyfyBoot />
        <div className="isolate flex min-h-full flex-col">
          <SiteFrame>{children}</SiteFrame>
        </div>
      </body>
    </html>
  );
}
