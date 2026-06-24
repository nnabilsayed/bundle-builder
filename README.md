# Security System Bundle Builder

A multi-step, data-driven bundle builder built as a React take-home assessment. Shoppers configure their security system across four guided steps, with a live review panel that updates in real time.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build   # production build
npm run preview # preview the production build locally
```

## What's built

**Left column — 4-step accordion builder**
- Step 1: Choose your cameras
- Step 2: Choose your plan
- Step 3: Choose your sensors
- Step 4: Add extra protection

Each step has a product grid with variant selectors, quantity steppers, pricing, and discount badges. The active step ends with a "Next: …" button. Collapsed steps show a selected-item count.

**Right column — live review panel**
- Grouped by category (Cameras, Sensors, Accessories, Plan)
- Each line item has its own quantity stepper, synced bidirectionally with the builder
- Shipping, satisfaction guarantee badge, financing line, total with savings callout
- Checkout placeholder + "Save my system for later" persistence link

## Tech decisions

| Choice | Why |
|--------|-----|
| **Vite + React 18 + TypeScript** | Fast dev server, type safety, modern toolchain |
| **CSS Modules + CSS custom properties** | Scoped styles, readable class names, zero runtime cost. Easier to map Figma specs directly to CSS than utility classes. |
| **React Context + useReducer** | The right weight for this scope — shared state across two sibling subtrees without Redux overhead. A single `BundleContext` provides selections, derived values, and a stable dispatch. |
| **Flat `selections` map** | Keyed by `variantId` (or `productId` for products without variants). Simple to diff, persist, and derive review lines from. Each color variant tracks its own quantity independently. |
| **localStorage persistence** | Explicit save via the "Save my system for later" link rather than auto-save on every change. Intentional UX: the shopper decides when to save. |

## Variant quantity tracking

Each variant is a separate key in the `selections` map (`wyze-cam-v4-white`, `wyze-cam-v4-black`, …). Switching the active color chip on a card shows *that variant's* quantity in the stepper — the other variants' counts are untouched. All variants with qty > 0 appear as separate lines in the review panel.

## Data

All product data lives in [`src/data/products.ts`](src/data/products.ts) as a typed array. The initial app state (matching the Figma) is in [`src/data/initialSelections.ts`](src/data/initialSelections.ts). No backend is required — a local data file drives the entire UI.

## What I didn't finish / tradeoffs

- **Product images**: Using placeholder rectangles. The component architecture reads `image` paths from the data model, so swapping in real images is a data-only change.
- **Prices vs Figma**: The Figma review panel has manually entered placeholder values that don't mathematically derive from the card prices. My totals are calculated correctly from the product data.
- **No automated tests**: Given the scope, I prioritized getting all interactions right over Vitest/RTL coverage. The reducer is pure and straightforward to unit-test.
- **Accordion animation**: Uses a `scrollHeight` snapshot + CSS `height` transition. A `ResizeObserver` would handle dynamic content heights more robustly.
- **Alert dialogs**: Checkout and save confirmations use `window.alert` as placeholders. A production implementation would use a toast notification.
