import "./globals.css";

import type { Metadata } from "next";
import { Figtree, Geist_Mono, Rubik } from "next/font/google";
import { twJoin } from "tailwind-merge";

import { JellyfyBoot } from "./jellyfy-boot";

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
  title: "Jellyfy",
  description:
    "Soft controls from one material. Set the solid colors, and the jelly tones follow.",
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
        <div className="isolate flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
