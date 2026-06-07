# Contributing to IngenBoard

Thanks for caring enough to contribute. Quick rules:

## Branch + commit

- Branches: `feat/<area>-<short-desc>`, `fix/<area>-<short-desc>`, `docs/<topic>`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):
  `feat(canvas): smart connectors auto-route around shapes`.

## Local dev

```bash
npm install
cp .env.example .env.local      # fill what you need
npm run dev
```

Open http://localhost:3000.

## Code conventions

- TypeScript everywhere, `strict: true`.
- Functional React components. Hooks live next to the surface that owns them
  (`src/canvas/use-*.ts`).
- Tailwind utility-first; only extract a component when it would otherwise
  repeat 3+ times.
- No `any`. If a type is genuinely unknowable, use `unknown` and narrow.
- No default exports for components (named exports only — easier to refactor).
- Keep `src/canvas/*` free of imports from `src/app/*` so the canvas is portable.

## Pull requests

- Small + focused beats giant. One feature per PR.
- Screenshots / screen captures for any UI change.
- Update `docs/roadmap.md` when you ship something on the list.

## Reviews

- A PR ships when one maintainer approves and CI is green.
- Comments prefixed `nit:` are non-blocking suggestions.
