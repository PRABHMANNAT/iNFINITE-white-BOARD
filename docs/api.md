# IngenBoard — API Design

All endpoints are mounted at `/api/v1/*`. Auth is a Clerk-issued JWT in
`Authorization: Bearer <token>`. Responses are JSON; errors use RFC 7807-style
problem objects.

```
{ "error": { "code": "BOARD_NOT_FOUND", "message": "…", "status": 404 } }
```

---

## REST

### Workspaces

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| `GET` | `/workspaces` | – | `Workspace[]` |
| `POST` | `/workspaces` | `{ name, slug }` | `Workspace` |
| `PATCH` | `/workspaces/:id` | `{ name?, avatarUrl? }` | `Workspace` |
| `DELETE` | `/workspaces/:id` | – | `204` |

### Members

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| `GET` | `/workspaces/:id/members` | – | `Member[]` |
| `POST` | `/workspaces/:id/members` | `{ email, role }` | `Member` |
| `PATCH` | `/members/:id` | `{ role }` | `Member` |
| `DELETE` | `/members/:id` | – | `204` |

### Boards

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| `GET` | `/workspaces/:id/boards` | – | `Board[]` |
| `POST` | `/workspaces/:id/boards` | `{ title, emoji?, templateSlug? }` | `Board` |
| `GET` | `/boards/:id` | – | `Board` |
| `PATCH` | `/boards/:id` | `{ title?, emoji?, isStarred? }` | `Board` |
| `DELETE` | `/boards/:id` | – | `204` |
| `POST` | `/boards/:id/duplicate` | – | `Board` |
| `GET` | `/boards/:id/snapshots` | – | `Snapshot[]` |
| `POST` | `/boards/:id/snapshots/:sid/restore` | – | `Board` |
| `POST` | `/boards/:id/shares` | `{ email?, role }` | `BoardShare` |

### Assets

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| `POST` | `/uploads` | `{ mime, size, kind }` | `{ url, fields, assetId }` (S3 presigned POST) |
| `POST` | `/assets/:id/finalize` | – | `Asset` |

### Templates

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| `GET` | `/templates` | `?category=&q=` | `Template[]` |
| `POST` | `/boards/:id/apply-template` | `{ slug }` | `Board` |

### AI

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| `POST` | `/ai/generate` | `{ boardId, prompt, kind }` | **SSE stream of tool calls** |
| `POST` | `/ai/board-chat` | `{ boardId, message }` | **SSE stream of tokens** |
| `POST` | `/ai/pdf-to-board` | multipart: `file` + `boardId` | `{ jobId }` |
| `GET` | `/jobs/:id` | – | `{ status, result? }` |

`kind ∈ { "mindmap", "diagram", "system-design", "research", "startup" }`.

The AI orchestrator may emit these tool events on the SSE stream:

```
event: tool
data: { "name": "addNode",   "args": { "x":…, "y":…, "text":… } }
event: tool
data: { "name": "addEdge",   "args": { "from":"…", "to":"…" } }
event: tool
data: { "name": "arrange",   "args": { "algorithm": "tree" } }
event: done
data: {}
```

---

## WebSocket events

URL: `wss://api.ingenboard.app/realtime?board=:id`

| Event | Direction | Payload | Notes |
| --- | --- | --- | --- |
| `yjs.update` | both | `Uint8Array` | Yjs document update |
| `awareness` | both | `Uint8Array` | Yjs awareness (cursors, selection) |
| `presence.join` | server→client | `{ user, color }` | |
| `presence.leave` | server→client | `{ userId }` | |
| `reaction` | both | `{ x, y, emoji }` | Ephemeral, broadcast only |
| `voice.signal` | both | WebRTC SDP/ICE | For optional voice rooms |
| `ai.delta` | server→client | tool event | Mirror of SSE for non-AI initiator |

---

## Rate limits

| Bucket | Limit |
| --- | --- |
| Auth-IP burst | 60 req / 10 s |
| AI generate | 30 req / hour (Free), 600 / hour (Pro+) |
| Upload | 100 / hour |
| Snapshot restore | 20 / hour |

---

## Validation

All bodies validated with **Zod** schemas in `apps/api/src/schemas/*` and
re-exported as types for the web client. Invalid bodies return:

```
{ "error": { "code": "VALIDATION", "details": [...zod issues...], "status": 400 } }
```
