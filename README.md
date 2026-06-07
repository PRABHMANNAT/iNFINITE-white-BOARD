# IngenBoard

**AI-Powered Infinite Whiteboard for Thinking, Planning, Learning, Research, Product Design, Startups and Collaboration.**

IngenBoard is a next-generation visual thinking platform that combines an infinite canvas with an AI copilot, real-time collaboration, and a knowledge-graph layer. Built to outclass Miro, FigJam, Excalidraw, Milanote, and Notion Whiteboards by being faster, more minimal, and AI-native from the ground up.

---

## ✨ Vision

A single workspace where you can:

- Brainstorm and mind-map at the speed of thought
- Design system architectures and database schemas
- Plan products, sprints, and startups
- Research topics with an AI agent that builds the board for you
- Collaborate live with your team
- Turn PDFs and meetings into visual knowledge

---

## 🧱 Tech Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | TailwindCSS + Shadcn UI |
| State | Zustand + TanStack Query |
| Canvas | React Flow + Konva |
| Animation | Framer Motion |
| Backend | Node.js + Express + Prisma + PostgreSQL + Redis |
| Realtime | Yjs + WebSockets + Liveblocks |
| Auth | Clerk |
| Storage | AWS S3 |
| AI | OpenAI + Anthropic Claude + Google Gemini |
| Deploy | Vercel (web) + Railway (API) |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
.
├── apps/
│   └── web/                # Next.js 15 frontend
├── packages/
│   ├── canvas/             # Infinite canvas engine
│   ├── ai/                 # AI copilot adapters
│   └── ui/                 # Shared shadcn-based components
├── docs/                   # Architecture, schema, API specs
└── README.md
```

(Monorepo layout is built incrementally — see `docs/roadmap.md` for what is live today.)

---

## 🛣️ Roadmap

See [`docs/roadmap.md`](./docs/roadmap.md) for the MVP → Enterprise plan.

---

## 📄 License

MIT — see [`LICENSE`](./LICENSE).
