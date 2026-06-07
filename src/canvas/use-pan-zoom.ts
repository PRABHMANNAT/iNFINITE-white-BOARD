'use client';

import { useEffect, useRef } from 'react';
import { useCanvas } from './store';

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 8;
const ZOOM_SPEED = 0.0015;

export function usePanZoom(ref: React.RefObject<HTMLElement | null>) {
  const spaceDownRef = useRef(false);
  const draggingRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // pinch / ctrl-scroll = zoom; plain wheel = pan
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const rect = el.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const { viewport, setViewport } = useCanvas.getState();
        const factor = Math.exp(-e.deltaY * ZOOM_SPEED);
        const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, viewport.zoom * factor));
        // keep cursor anchored
        const wx = (px - viewport.x) / viewport.zoom;
        const wy = (py - viewport.y) / viewport.zoom;
        setViewport({
          zoom: nextZoom,
          x: px - wx * nextZoom,
          y: py - wy * nextZoom,
        });
      } else {
        e.preventDefault();
        const { viewport, setViewport } = useCanvas.getState();
        setViewport({
          x: viewport.x - e.deltaX,
          y: viewport.y - e.deltaY,
        });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') spaceDownRef.current = true;
      // shortcuts
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        useCanvas.getState().undo();
      } else if (meta && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        useCanvas.getState().redo();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') spaceDownRef.current = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      const t = useCanvas.getState().tool;
      if (t === 'pan' || spaceDownRef.current || e.button === 1) {
        el.setPointerCapture(e.pointerId);
        draggingRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      const d = draggingRef.current;
      if (!d) return;
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      draggingRef.current = { x: e.clientX, y: e.clientY };
      const { viewport, setViewport } = useCanvas.getState();
      setViewport({ x: viewport.x + dx, y: viewport.y + dy });
    };
    const onPointerUp = (e: PointerEvent) => {
      if (draggingRef.current) {
        el.releasePointerCapture(e.pointerId);
        draggingRef.current = null;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [ref]);
}
