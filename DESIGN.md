# Portfolio design contract

## Authority

`UI Design.pen` is the visual and baseline-copy source for this portfolio. Read it through the pen.dev MCP. The approved AI SEO Strategist case-study and article brief governs the SEO implementation narrative; the earlier SEO Growth Intelligence brief remains the source for the broader architecture discussion. The implemented content lives in typed modules under `src/data`; those modules are the editable source for the running site.

The canvas supersedes the earlier website reference and single-page design. Canvas copy was approved for this build. Remove reference-author leftovers and reconcile repeated labels and counts; do not add unsupported metrics, project outcomes, credentials, external links, or production claims. Preserve distinctions in the case studies, including unresolved Odoo printer diagnosis and human editorial review in AI News Intelligence.

## Pages and content

- Main navigation: Home, Experience, Projects, Writing, About, Contact. Navigation uses the same earth-tone mapping as the corresponding page content.
- Main routes: `/`, `/experience`, `/projects`, `/writing`, `/about`, `/contact`.
- Project routes: `/projects/ai-seo-growth-intelligence`, `/projects/whatsapp-ai-assistant`, `/projects/odoo-restaurant-operations`, `/projects/ai-news-intelligence`.
- Project detail pages use the shared typed case-study frame. Home features AI SEO Strategist and WhatsApp; the project index preserves the existing five-record order. AI SEO Strategist retains `PR-0004`, `/projects/ai-seo-growth-intelligence`, first position, and `In progress` status.
- About contains positioning, education, and credentials. There are no separate AI Safety, Education, or Résumé routes.
- Home ends with `FORM WR-06 · WRITING`, followed directly by the existing footer. It does not include a separate contact section.
- Writing uses typed `WR-` article records with burnt-clay accents. Home previews the first two records; `/writing` lists all four. Order: `WR-0004`, Building an AI SEO Strategist: Turning Scattered Data into Prioritized Actions (`/writing/building-an-ai-seo-strategist-in-n8n`); workflow boundaries; human approval; SEO Growth Intelligence architecture. Full articles use statically generated `/writing/[slug]` routes with a readable single-column ledger, related-project links, and verified external sources.
- Publication dates remain unset and hidden until the articles are publicly launched. AI SEO Strategist describes the implemented four-source n8n MVP, evidence handling, two-stage AI analysis, Top 5 HTML/JSON output, and fixture-based checks. The older SEO Growth Intelligence article distinguishes broader storage, numeric scoring, and scheduled reporting ideas from current MVP capabilities. Public copy uses generic naming and contains no remaining-milestone checklist, setup instructions, unsupported live results, or unreviewed workflow downloads, screenshots, and sample reports.
- Article-to-project links are fixed as follows: workflow boundaries links to WhatsApp; human approval links to Odoo, WhatsApp, and AI News; both SEO articles link to the AI SEO Strategist project at its retained URL.
- Contact contains only Email (`mailto:gemegahprince9@gmail.com`), LinkedIn (`https://www.linkedin.com/in/emmanuelgemegah`), and GitHub (`https://github.com/gemegah`). LinkedIn and GitHub open in new tabs. Résumé, demo, and project-repository actions remain omitted until destinations are supplied.

## Visual system

Use the canvas's structural visual direction: cream surfaces, heavy black outlines, offset shadows, document tabs, paperclips, small registration marks, and compact typographic labels. Apply color through a restrained three-accent earth palette. Large page surfaces remain cream; accents belong on cards, navigation states, labels, and decorative details.

| Token | Value |
| --- | --- |
| Cream / paper | #FFF8E5 / #FFFDF5 |
| Ink / soft ink | #0A0A0A / #4A4653 |
| Moss olive | #87906A |
| Burnt clay | #C9785B |
| Warm ochre | #C8A15A |
| Display / body / mono | Archivo Black / Space Grotesk / JetBrains Mono |
| Borders | 3px, 4px, 6px |
| Offset shadows | 5px, 9px, 13px |

Use moss olive for Experience and About, warm ochre for Projects, and burnt clay for Writing and Contact. Project cards map AI SEO Strategist to clay, WhatsApp to olive, Odoo to ochre, and AI News to clay; article cards cycle ochre, olive, then clay in record order. Use near-black text on all accent surfaces. Do not use accent-colored body text directly on cream.

Shared styles live in `src/app/globals.css`. Keep the existing CSS approach. Read reusable canvas components and their actual instances; the page designs take precedence over reference-author text inside unused component examples. Use exact exported geometry for decorative SVGs.

## Layout and behavior

- Center the fluid site shell at a maximum 1240px on every page, including Home.
- Use two-column cards at 768px and above, and single-column cards below. Keep content-driven heights, wrapping tags, and sufficient room for shadows.
- Use responsive six-destination navigation and a keyboard-accessible modal menu. Provide an explicit menu button, Escape dismissal, focus restoration, and Shift + right-click access to the browser menu.
- Light theme only. The ticker has no playback controls and stops for reduced-motion preferences.
- Render all available entry text; only offer expansion when additional text actually exists.
- Project links navigate to detail pages; architecture links scroll to the implementation section. No empty or fabricated destinations.
- Preserve semantic headings, visible focus, usable touch targets, and readable mobile layouts. Decorative marks are non-interactive and hidden from assistive technology.

## Runtime and verification

Keep Next.js App Router, strict TypeScript, and static export for Cloudflare Pages. Enumerate project and article slugs with `generateStaticParams`. No contact backend, deployment, DNS changes, or external service provisioning is part of the design implementation.

The postbuild step normalizes nested `__next.*` segment files generated by Next 16.3.1 on Windows into the flat filenames its browser router requests. It operates only on generated `out/` files; builds without malformed nested segment paths need no correction. Verify navigation against the static output when updating Next.js.

Run `npm run lint`, `npm run typecheck`, and `npm run build`. Verify every route and interaction, including the new Writing route, and check widths 375, 414, 768, 1024, and 1440px. Preserve unrelated working-tree changes and leave implementation uncommitted.
