# Probhat Foundation website

Nonprofit foundation building a self-sustaining Islamic community model in Bangladesh. Tagline: "Where Deen and Dunya Grow Together" / "শক্ত সমাজ, টেকসই ভবিষ্যৎ". Donors are mostly US-based, so **amounts are in USD**. Hosted on Vercel.

## Stack
- Next.js 16 (App Router), React 19, TypeScript, Tailwind 3.4 + typography
- Content in MDX frontmatter via `next-mdx-remote` (`content/`), typed in `src/lib/content-types.ts`
- Forms: react-hook-form + zod (schemas shared client/server in `src/lib/schemas.ts`); email via Resend HTTP API (`src/lib/email.ts`)

## Commands
- `npm run dev` / `npm run build` / `npm start`
- `npm run lint`, `npx tsc --noEmit`. No tests yet.

## Structure
- `content/site.json`: email, phone, location, social links. `""` hides a field (phone and Instagram/LinkedIn are blank for now).
- `content/pages/*.mdx`: all page copy as frontmatter (home, about, programs, pipeline, get-involved, contact, donate, initiatives).
- `content/programs/*.mdx`: program detail pages; `pillar:` must match an `id` in `content/pages/programs.mdx` (education | healthcare | community).
- `content/updates/*.mdx`: real field updates (2024). `coverImage` is shown only if the file exists in `public/`.
- `content/reports/*.mdx`: `status: "Draft"` is hidden.
- `src/components/ui/brand.tsx`: PageHero, SectionHeading, Eyebrow, IconTile, DawnMotif, card classes. `ui/common.tsx`: Button variants, Container, Section(tone).
- `src/lib/icons.ts`: Lucide icons referenced by name from MDX.

## Design system
- Brand tokens in `tailwind.config.ts` (`brand-forest|pine|line|ink|sage|ivory|cream|sand|gold|amber`). Never hardcode hex in components.
- Headings `font-display` (Playfair Display), body Inter, Bengali `font-bengali` with `lang="bn"`.
- Amber buttons use forest text (`text-brand-forest`), not white.

## Donations
- `content/pages/donate.mdx`: `givingOpen: false` shows "Online giving opens soon" and the form collects **pledges** (no payment). When accounts exist: fill `paymentMethods[].detail`/`url`, set `givingOpen: true`.
- `/donate?fund=zakat` and `?designation=education|healthcare|community` preselect the form.

## Env vars (Vercel)
`RESEND_API_KEY` (required in prod; forms return 503 "not configured" without it, dev just logs), `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (sender on a Resend-verified domain), `NEXT_PUBLIC_SITE_URL`.

## Conventions
- Keep copy in `content/`, not components. Keep Bengali text exactly as provided.
- Never invent impact numbers, testimonials, donors, partners, prices, or contact details.

## Status
What's done, how email is wired (Cloudflare Email Routing in, Resend out) and the pending list: `docs/STATUS.md`. Keep it updated when closing out work.

## Don't touch without asking
- Form API routes, email recipients, `next.config.ts`.
