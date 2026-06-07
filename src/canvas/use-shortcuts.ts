'use client';

import { useEffect } from 'react';
import { useCanvas } from './store';
import type { Tool } from './types';

const KEYMAP: Record<string, Tool> = {
  v: 'select',
  h: 'pan',
  p: 'pen',
  e: 'eraser',
  r: 'rectangle',
  o: 'ellipse',
  d: 'diamond',
  l: 'line',
  a: 'arrow',
  t: 'text',
  s: 'sticky',
};

export function useShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // ignore when typing
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tool = KEYMAP[e.key.toLowerCase()];
      if (tool) {
        e.preventDefault();
        useCanvas.getState().setTool(tool);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}
