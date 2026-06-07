'use client';

import { useEffect, useRef } from 'react';
import { useCanvas } from './store';
import { findTopHit } from './hit-test';

export function useEraser(ref: React.RefObject<HTMLElement | null>) {
  const erasingRef = useRef(false);

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

    const eraseAt = (clientX: number, clientY: number) => {
      const p = screenToWorld(clientX, clientY);
      const els = useCanvas.getState().elements;
      const hit = findTopHit(els, p.x, p.y);
      if (hit) useCanvas.getState().removeElement(hit.id);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (useCanvas.getState().tool !== 'eraser' || e.button !== 0) return;
      erasingRef.current = true;
      useCanvas.getState().commit();
      eraseAt(e.clientX, e.clientY);
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!erasingRef.current) return;
      eraseAt(e.clientX, e.clientY);
    };

    const onPointerUp = (e: PointerEvent) => {
      erasingRef.current = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
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
  }, [ref]);
}
