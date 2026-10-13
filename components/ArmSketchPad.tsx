"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { titlePage } from "@/content/site";

type Pt = { x: number; y: number };

const VB = { w: 360, h: 310 };
const PAD = { x0: 126, y0: 162, x1: 318, y1: 292 };
const SHOULDER = { x: 80, y: 236 };
const L1 = 135;
const L2 = 125;
const MAX_POINTS = 2500;
const SEED = "M270 214 C 250 230, 232 200, 208 216 S 168 234, 146 212";

const r1 = (n: number) => Math.round(n * 10) / 10;
const inPad = (p: Pt) => p.x >= PAD.x0 && p.x <= PAD.x1 && p.y >= PAD.y0 && p.y <= PAD.y1;
const clampPad = (p: Pt): Pt => ({
  x: r1(Math.max(PAD.x0, Math.min(PAD.x1, p.x))),
  y: r1(Math.max(PAD.y0, Math.min(PAD.y1, p.y))),
});

/** Two-link inverse kinematics (elbow up). The pencil hangs from the wrist; tip = wrist + (6, 30). */
function solveArm(tip: Pt) {
  let wx = tip.x - 6;
  let wy = tip.y - 30;
  const dx = wx - SHOULDER.x;
  const dy = wy - SHOULDER.y;
  const d = Math.hypot(dx, dy);
  const dc = Math.max(Math.abs(L1 - L2) + 1, Math.min(L1 + L2 - 0.5, d));
  if (d > 0 && dc !== d) {
    wx = SHOULDER.x + (dx / d) * dc;
    wy = SHOULDER.y + (dy / d) * dc;
  }
  const a = Math.atan2(wy - SHOULDER.y, wx - SHOULDER.x);
  const cb = Math.max(-1, Math.min(1, (L1 * L1 + dc * dc - L2 * L2) / (2 * L1 * dc)));
  const t1 = a - Math.acos(cb);
  const ex = SHOULDER.x + L1 * Math.cos(t1);
  const ey = SHOULDER.y + L1 * Math.sin(t1);
  return {
    links: `M${SHOULDER.x} ${SHOULDER.y} L${r1(ex)} ${r1(ey)} L${r1(wx)} ${r1(wy)}`,
    ex: r1(ex), ey: r1(ey), wx: r1(wx), wy: r1(wy),
    fingers: `M${r1(wx - 6)} ${r1(wy + 3)} L${r1(wx - 3)} ${r1(wy + 16)} M${r1(wx + 6)} ${r1(wy + 1)} L${r1(wx + 9)} ${r1(wy + 14)}`,
    pencil: `M${r1(wx + 1.5)} ${r1(wy + 8)} L${r1(wx + 5)} ${r1(wy + 22)}`,
    nib: `M${r1(wx + 1.6)} ${r1(wy + 21.5)} L${r1(wx + 8.4)} ${r1(wy + 20)} L${r1(wx + 6)} ${r1(wy + 30)} Z`,
  };
}

export default function ArmSketchPad() {
  const [tip, setTip] = useState<Pt>({ x: 270, y: 214 });
  const [trail, setTrail] = useState(SEED);
  const strokes = useRef<Pt[][]>([]);
  const drawing = useRef(false);
  const pending = useRef<Pt | null>(null);
  const raf = useRef(0);

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  // Rebuild the ink path from the stroke list (kept in a ref so pointer moves stay cheap).
  const buildTrail = () => {
    let d = "";
    for (const s of strokes.current) {
      if (!s.length) continue;
      d += ` M${s[0].x} ${s[0].y}${s.length === 1 ? " l0.1 0.1" : ""}`;
      for (let i = 1; i < s.length; i++) d += ` L${s[i].x} ${s[i].y}`;
    }
    return d.trim();
  };

  const toSvg = (e: PointerEvent<SVGSVGElement>): Pt => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * VB.w, y: ((e.clientY - r.top) / r.height) * VB.h };
  };

  const flush = useCallback(() => {
    raf.current = 0;
    const p = pending.current;
    if (!p) return;
    pending.current = null;
    if (drawing.current) {
      const s = strokes.current[strokes.current.length - 1];
      const last = s[s.length - 1];
      if (!last || Math.abs(last.x - p.x) + Math.abs(last.y - p.y) > 1.2) s.push(p);
      let total = strokes.current.reduce((n, st) => n + st.length, 0);
      while (total > MAX_POINTS && strokes.current.length > 1) total -= strokes.current.shift()!.length;
    }
    setTip(p);
    if (drawing.current) setTrail(buildTrail());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDown = (e: PointerEvent<SVGSVGElement>) => {
    const p = toSvg(e);
    if (!inPad(p)) return;
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    const c = clampPad(p);
    drawing.current = true;
    strokes.current.push([c]);
    setTip(c);
    setTrail(buildTrail());
  };

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const p = toSvg(e);
    if (!drawing.current && !inPad(p)) return;
    pending.current = clampPad(p);
    if (!raf.current) raf.current = requestAnimationFrame(flush);
  };

  const onUp = () => { drawing.current = false; };

  const clear = () => {
    strokes.current = [];
    drawing.current = false;
    setTrail("");
  };

  const arm = solveArm(tip);
  const mono = { fontFamily: "var(--font-mono)" };

  return (
    <figure className="arm">
      <svg
        role="img"
        aria-label="Interactive robot arm. Click and drag inside the sketch pad and the arm draws along your path."
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <rect x={PAD.x0} y={PAD.y0} width={PAD.x1 - PAD.x0} height={PAD.y1 - PAD.y0} rx="4" fill="none" strokeWidth="1.2" strokeDasharray="4 5" style={{ stroke: "var(--rule)" }} />
        <text x="314" y="157" textAnchor="end" style={{ ...mono, fill: "var(--muted)", fontSize: 9, letterSpacing: "0.1em" }}>SKETCH PAD</text>
        {trail && <path d={trail} fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--muted)" }} />}
        <rect x="40" y="262" width="80" height="16" rx="3" style={{ fill: "var(--ink)" }} />
        <path d="M60 262 L68 244 H92 L100 262 Z" style={{ fill: "var(--ink)" }} />
        <path d={arm.links} fill="none" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--ink)" }} />
        <path d={arm.fingers} fill="none" strokeWidth="3" strokeLinecap="round" style={{ stroke: "var(--ink)" }} />
        <path d={arm.pencil} fill="none" strokeWidth="6" style={{ stroke: "var(--accent)" }} />
        <path d={arm.nib} style={{ fill: "var(--ink)" }} />
        <circle cx={SHOULDER.x} cy={SHOULDER.y} r="8" strokeWidth="2.5" style={{ fill: "var(--page)", stroke: "var(--ink)" }} />
        <circle cx={SHOULDER.x} cy={SHOULDER.y} r="2.5" style={{ fill: "var(--accent)" }} />
        <circle cx={arm.ex} cy={arm.ey} r="8" strokeWidth="2.5" style={{ fill: "var(--page)", stroke: "var(--ink)" }} />
        <circle cx={arm.ex} cy={arm.ey} r="2.5" style={{ fill: "var(--accent)" }} />
        <circle cx={arm.wx} cy={arm.wy} r="6" strokeWidth="2.5" style={{ fill: "var(--page)", stroke: "var(--ink)" }} />
        <text x={r1(arm.ex + 12)} y={r1(arm.ey - 12)} style={{ ...mono, fill: "var(--muted)", fontSize: 12 }}>θ2</text>
        <text x="96" y="222" style={{ ...mono, fill: "var(--muted)", fontSize: 12 }}>θ1</text>
        <path d="M18 298 H50 M44 294 L50 298 L44 302 M18 298 V266 M14 272 L18 266 L22 272" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--accent)" }} />
        <text x="55" y="302" style={{ ...mono, fill: "var(--accent)", fontSize: 11 }}>x</text>
        <text x="14" y="260" style={{ ...mono, fill: "var(--accent)", fontSize: 11 }}>y</text>
      </svg>
      <figcaption className="arm__caption">
        <span>{titlePage.armCaption}</span>
        <button type="button" className="arm__clear" onClick={clear}>Clear</button>
      </figcaption>
    </figure>
  );
}
