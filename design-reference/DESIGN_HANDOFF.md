# Design C — "Reads like a book" · build handoff

The source of truth for building ysorapalli.com from design C, in a new repo deployed to the same Vercel URL.

| Folder | What it is | How to use it |
|---|---|---|
| `reference/` | The six canvas prototypes: desktop and mobile for `/`, `/projects`, `/connect` | **Visual source of truth.** Exact spacing, sizes and colours live in the inline styles. See "Reading the reference files" below. |
| `design/tokens.css` | Light and dark colour tokens, type scale, layout widths, motion | Import once globally. Every colour in the build is a `var(--…)` from here. |
| `design/tokens.json` | The same tokens as data, plus contrast ratios | For reference or for a Tailwind/theme config if you prefer. |
| `content/site.ts` | Every word on the site, typed | Components render from this; the copy is final and has been approved line by line. |
| `public/` | Portrait, project figures, resume PDF | Copy into the new repo's `public/` with the same paths, so old resume links keep working. |

---

## 1. Stack

- **Next.js (App Router) + TypeScript**, the same family as the current site, deployed on Vercel.
- **Plain CSS** (global `tokens.css` plus CSS Modules per component). No UI kit is needed; the design is custom.
- **Fonts** via `next/font/google`: `Geist` (400/500/600), `Geist_Mono` (400/500), and `Noto_Sans_Devanagari`, `Noto_Sans_Telugu`, `Noto_Sans_Kannada` (500, used only for the greetings in Correspondence). Expose them as `--font-sans` and `--font-mono`.
- No cursive or handwriting fonts anywhere (explicit requirement).

## 2. Routes

| Route | Reference file | Mobile reference |
|---|---|---|
| `/` (the book) | `reference/Book.dc.html` | `reference/Book-Mobile.dc.html` (same page at 390px) |
| `/projects` | `reference/Book-Projects.dc.html` | `reference/Book-Projects-Mobile.dc.html` |
| `/connect` | `reference/Book-Connect.dc.html` | `reference/Book-Connect-Mobile.dc.html` |

The mobile files only wrap the desktop page at 390px wide. The site is **one responsive page per route**, not separate mobile pages.

### `/` section order
1. **Nav**: name (links to top) · Contents · Projects · Contact · Connect · Resume (pill) · theme toggle · menu button (mobile).
2. **Sticky top bar**, ≤900px only: current chapter, progress line with 7 nodes, and a praise ticker line.
3. **Page card** (`--page`, `--shadow`, max 1100px, centred). Inside it:
   - Bookmark ribbon (accent, top right) and crosshair crop marks in three corners.
   - **Route rail** (left margin) and **Praise rail** (right margin), sticky, >900px only. See §5.
   - **Title page**: "A portfolio" · name (H1) · subtitle · imprint, plus the **robot arm sketch pad** figure to the right (wraps below on mobile).
   - **Dedication**: laurel wreath around "To / the recruiters who made it past the title page. / ★ ★ ★", body text, "Skip to Correspondence" pill.
   - **Contents**: chapter list (title + muted note), then the contents note.
   - **Chapters**, each with a running head (mono: "Yashasvi Sorapalli" … chapter name) and an H2: Prologue (with portrait "plate"), What I'm working on (status dot, lead, figure, link to /projects), Published works (accent left-border entries), Before all this (timeline), Further reading, Index of tools (grid), Correspondence (email, buttons, greetings).
   - **Colophon** (centred, small): fonts, rainy day, *Exhalation*, *Arz Kiya Hai*, ©.

### `/projects`
Running head "← Back to the book … Projects" · H1 "Collected works" · intro · **Selected works** (3 rows: figure on a plate + meta + title + summary + tags + link) · **GitHub shelf** (heading, "Synced from GitHub · Last pulled …", praise aside, repo cards on a timeline rail, dashed "Next push lands here automatically." slot) · footer.

### `/connect`
Running head · H1 "Connect" · intro · left column: **LinkedIn card** (round photo, name, headline, location, bio, Connect on LinkedIn, Follow / Message, profile URL) and **message form**. Right column: **Latest from LinkedIn** (5 post cards on a timeline rail, "View all on LinkedIn ↗") · footer.

## 3. Theming (light and dark)

- `data-theme="light" | "dark"` on `<html>`. Tokens are in `design/tokens.css`.
- **Default**: the system preference (`prefers-color-scheme`). **The toggle** (two-segment pill: sun / moon, each a 44×36 button with `aria-pressed`, group `aria-label="Color theme"`) overrides it and saves `localStorage.theme`.
- Avoid a flash of the wrong theme: add a tiny inline script in `<head>` that sets `data-theme` from localStorage or the media query before first paint (with `suppressHydrationWarning` on `<html>`).
- Active segment: `background: var(--ink); color: var(--page)`. Inactive: transparent, `color: var(--muted)`.
- Dark mode adds the starfield to the backdrop (`--starfield`). Figures sit on `--plate`, which stays light in dark mode.
- All text pairs pass 4.5:1 in both themes (ratios in `tokens.json`).
- Theme changes animate colours over `--t-color`; this is disabled under reduced motion.

## 4. Responsive behaviour

| Width | Behaviour |
|---|---|
| > 900px | Route rail (left) and Praise rail (right) visible, both sticky at `top: 72px`, starting at the Contents section. |
| ≤ 900px | Both rails hidden. A sticky **top bar** shows the current chapter's short name, a progress line with 7 nodes, and a second line: `PRAISE ★★★★★ "quote" · who`. |
| ≤ 760px | Nav links collapse into a **Menu** button (44px, `aria-expanded`) that opens a stacked sheet. The theme toggle stays visible. |
| All | Text column max 600px, chapter block max 660px. Page padding uses the clamps in tokens. Everything stacks with flex-wrap; no horizontal scroll. |

## 5. Behaviours

### 5.1 Reading progress (Route rail and top bar)
- Track the 7 chapters by element id (`chapters[].id`). On scroll (rAF-throttled) and resize:
  - `y = scrollY + innerHeight * 0.35`
  - `active` = last chapter whose top ≤ y (−1 before the first)
  - `frac` = (y − top[active]) / (top[active+1] − top[active]), clamped to 0…1
  - If scrolled to the bottom, `active = last`
  - `progress = (active + frac) / (n − 1)`
- Rail: a 2px track (`--rule`) with an accent fill of height `progress × 240px`. There are 7 nodes, 40px apart, each a link to its chapter. Passed and current nodes are filled with accent; the current one also gets a soft accent ring and its short label beside it (mono 10px). Upcoming nodes are hollow with a muted border.
- Top bar: the same model, horizontally.
- Use `aria-current="location"` on the current node.
- An `IntersectionObserver` is fine instead, as long as the visual result matches.

### 5.2 Praise rail
- Header "PRAISE / for Yashasvi Sorapalli", then a counter **`n / 7`** (mono, accent). **Not** a row of stars: partially filled stars read as a bad rating.
- One review is shown at a time: **★★★★★ always full**, then the quote (15px, 500) and attribution (mono 10px). The review index = the current chapter (min 0).
- Change: outgoing fades out and slides 14px up; incoming fades in from 14px below, over `--t-blurb`. Hidden reviews get `aria-hidden="true"`.
- ≤900px: the same review appears as the second line of the sticky top bar.

### 5.3 Robot arm sketch pad (title page)
- An SVG with viewBox `0 0 360 310`. The full geometry is in `reference/Book.dc.html` (title page `<svg>`, and the IK block in the script).
- Two-link arm: shoulder at (80, 236), L1 = 135, L2 = 125, elbow-up solution. The wrist target is the pen tip minus (6, 30), and the pencil hangs from the wrist down to the tip. The reach is clamped to `[|L1−L2|+1, L1+L2−0.5]`.
- **Sketch pad**: a dashed rect (126, 162) → (318, 292) labelled "SKETCH PAD".
  - Pointer down inside the pad starts a stroke and captures the pointer.
  - Pointer move (rAF-throttled) adds a point if it moved more than 1.2 units, clamped to the pad.
  - While not drawing, hovering inside the pad just moves the arm.
  - Pointer up or cancel ends the stroke.
  - About 2,500 points are kept, dropping the oldest strokes.
- `touch-action: none` on the SVG so finger-drawing works on phones.
- Shows a starter squiggle until first use. The **Clear** button empties the pad.
- Joint angle labels θ1 (fixed) and θ2 (follows the elbow). x/y axes at the bottom left.
- The SVG gets `role="img"` and a descriptive `aria-label`. It is decorative, so no keyboard drawing is needed.

### 5.4 Dedication laurel
- Two mirrored laurel branches (the left SVG, and the same SVG with `scaleX(-1)`) flank the text. The path data is in `reference/Book.dc.html` (dedication section, viewBox `-4 -4 76 182`, width `clamp(44px, 6vw, 64px)`).
- Accent coloured, `aria-hidden`.

### 5.5 GitHub shelf (`/projects`)
- Server-fetch `https://api.github.com/users/ysorapalli/repos?sort=pushed&per_page=12` with `next: { revalidate: 3600 }` (ISR), so new repos appear within the hour with no redeploy. Optionally use a `GITHUB_TOKEN` env var for rate limits.
- Map each repo to: `name`, `description`, `language` (dot colour: TypeScript #3178C6, Python #3572A5, C++ #F34B7D, JavaScript #F1E05A, Java #B07219, else muted), `stargazers_count`, `fork` (show a "Fork" badge), `pushed_at` (formatted "Updated Sep 14, 2026"), `html_url`.
- Apply `projectsPage.hideRepos` / `hideForks`. The newest card's node is filled; the rest are hollow. Finish the list with the dashed "next push" slot.
- "Last pulled …" = the fetch time. If the fetch fails, render the last good list (or hide the shelf), never an error.
- As of 12 Oct 2026 the public repos are `ysorapalli.com` (TypeScript) and `stroke-detection` (fork).

### 5.6 LinkedIn (`/connect`)
- LinkedIn has no API for reading your own posts on a personal site. Keep the 5 posts in `content/site.ts → linkedinPosts`, edited by hand. Either render them as the designed cards, or use each post's official "Embed this post" iframe (`embedUrl`).
- Connect, Follow and Message all link to the profile URL. Nothing is automated on LinkedIn.

### 5.7 Message form (`/connect`)
- Fields: Name, Email (type=email), Topic (radio-style pill buttons with `aria-pressed`, default "Roles & internships"), Message (textarea).
- Send through a **Next.js route handler** (`app/api/contact/route.ts`) using an email service (for example Resend with `RESEND_API_KEY`), or a hosted form endpoint (for example Formspree). Add a honeypot field and basic rate limiting.
- On success, swap the form for the dashed "Sent" panel with "Send another". On failure, show an inline error and keep the input.

## 6. Components (suggested)

`Nav` (+ `ThemeToggle`, `MobileMenu`) · `PageCard` (ribbon, crop marks) · `RunningHead` · `RouteRail` · `PraiseRail` · `MobileProgressBar` (with praise ticker) · `ArmSketchPad` · `Dedication` (+ `Laurel`) · `Chapter` · `Timeline` (shared by Before all this, the GitHub shelf and LinkedIn posts) · `PaperEntry` · `ToolIndex` · `Greetings` · `Colophon` · `ProjectRow` · `RepoCard` · `LinkedInCard` · `ContactForm` · `PostCard`.

Shared details:
- Running head: mono 12px, uppercase, ls .08em, muted, 12px bottom padding, 1px `--rule` bottom border, max 660px.
- Status dot: 8px `--ok` circle with `0 0 0 4px rgba(47,163,107,.18)`.
- Buttons: pill (999px radius), min height 44px. Primary is `--ink` on `--page`; secondary is a 1px border.
- Plates/figures: `--plate` background, 1px `--rule` border, 10–12px padding. Captions are mono 11px uppercase.

## 7. Accessibility and motion
- Every interactive element is a real `<a>` or `<button>` with ≥44px targets and visible `:focus-visible` (2px accent outline).
- Icon-only buttons have `aria-label`. Decorative SVGs (ribbon, crop marks, laurels) have `aria-hidden`.
- Respect `prefers-reduced-motion`: no colour transitions, no praise slide (an instant swap is fine).
- `lang` attributes on the greetings (`hi`, `te`, `kn`, `fr`).
- Alt text is in `content/site.ts`.

## 8. Assets (`public/`)
- `images/YashasviSorapalliPic-optimized.jpg`: portrait (plate, LinkedIn card, post avatars).
- `images/projects/autonomous-laboratory.jpg`, `multicamera-tracking.jpg`, `blockchain-document-storage.jpg`.
- `data/YashasviSorapalli-Resume.pdf`: keep this exact path so existing links still work.
- Use `next/image` for photos. The diagrams have white backgrounds by design, which is why they sit on the plate.

## 9. Deploying to the same Vercel URL
Pick one:
- **Re-point the existing Vercel project**: in the project's settings, change the connected Git repository to the new repo. The domain (ysorapalli.com) stays attached.
- **New Vercel project**: import the new repo, then move the domain to it (remove it from the old project's Domains settings, add it to the new one).

Either way, add any env vars (`RESEND_API_KEY`, `GITHUB_TOKEN`) before the first production deploy. Keep the old repo until the new deploy is verified.

## 10. Reading the reference files
Each `*.dc.html` is a self-contained design component:
- Markup inside `<x-dc>`, with inline styles. These styles are the spec.
- `<helmet><style>` holds the tokens, breakpoints and class toggles.
- A `<script>` at the bottom whose `renderVals()` fills the `{{holes}}`. `<sc-for list="{{x}}" as="item">` is a loop, `<sc-if value="{{cond}}">` is a conditional, and `onClick="{{fn}}"` binds handlers.
- The scroll tracking, praise sync and arm IK logic in those scripts can be ported nearly 1:1 into React hooks.
- `support.js` and the `/_blob/…` image URLs are canvas-only. Use the files in `public/` instead.

## 11. Open items
- [ ] Paste the 5 latest LinkedIn posts into `linkedinPosts`.
- [ ] Decide whether `stroke-detection` (a fork) is shown on the GitHub shelf.
- [ ] Choose the form provider (Resend route or Formspree) and add its key.
- [ ] Final check in both themes at 390, 768, 1024 and 1440 widths.
