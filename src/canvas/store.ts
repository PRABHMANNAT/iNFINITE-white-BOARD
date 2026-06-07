'use client';

import { create } from 'zustand';
import type {
  CanvasElement,
  GridMode,
  ShapeStyle,
  Tool,
  ViewportState,
} from './types';

const MAX_HISTORY = 100;

type HistoryEntry = { elements: CanvasElement[] };

type CanvasStore = {
  // viewport
  viewport: ViewportState;
  setViewport: (next: Partial<ViewportState>) => void;
  resetViewport: () => void;

  // elements
  elements: CanvasElement[];
  addElement: (el: CanvasElement) => void;
  updateElement: (id: string, patch: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  clearAll: () => void;

  // selection
  selectedIds: Set<string>;
  select: (ids: string[] | string | null) => void;

  // tool
  tool: Tool;
  setTool: (t: Tool) => void;

  // style
  stroke: string;
  fill: string;
  strokeWidth: number;
  setStyle: (patch: { stroke?: string; fill?: string; strokeWidth?: number }) => void;

  // grid
  grid: GridMode;
  setGrid: (g: GridMode) => void;

  // shape rendering style (clean vs sketchy)
  shapeStyle: ShapeStyle;
  setShapeStyle: (s: ShapeStyle) => void;

  // history
  past: HistoryEntry[];
  future: HistoryEntry[];
  commit: () => void; // snapshot current state
  undo: () => void;
  redo: () => void;
};

const initialViewport: ViewportState = { x: 0, y: 0, zoom: 1 };

export const useCanvas = create<CanvasStore>((set, get) => ({
  viewport: initialViewport,
  setViewport: (next) =>
    set((s) => ({ viewport: { ...s.viewport, ...next } })),
  resetViewport: () => set({ viewport: initialViewport }),

  elements: [],
  addElement: (el) =>
    set((s) => ({ elements: [...s.elements, el] })),
  updateElement: (id, patch) =>
    set((s) => ({
      elements: s.elements.map((e) =>
        e.id === id ? ({ ...e, ...patch } as CanvasElement) : e
      ),
    })),
  removeElement: (id) =>
    set((s) => ({
      elements: s.elements.filter((e) => e.id !== id),
    })),
  clearAll: () => {
    get().commit();
    set({ elements: [], selectedIds: new Set() });
  },

  selectedIds: new Set<string>(),
  select: (ids) => {
    if (ids === null) return set({ selectedIds: new Set() });
    const arr = Array.isArray(ids) ? ids : [ids];
    set({ selectedIds: new Set(arr) });
  },

  tool: 'select',
  setTool: (t) => set({ tool: t }),

  // currentColor follows the theme foreground via the SVG <g color="…" />
  stroke: 'currentColor',
  fill: 'transparent',
  strokeWidth: 2,
  setStyle: (patch) => set((s) => ({ ...s, ...patch })),

  grid: 'dots',
  setGrid: (g) => set({ grid: g }),

  shapeStyle: 'clean',
  setShapeStyle: (s) => set({ shapeStyle: s }),

  past: [],
  future: [],
  commit: () =>
    set((s) => {
      const snap: HistoryEntry = { elements: s.elements };
      const past = [...s.past, snap].slice(-MAX_HISTORY);
      return { past, future: [] };
    }),
  undo: () =>
    set((s) => {
      const prev = s.past[s.past.length - 1];
      if (!prev) return s;
      return {
        past: s.past.slice(0, -1),
        future: [{ elements: s.elements }, ...s.future].slice(0, MAX_HISTORY),
        elements: prev.elements,
      };
    }),
  redo: () =>
    set((s) => {
      const next = s.future[0];
      if (!next) return s;
      return {
        past: [...s.past, { elements: s.elements }].slice(-MAX_HISTORY),
        future: s.future.slice(1),
        elements: next.elements,
      };
    }),
}));
