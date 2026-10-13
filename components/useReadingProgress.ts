"use client";

import { useEffect, useState } from "react";

export type ReadingProgress = {
  /** Index of the chapter being read, -1 before the first one. */
  active: number;
  /** 0…1 across all chapters. */
  progress: number;
};

/**
 * Tracks which chapter the reader is in. A chapter counts as "current" once its top
 * passes 35% of the viewport; progress interpolates between chapter tops.
 */
export function useReadingProgress(ids: readonly string[]): ReadingProgress {
  const [state, setState] = useState<ReadingProgress>({ active: -1, progress: 0 });

  useEffect(() => {
    let raf = 0;
    const n = ids.length;

    const measure = () => {
      raf = 0;
      const sy = window.scrollY;
      const y = sy + window.innerHeight * 0.35;
      const tops = ids.map((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + sy : Infinity;
      });
      let active = -1;
      for (let i = 0; i < n; i++) if (tops[i] <= y) active = i;
      let frac = 0;
      if (active >= 0 && active < n - 1 && Number.isFinite(tops[active + 1])) {
        frac = Math.min(1, Math.max(0, (y - tops[active]) / (tops[active + 1] - tops[active])));
      }
      const doc = document.documentElement;
      if (doc.scrollHeight > window.innerHeight + 10 && window.innerHeight + sy >= doc.scrollHeight - 4) {
        active = n - 1;
        frac = 0;
      }
      const progress = active < 0 ? 0 : Math.round(Math.min(1, (active + frac) / (n - 1)) * 200) / 200;
      setState((s) => (s.active === active && s.progress === progress ? s : { active, progress }));
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ids]);

  return state;
}
