# IngenBoard — Roadmap

We ship in three layered milestones. Each milestone is releasable on its own.

---

## M0 — Foundation (shipped)

- [x] Repo + license + README + CI + PR template
- [x] Next.js 15 + React 19 + Tailwind scaffold
- [x] Landing — nav, hero (framer-motion), features, AI section, testimonials, pricing, FAQ, footer
- [x] Light / dark / system theme via next-themes
- [x] Zustand canvas store with persist middleware
- [x] Infinite canvas (pan/zoom/grid) + minimap with click-to-jump
- [x] Drawing tools: pen, marker, highlighter (perfect-freehand), laser pointer
- [x] Eraser (functional, hit-test aware)
- [x] Shape library + sketchy roughjs renderer toggle
- [x] Text + sticky notes (inline editable, 8 pastel presets)
- [x] Image element type + drag-drop + clipboard paste
- [x] Selection — click, shift-click, marquee, drag-to-move
- [x] Editing hotkeys via react-hotkeys-hook (Del, ⌘D, ⌘C/V, arrows, ⌘[/], ⌘A, Esc)
- [x] Floating selection toolbar (duplicate, z-order, delete)
- [x] Undo/redo + auto-save to localStorage
- [x] Floating toolbar / style panel / zoom controls / minimap
- [x] Tooltips, dialogs, dropdowns, popovers (radix-ui)
- [x] Toast notifications (sonner)
- [x] Command palette ⌘K (cmdk)
- [x] Color picker (react-colorful)
- [x] Zoom-to-fit content / selection
- [x] AI Copilot panel + SSE `/api/ai/generate` stub
- [x] Templates gallery with fuse.js fuzzy search
- [x] Export to PNG/SVG/JSON via html-to-image (2× DPR), import JSON
- [x] Branded 404 page + PWA manifest + icon
- [x] Architecture + Prisma schema + API design docs

---

## M1 — MVP (next)

- [ ] Clerk auth + workspaces + boards CRUD
- [ ] Real Yjs collaboration on a single board
- [ ] Selection + transform handles + multi-select
- [ ] Eraser tool + element delete
- [ ] AI Copilot → real LLM calls (OpenAI + Anthropic streaming)
- [ ] AI tool dispatcher (`addNode`, `addEdge`, `arrange`, `summarize`)
- [ ] Board Chat (ask the board questions)
- [ ] PDF → mind map
- [ ] Smart connectors (auto-route, snap to shapes)
- [ ] Templates apply onto canvas
- [ ] Presence cursors + live comments

---

## M2 — Modes

- [ ] Mind Map mode (auto layout + AI expand)
- [ ] Knowledge Graph mode (cross-board links)
- [ ] System Design mode (palette of infra primitives)
- [ ] Product mode (kanban, journey, roadmap)
- [ ] Startup mode (one-pager generator)
- [ ] Education mode (PDF → study notes)

---

## M3 — Enterprise

- [ ] SSO (SAML/OIDC)
- [ ] SCIM provisioning
- [ ] Audit log export
- [ ] Workspace-scoped AI key bring-your-own
- [ ] Self-hosted realtime gateway (`y-websocket` image)
- [ ] On-prem deploy guide

---

## Stretch / unique

- [ ] Autonomous Board Builder (objective → whole board)
- [ ] AI Meeting Mode (transcript → board)
- [ ] AI Layout Engine (one-click beautify)
- [ ] AI Thought Expansion (1 idea → 20)
- [ ] Board chat with citations into the knowledge graph
