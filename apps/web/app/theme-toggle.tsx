"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const storageKey = "jellyfy-theme";

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  localStorage.setItem(storageKey, theme);
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  return (
    <label className="toggle flex gap-0.5">
      <SunIcon aria-hidden="true" className="size-4" />
      <input
        type="checkbox"
        role="switch"
        aria-label="Dark theme"
        checked={theme === "dark"}
        onChange={() => {
          const next = theme === "dark" ? "light" : "dark";
          applyTheme(next);
          setTheme(next);
        }}
      />
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      <MoonIcon aria-hidden="true" className="size-4" />
    </label>
  );
};
