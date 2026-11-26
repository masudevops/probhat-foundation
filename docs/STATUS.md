# Project status

_Last updated: 2026-11-26_

## What was done (Nov 2026)

### Website redesign (PR #1, live on www.probhatfoundation.org)
- One forest/gold design system across every page: brand colour tokens in `tailwind.config.ts`, Playfair Display headings, shared components in `src/components/ui/brand.tsx`, Lucide icons instead of emoji.
- Removed the static prototype's `styles.css` from the app (it was overriding fonts).
- Restyled Donate, Updates, Initiatives, Reports and the program/update detail pages, which were still on the old navy/orange theme.
- Programs page now covers all three pillars and links to each program's detail page; the Scholar Pipeline is a connected timeline; the home page shows the latest updates.
- Fixed update dates showing one day early for US visitors; new favicon and social share image.

### Forms
- **Contact form** (`/contact`) validates input and emails the team.
- **Donate page** (`/donate`) takes USD pledges (fund, frequency, amount, designation) while online giving is "coming soon". No payment is taken.
- Both forms send through Resend (`src/lib/email.ts`) to the foundation inbox, with the visitor's address as reply-to. A hidden honeypot field drops simple spam bots.
- Links like `/contact?subject=Volunteer` and `/donate?fund=zakat&designation=education` preselect the form.

### Content
- All page copy lives in `content/pages/*.mdx` frontmatter; site-wide details (email, phone, socials) in `content/site.json`. Edit these files, not the components. An empty `""` hides a field.
- Programs in `content/programs/*.mdx` are tagged with `pillar: education | healthcare | community`.

### Email infrastructure
| Piece | Service | Notes |
|---|---|---|
| Receiving `info@probhatfoundation.org` | Cloudflare Email Routing | Forwards to the founder's inbox. Catch-all is disabled (other addresses are rejected). MX + SPF records managed by Cloudflare. |
| Sending form notifications | Resend | Domain verified; records on `send.probhatfoundation.org` and `resend._domainkey`. |
| DMARC | DNS (Cloudflare) | `p=none` (monitor only), reports to info@. |

### Environment variables (Vercel → Production)
| Name | Set? | Purpose |
|---|---|---|
| `RESEND_API_KEY` | ✅ | Required for forms to send. Without it production returns "not configured"; dev logs to the console. |
| `CONTACT_FROM_EMAIL` | ✅ | Sender on the verified domain, e.g. `Probhat Foundation <noreply@probhatfoundation.org>`. |
| `CONTACT_TO_EMAIL` | not needed | Defaults to the email in `content/site.json`. |
| `NEXT_PUBLIC_SITE_URL` | optional | Defaults to `https://probhatfoundation.org`. |

These are only set for **Production**, so forms on Vercel preview deployments show "not connected yet". That's expected.

## Pending

### Before taking donations
- [ ] Set up donation accounts (PayPal / Zelle / bKash). Then fill in `paymentMethods[].detail` (and `url`) in `content/pages/donate.mdx` and set `givingOpen: true`.

### Content to supply or decide
- [ ] Phone number: add to `content/site.json` when available (hidden while empty).
- [ ] Instagram / LinkedIn: add URLs to `content/site.json` if the accounts are created.
- [ ] Photos for the 2024 updates: `public/images/updates/medical-camp-2024.jpg`, `library-2024.jpg`, `ramadan-2024.jpg` (a branded cover shows until then).
- [ ] Resolve wording conflicts: the site says "Pre-Launch" (home, about, get-involved) while the 2024 updates show real work; Initiatives lists the "First Initiative" as planned for 2026; the pipeline mentions a "British curriculum" for a US-facing audience.
- [ ] Founding team bios (About page says they'll be published at launch).

### Housekeeping
- [ ] Review `.env.example` before committing it: `.gitignore` now allows it (`!.env.example`), but it still contains old, unused variables (`SMTP_*`, `ADMIN_EMAIL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_SITE_NAME`). Remove them or make sure they hold placeholders only, then commit. This repo is public.
- [ ] Decide on the untracked static prototype in the repo root (`*.html`, `main.js`, `styles.css`): delete, or move to `design/prototype/`.
- [ ] Refresh `README.md`: its content guide still describes the old site structure. Point it at this file and `CLAUDE.md`.
- [ ] Add basic tests (form API validation, content loading).

### Optional improvements
- [ ] After a few weeks of clean DMARC reports, tighten to `p=quarantine`.
- [ ] Reply as info@ from Gmail: Settings → Accounts → "Send mail as", SMTP `smtp.resend.com`, port 587, user `resend`, password = a Resend API key.
- [ ] Lock the Email Routing DNS records in Cloudflare (Email Routing → Settings → DNS records → Lock) if not done.
