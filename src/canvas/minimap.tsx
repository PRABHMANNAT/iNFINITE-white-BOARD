'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCanvas } from './store';

const W = 200;
const H = 130;

function elementBounds(el: { x?: number; y?: number; width?: number; height?: number; points?: number[]; type: string }) {
  if (el.type === 'stroke' && el.points) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0; i < el.points.length; i += 2) {
      const x = el.points[i];
      const y = el.points[i + 1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    if (!Number.isFinite(minX)) return null;
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }
  if (typeof el.x === 'number' && typeof el.y === 'number') {
    const w = el.width ?? 0;
    const h = el.height ?? 0;
    return {
      x: Math.min(el.x, el.x + w),
      y: Math.min(el.y, el.y + h),
      w: Math.abs(w),
      h: Math.abs(h),
    };
  }
  return null;
}

export function Minimap() {
  const elements = useCanvas((s) => s.elements);
  const viewport = useCanvas((s) => s.viewport);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const bounds = useMemo(() => {
    let minX = -200, minY = -200, maxX = 200, maxY = 200;
    for (const el of elements) {
      const b = elementBounds(el);
      if (!b) continue;
      if (b.x < minX) minX = b.x;
      if (b.y < minY) minY = b.y;
      if (b.x + b.w > maxX) maxX = b.x + b.w;
      if (b.y + b.h > maxY) maxY = b.y + b.h;
    }
    return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
  }, [elements]);

  const sx = W / Math.max(1, bounds.width);
  const sy = H / Math.max(1, bounds.height);
  const s = Math.min(sx, sy);

  const vw = size ? size.w / viewport.zoom : 0;
  const vh = size ? size.h / viewport.zoom : 0;
  const vx = -viewport.x / viewport.zoom;
  const vy = -viewport.y / viewport.zoom;

  return (
    <div className="pointer-events-none glass rounded-xl p-1.5 shadow-xl">
      <svg width={W} height={H} className="block rounded-lg">
        <rect width={W} height={H} fill="hsl(var(--bg-subtle))" />
        <g transform={`translate(${-bounds.minX * s} ${-bounds.minY * s}) scale(${s})`}>
          {elements.map((el) => {
            const b = elementBounds(el);
            if (!b) return null;
            return (
              <rect
                key={el.id}
                x={b.x}
                y={b.y}
                width={Math.max(1, b.w)}
                height={Math.max(1, b.h)}
                fill="hsl(var(--fg) / 0.4)"
              />
            );
          })}
          {size && (
            <rect
              x={vx}
              y={vy}
              width={vw}
              height={vh}
              fill="hsl(var(--accent) / 0.12)"
              stroke="hsl(var(--accent))"
              strokeWidth={1 / s}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
