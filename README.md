# IngenBoard

**AI-Powered Infinite Whiteboard for Thinking, Planning, Learning, Research, Product Design, Startups and Collaboration.**

IngenBoard is a next-generation visual thinking platform — an infinite canvas with an AI copilot, real-time collaboration, and a knowledge-graph layer.

---

## ✨ What works today (M0)

### Canvas

- **Infinite pan & zoom** — cursor-anchored, wheel + ctrl-scroll
- **Smart grids** — dots, squares, isometric, off
- **Drawing tools** — pen, marker, highlighter, laser pointer (all rendered with [perfect-freehand](https://github.com/steveruizok/perfect-freehand))
- **Shape library** — rectangle, ellipse, diamond, triangle, line, arrow
- **Sketchy mode** — every shape can switch to a hand-drawn aesthetic via [roughjs](https://roughjs.com)
- **Sticky notes** — 8 pastel presets, inline editable
- **Text & images** — drag-drop or paste image files / clipboard
- **Eraser** — click-drag to wipe elements (z-order respecting)
- **Selection** — click, shift-click, marquee rectangle, drag-to-move
- **Editing hotkeys** — Del, ⌘D duplicate, ⌘C/⌘V copy/paste, arrows nudge, ⌘[ / ⌘] z-order, ⌘A select-all, Esc deselect
- **Undo / redo** — 100-step history with snapshot-on-mutation
- **Auto-save** — every change persisted to `localStorage` via zustand middleware

### UI

- **Light / dark / system theme** via `next-themes` — every surface follows
- **Tooltips on every control** via `@radix-ui/react-tooltip` with kbd shortcut chips
- **Accessible dialogs / dropdowns / popovers** — all radix-backed
- **Toast notifications** via `sonner`
- **Command palette** (⌘K) via `cmdk` — every action fuzzy-searchable
- **Color picker** via `react-colorful` (HEX + transparent)
- **Floating selection toolbar** — appears when something is selected
- **Mini-map** — click-to-jump, auto-fits to content
- **Zoom-to-fit** — fits all content (or just selection) to the viewport
- **Keyboard shortcuts modal** — categorized cheatsheet

### AI

- **AI Copilot panel** — chat + quick actions (mind map, system design, research, startup)
- **`/api/ai/generate`** — SSE-streaming tool-call protocol stub (drop in OpenAI / Anthropic)

### Export

- **PNG, SVG, JSON** — robust capture via `html-to-image` at 2× pixel ratio
- **Import** — drop a previously exported JSON back onto the canvas

### Marketing

- **Landing page** — hero (animated with `framer-motion`), features grid, AI section, testimonials, pricing, FAQ, footer
- **Templates gallery** — 22 templates across 9 categories, fuzzy search via `fuse.js`
- **404 page** — branded
- **PWA manifest** — installable

---

## 🧱 Tech Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | TailwindCSS + Radix UI primitives + Shadcn patterns |
| Theming | `next-themes` (light/dark/system) |
| State | Zustand (+ persist middleware) |
| Canvas | SVG renderer + `perfect-freehand` + `roughjs` |
| Animation | `framer-motion` |
| Search | `fuse.js` |
| Toasts | `sonner` |
| Palette | `cmdk` |
| Hotkeys | `react-hotkeys-hook` |
| Export | `html-to-image` |
| Color | `react-colorful` |
| (Planned) Auth | Clerk |
| (Planned) Realtime | Yjs + Liveblocks |
| (Planned) Storage | Postgres + Prisma + pgvector + Redis + S3 |
| (Planned) AI | OpenAI + Anthropic + Gemini |
| Deploy | Vercel (web) + Railway (API) |

---

## 🚀 Quick Start

```bash
npm install
cp .env.example .env.local   # only needed once you wire real auth/AI/DB
npm run dev
# → http://localhost:3000
```

---

## 🛣️ Roadmap

See [`docs/roadmap.md`](./docs/roadmap.md).

## 📐 Docs

- [`docs/architecture.md`](./docs/architecture.md)
- [`docs/api.md`](./docs/api.md)
- [`docs/project-structure.md`](./docs/project-structure.md)

## 📄 License

MIT — see [`LICENSE`](./LICENSE).
