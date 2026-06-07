'use client';

import { Keyboard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const GROUPS: Array<{ title: string; rows: Array<[string, string]> }> = [
  {
    title: 'Tools',
    rows: [
      ['Select', 'V'],
      ['Pan', 'H or Space + drag'],
      ['Pen', 'P'],
      ['Eraser', 'E'],
      ['Rectangle', 'R'],
      ['Ellipse', 'O'],
      ['Diamond', 'D'],
      ['Line', 'L'],
      ['Arrow', 'A'],
      ['Text', 'T'],
      ['Sticky', 'S'],
    ],
  },
  {
    title: 'Editing',
    rows: [
      ['Undo', '⌘Z / Ctrl+Z'],
      ['Redo', '⌘⇧Z / Ctrl+Y'],
      ['Delete selection', 'Del / Backspace'],
      ['Duplicate', '⌘D'],
      ['Copy / paste', '⌘C / ⌘V'],
      ['Send to back / forward', '⌘[ / ⌘]'],
    ],
  },
  {
    title: 'View',
    rows: [
      ['Zoom', 'Ctrl/⌘ + scroll'],
      ['Pan', 'Two-finger scroll'],
      ['Command palette', '⌘K'],
      ['Reset view', 'Click % indicator'],
    ],
  },
];

export function ShortcutsHint() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          title="Keyboard shortcuts"
          className="pointer-events-auto glass flex h-9 w-9 items-center justify-center rounded-xl shadow-xl"
        >
          <Keyboard className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>Keyboard shortcuts</DialogTitle>
        <DialogDescription>
          Every tool, command and view action you can fire from the keyboard.
        </DialogDescription>
        <div className="mt-4 space-y-5">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <p className="text-[11px] uppercase tracking-wide text-fg-subtle">
                {g.title}
              </p>
              <div className="mt-2 grid grid-cols-1 gap-0.5">
                {g.rows.map(([label, keys]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-bg-muted"
                  >
                    <span className="text-fg-muted">{label}</span>
                    <kbd className="rounded-md border border-border bg-bg-subtle px-2 py-0.5 font-mono text-[11px]">
                      {keys}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
