# ysorapalli.com

Yashasvi Sorapalli's portfolio, built as a book: a title page with a robot arm you can draw with, a dedication to recruiters, chapters with a reading-progress route in the left margin and praise in the right, a Correspondence chapter with a LinkedIn button and a message form, and a colophon. A second page, /projects, lists selected works and live GitHub repos. Light and dark mode.

Next.js 15 (App Router) · TypeScript · plain CSS (tokens in `app/globals.css`) · deployed on Vercel.

## Run it

```bash
npm install
cp .env.example .env.local   # optional, everything works without it
npm run dev                   # http://localhost:3000
npm run check                 # typecheck + lint + production build
```

## Where things live

| Path | What |
|---|---|
| `content/site.ts` | **All copy.** Edit text, chapters, praise, projects, timeline, tools here. |
| `app/page.tsx` | `/`: the book |
| `app/projects/page.tsx` | `/projects`: selected works + live GitHub shelf (refreshes hourly) |
| `app/connect/page.tsx` | Redirects old `/connect` links to `/#correspondence` |
| `app/api/contact/route.ts` | Message form endpoint (Resend) |
| `lib/github.ts` | GitHub fetching with a snapshot fallback (`lib/linkedin.ts` is unused; delete it) |
| `components/` | Header + theme toggle, page card, reading rails, mobile reading bar, robot arm, laurel, contact form |
| `app/globals.css` | Design tokens (light/dark), layout, all component styles |
| `design-reference/` | The original canvas prototypes + design handoff spec (not shipped) |
| `public/` | Portrait, project figures, resume (`/data/YashasviSorapalli-Resume.pdf`, same path as the old site) |

## Things to fill in (all optional; the site works without them)

1. **Contact form → your inbox.** Create a free [Resend](https://resend.com) account, verify `ysorapalli.com` (or use the test sender), then set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`. Until then, the form opens the visitor's email app with the note prefilled.
2. **GitHub token** (optional): `GITHUB_TOKEN` only raises the API rate limit; public repos load without it.

## Deploy to the same URL

Push this folder to the new GitHub repo, then either:
- **Reuse the existing Vercel project:** Project → Settings → Git → connect the new repository. The `ysorapalli.com` domain stays attached.
- **Or create a new Vercel project** from the new repo and move the domain to it (remove it from the old project's Domains, add it to the new one).

Put real keys in `.env.local` (never in `.env.example`, which is committed) and add the same vars in Vercel before the first production deploy.

## Behaviour notes

- **Theme:** follows the system setting; the sun/moon toggle overrides and remembers it (`localStorage.theme`). An inline script sets it before paint, so there's no flash.
- **Reading rails** (>900px): the route on the left fills as you read and links to each chapter; the praise on the right shows one review per chapter (`n / 7`). ≤900px they become a sticky top bar. ≤760px the nav collapses into a menu.
- **Robot arm:** a two-link inverse-kinematics arm. Click and drag inside the sketch pad to draw; works with touch.
- Respects `prefers-reduced-motion`.
