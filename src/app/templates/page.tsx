'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { CATEGORIES, TEMPLATES, type Template } from '@/lib/templates';
import { LandingNav } from '@/components/landing/nav';
import { LandingFooter } from '@/components/landing/footer';
import { cn } from '@/lib/cn';

export default function TemplatesPage() {
  const [active, setActive] = useState<Template['category'] | 'all'>('all');
  const [q, setQ] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(TEMPLATES, {
        keys: [
          { name: 'title', weight: 0.7 },
          { name: 'description', weight: 0.2 },
          { name: 'category', weight: 0.1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    []
  );

  const filtered = useMemo(() => {
    const base = q.trim()
      ? fuse.search(q.trim()).map((r) => r.item)
      : TEMPLATES;
    return base.filter((t) => active === 'all' || t.category === active);
  }, [active, q, fuse]);

  return (
    <>
      <LandingNav />
      <main className="px-6 pb-24 pt-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Templates
          </h1>
          <p className="mt-3 max-w-xl text-fg-muted">
            Start any board in seconds. Every template is editable and works with
            the AI Copilot.
          </p>

          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search templates…"
              className="w-full max-w-sm rounded-xl border border-border bg-bg-subtle px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActive('all')}
                className={cn(
                  'rounded-full border border-border px-3 py-1 text-xs transition-colors',
                  active === 'all'
                    ? 'bg-accent text-accent-fg'
                    : 'bg-bg-muted text-fg-muted hover:text-fg'
                )}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={cn(
                    'rounded-full border border-border px-3 py-1 text-xs transition-colors',
                    active === c.id
                      ? 'bg-accent text-accent-fg'
                      : 'bg-bg-muted text-fg-muted hover:text-fg'
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <Link
                href={`/canvas?template=${t.slug}`}
                key={t.slug}
                className="group rounded-2xl border border-border bg-bg-subtle p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-bg-muted"
              >
                <div
                  className="mb-4 aspect-[16/10] rounded-xl border border-border"
                  style={{
                    backgroundImage:
                      'radial-gradient(hsl(var(--fg) / 0.06) 1px, transparent 1px)',
                    backgroundSize: '14px 14px',
                    backgroundColor: 'hsl(var(--bg))',
                  }}
                />
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{t.title}</h3>
                  <span className="rounded-md bg-bg px-1.5 py-0.5 text-[10px] uppercase text-fg-muted">
                    {t.category}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
                  {t.description}
                </p>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-fg-muted">
                No templates match that search.
              </div>
            )}
          </div>
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
