"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  // null until mounted: the real theme is set on <html> by the inline script in layout.tsx.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");

    // Follow the system setting until the visitor picks one.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try { saved = localStorage.getItem("theme"); } catch { /* ignore */ }
      if (saved !== "light" && saved !== "dark") {
        const next: Theme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        setTheme(next);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function apply(next: Theme) {
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch { /* ignore */ }
  }

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      <button type="button" aria-label="Light theme" aria-pressed={theme === "light"} onClick={() => apply("light")}>
        <SunIcon />
      </button>
      <button type="button" aria-label="Dark theme" aria-pressed={theme === "dark"} onClick={() => apply("dark")}>
        <MoonIcon />
      </button>
    </div>
  );
}
