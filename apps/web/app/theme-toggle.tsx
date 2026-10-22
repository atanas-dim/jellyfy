"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const storageKey = "jellyfy-theme";

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  localStorage.setItem(storageKey, theme);
};

const subscribe = (onStoreChange: () => void) => {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

const themeFromDom = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export const ThemeToggle = () => {
  const theme = useSyncExternalStore(subscribe, themeFromDom, () => "light");

  return (
    <label className="toggle flex gap-1">
      <SunIcon aria-hidden="true" className="size-4" />
      <input
        type="checkbox"
        role="switch"
        aria-label="Dark theme"
        checked={theme === "dark"}
        onChange={() => applyTheme(theme === "dark" ? "light" : "dark")}
      />
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      <MoonIcon aria-hidden="true" className="size-4" />
    </label>
  );
};
