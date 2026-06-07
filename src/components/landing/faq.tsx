'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

const ITEMS = [
  {
    q: 'Is IngenBoard free?',
    a: 'Yes. The Free plan covers 3 boards, the AI Copilot with 30 prompts/month, and every export format. Upgrade only if you outgrow it.',
  },
  {
    q: 'Do I need to install anything?',
    a: "Nope. IngenBoard is a web app that runs in any modern browser. PWA install + a desktop app land in the next milestone.",
  },
  {
    q: 'How is this different from Excalidraw or Miro?',
    a: "IngenBoard is AI-native from the canvas up: a Copilot that draws mind maps, system designs and research boards directly onto the canvas, plus a built-in knowledge graph that connects every board you've made.",
  },
  {
    q: 'Can I use my own AI key?',
    a: 'On the Team and Enterprise plans you can bring your own OpenAI, Anthropic, or Gemini key. Free + Pro use IngenBoard pooled keys.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Boards live in our managed Postgres + S3 (US/EU regions). Self-host is coming for Enterprise. Boards you open today are also auto-saved in your browser via localStorage — close the tab, come back, everything is still there.',
  },
  {
    q: 'Does multiplayer feel laggy?',
    a: "Edits are local-first via Yjs CRDTs, so your strokes never wait for the network. Remote users see updates within ~80ms on the average broadband connection.",
  },
];

export function LandingFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-accent">FAQ</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          Questions, answered.
        </h2>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-bg-subtle">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-base font-medium">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 flex-none text-fg-muted transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid overflow-hidden transition-[grid-template-rows] duration-200',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-fg-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
