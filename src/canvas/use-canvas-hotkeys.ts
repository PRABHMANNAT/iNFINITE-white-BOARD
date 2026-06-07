'use client';

import { useHotkeys } from 'react-hotkeys-hook';
import { useCanvas } from './store';
import type { CanvasElement } from './types';

let clipboard: CanvasElement[] = [];

export function useCanvasHotkeys() {
  useHotkeys(
    ['delete', 'backspace'],
    (e) => {
      e.preventDefault();
      useCanvas.getState().deleteSelection();
    },
    { enableOnFormTags: false }
  );

  useHotkeys('mod+d', (e) => {
    e.preventDefault();
    useCanvas.getState().duplicateSelection();
  });

  useHotkeys('mod+c', () => {
    const s = useCanvas.getState();
    clipboard = s.elements.filter((el) => s.selectedIds.has(el.id));
  });

  useHotkeys('mod+v', (e) => {
    if (clipboard.length === 0) return;
    e.preventDefault();
    const s = useCanvas.getState();
    s.commit();
    const newIds: string[] = [];
    const clones: CanvasElement[] = clipboard.map((el) => {
      const id = `${el.id}-${Math.random().toString(36).slice(2, 8)}`;
      newIds.push(id);
      if (el.type === 'stroke') {
        return { ...el, id, points: el.points.map((p, i) => (i % 2 === 0 ? p + 30 : p + 30)) };
      }
      return { ...el, id, x: el.x + 30, y: el.y + 30 } as CanvasElement;
    });
    useCanvas.setState({
      elements: [...s.elements, ...clones],
      selectedIds: new Set(newIds),
    });
  });

  useHotkeys('mod+]', (e) => {
    e.preventDefault();
    useCanvas.getState().bringForward();
  });
  useHotkeys('mod+[', (e) => {
    e.preventDefault();
    useCanvas.getState().sendBackward();
  });
  useHotkeys('mod+shift+]', (e) => {
    e.preventDefault();
    useCanvas.getState().bringToFront();
  });
  useHotkeys('mod+shift+[', (e) => {
    e.preventDefault();
    useCanvas.getState().sendToBack();
  });

  useHotkeys('mod+a', (e) => {
    e.preventDefault();
    const s = useCanvas.getState();
    s.select(s.elements.map((el) => el.id));
  });

  useHotkeys(['arrowleft', 'arrowright', 'arrowup', 'arrowdown'], (e, h) => {
    const k = h.keys?.[0] ?? '';
    const step = e.shiftKey ? 10 : 1;
    const dx = k === 'arrowleft' ? -step : k === 'arrowright' ? step : 0;
    const dy = k === 'arrowup' ? -step : k === 'arrowdown' ? step : 0;
    if (dx === 0 && dy === 0) return;
    e.preventDefault();
    useCanvas.getState().nudgeSelection(dx, dy);
  });

  useHotkeys('escape', () => useCanvas.getState().select(null));
}
