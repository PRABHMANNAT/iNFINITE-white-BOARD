'use client';

import { useState } from 'react';
import { Command } from 'cmdk';
import * as RDialog from '@radix-ui/react-dialog';
import { useTheme } from 'next-themes';
import { useHotkeys } from 'react-hotkeys-hook';
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
  Sun,
  Moon,
  Monitor,
  Download,
  Upload,
  Trash2,
  Grid3X3,
  Brush,
  Sparkles,
  Search,
} from 'lucide-react';
import { useCanvas } from './store';
import type { Tool, GridMode } from './types';
import { exportJSON, exportPNG, exportSVG } from './export';

type Cmd = {
  id: string;
  label: string;
  group: string;
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

const TOOLS: Array<[Tool, string, React.ComponentType<{ className?: string }>, string?]> = [
  ['select', 'Select', MousePointer2, 'V'],
  ['pan', 'Pan', Hand, 'H'],
  ['pen', 'Pen', Pencil, 'P'],
  ['highlighter', 'Highlighter', Highlighter],
  ['marker', 'Marker', PenLine],
  ['eraser', 'Eraser', Eraser, 'E'],
  ['rectangle', 'Rectangle', Square, 'R'],
  ['ellipse', 'Ellipse', Circle, 'O'],
  ['diamond', 'Diamond', Diamond, 'D'],
  ['triangle', 'Triangle', Triangle],
  ['line', 'Line', Minus, 'L'],
  ['arrow', 'Arrow', ArrowRight, 'A'],
  ['text', 'Text', Type, 'T'],
  ['sticky', 'Sticky note', StickyNote, 'S'],
];

const GRIDS: Array<[GridMode, string]> = [
  ['dots', 'Dot grid'],
  ['squares', 'Square grid'],
  ['iso', 'Isometric grid'],
  ['none', 'No grid'],
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  useHotkeys('mod+k', (e) => {
    e.preventDefault();
    setOpen((v) => !v);
  });

  const commands: Cmd[] = [
    ...TOOLS.map(([id, label, icon, shortcut]) => ({
      id: `tool:${id}`,
      label: `Tool: ${label}`,
      group: 'Tools',
      shortcut,
      icon,
      run: () => useCanvas.getState().setTool(id),
    })),
    ...GRIDS.map(([id, label]) => ({
      id: `grid:${id}`,
      label,
      group: 'View',
      icon: Grid3X3,
      run: () => useCanvas.getState().setGrid(id),
    })),
    {
      id: 'shape:clean',
      label: 'Shape style: Clean',
      group: 'View',
      icon: Brush,
      run: () => useCanvas.getState().setShapeStyle('clean'),
    },
    {
      id: 'shape:sketchy',
      label: 'Shape style: Sketchy',
      group: 'View',
      icon: Brush,
      run: () => useCanvas.getState().setShapeStyle('sketchy'),
    },
    {
      id: 'theme:light',
      label: 'Theme: Light',
      group: 'Theme',
      icon: Sun,
      run: () => setTheme('light'),
    },
    {
      id: 'theme:system',
      label: 'Theme: System',
      group: 'Theme',
      icon: Monitor,
      run: () => setTheme('system'),
    },
    {
      id: 'theme:dark',
      label: 'Theme: Dark',
      group: 'Theme',
      icon: Moon,
      run: () => setTheme('dark'),
    },
    {
      id: 'export:png',
      label: 'Export as PNG',
      group: 'File',
      icon: Download,
      run: () => exportPNG(),
    },
    {
      id: 'export:svg',
      label: 'Export as SVG',
      group: 'File',
      icon: Download,
      run: () => exportSVG(),
    },
    {
      id: 'export:json',
      label: 'Export as JSON',
      group: 'File',
      icon: Download,
      run: () => exportJSON(),
    },
    {
      id: 'import:json',
      label: 'Import board JSON…',
      group: 'File',
      icon: Upload,
      run: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = async () => {
          const f = input.files?.[0];
          if (f) {
            const { importJSON } = await import('./export');
            importJSON(f);
          }
        };
        input.click();
      },
    },
    {
      id: 'edit:clear',
      label: 'Clear board',
      group: 'Edit',
      icon: Trash2,
      run: () => useCanvas.getState().clearAll(),
    },
    {
      id: 'edit:select-all',
      label: 'Select all',
      group: 'Edit',
      shortcut: '⌘A',
      icon: Sparkles,
      run: () => {
        const s = useCanvas.getState();
        s.select(s.elements.map((el) => el.id));
      },
    },
  ];

  const groups = Array.from(new Set(commands.map((c) => c.group)));

  return (
    <RDialog.Root open={open} onOpenChange={setOpen}>
      <RDialog.Portal>
        <RDialog.Overlay className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <RDialog.Content className="fixed left-1/2 top-[20%] z-[91] w-full max-w-xl -translate-x-1/2 rounded-2xl border border-border bg-bg/95 shadow-2xl backdrop-blur outline-none data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0">
          <RDialog.Title className="sr-only">Command palette</RDialog.Title>
          <Command label="Command Menu" className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <Search className="h-4 w-4 text-fg-subtle" />
              <Command.Input
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-fg-subtle"
              />
              <kbd className="rounded border border-border bg-bg-muted px-1.5 py-0.5 font-mono text-[10px] text-fg-muted">
                ESC
              </kbd>
            </div>
            <Command.List className="max-h-[60vh] overflow-auto p-1.5">
              <Command.Empty className="px-3 py-6 text-center text-sm text-fg-muted">
                No matches.
              </Command.Empty>
              {groups.map((group) => (
                <Command.Group
                  key={group}
                  heading={group}
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-fg-subtle"
                >
                  {commands
                    .filter((c) => c.group === group)
                    .map((c) => {
                      const Icon = c.icon;
                      return (
                        <Command.Item
                          key={c.id}
                          value={c.label}
                          onSelect={() => {
                            c.run();
                            setOpen(false);
                          }}
                          className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-fg data-[selected=true]:bg-bg-muted"
                        >
                          <Icon className="h-4 w-4 text-fg-muted" />
                          <span className="flex-1">{c.label}</span>
                          {c.shortcut && (
                            <kbd className="rounded border border-border bg-bg-muted px-1.5 py-0.5 font-mono text-[10px] text-fg-muted">
                              {c.shortcut}
                            </kbd>
                          )}
                        </Command.Item>
                      );
                    })}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}
