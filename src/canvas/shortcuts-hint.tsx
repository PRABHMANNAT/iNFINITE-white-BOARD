'use client';

import { useState } from 'react';
import { Keyboard, X } from 'lucide-react';

const SHORTCUTS: Array<[string, string]> = [
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
  ['Undo', '⌘Z / Ctrl+Z'],
  ['Redo', '⌘⇧Z / Ctrl+Y'],
  ['Zoom', 'Ctrl/⌘ + scroll'],
  ['Reset view', 'Click % indicator'],
];

export function ShortcutsHint() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Keyboard shortcuts"
        className="pointer-events-auto glass flex h-9 w-9 items-center justify-center rounded-xl shadow-xl"
      >
        <Keyboard className="h-4 w-4" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="glass relative w-full max-w-md rounded-2xl p-5 shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-md p-1 text-fg-muted hover:bg-bg-muted"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-base font-semibold">Keyboard shortcuts</h2>
            <div className="mt-4 grid grid-cols-1 gap-1.5">
              {SHORTCUTS.map(([label, keys]) => (
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
        </div>
      )}
    </>
  );
}
