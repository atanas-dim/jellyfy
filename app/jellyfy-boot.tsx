"use client";

import { startJellyfy } from "jellyfy";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const JellyfyBoot = () => {
  const pathname = usePathname();

  useEffect(() => {
    startJellyfy();
  }, [pathname]);

  return null;
};
