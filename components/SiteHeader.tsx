"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon } from "./icons";

type Current = "book" | "projects";

export default function SiteHeader({ current }: { current: Current }) {
  const [open, setOpen] = useState(false);
  const onBook = current === "book";
  const close = () => setOpen(false);

  const links = [
    { href: onBook ? "#contents" : "/#contents", label: "Contents", key: "contents" },
    { href: "/projects", label: "Projects", key: "projects" },
    { href: onBook ? "#correspondence" : "/#correspondence", label: "Contact", key: "contact" },
  ];

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">{site.name}</Link>
        <div className="nav-right">
          <nav className="nav-links" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.key} className="nav-link" href={l.href} aria-current={l.key === current ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
            <a className="nav-resume" href={site.resume} target="_blank" rel="noopener noreferrer">Resume</a>
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
            <Link key={l.key} href={l.href} onClick={close} aria-current={l.key === current ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <a href={site.resume} target="_blank" rel="noopener noreferrer" onClick={close}>Resume</a>
        </nav>
      )}
    </>
  );
}
