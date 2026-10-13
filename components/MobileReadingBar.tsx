"use client";

import { chapters, praise } from "@/content/site";
import { useReadingProgress } from "./useReadingProgress";

const ids = chapters.map((c) => c.id);

/** ≤900px only: sticky bar with chapter progress and the current praise line. */
export default function MobileReadingBar() {
  const { active, progress } = useReadingProgress(ids);
  const shown = Math.max(active, 0);
  const q = praise[shown];
  const n = chapters.length;

  return (
    <div className="topbar" role="navigation" aria-label="Reading progress">
      <span className="topbar__chapter">{active >= 0 ? chapters[active].short : "Start"}</span>
      <div className="topbar__track" aria-hidden="true">
        <span className="topbar__line" />
        <span className="topbar__fill" style={{ width: `${progress * 100}%` }} />
        {chapters.map((c, i) => (
          <span
            key={c.id}
            className="topbar__node"
            data-on={active >= 0 && i <= active}
            style={{ left: `${(i / (n - 1)) * 100}%` }}
          />
        ))}
      </div>
      <div className="topbar__praise">
        <span className="micro">Praise</span>
        <span className="stars" aria-label="Five stars">★★★★★</span>
        <span>
          “{q.text}” <span className="muted">· {q.who}</span>
        </span>
      </div>
    </div>
  );
}
