import "./globals.css";

import type { Metadata } from "next";
import { Figtree, Geist_Mono, Rubik } from "next/font/google";
import { twJoin } from "tailwind-merge";

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
        figtree.variable,
        rubik.variable,
        geistMono.variable,
      )}
    >
      <body>
        <div className="isolate flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
