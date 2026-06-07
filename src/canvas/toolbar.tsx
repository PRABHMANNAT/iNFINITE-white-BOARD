'use client';

import {
  MousePointer2,
  Hand,
  Pencil,
  Highlighter,
  PenLine,
  Eraser,
  Square,
  Circle,
  Diamond,
  Triangle,
  ArrowRight,
  Minus,
  Type,
  StickyNote,
  Undo2,
  Redo2,
  Trash2,
} from 'lucide-react';
import { useCanvas } from './store';
import type { Tool } from './types';
import { cn } from '@/lib/cn';
import { Tooltip } from '@/components/ui/tooltip';

type ToolDef = {
  id: Tool;
  label: string;
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  group?: 'a' | 'b' | 'c';
};

const TOOLS: ToolDef[] = [
  { id: 'select', label: 'Select', shortcut: 'V', icon: MousePointer2, group: 'a' },
  { id: 'pan', label: 'Pan', shortcut: 'H', icon: Hand, group: 'a' },

  { id: 'pen', label: 'Pen', shortcut: 'P', icon: Pencil, group: 'b' },
  { id: 'highlighter', label: 'Highlighter', icon: Highlighter, group: 'b' },
  { id: 'marker', label: 'Marker', icon: PenLine, group: 'b' },
  { id: 'eraser', label: 'Eraser', shortcut: 'E', icon: Eraser, group: 'b' },

  { id: 'rectangle', label: 'Rectangle', shortcut: 'R', icon: Square, group: 'c' },
  { id: 'ellipse', label: 'Ellipse', shortcut: 'O', icon: Circle, group: 'c' },
  { id: 'diamond', label: 'Diamond', shortcut: 'D', icon: Diamond, group: 'c' },
  { id: 'triangle', label: 'Triangle', icon: Triangle, group: 'c' },
  { id: 'line', label: 'Line', shortcut: 'L', icon: Minus, group: 'c' },
  { id: 'arrow', label: 'Arrow', shortcut: 'A', icon: ArrowRight, group: 'c' },
  { id: 'text', label: 'Text', shortcut: 'T', icon: Type, group: 'c' },
  { id: 'sticky', label: 'Sticky', shortcut: 'S', icon: StickyNote, group: 'c' },
];

export function CanvasToolbar() {
  const tool = useCanvas((s) => s.tool);
  const setTool = useCanvas((s) => s.setTool);
  const undo = useCanvas((s) => s.undo);
  const redo = useCanvas((s) => s.redo);
  const clearAll = useCanvas((s) => s.clearAll);
  const pastLen = useCanvas((s) => s.past.length);
  const futureLen = useCanvas((s) => s.future.length);

  return (
    <div className="pointer-events-auto glass flex items-center gap-1 rounded-2xl px-1.5 py-1.5 shadow-xl">
      {TOOLS.map((t, i) => {
        const prev = TOOLS[i - 1];
        const showDivider = prev && prev.group !== t.group;
        const active = tool === t.id;
        const Icon = t.icon;
        return (
          <div key={t.id} className="flex items-center">
            {showDivider && <div className="mx-1 h-6 w-px bg-border" />}
            <Tooltip content={t.label} shortcut={t.shortcut}>
              <button
                onClick={() => setTool(t.id)}
                aria-label={t.label}
                aria-pressed={active}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl text-fg-muted transition-colors',
                  active
                    ? 'bg-accent text-accent-fg'
                    : 'hover:bg-bg-muted hover:text-fg'
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
        );
      })}
      <div className="mx-1 h-6 w-px bg-border" />
      <Tooltip content="Undo" shortcut="⌘Z">
        <button
          onClick={undo}
          disabled={pastLen === 0}
          aria-label="Undo"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-fg-muted hover:bg-bg-muted hover:text-fg disabled:opacity-30"
        >
          <Undo2 className="h-4 w-4" />
        </button>
      </Tooltip>
      <Tooltip content="Redo" shortcut="⌘⇧Z">
        <button
          onClick={redo}
          disabled={futureLen === 0}
          aria-label="Redo"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-fg-muted hover:bg-bg-muted hover:text-fg disabled:opacity-30"
        >
          <Redo2 className="h-4 w-4" />
        </button>
      </Tooltip>
      <Tooltip content="Clear all">
        <button
          onClick={clearAll}
          aria-label="Clear all"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-fg-muted hover:bg-red-500/10 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </Tooltip>
    </div>
  );
}
