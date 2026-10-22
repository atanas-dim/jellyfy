import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Set",
  description: "Every Jellyfy control, in every color and size.",
  alternates: { canonical: "/set" },
};

export default function SetLayout({ children }: { children: ReactNode }) {
  return children;
}
