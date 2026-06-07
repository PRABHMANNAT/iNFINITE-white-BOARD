'use client';

import { useEffect, useState } from 'react';
import { useCanvas } from './store';

export type LaserStroke = {
  id: number;
  points: number[];
  bornAt: number;
};

const LIFETIME_MS = 1200;

export function useLaser(ref: React.RefObject<HTMLElement | null>) {
  const [strokes, setStrokes] = useState<LaserStroke[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let nextId = 1;
    let activeId: number | null = null;

    const screenToWorld = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const v = useCanvas.getState().viewport;
      return {
        x: (clientX - rect.left - v.x) / v.zoom,
        y: (clientY - rect.top - v.y) / v.zoom,
      };
    };

    const onPointerDown = (e: PointerEvent) => {
      if (useCanvas.getState().tool !== 'laser' || e.button !== 0) return;
      const p = screenToWorld(e.clientX, e.clientY);
      activeId = nextId++;
      const id = activeId;
      setStrokes((arr) => [
        ...arr,
        { id, points: [p.x, p.y], bornAt: performance.now() },
      ]);
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (activeId == null) return;
      const id = activeId;
      const p = screenToWorld(e.clientX, e.clientY);
      setStrokes((arr) =>
        arr.map((s) =>
          s.id === id ? { ...s, points: [...s.points, p.x, p.y] } : s
        )
      );
    };

    const onPointerUp = () => {
      activeId = null;
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);

    // GC old strokes once per animation frame
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      setStrokes((arr) => {
        const next = arr.filter((s) => now - s.bornAt < LIFETIME_MS);
        return next.length === arr.length ? arr : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return { strokes, LIFETIME_MS };
}

export function strokeOpacity(stroke: LaserStroke) {
  const age = performance.now() - stroke.bornAt;
  return Math.max(0, 1 - age / LIFETIME_MS);
}
