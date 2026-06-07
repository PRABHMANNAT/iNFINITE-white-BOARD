'use client';

import { Sparkles, Pencil, Square } from 'lucide-react';
import { useCanvas } from './store';

export function CanvasEmptyState() {
  const hasElements = useCanvas((s) => s.elements.length > 0);
  if (hasElements) return null;

  return (
    <div
      data-export-ignore="true"
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle">
          Empty canvas
        </p>
        <h2 className="mt-3 max-w-md text-2xl font-medium text-fg-muted">
          Pick a tool, or ask the Copilot to draft something for you.
        </h2>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-fg-subtle">
          <span className="inline-flex items-center gap-1.5">
            <Pencil className="h-3.5 w-3.5" /> P — pen
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <Square className="h-3.5 w-3.5" /> R — rectangle
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> ⌘K — palette
          </span>
        </div>
      </div>
    </div>
  );
}
