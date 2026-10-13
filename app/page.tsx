import Image from "next/image";
import Link from "next/link";
import {
  chapters, colophon, contactForm, contentsNote, correspondence, dedication, furtherReading, history,
  images, papers, prologue, site, titlePage, tools, work,
} from "@/content/site";
import ContactForm from "@/components/ContactForm";
import SiteHeader from "@/components/SiteHeader";
import PageCard, { RunningHead } from "@/components/PageCard";
import ReadingRails from "@/components/ReadingRails";
import MobileReadingBar from "@/components/MobileReadingBar";
import ArmSketchPad from "@/components/ArmSketchPad";
import Laurel from "@/components/Laurel";
import { ArrowDownIcon, LinkedInIcon } from "@/components/icons";

const chapterTitle = (id: (typeof chapters)[number]["id"]) => chapters.find((c) => c.id === id)!.title;

function Chapter({ id, children }: { id: (typeof chapters)[number]["id"]; children: React.ReactNode }) {
  const title = chapterTitle(id);
  return (
    <section id={id} className="chapter" aria-labelledby={`${id}-h`}>
      <RunningHead left={site.name} right={title} />
      <div className="chapter__body">
        <h2 id={`${id}-h`} className="chapter__title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function BookPage() {
  return (
    <>
      <SiteHeader current="book" />
      <MobileReadingBar />
      <PageCard variant="book">
        {/* Title page */}
        <section className="title-page" aria-label="Title page">
          <div className="title-page__text">
            <p className="kicker">{titlePage.kicker}</p>
            <h1 className="title">{site.name}</h1>
            <p className="subtitle">{titlePage.subtitle}</p>
            <p className="imprint">{titlePage.imprint}</p>
          </div>
          <ArmSketchPad />
        </section>

        {/* Dedication */}
        <section className="dedication" aria-label="Dedication">
          <div className="dedication__wreath">
            <Laurel />
            <div className="dedication__center">
              <span className="dedication__to">{dedication.kicker}</span>
              <p className="dedication__line">{dedication.line}</p>
              <span className="stars" aria-hidden="true" style={{ fontSize: 12, letterSpacing: "0.3em" }}>★ ★ ★</span>
            </div>
            <Laurel flip />
          </div>
          <p className="dedication__body">{dedication.body}</p>
          <a className="btn btn--outline" href={dedication.cta.href}>
            {dedication.cta.label} <ArrowDownIcon />
          </a>
        </section>

        <div className="book-body">
          <ReadingRails />

          {/* Contents */}
          <section id="contents" className="chapter chapter--first" aria-labelledby="contents-h">
            <RunningHead left={site.name} right="Contents" />
            <div className="chapter__body">
              <h2 id="contents-h" className="chapter__title">Contents</h2>
              <ol className="contents">
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`}>
                      <span className="contents__title">{c.title}</span>
                      <span className="contents__note">{c.note}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <p className="note">{contentsNote}</p>
            </div>
          </section>

          <Chapter id="prologue">
            {prologue.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <figure className="plate">
              <div className="plate__frame">
                <Image src={images.portrait.src} width={680} height={800} alt={prologue.plate.alt} sizes="(max-width: 500px) 70vw, 340px" />
              </div>
              <figcaption className="figcap">{prologue.plate.caption}</figcaption>
            </figure>
          </Chapter>

          <Chapter id="work">
            <div className="status-row">
              <span className="status"><span className="status__dot" aria-hidden="true" />{work.status}</span>
              <span>{work.meta}</span>
            </div>
            <p className="lead">{work.lead}</p>
            {work.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <figure className="figure">
              <div className="figure__plate">
                <Image src={images.lab.src} width={images.lab.width} height={images.lab.height} alt={work.figure.alt} sizes="(max-width: 700px) 92vw, 576px" />
              </div>
              <figcaption className="figcap">{work.figure.caption}</figcaption>
            </figure>
            <p>{work.closing}</p>
            <Link className="text-link" href={work.more.href} style={{ fontSize: 16 }}>{work.more.label}</Link>
          </Chapter>

          <Chapter id="papers">
            {papers.map((p) => (
              <article key={p.doi} className="paper">
                <h3>{p.title}</h3>
                <p className="paper__venue">{p.venue}</p>
                <p className="paper__summary">{p.summary}</p>
                <a className="text-link" style={{ fontSize: 15 }} href={p.href} target="_blank" rel="noopener noreferrer">Read the paper ↗</a>
              </article>
            ))}
          </Chapter>

          <Chapter id="before">
            <ol className="timeline">
              {history.map((h, i) => {
                const last = i === history.length - 1;
                const current = i === history.length - 2;
                return (
                  <li key={h.years} data-seg={last ? "none" : current ? "dashed" : "solid"}>
                    <span className="timeline__node" aria-hidden="true" data-fill={current} data-future={last} />
                    <span className="timeline__years">{h.years}</span>
                    <p>{h.text}</p>
                  </li>
                );
              })}
            </ol>
          </Chapter>

          <Chapter id="further">
            <h3 className="label" style={{ fontWeight: 400 }}>{furtherReading.coursework.label}</h3>
            <p style={{ marginTop: -6 }}>{furtherReading.coursework.text}</p>
            <h3 className="label" style={{ fontWeight: 400 }}>{furtherReading.certificates.label}</h3>
            <p style={{ marginTop: -6 }}>{furtherReading.certificates.text}</p>
          </Chapter>

          <Chapter id="index">
            <ul className="tool-grid">
              {tools.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Chapter>

          <Chapter id="correspondence">
            <p>{correspondence.body}</p>
            <a className="email-link" href={`mailto:${site.email}`}>{site.email}</a>
            <div className="link-row">
              <a className="btn btn--ink" href={site.links.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon /> Connect on LinkedIn</a>
              <Link className="text-link" href="/projects">Projects &amp; GitHub</Link>
              <a className="text-link" href={site.links.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>
              <a className="text-link" href={site.resume} target="_blank" rel="noopener noreferrer">Resume</a>
            </div>
            <section className="panel" aria-labelledby="note-h" style={{ marginTop: 8 }}>
              <h3 id="note-h" className="panel__title">{contactForm.heading}</h3>
              <ContactForm />
            </section>
            <div className="greetings" aria-label="Greetings">
              <div className="greetings__words">
                {correspondence.greetings.map((g) => <span key={g.lang} lang={g.lang}>{g.text}</span>)}
              </div>
              <span className="note" style={{ fontSize: 14 }}>{correspondence.greetingsNote}</span>
            </div>
          </Chapter>
        </div>

        {/* Colophon */}
        <footer className="colophon">
          <span className="micro" style={{ letterSpacing: "0.24em" }}>Colophon</span>
          <p>
            {colophon.text} Currently reading <span style={{ color: "var(--ink)" }}>{colophon.reading.title}</span> by {colophon.reading.by}. On repeat:{" "}
            <span style={{ color: "var(--ink)" }}>{colophon.onRepeat.title}</span> by {colophon.onRepeat.by}.
          </p>
          <svg aria-hidden="true" className="colophon__mark" width="18" height="18" viewBox="0 0 18 18">
            <path d="M9 0V18M0 9H18" />
            <circle cx="9" cy="9" r="4" />
          </svg>
          <span className="micro" style={{ letterSpacing: "0.14em" }}>© {new Date().getFullYear()} {site.name}</span>
        </footer>
      </PageCard>
    </>
  );
}
