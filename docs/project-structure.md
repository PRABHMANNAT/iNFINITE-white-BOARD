# Project structure

```
.
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Landing
│   │   ├── canvas/
│   │   │   └── page.tsx           # Canvas runtime
│   │   └── templates/
│   │       └── page.tsx           # Template gallery
│   │
│   ├── canvas/                    # Canvas engine (client-only)
│   │   ├── types.ts               # Element + viewport + tool types
│   │   ├── store.ts               # Zustand store + undo/redo
│   │   ├── surface.tsx            # SVG surface composing everything
│   │   ├── grid.tsx               # Dot/square/iso grid layers
│   │   ├── element-renderer.tsx   # Per-element SVG render
│   │   ├── toolbar.tsx            # Bottom tool palette
│   │   ├── topbar.tsx             # Board topbar (title, share, export)
│   │   ├── style-panel.tsx        # Stroke / fill / width
│   │   ├── zoom-controls.tsx      # +/− and grid cycler
│   │   ├── minimap.tsx            # Auto-fit minimap
│   │   ├── ai-copilot.tsx         # Floating Copilot panel
│   │   ├── export.ts              # PNG / SVG / JSON
│   │   ├── export-menu.tsx        # Dropdown for export+import
│   │   ├── use-pan-zoom.ts        # Pan + cursor-anchored zoom hook
│   │   └── use-drawing.ts         # Drawing dispatcher hook
│   │
│   ├── components/
│   │   ├── brand/logo.tsx
│   │   ├── ui/button.tsx          # cva button
│   │   └── landing/               # Marketing sections
│   │
│   └── lib/
│       ├── cn.ts                  # clsx + tailwind-merge
│       ├── id.ts                  # crypto-based nanoid (no deps)
│       └── templates.ts           # Static template catalog
│
├── prisma/
│   └── schema.prisma              # Postgres + pgvector
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── roadmap.md
│   └── project-structure.md       # ← you are here
│
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── package.json
├── .env.example
└── README.md
```

## Naming conventions

| Concern | Convention |
| --- | --- |
| Files | `kebab-case.tsx`, hooks `use-x.ts` |
| Components | `PascalCase`, exported as named |
| Stores | `useThing` (Zustand) |
| Server modules | `apps/api/src/<domain>/{router,service,schema}.ts` |
| DB | snake_case columns (Prisma maps to camelCase TS) |

## Module boundaries

- `src/canvas/*` may **not** import from `src/app/*`. It must be a runnable
  surface that can be lifted into another host later.
- `src/components/landing/*` is marketing-only and must not import canvas code
  (so the marketing tree stays tiny on the landing route).
- `src/lib/*` is pure (no React imports from `id.ts`, `templates.ts`).
