import "./globals.css";

import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { twJoin } from "tailwind-merge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jellyfy",
  description:
    "A soft React component set. Brand, status, and surface, from one material.",
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
        geistSans.variable,
        geistMono.variable,
        fraunces.variable,
      )}
    >
      <body>
        <div className="isolate flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
