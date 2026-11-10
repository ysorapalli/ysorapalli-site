"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon } from "./icons";

type Current = "book" | "projects" | "about" | "contact" | "resume";

export default function SiteHeader({ current }: { current: Current }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const links = [
    { href: "/", label: "Home", key: "book" },
    { href: "/about", label: "About", key: "about" },
    { href: "/projects", label: "Projects", key: "projects" },
    { href: site.resume, label: "Resume", key: "resume" },
    { href: "/contact", label: "Contact", key: "contact" },
  ];

  return (
    <div
      className="header-wrap"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <header className="site-header">
        <Link className="brand" href="/">
          {site.name}
        </Link>
        <div className="nav-right">
          <nav className="nav-links" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.key}
                className="nav-link"
                href={l.href}
                aria-current={l.key === current ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="menu-btn"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>
      {open && (
        <nav id="nav-sheet" className="nav-sheet" aria-label="Menu">
          {links.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              onClick={close}
              aria-current={l.key === current ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
