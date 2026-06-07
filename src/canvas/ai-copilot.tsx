'use client';

import { useState } from 'react';
import { Sparkles, Send, Wand2, ChevronRight, X } from 'lucide-react';
import { nanoid } from '@/lib/id';
import { useCanvas } from './store';
import { cn } from '@/lib/cn';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const QUICK_ACTIONS = [
  { label: 'Mind map this idea', prompt: 'Generate a mind map for: ' },
  { label: 'Design a system', prompt: 'Design a system architecture for: ' },
  { label: 'Research a topic', prompt: 'Build a research board on: ' },
  { label: 'Plan a startup', prompt: 'Generate a startup plan for: ' },
];

export function AICopilot() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi — I'm your Copilot. Describe what you want to build and I'll lay it out on the canvas.",
    },
  ]);
  const [busy, setBusy] = useState(false);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: nanoid(), role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setBusy(true);

    // Placeholder: generate a 5-node mind map onto the canvas for any prompt
    const center = { x: 0, y: 0 };
    const root = `Topic: ${text}`;
    const branches = ['Why', 'How', 'Who', 'When', 'Risks'];
    useCanvas.getState().commit();
    useCanvas.getState().addElement({
      type: 'sticky',
      id: nanoid(),
      x: center.x - 90,
      y: center.y - 40,
      width: 180,
      height: 80,
      text: root,
      stroke: '#a855f7',
      fill: '#f5d0fe',
      strokeWidth: 1,
      opacity: 1,
      rotation: 0,
    });
    branches.forEach((label, i) => {
      const angle = (i / branches.length) * Math.PI * 2;
      const r = 240;
      const x = center.x + Math.cos(angle) * r - 70;
      const y = center.y + Math.sin(angle) * r - 30;
      useCanvas.getState().addElement({
        type: 'sticky',
        id: nanoid(),
        x,
        y,
        width: 140,
        height: 60,
        text: label,
        stroke: '#06b6d4',
        fill: '#cffafe',
        strokeWidth: 1,
        opacity: 1,
        rotation: 0,
      });
      useCanvas.getState().addElement({
        type: 'arrow',
        id: nanoid(),
        x: center.x,
        y: center.y,
        width: Math.cos(angle) * r - 70,
        height: Math.sin(angle) * r - 30,
        stroke: 'hsl(220 9% 50%)',
        fill: 'transparent',
        strokeWidth: 1.5,
        opacity: 1,
        rotation: 0,
      });
    });

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: nanoid(),
          role: 'assistant',
          content:
            'Dropped a starter mind map onto the canvas. (Wire OPENAI_API_KEY / ANTHROPIC_API_KEY in .env to get real generations.)',
        },
      ]);
      setBusy(false);
    }, 350);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="pointer-events-auto glass flex h-10 items-center gap-2 rounded-full px-3 shadow-xl"
      >
        <Sparkles className="h-4 w-4 text-accent" />
        <span className="text-sm">Copilot</span>
      </button>
    );
  }

  return (
    <div className="pointer-events-auto glass flex h-[520px] w-[340px] flex-col rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium">AI Copilot</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="rounded-md p-1 text-fg-muted hover:bg-bg-muted hover:text-fg"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 space-y-2 overflow-auto p-3 text-sm">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'rounded-xl px-3 py-2',
              m.role === 'assistant'
                ? 'bg-bg-muted text-fg'
                : 'ml-6 bg-accent/15 text-fg'
            )}
          >
            {m.content}
          </div>
        ))}
        {busy && (
          <div className="rounded-xl bg-bg-muted px-3 py-2 text-fg-muted">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Thinking…
            </span>
          </div>
        )}
      </div>
      <div className="border-t border-border p-2">
        <div className="mb-2 flex flex-wrap gap-1">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.label}
              onClick={() => setInput(a.prompt)}
              className="rounded-md border border-border bg-bg/40 px-2 py-1 text-[11px] text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg"
            >
              <ChevronRight className="mr-0.5 inline h-3 w-3" />
              {a.label}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-1.5"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the canvas anything…"
            className="flex-1 rounded-xl border border-border bg-bg/60 px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-fg disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
