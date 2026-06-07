# IngenBoard — Roadmap

We ship in three layered milestones. Each milestone is releasable on its own.

---

## M0 — Foundation (this repo, today)

- [x] Repo + license + README
- [x] Next.js 15 + React 19 + Tailwind scaffold
- [x] Landing page (nav, hero, features, AI section, footer)
- [x] Zustand canvas store + undo/redo
- [x] Infinite canvas surface (pan, zoom, grid)
- [x] Drawing tools (pen, highlighter, marker)
- [x] Shape library (rect, ellipse, diamond, triangle, line, arrow)
- [x] Text + sticky notes
- [x] Floating toolbar / style panel / zoom controls / minimap
- [x] AI Copilot panel UI + starter mind-map generator
- [x] Templates gallery
- [x] Export to PNG / SVG / JSON, import JSON
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
