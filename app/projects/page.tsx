import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images, projectsPage, site } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import PageCard, { RunningHead } from "@/components/PageCard";
import { getRepoShelf, LANGUAGE_COLORS } from "@/lib/github";
import { formatDate } from "@/lib/format";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected robotics and software projects by Yashasvi Sorapalli, plus her latest public GitHub repositories.",
};

const workImages = [images.lab, images.tracking, images.blockchain];

export default async function ProjectsPage() {
  const shelf = await getRepoShelf();
  const p = projectsPage;

  return (
    <>
      <SiteHeader current="projects" />
      <PageCard variant="sub">
        <section className="page-head" aria-labelledby="projects-h">
          <RunningHead left={<Link href="/">← Back to the book</Link>} right="Projects" />
          <div className="page-head__body">
            <h1 id="projects-h" className="page-h1">{p.title}</h1>
            <p className="page-intro">{p.intro}</p>
          </div>
        </section>

        <section aria-labelledby="selected-h" style={{ paddingTop: 48 }}>
          <h2 id="selected-h" className="label" style={{ fontWeight: 400, marginBottom: 8 }}>Selected works</h2>
          {p.works.map((w, i) => {
            const img = workImages[i];
            const external = w.cta.href.startsWith("http");
            return (
              <article key={w.title} className="work-row">
                <div className="work-row__plate">
                  <Image src={img.src} width={img.width} height={img.height} alt={w.alt} sizes="(max-width: 700px) 90vw, 380px" style={{ objectPosition: w.imagePosition }} />
                </div>
                <div className="work-row__text">
                  <div className="work-row__meta">
                    {w.ongoing && <span className="status"><span className="status__dot" aria-hidden="true" />Ongoing</span>}
                    <span>{w.meta}</span>
                  </div>
                  <h3>{w.title}</h3>
                  <p className="work-row__summary">{w.summary}</p>
                  <ul className="tags" aria-label="Tags">
                    {w.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                  {external ? (
                    <a className="text-link" style={{ fontSize: 15 }} href={w.cta.href} target="_blank" rel="noopener noreferrer">{w.cta.label}</a>
                  ) : (
                    <Link className="text-link" style={{ fontSize: 15 }} href={w.cta.href}>{w.cta.label}</Link>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        <section className="shelf" aria-labelledby="gh-h">
          <div className="shelf__head">
            <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
              <div className="status-row">
                <span className="status">
                  <span className="status__dot" aria-hidden="true" />
                  {shelf.live ? "Synced from GitHub" : "From GitHub"}
                </span>
                <span>Last pulled {formatDate(shelf.pulledAt)}</span>
              </div>
              <h2 id="gh-h" className="shelf__title">{p.githubHeading}</h2>
              <p className="muted" style={{ fontSize: 16, lineHeight: 1.6 }}>{p.githubIntro}</p>
            </div>
            <aside className="praise-aside" aria-label="Praise">
              <span className="stars" aria-label="Five stars" style={{ fontSize: 12 }}>★★★★★</span>
              <blockquote>“{p.githubPraise.text}”</blockquote>
              <span className="micro">{p.githubPraise.who}</span>
            </aside>
          </div>

          <ol className="feed">
            {shelf.repos.map((r, i) => (
              <li key={r.name}>
                <span className="feed__node" aria-hidden="true" data-fill={i === 0} />
                <article className="card">
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px" }}>
                    <h3 className="repo__name">{r.name}</h3>
                    {r.fork && <span className="badge">Fork</span>}
                  </div>
                  {r.description && <p style={{ fontSize: 16, lineHeight: 1.6 }}>{r.description}</p>}
                  {p.repoNotes[r.name] && <p className="repo__note">{p.repoNotes[r.name]}</p>}
                  <div className="repo__meta">
                    {r.language && (
                      <span>
                        <span className="lang-dot" aria-hidden="true" style={{ background: LANGUAGE_COLORS[r.language] ?? "var(--muted)" }} />
                        {r.language}
                      </span>
                    )}
                    <span aria-label={`${r.stars} stars`}>★ {r.stars}</span>
                    <span>Updated {formatDate(r.pushedAt)}</span>
                    <a href={r.url} target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>
                  </div>
                </article>
              </li>
            ))}
            <li data-last="true">
              <span className="feed__node" aria-hidden="true" data-future="true" />
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.6, paddingTop: 2 }}>
                {p.emptySlot}{" "}
                <a href={site.links.github} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500 }}>github.com/{site.links.githubUser} ↗</a>
              </p>
            </li>
          </ol>
        </section>

        <footer className="sub-footer">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <Link href="/">← Back to the book</Link>
        </footer>
      </PageCard>
    </>
  );
}
