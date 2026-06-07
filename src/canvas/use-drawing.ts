'use client';

import { useEffect, useRef } from 'react';
import { nanoid } from '@/lib/id';
import { useCanvas } from './store';
import type { CanvasElement, StrokeElement } from './types';
import { nextStickyColor } from './sticky-colors';
import { snap } from './snap';

function screenToWorld(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  v: { x: number; y: number; zoom: number }
) {
  return {
    x: (clientX - rect.left - v.x) / v.zoom,
    y: (clientY - rect.top - v.y) / v.zoom,
  };
}

export function useDrawing(ref: React.RefObject<HTMLElement | null>) {
  const draftRef = useRef<CanvasElement | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      const { tool, viewport, stroke, fill, strokeWidth } = useCanvas.getState();
      if (
        tool === 'select' ||
        tool === 'pan' ||
        tool === 'eraser' ||
        e.button !== 0
      )
        return;

      // skip if the user is panning via space/middle-click
      if ((e as PointerEvent & { _panning?: boolean })._panning) return;

      const rect = el.getBoundingClientRect();
      const p = screenToWorld(e.clientX, e.clientY, rect, viewport);
      startRef.current = p;
      el.setPointerCapture(e.pointerId);

      useCanvas.getState().commit();

      if (tool === 'pen' || tool === 'highlighter' || tool === 'marker') {
        const widthMap = { pen: 2, highlighter: 14, marker: 5 } as const;
        const opacityMap = { pen: 1, highlighter: 0.35, marker: 0.95 } as const;
        const draft: StrokeElement = {
          type: 'stroke',
          tool,
          points: [p.x, p.y],
          stroke,
          strokeWidth: strokeWidth || widthMap[tool],
          opacity: opacityMap[tool],
          id: nanoid(),
        };
        draftRef.current = draft;
        useCanvas.getState().addElement(draft);
        return;
      }

      if (tool === 'sticky') {
        const colorIdx = useCanvas.getState().elements.filter((e) => e.type === 'sticky').length;
        const color = nextStickyColor(colorIdx);
        const draft: CanvasElement = {
          type: 'sticky',
          id: nanoid(),
          x: p.x,
          y: p.y,
          width: 180,
          height: 120,
          text: '',
          stroke: color.stroke,
          fill: color.fill,
          strokeWidth: 1,
          opacity: 1,
          rotation: 0,
        };
        useCanvas.getState().addElement(draft);
        useCanvas.getState().setTool('select');
        useCanvas.getState().select(draft.id);
        return;
      }

      if (tool === 'text') {
        const draft: CanvasElement = {
          type: 'text',
          id: nanoid(),
          x: p.x,
          y: p.y,
          width: 1,
          height: 1,
          text: 'Text',
          fontSize: 24,
          stroke,
          fill: 'transparent',
          strokeWidth: 0,
          opacity: 1,
          rotation: 0,
        };
        useCanvas.getState().addElement(draft);
        useCanvas.getState().setTool('select');
        useCanvas.getState().select(draft.id);
        return;
      }

      // shape tools: rectangle, ellipse, diamond, triangle, line, arrow
      const draft: CanvasElement = {
        type: tool,
        id: nanoid(),
        x: p.x,
        y: p.y,
        width: 0,
        height: 0,
        stroke,
        fill,
        strokeWidth: strokeWidth || 2,
        opacity: 1,
        rotation: 0,
      } as CanvasElement;
      draftRef.current = draft;
      useCanvas.getState().addElement(draft);
    };

    const onPointerMove = (e: PointerEvent) => {
      const d = draftRef.current;
      const s = startRef.current;
      if (!d || !s) return;
      const { viewport } = useCanvas.getState();
      const rect = el.getBoundingClientRect();
      const p = screenToWorld(e.clientX, e.clientY, rect, viewport);

      if (d.type === 'stroke') {
        const next = [...d.points, p.x, p.y];
        useCanvas.getState().updateElement(d.id, { points: next });
        draftRef.current = { ...d, points: next };
        return;
      }

      const st = useCanvas.getState();
      const snapped =
        st.snapToGrid && st.tool !== 'pen' && st.tool !== 'highlighter' && st.tool !== 'marker'
          ? { x: snap(p.x, st.grid), y: snap(p.y, st.grid) }
          : p;
      st.updateElement(d.id, { width: snapped.x - s.x, height: snapped.y - s.y });
    };

    const onPointerUp = (e: PointerEvent) => {
      if (draftRef.current) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {}
        draftRef.current = null;
        startRef.current = null;
      }
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
