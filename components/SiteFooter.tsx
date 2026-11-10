import Link from "next/link";
import { site, colophon } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="colophon">
      <span className="micro">Colophon</span>
      <p>
        {colophon.text} Currently reading <span>{colophon.reading.title}</span>{" "}
        by {colophon.reading.by}. On repeat: {colophon.onRepeat.title} by{" "}
        {colophon.onRepeat.by}.
      </p>
      <div className="link-row">
        <Link href="/about">About the author</Link>
        <Link href="/contact">Send a note</Link>
      </div>
      <span className="micro">
        © {new Date().getFullYear()} {site.name}
      </span>
    </footer>
  );
}
