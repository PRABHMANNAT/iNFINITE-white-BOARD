'use client';

import { useEffect, useRef } from 'react';
import { useCanvas } from './store';
import { findTopHit, rectIntersectsElement } from './hit-test';

type Mode =
  | { kind: 'idle' }
  | { kind: 'drag'; lastX: number; lastY: number }
  | { kind: 'marquee'; startX: number; startY: number };

export function useSelection(
  ref: React.RefObject<HTMLElement | null>,
  marqueeRef: React.RefObject<SVGRectElement | null>
) {
  const modeRef = useRef<Mode>({ kind: 'idle' });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const screenToWorld = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const v = useCanvas.getState().viewport;
      return {
        x: (clientX - rect.left - v.x) / v.zoom,
        y: (clientY - rect.top - v.y) / v.zoom,
      };
    };

    const onPointerDown = (e: PointerEvent) => {
      const { tool, elements, selectedIds, select, toggleSelect, commit } =
        useCanvas.getState();
      if (tool !== 'select' || e.button !== 0) return;

      const p = screenToWorld(e.clientX, e.clientY);
      const hit = findTopHit(elements, p.x, p.y);
      const additive = e.shiftKey || e.metaKey;

      if (hit) {
        if (!selectedIds.has(hit.id) && !additive) {
          select(hit.id);
        } else if (additive) {
          toggleSelect(hit.id, true);
        }
        commit();
        modeRef.current = { kind: 'drag', lastX: p.x, lastY: p.y };
        el.setPointerCapture(e.pointerId);
        return;
      }

      // empty space — clear unless additive, then marquee
      if (!additive) select(null);
      modeRef.current = { kind: 'marquee', startX: p.x, startY: p.y };
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const m = modeRef.current;
      if (m.kind === 'idle') return;
      const p = screenToWorld(e.clientX, e.clientY);

      if (m.kind === 'drag') {
        const dx = p.x - m.lastX;
        const dy = p.y - m.lastY;
        if (dx === 0 && dy === 0) return;
        useCanvas.getState().nudgeSelection(dx, dy);
        modeRef.current = { kind: 'drag', lastX: p.x, lastY: p.y };
        return;
      }

      if (m.kind === 'marquee' && marqueeRef.current) {
        const x = Math.min(m.startX, p.x);
        const y = Math.min(m.startY, p.y);
        const w = Math.abs(p.x - m.startX);
        const h = Math.abs(p.y - m.startY);
        marqueeRef.current.setAttribute('x', String(x));
        marqueeRef.current.setAttribute('y', String(y));
        marqueeRef.current.setAttribute('width', String(w));
        marqueeRef.current.setAttribute('height', String(h));
        marqueeRef.current.setAttribute('visibility', 'visible');
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const m = modeRef.current;
      if (m.kind === 'marquee' && marqueeRef.current) {
        const p = screenToWorld(e.clientX, e.clientY);
        const x = Math.min(m.startX, p.x);
        const y = Math.min(m.startY, p.y);
        const w = Math.abs(p.x - m.startX);
        const h = Math.abs(p.y - m.startY);
        if (w > 2 || h > 2) {
          const hits = useCanvas
            .getState()
            .elements.filter((el) => rectIntersectsElement(el, x, y, w, h))
            .map((el) => el.id);
          useCanvas.getState().select(hits);
        }
        marqueeRef.current.setAttribute('visibility', 'hidden');
      }
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
      modeRef.current = { kind: 'idle' };
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
    };
  }, [ref, marqueeRef]);
}
