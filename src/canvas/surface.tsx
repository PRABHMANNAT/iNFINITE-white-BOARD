'use client';

import { useRef } from 'react';
import { useCanvas } from './store';
import { usePanZoom } from './use-pan-zoom';
import { useDrawing } from './use-drawing';
import { useSelection } from './use-selection';
import { useEraser } from './use-eraser';
import { useImageInput } from './use-image-input';
import { useShortcuts } from './use-shortcuts';
import { useCanvasHotkeys } from './use-canvas-hotkeys';
import { GridLayer } from './grid';
import { ElementRenderer } from './element-renderer';

export function CanvasSurface() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<SVGRectElement>(null);
  const elements = useCanvas((s) => s.elements);
  const viewport = useCanvas((s) => s.viewport);
  const selectedIds = useCanvas((s) => s.selectedIds);
  const tool = useCanvas((s) => s.tool);

  usePanZoom(containerRef);
  useDrawing(containerRef);
  useSelection(containerRef, marqueeRef);
  useEraser(containerRef);
  useImageInput(containerRef);
  useShortcuts();
  useCanvasHotkeys();

  const cursor =
    tool === 'pan'
      ? 'grab'
      : tool === 'select'
      ? 'default'
      : tool === 'eraser'
      ? 'cell'
      : 'crosshair';

  return (
    <div
      ref={containerRef}
      data-canvas-surface
      className="relative h-full w-full overflow-hidden touch-none select-none"
      style={{
        background: 'hsl(var(--bg))',
        cursor,
      }}
    >
      <GridLayer />
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ overflow: 'visible' }}
      >
        <g
          transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.zoom})`}
          style={{ color: 'hsl(var(--fg))' }}
        >
          {elements.map((el) => (
            <ElementRenderer
              key={el.id}
              el={el}
              selected={selectedIds.has(el.id)}
            />
          ))}
          <rect
            ref={marqueeRef}
            visibility="hidden"
            fill="hsl(var(--accent) / 0.08)"
            stroke="hsl(var(--accent))"
            strokeDasharray="4 4"
            strokeWidth={1 / viewport.zoom}
            pointerEvents="none"
          />
        </g>
      </svg>
    </div>
  );
}
