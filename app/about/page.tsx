import type { Metadata } from "next";
import Image from "next/image";
import {
  site,
  prologue,
  images,
  history,
  furtherReading,
  tools,
} from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import PageCard, { RunningHead } from "@/components/PageCard";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Yashasvi Sorapalli, a robotics graduate student at Carnegie Mellon with a background in software engineering.",
};
export default function AboutPage() {
  return (
    <>
      <SiteHeader current="about" />
      <PageCard variant="sub">
        <section className="page-head" aria-labelledby="about-h">
          <RunningHead left="The author" right="About" />
          <div className="page-head__body">
            <p className="kicker">A little background · ✦</p>
            <h1 id="about-h" className="page-h1">
              About {site.name}
            </h1>
            <p className="page-intro">
              Robotics, software, and a few earlier chapters.
            </p>
          </div>
        </section>
        <div className="about-intro" id="story">
          <figure className="plate">
            <div className="plate__frame">
              <Image
                src={images.portrait.src}
                width={340}
                height={400}
                alt={prologue.plate.alt}
                sizes="(max-width: 600px) 70vw, 280px"
              />
            </div>
            <figcaption className="figcap">{prologue.plate.caption}</figcaption>
          </figure>
          <section aria-labelledby="story-h" className="prose">
            <h2 id="story-h" className="chapter__title">
              My story
            </h2>
            {prologue.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        </div>
        <section
          id="background"
          className="about-section prose"
          aria-labelledby="background-h"
        >
          <RunningHead left="Earlier chapters" right="Background" />
          <h2 id="background-h" className="chapter__title">
            Before all this
          </h2>
          <ol className="timeline">
            {history.map((h, i) => (
              <li
                key={h.years}
                data-seg={i === history.length - 1 ? "none" : "solid"}
              >
                <span
                  className="timeline__node"
                  aria-hidden="true"
                  data-fill={i === history.length - 2}
                />
                <span className="timeline__years">{h.years}</span>
                <p>{h.text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          id="learning"
          className="about-section prose"
          aria-labelledby="learning-h"
        >
          <h2 id="learning-h" className="chapter__title">
            Experience and interests
          </h2>
          {[
            furtherReading.coursework,
            furtherReading.plannedCoursework,
            furtherReading.certificates,
          ].map(
            (group) => (
              <div key={group.label}>
                <h3>{group.label}</h3>
                <ul className="learning-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ),
          )}
          <h3>Index of tools</h3>
          <ul className="tool-grid">
            {tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
        <SiteFooter />
      </PageCard>
    </>
  );
}
