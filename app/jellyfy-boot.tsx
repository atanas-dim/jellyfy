"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { startJellyfy } from "jellyfy";

export const JellyfyBoot = () => {
  const pathname = usePathname();

  useEffect(() => {
    startJellyfy();
  }, [pathname]);

  return null;
};
