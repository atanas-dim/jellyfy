"use client";

import { startJellyfy } from "jellyfy";
import { useEffect } from "react";

export const JellyfyBoot = () => {
  useEffect(() => {
    startJellyfy();
  }, []);

  return null;
};
