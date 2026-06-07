# IngenBoard — Architecture

## Goals

- Sub-frame interactions on the canvas (60–120 fps drawing, pan, zoom)
- Multiplayer that feels local-first
- AI features that can read *and* mutate the board
- Clean separation between the canvas runtime, the collab layer, and the AI orchestrator

---

## High-level shape

```
┌──────────────────────────────────────────────────────────────────────┐
│ Browser                                                              │
│                                                                      │
│  Next.js App Router                                                  │
│   ├─ /                  Landing                                      │
│   ├─ /templates         Template gallery                             │
│   ├─ /canvas            Canvas runtime  ──┐                          │
│   └─ /dashboard         Boards / workspaces                          │
│                                           │                          │
│   Canvas runtime (src/canvas/*)           │                          │
│   ├─ Zustand store    (viewport, els, hist)                          │
│   ├─ Pan/zoom hook    (wheel, space-drag)                            │
│   ├─ Drawing hook     (pen, shapes, text, sticky)                    │
│   ├─ ElementRenderer  (SVG)                                          │
│   ├─ Toolbar / Style / Zoom / Minimap                                │
│   └─ AI Copilot panel                                                │
└─────────┬────────────────────────┬──────────────────────────────────┘
          │ HTTPS (REST + tRPC)    │ WebSocket (Yjs / Liveblocks)
          │                        │
┌─────────▼──────────┐    ┌────────▼─────────────┐
│ API server         │    │ Realtime gateway     │
│ Node + Express     │    │ Liveblocks-compatible│
│ Prisma → Postgres  │    │ Yjs CRDT awareness   │
│ Redis (rate, jobs) │    │                      │
│ AI orchestrator    │    │                      │
└─────────┬──────────┘    └──────────────────────┘
          │
┌─────────▼─────────┐   ┌──────────────┐   ┌──────────────┐
│ Postgres          │   │ Redis        │   │ AWS S3       │
│  - core data      │   │  - queue     │   │  - assets    │
│  - vectors (pgvec)│   │  - presence  │   │              │
└───────────────────┘   └──────────────┘   └──────────────┘
```

---

## Layers

### 1. Canvas runtime

- Pure client. Zero backend dependency for the local drawing loop.
- Element list lives in a Zustand store; the React tree just renders.
- SVG today; Konva/WebGL is a swap-in option when element count crosses ~5k.
- Snapshots committed on every mutation = O(1) undo/redo (history capped).

### 2. Persistence

- `boards` table holds top-level metadata.
- Element state is stored as a Yjs **update binary** column (`bytea`) so the
  server stays authoritative without needing to understand the schema.
- Periodic snapshots to S3 enable point-in-time restore.

### 3. Realtime

- Yjs over WebSockets is the source of truth while a board is open.
- Liveblocks adds presence, comments, broadcast events, and history out of the
  box; if we ever drop it, Yjs+y-websocket is the direct replacement.

### 4. AI

- Orchestrator runs on the API. Frontend never holds provider keys.
- Each tool the model can invoke is a typed function:
  `addNode`, `addEdge`, `arrangeLayout`, `summarizeBoard`, `searchKnowledge`.
- Streaming SSE → optimistic placeholder nodes → committed via Yjs.

### 5. Auth + workspaces

- Clerk handles identity, sessions and JWTs.
- Workspace → membership → role (`owner | admin | editor | viewer | guest`).
- Board permissions inherit the workspace by default; per-board overrides
  layered on top.

---

## Deployment

| Surface | Host | Notes |
| --- | --- | --- |
| Web | Vercel | App Router, edge for marketing pages |
| API | Railway | Node 22, autoscaled |
| DB | Railway / Neon | Postgres 16 + `pgvector` |
| Redis | Upstash | rate limits, queues, presence cache |
| Storage | AWS S3 | assets, board snapshots |
| Realtime | Liveblocks | self-host fallback: y-websocket on Railway |

---

## Performance budgets

| Interaction | Target |
| --- | --- |
| Tool change | < 16 ms |
| Stroke commit (pen) | < 8 ms per sample |
| Pan/zoom frame | 16 ms (60 fps), 8 ms on 120 Hz screens |
| Board open (100 elements) | < 350 ms TTI |
| AI mind-map (10 nodes) | < 2 s perceived |

---

## Open questions

- Single-doc Yjs vs per-shape sub-docs at very large boards.
- WebGL renderer threshold — when do we cut over from SVG?
- Vector store: pgvector now, decide on dedicated (Pinecone/Weaviate) at >10M chunks.
