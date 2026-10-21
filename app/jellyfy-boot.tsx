"use client";

import { startJellyfy } from "jellyfy";
import { useEffect } from "react";

export const JellyfyBoot = () => {
  useEffect(() => {
    startJellyfy();
    const observer = new MutationObserver(() => startJellyfy());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
};
