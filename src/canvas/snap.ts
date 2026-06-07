import type { GridMode } from './types';

const BASE = 40;

/** Snap a world coord to the active grid if grid !== 'none'. */
export function snap(value: number, grid: GridMode): number {
  if (grid === 'none') return value;
  return Math.round(value / BASE) * BASE;
}

export function snapPoint(
  x: number,
  y: number,
  grid: GridMode
): { x: number; y: number } {
  return { x: snap(x, grid), y: snap(y, grid) };
}
