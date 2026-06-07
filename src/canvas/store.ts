'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
  toggleSelect: (id: string, additive?: boolean) => void;
  deleteSelection: () => void;
  duplicateSelection: () => string[];
  nudgeSelection: (dx: number, dy: number) => void;
  bringForward: () => void;
  sendBackward: () => void;
  bringToFront: () => void;
  sendToBack: () => void;

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

export const useCanvas = create<CanvasStore>()(
  persist(
    (set, get) => ({
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
  toggleSelect: (id, additive) =>
    set((s) => {
      const next = additive ? new Set(s.selectedIds) : new Set<string>();
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { selectedIds: next };
    }),
  deleteSelection: () =>
    set((s) => {
      if (s.selectedIds.size === 0) return s;
      get().commit();
      return {
        elements: s.elements.filter((e) => !s.selectedIds.has(e.id)),
        selectedIds: new Set(),
      };
    }),
  duplicateSelection: () => {
    const s = get();
    if (s.selectedIds.size === 0) return [];
    s.commit();
    const newIds: string[] = [];
    const clones: CanvasElement[] = [];
    for (const el of s.elements) {
      if (!s.selectedIds.has(el.id)) continue;
      const id = `${el.id}-${Math.random().toString(36).slice(2, 8)}`;
      newIds.push(id);
      const clone =
        el.type === 'stroke'
          ? { ...el, id, points: el.points.map((p, i) => (i % 2 === 0 ? p + 20 : p + 20)) }
          : { ...el, id, x: (el.x ?? 0) + 20, y: (el.y ?? 0) + 20 };
      clones.push(clone as CanvasElement);
    }
    set({
      elements: [...s.elements, ...clones],
      selectedIds: new Set(newIds),
    });
    return newIds;
  },
  nudgeSelection: (dx, dy) =>
    set((s) => {
      if (s.selectedIds.size === 0) return s;
      return {
        elements: s.elements.map((el) => {
          if (!s.selectedIds.has(el.id)) return el;
          if (el.type === 'stroke') {
            return {
              ...el,
              points: el.points.map((p, i) => (i % 2 === 0 ? p + dx : p + dy)),
            };
          }
          return { ...el, x: el.x + dx, y: el.y + dy };
        }),
      };
    }),
  bringForward: () =>
    set((s) => {
      if (s.selectedIds.size === 0) return s;
      const els = [...s.elements];
      for (let i = els.length - 2; i >= 0; i--) {
        if (s.selectedIds.has(els[i].id) && !s.selectedIds.has(els[i + 1].id)) {
          [els[i], els[i + 1]] = [els[i + 1], els[i]];
        }
      }
      return { elements: els };
    }),
  sendBackward: () =>
    set((s) => {
      if (s.selectedIds.size === 0) return s;
      const els = [...s.elements];
      for (let i = 1; i < els.length; i++) {
        if (s.selectedIds.has(els[i].id) && !s.selectedIds.has(els[i - 1].id)) {
          [els[i], els[i - 1]] = [els[i - 1], els[i]];
        }
      }
      return { elements: els };
    }),
  bringToFront: () =>
    set((s) => {
      if (s.selectedIds.size === 0) return s;
      const sel = s.elements.filter((e) => s.selectedIds.has(e.id));
      const rest = s.elements.filter((e) => !s.selectedIds.has(e.id));
      return { elements: [...rest, ...sel] };
    }),
  sendToBack: () =>
    set((s) => {
      if (s.selectedIds.size === 0) return s;
      const sel = s.elements.filter((e) => s.selectedIds.has(e.id));
      const rest = s.elements.filter((e) => !s.selectedIds.has(e.id));
      return { elements: [...sel, ...rest] };
    }),

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
    }),
    {
      name: 'ingenboard:canvas',
      version: 2,
      storage: createJSONStorage(() => {
        // localStorage is not available during SSR
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => undefined,
            removeItem: () => undefined,
          };
        }
        return window.localStorage;
      }),
      partialize: (s) => ({
        elements: s.elements,
        viewport: s.viewport,
        grid: s.grid,
        shapeStyle: s.shapeStyle,
        stroke: s.stroke,
        fill: s.fill,
        strokeWidth: s.strokeWidth,
      }),
    }
  )
);
