# CONTEXT — ysorapalli.com rebuild (design C, "reads like a book")

Hand this file to a new chat to continue the work.

## Who / what
- Owner: Yashasvi Sorapalli (robotics grad student, CMU MRSD 2026–2028). Site: https://ysorapalli.com (Vercel). Email ysorapalli@gmail.com.
- This project is a **new repo** that replaces the old site (old repo: `~/portfolio/ethanvillalovoz.github.io`, a Next.js template). Same Vercel URL.
- Design source: Claude canvas artifact "Robotics Portfolio Landing", option **C** (artboards `Book`, `Book-Connect`, `Book-Projects` + mobile). Handoff package: `~/portfolio/portfolio-design-C/` (DESIGN_HANDOFF.md, tokens, content/site.ts, reference/*.dc.html, public assets).

## Decisions already made with the owner (do not relitigate)
- Book metaphor: title page with interactive robot-arm sketch pad (2-link IK), laurel-wreath dedication "To the recruiters who made it past the title page", chapters with running heads, colophon.
- Left margin: sticky **Route** rail (reading progress, 7 chapters). Right margin: sticky **Praise** rail, one review per chapter, always ★★★★★, counter "n / 7". ≤900px both collapse into a sticky top bar (progress + praise ticker).
- Fonts: Geist + Geist Mono only (plus Noto Sans Devanagari/Telugu/Kannada for the greetings). **No cursive/handwriting.**
- Copy rules: **no em dashes**, plain and human, no invented claims. Planning/decision making = interests, not done work. Languages mentioned once (Correspondence). Reading/music mentioned once (Colophon).
- Light + dark mode (system default, toggle persists in localStorage). Contrast verified ≥4.5:1.
- Pages: `/` book, `/projects` (selected works + live GitHub shelf). The `/connect` page was REMOVED at the owner's request (no way to pull posts; its buttons were redundant): Correspondence now has one "Connect on LinkedIn" button + the message form; `/connect` permanently redirects to `/#correspondence`.
- `stroke-detection` repo (a fork) IS shown, with note: built together on the same laptop (pair programming).
- Contact form: Resend via `app/api/contact`; without a key it falls back to opening the visitor's mail app.
- No LinkedIn API / feed. `lib/linkedin.ts` is a dead stub left only because files couldn't be deleted remotely; delete it.

## Status
- [x] Project scaffolded and all pages/components written (this folder).
- [x] Pre-check in the original session (no npm access there): every page bundled with esbuild + React 19 (Next modules shimmed), rendered in Chromium at 1440 and 390 in light and dark, zero runtime errors. Verified scroll rails + praise counter, theme toggle persistence, arm drawing + Clear, mobile menu, mobile reading bar, topic picker.
- [ ] `npm install && npm run check` (typecheck, lint, next build) — NOT run yet (registry blocked in that sandbox). Run first; fix anything it reports.
- [ ] Re-check with real Geist font loaded (the pre-check used a fallback font).
- [ ] Owner inputs (she said she'll add them herself): Resend key + verified sender, optional GitHub token → `.env.local` and Vercel env vars.
- [x] Owner ran `npm install` locally on 12 Oct (package-lock.json and .next exist); build result not reported.
- [ ] Deploy: point the existing Vercel project at this repo (or move the domain), add env vars.
