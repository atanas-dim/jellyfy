"use client";

import { useEffect } from "react";

import { startJellyfy } from "@/components/foundation/jellyfy";

export const JellyfyBoot = () => {
  useEffect(() => {
    startJellyfy();
  }, []);

  return null;
};
