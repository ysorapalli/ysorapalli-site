"use client";

import { chapters, praise } from "@/content/site";
import { useReadingProgress } from "./useReadingProgress";

const ids = chapters.map((c) => c.id);
const TRACK = 240; // 7 nodes, 40px apart

/** Desktop only (>900px): Route rail in the left margin, Praise rail in the right margin. */
export default function ReadingRails() {
  const { active, progress } = useReadingProgress(ids);
  const shown = Math.max(active, 0);

  return (
    <>
      <div className="rail rail--route">
        <nav className="rail__inner" aria-label="Reading progress">
          <span className="micro" style={{ display: "block", margin: "0 0 10px 4px" }}>Route</span>
          <div className="route">
            <span aria-hidden="true" className="route__line" />
            <span aria-hidden="true" className="route__fill" style={{ height: Math.round(progress * TRACK) }} />
            <ol>
              {chapters.map((c, i) => {
                const state = i === active ? "current" : active >= 0 && i < active ? "passed" : "upcoming";
                return (
                  <li key={c.id}>
                    <a href={`#${c.id}`} aria-label={c.title} aria-current={i === active ? "location" : undefined}>
                      <span className="route__dot" data-state={state} />
                    </a>
                    {i === active && <span className="route__label">{c.short}</span>}
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>
      </div>

      <div className="rail rail--praise">
        <aside className="rail__inner" aria-label="Praise for Yashasvi Sorapalli">
          <span className="micro">Praise</span>
          <span className="praise__for">for Yashasvi Sorapalli</span>
          <span className="praise__count">{shown + 1} / {praise.length}</span>
          <div className="praise__stack">
            {praise.map((q, i) => (
              <figure
                key={q.who}
                className="blurb"
                data-state={i === shown ? "on" : i < shown ? "before" : "after"}
                aria-hidden={i !== shown}
              >
                <span className="stars" aria-label="Five stars">★★★★★</span>
                <blockquote>“{q.text}”</blockquote>
                <figcaption>{q.who}</figcaption>
              </figure>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
