'use client';

import { useMemo } from 'react';
import rough from 'roughjs/bin/rough';
import type { CanvasElement } from './types';

/**
 * Render shape elements (rect/ellipse/diamond/triangle/line/arrow) in a
 * hand-drawn aesthetic using roughjs. roughjs's renderToString output
 * gives us a stable SVG snippet we can inject into the canvas SVG.
 */
function generateRoughPaths(el: CanvasElement): React.ReactNode {
  const gen = rough.generator();
  const w = el.type === 'stroke' || el.type === 'text' ? 0 : el.width;
  const h = el.type === 'stroke' || el.type === 'text' ? 0 : el.height;
  const opts = {
    stroke: el.stroke,
    strokeWidth: 'strokeWidth' in el ? el.strokeWidth : 1,
    fill: 'fill' in el && el.fill !== 'transparent' ? el.fill : undefined,
    fillStyle: 'hachure' as const,
    fillWeight: 1,
    hachureGap: 8,
    roughness: 1.2,
    bowing: 1,
    seed: hashSeed(el.id),
  };

  let drawable;
  if (el.type === 'rectangle') {
    drawable = gen.rectangle(el.x, el.y, w, h, opts);
  } else if (el.type === 'ellipse') {
    drawable = gen.ellipse(el.x + w / 2, el.y + h / 2, Math.abs(w), Math.abs(h), opts);
  } else if (el.type === 'diamond') {
    const cx = el.x + w / 2;
    const cy = el.y + h / 2;
    drawable = gen.polygon(
      [
        [cx, el.y],
        [el.x + w, cy],
        [cx, el.y + h],
        [el.x, cy],
      ],
      opts
    );
  } else if (el.type === 'triangle') {
    drawable = gen.polygon(
      [
        [el.x + w / 2, el.y],
        [el.x + w, el.y + h],
        [el.x, el.y + h],
      ],
      opts
    );
  } else if (el.type === 'line') {
    drawable = gen.line(el.x, el.y, el.x + w, el.y + h, opts);
  } else if (el.type === 'arrow') {
    const x2 = el.x + w;
    const y2 = el.y + h;
    const angle = Math.atan2(h, w);
    const head = 14;
    const hx1 = x2 - head * Math.cos(angle - Math.PI / 7);
    const hy1 = y2 - head * Math.sin(angle - Math.PI / 7);
    const hx2 = x2 - head * Math.cos(angle + Math.PI / 7);
    const hy2 = y2 - head * Math.sin(angle + Math.PI / 7);
    return (
      <>
        {pathsFor(gen.line(el.x, el.y, x2, y2, opts))}
        {pathsFor(gen.line(x2, y2, hx1, hy1, opts))}
        {pathsFor(gen.line(x2, y2, hx2, hy2, opts))}
      </>
    );
  } else {
    return null;
  }
  return pathsFor(drawable);
}

function pathsFor(drawable: ReturnType<ReturnType<typeof rough.generator>['rectangle']>) {
  const sets = drawable.sets;
  return (
    <>
      {sets.map((set, i) => {
        const d = setToPath(set);
        const isFill = set.type === 'fillSketch' || set.type === 'fillPath';
        return (
          <path
            key={i}
            d={d}
            fill={set.type === 'fillPath' ? (drawable.options.fill ?? 'none') : 'none'}
            stroke={set.type === 'fillPath' ? 'none' : drawable.options.stroke}
            strokeWidth={
              isFill && set.type === 'fillSketch'
                ? drawable.options.fillWeight
                : drawable.options.strokeWidth
            }
            strokeLinecap="round"
          />
        );
      })}
    </>
  );
}

function setToPath(set: { ops: Array<{ op: string; data: number[] }> }) {
  let d = '';
  for (const op of set.ops) {
    if (op.op === 'move') d += `M ${op.data[0]} ${op.data[1]} `;
    else if (op.op === 'lineTo') d += `L ${op.data[0]} ${op.data[1]} `;
    else if (op.op === 'bcurveTo')
      d += `C ${op.data[0]} ${op.data[1]} ${op.data[2]} ${op.data[3]} ${op.data[4]} ${op.data[5]} `;
  }
  return d.trim();
}

function hashSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h) % 2147483647;
}

export function SketchyShape({ el }: { el: CanvasElement }) {
  const node = useMemo(() => generateRoughPaths(el), [el]);
  return <g opacity={'opacity' in el ? el.opacity : 1}>{node}</g>;
}
