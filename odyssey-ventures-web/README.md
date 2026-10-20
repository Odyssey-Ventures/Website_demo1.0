# Odyssey Ventures website

Redesigned website for Odyssey Ventures, a Silicon Valley-based company supporting startups and businesses expanding into the U.S. market.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · React 19 · Vercel · Supabase (later)

**Design status:** Layout order, navigation, footer and photos follow the live site. Colors (`tailwind.config.ts`), font (Inter, `src/app/layout.tsx`), spacing and the scroll fade-in are NOT verified against the live site; they are set in those files so they can be matched once exact values are known.

**Status:** Home page complete. Academy, Accelerator and Advisory have working routes with short placeholder content; the full pages are built next.

> This project does not touch the live site (odysseyventures.llc) or its domain settings. Search engines are blocked by default until you launch (see "Going live").

## Repository root (important for Vercel)

`package.json`, `next.config.mjs` and the `src/` folder must be at the **top level of the GitHub repository**, not inside a subfolder. Open the repo on GitHub: you should see `package.json` and `src` directly in the file list. If you see a single `odyssey-ventures-web` folder instead, either move the files up one level, or set **Vercel > Project Settings > General > Root Directory** to that folder name and redeploy.

## Run locally

Requires Node.js 18.18 or newer (Node 20 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run lint
npm run typecheck
npm run build      # production build
npm run start      # serve the production build
```

The first `npm install` creates `package-lock.json`. Commit it so everyone installs identical versions.

## Project structure

```
src/
  app/                    Routes (App Router), metadata, robots, sitemap
    page.tsx              Home
    academy/ accelerator/ advisory/
  components/
    layout/               Header, Footer, Logo
    ui/                   Button, Container, SectionHeading, Reveal (scroll fade-in)
    home/                 Hero, Focus, About, Services, Testimonials, Contact, Banner
    shared/               PlaceholderPage (temporary)
  config/                 site.ts (name, email, URL), navigation.ts, images.ts (photos)
  data/                   services.ts, testimonials.ts, partners.ts  <- edit content here
  types/                  Shared TypeScript types
  lib/                    Small helpers
.github/                  CI workflow and pull request template
```

## Editing content

| What | File |
| --- | --- |
| Company name, email, location | `src/config/site.ts` |
| Navigation links | `src/config/navigation.ts` |
| Academy / Accelerator / Advisory summaries | `src/data/services.ts` |
| Testimonials (needs 5 or more) | `src/data/testimonials.ts` |
| Partner logos (files go in `public/logos`) | `src/data/partners.ts` |

Rules for content: only verified facts. Do not add client names, testimonials, results, statistics, team members or partnerships unless they are real and approved. Use clearly labeled placeholders otherwise.

Company facts on the Home page come from the current live site, translated from Korean. Have a native speaker review the wording.

## Contact form

There is no backend yet. Submitting the form opens the visitor's email app with a prepared message to `contact@odysseyventures.llc`. When you want inquiries stored, add a route handler (`src/app/api/contact/route.ts`) that writes to Supabase and call it from `src/components/home/ContactForm.tsx`.

## Environment variables

Copy `.env.example` to `.env.local` if needed. Nothing is required for the initial deployment.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL. Set only when this becomes the production site. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` by default. Set `true` at launch. |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Not used yet. |

## Upload to GitHub

1. Create an empty repository on GitHub (no README, no .gitignore). Suggested name: `odyssey-ventures-web`.
2. In this folder:

```bash
git init
git add .
git commit -m "Initial commit: Home page"
git branch -M main
git remote add origin https://github.com/<your-org>/odyssey-ventures-web.git
git push -u origin main
```

### Team workflow

- `main` is always deployable. Do not commit to it directly.
- Create a branch per task: `feature/academy-page`, `fix/mobile-nav`, `content/testimonials`.
- Open a pull request into `main`. The template lists what to check. The CI workflow runs lint, typecheck and build.
- Vercel posts a preview URL on every pull request. Review it on a phone and a desktop before merging.
- Recommended GitHub settings: Settings > Branches > add a rule for `main` that requires a pull request and the `check` status before merging.

## Deploy on Vercel

1. Sign in at vercel.com with GitHub and choose **Add New > Project**.
2. Import the `odyssey-ventures-web` repository. Vercel detects Next.js automatically; keep the defaults.
3. Click **Deploy**. You get a URL like `odyssey-ventures-web.vercel.app`.
4. Every push to `main` deploys to production; every pull request gets a preview.

### Going live (later, when the team is ready)

The current site is hosted separately (Framer). Do not add `odysseyventures.llc` to the Vercel project until you are ready to switch.

1. Review the Vercel URL with the team and replace all placeholders.
2. In Vercel > Settings > Environment Variables, set `NEXT_PUBLIC_SITE_URL=https://www.odysseyventures.llc` and `NEXT_PUBLIC_ALLOW_INDEXING=true`.
3. Add the domain in Vercel > Settings > Domains and update DNS as Vercel instructs.
4. Redeploy.

## Adding Supabase later

1. Create a Supabase project and run `npm install @supabase/supabase-js`.
2. Add the two Supabase variables in `.env.local` and in Vercel.
3. Create a client in `src/lib/supabase.ts` and use it from route handlers or server components.

## Still to do

- Full Academy, Accelerator and Advisory pages
- Team / About page (the live site has one; team details must come from the company)
- Open Graph image (`src/app/opengraph-image.png`)
- Verified testimonials, partner logos, and a Korean-language version if wanted
