'use client';

import { useCanvas } from './store';

const BASE = 40;

export function GridLayer() {
  const grid = useCanvas((s) => s.grid);
  const viewport = useCanvas((s) => s.viewport);
  if (grid === 'none') return null;

  const size = BASE * viewport.zoom;
  const offsetX = viewport.x % size;
  const offsetY = viewport.y % size;

  if (grid === 'dots') {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(hsl(var(--fg) / 0.16) 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          backgroundPosition: `${offsetX}px ${offsetY}px`,
        }}
      />
    );
  }

  if (grid === 'squares') {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            `linear-gradient(to right, hsl(var(--fg) / 0.08) 1px, transparent 1px),` +
            `linear-gradient(to bottom, hsl(var(--fg) / 0.08) 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          backgroundPosition: `${offsetX}px ${offsetY}px`,
        }}
      />
    );
  }

  // iso
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          `linear-gradient(60deg, hsl(var(--fg) / 0.08) 1px, transparent 1px),` +
          `linear-gradient(-60deg, hsl(var(--fg) / 0.08) 1px, transparent 1px),` +
          `linear-gradient(to bottom, hsl(var(--fg) / 0.08) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
      }}
    />
  );
}
