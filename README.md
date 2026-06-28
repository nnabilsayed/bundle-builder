# Security System Bundle Builder

A multi-step security system bundle builder — React, TypeScript, Tailwind CSS v4.

## Run

```bash
npm install
npm run dev        # frontend → http://localhost:5173
npm run dev:server # bonus API → http://localhost:3001/api/products
```

> To use the bonus API, copy `.env.example` to `.env` before starting the frontend.

The frontend fetches products from the API if the server is running, and falls back to local data if not — so `npm run dev` alone is enough.

## Decisions

- **Tailwind v4** — config lives in `@theme` block in `index.css`, no `tailwind.config.js`
- **TypeScript data files** — typed `.ts` instead of raw JSON; shared between frontend and Express server without duplication
- **Variant quantities tracked independently** — each color variant has its own count; switching chips doesn't clear other variants; review panel shows every variant with qty > 0 as its own line
- **localStorage persistence** — explicit save on click, restored on mount via `RESTORE_STATE`
- **API fallback** — backend is a bonus; app works fully without it

## Known gaps

- Checkout is a placeholder `alert()`

