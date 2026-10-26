# Odyssey Ventures website

Redesigned website for Odyssey Ventures, a Silicon Valley-based company supporting startups and businesses expanding into the U.S. market.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · React 19 · Vercel · Supabase (later)

**Design status:** Brand colors are in `tailwind.config.ts`: blue `#3129F2`, green `#29F27C`, navy `#0B1F44` (confirmed by the owner). Fonts: Inter for Latin and Noto Sans KR for Korean (`src/app/[lang]/layout.tsx`). Spacing and the scroll fade-in are not verified against the live site.

**Status:** Bilingual design framework (English `/en`, Korean `/ko`) with the official logo. Home, Academy, Accelerator and Advisory show development placeholders only; real content is added later by editing the language files.

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
public/images/            OdysseyVentures_logo.webp (official logo, do not edit)
src/
  middleware.ts           "/" and any path without a language -> /en/...
  app/
    [lang]/               Root layout and all pages, for /en and /ko
      layout.tsx          <html lang>, fonts, Header, Footer, metadata
      page.tsx            Home
      academy/ accelerator/ advisory/
      not-found.tsx       Language-aware 404 (used through [...rest])
    icon.png apple-icon.png   Favicons made from the logo symbol
    robots.ts sitemap.ts      sitemap lists every page in both languages
  i18n/                   config (languages, link helpers), dictionaries, LocaleProvider
  messages/               en.json and ko.json  <- all visible text
  components/
    layout/               Header, Navigation, LanguageSwitcher, Logo, Footer
    ui/                   Button, Container, SectionContainer, SectionHeading, PageHero,
                          ServiceCard, PlaceholderSection, Reveal
    home/                 Hero, Focus, About, Services, Testimonials, Contact, ContactForm, Banner
    shared/               PlaceholderPage (body of the three service pages)
  config/                 site.ts (name, email, URL), navigation.ts, images.ts (logo and photos)
  data/                   services.ts, testimonials.ts, partners.ts
  types/ lib/
docs/original-english-content.md   Backup of the English copy used before the redesign
```

## Languages

- URLs: `/en`, `/en/academy`, `/en/accelerator`, `/en/advisory` and the same under `/ko`. Opening `/` goes to `/en`.
- Visible text lives in `src/messages/en.json` and `src/messages/ko.json`. English and Korean are edited independently, but both files must have the same keys: `npm run build` (through `npm run verify`) and TypeScript fail if one is missing a key.
- Internal links are built with `localizedHref(lang, path)` from `src/i18n/config.ts`. Never hard-code `/academy`.
- To add real content, replace the placeholder strings in both JSON files. For a new kind of block, add a key to `en.json` first, then to `ko.json`.
- The language switcher keeps the current page (`/en/academy` -> `/ko/academy`).
- The previous English copy is in `docs/original-english-content.md` and in Git history.

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

- Real content for Home, Academy, Accelerator and Advisory (English and Korean)
- Team / About page (the live site has one; team details must come from the company)
- Open Graph image (`src/app/opengraph-image.png`)
- Verified testimonials and partner logos
- Optional: download the Hero, About and Banner photos into `public/images` so the site no longer depends on framerusercontent.com
