'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-28 md:pt-32 md:pb-40">
      {/* radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[640px] max-w-5xl"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(230 90% 60% / 0.35), transparent 60%)',
        }}
      />
      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-bg-muted/60 px-3 py-1 text-xs text-fg-muted backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          AI-native canvas — now in preview
        </div>
        <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          The infinite whiteboard,{' '}
          <span
            className="bg-gradient-to-r from-accent to-fuchsia-400 bg-clip-text text-transparent"
            style={{ WebkitBackgroundClip: 'text' }}
          >
            reimagined with AI.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-fg-muted md:text-xl">
          Think, plan, learn, and ship faster on a canvas that drafts diagrams,
          mind maps, and research boards alongside you.
        </p>
        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/canvas">
            <Button size="lg">
              Open the canvas
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="glass">
              See the features
            </Button>
          </Link>
        </motion.div>
        <p className="mt-5 text-xs text-fg-subtle">
          No card required · Works in your browser · Free for personal use
        </p>
      </motion.div>

      {/* preview frame */}
      <motion.div
        className="relative mx-auto mt-16 max-w-5xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="glass overflow-hidden rounded-2xl p-1.5 shadow-2xl">
          <div
            className="relative aspect-[16/9] w-full overflow-hidden rounded-xl"
            style={{
              backgroundImage:
                'radial-gradient(hsl(var(--fg) / 0.06) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              backgroundColor: 'hsl(var(--bg-subtle))',
            }}
          >
            <div className="absolute left-8 top-8 h-24 w-44 rounded-xl border border-accent/40 bg-accent/10 p-3">
              <p className="text-xs text-fg-muted">Problem</p>
              <p className="mt-1 text-sm">Visual thinking is fragmented.</p>
            </div>
            <div className="absolute left-64 top-20 h-24 w-48 rounded-xl border border-border bg-bg/70 p-3">
              <p className="text-xs text-fg-muted">Solution</p>
              <p className="mt-1 text-sm">One AI-native canvas.</p>
            </div>
            <div className="absolute right-10 top-36 h-24 w-44 rounded-xl border border-fuchsia-400/40 bg-fuchsia-400/10 p-3">
              <p className="text-xs text-fg-muted">Outcome</p>
              <p className="mt-1 text-sm">Ship 3× faster.</p>
            </div>
            <svg className="absolute inset-0 h-full w-full" aria-hidden>
              <path
                d="M210 80 Q 240 80 270 110"
                stroke="hsl(var(--fg) / 0.35)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="3 4"
              />
              <path
                d="M460 130 Q 500 130 540 160"
                stroke="hsl(var(--fg) / 0.35)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="3 4"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
