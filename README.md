# Emmanuel Portfolio Frontend

React/Next.js frontend for `emmanuelgemegah.online`.

The WordPress site remains available as a temporary rollback source during the Cloudflare Pages cutover.

## Local development

```bash
npm install
npm run dev
```

## Cloudflare Pages build settings

- Framework preset: `Next.js (Static HTML Export)`
- Production branch: `main`
- Build command: `npm run deploy:build`
- Build output directory: `out`

Cloudflare Pages is the only deployment publisher. A successful push to `main` runs lint, type checking, the static Next.js build, and the post-build path normalization before production is updated. Non-production branches can use Cloudflare preview deployments.

## Production cutover and rollback

- Keep Hostinger nameservers and all Hostinger mail records unchanged.
- After the Pages deployment is verified, point the apex ALIAS and `www` CNAME to `emmanuel-portfolio-frontend.pages.dev`.
- `functions/_middleware.ts` permanently redirects `www` requests to the matching apex URL. A Pages Function is required because Pages `_redirects` rules cannot match by hostname.
- During the seven-day rollback window, restore the previous Hostinger apex and `www` website targets if the Cloudflare deployment fails production verification.
- Do not delete the WordPress installation or database until the rollback window ends and a final backup has been downloaded and verified.

## Migration plan

See [wordpress-to-react-portfolio-plan.md](./wordpress-to-react-portfolio-plan.md).
