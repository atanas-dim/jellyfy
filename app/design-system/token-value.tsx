"use client";

import { useEffect, useState } from "react";

export function TokenValue({ name }: { name: string }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(
      getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
    );
  }, [name]);

  return (
    <span className="font-mono text-xs leading-5 text-neutral-500">
      {value || name}
    </span>
  );
}
