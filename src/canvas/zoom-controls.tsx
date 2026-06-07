'use client';

import { Plus, Minus, Maximize2, Grid3X3, Brush } from 'lucide-react';
import { useCanvas } from './store';
import type { GridMode } from './types';
import { cn } from '@/lib/cn';

const GRID_MODES: GridMode[] = ['dots', 'squares', 'iso', 'none'];

export function ZoomControls() {
  const viewport = useCanvas((s) => s.viewport);
  const setViewport = useCanvas((s) => s.setViewport);
  const resetViewport = useCanvas((s) => s.resetViewport);
  const grid = useCanvas((s) => s.grid);
  const setGrid = useCanvas((s) => s.setGrid);
  const shapeStyle = useCanvas((s) => s.shapeStyle);
  const setShapeStyle = useCanvas((s) => s.setShapeStyle);

  const step = (delta: number) => {
    const next = Math.min(8, Math.max(0.1, viewport.zoom + delta));
    setViewport({ zoom: next });
  };

  const cycleGrid = () => {
    const i = GRID_MODES.indexOf(grid);
    setGrid(GRID_MODES[(i + 1) % GRID_MODES.length]);
  };

  return (
    <div className="pointer-events-auto glass flex items-center gap-1 rounded-2xl px-1.5 py-1.5 shadow-xl">
      <button
        onClick={() => step(-0.2)}
        title="Zoom out"
        className="flex h-8 w-8 items-center justify-center rounded-xl text-fg-muted hover:bg-bg-muted hover:text-fg"
      >
        <Minus className="h-4 w-4" />
      </button>
      <button
        onClick={resetViewport}
        title="Reset view"
        className="min-w-[3.5rem] px-2 text-xs font-medium tabular-nums text-fg"
      >
        {Math.round(viewport.zoom * 100)}%
      </button>
      <button
        onClick={() => step(0.2)}
        title="Zoom in"
        className="flex h-8 w-8 items-center justify-center rounded-xl text-fg-muted hover:bg-bg-muted hover:text-fg"
      >
        <Plus className="h-4 w-4" />
      </button>
      <div className="mx-1 h-6 w-px bg-border" />
      <button
        onClick={resetViewport}
        title="Fit to screen"
        className="flex h-8 w-8 items-center justify-center rounded-xl text-fg-muted hover:bg-bg-muted hover:text-fg"
      >
        <Maximize2 className="h-4 w-4" />
      </button>
      <button
        onClick={cycleGrid}
        title={`Grid: ${grid}`}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-xl transition-colors',
          grid !== 'none'
            ? 'bg-bg-muted text-fg'
            : 'text-fg-muted hover:bg-bg-muted hover:text-fg'
        )}
      >
        <Grid3X3 className="h-4 w-4" />
      </button>
      <button
        onClick={() => setShapeStyle(shapeStyle === 'clean' ? 'sketchy' : 'clean')}
        title={`Shape style: ${shapeStyle}`}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-xl transition-colors',
          shapeStyle === 'sketchy'
            ? 'bg-bg-muted text-fg'
            : 'text-fg-muted hover:bg-bg-muted hover:text-fg'
        )}
      >
        <Brush className="h-4 w-4" />
      </button>
    </div>
  );
}
