'use client';

import { useRef } from 'react';
import { useCanvas } from './store';
import { usePanZoom } from './use-pan-zoom';
import { useDrawing } from './use-drawing';
import { GridLayer } from './grid';
import { ElementRenderer } from './element-renderer';

export function CanvasSurface() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elements = useCanvas((s) => s.elements);
  const viewport = useCanvas((s) => s.viewport);
  const selectedIds = useCanvas((s) => s.selectedIds);
  const tool = useCanvas((s) => s.tool);

  usePanZoom(containerRef);
  useDrawing(containerRef);

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
        >
          {elements.map((el) => (
            <ElementRenderer
              key={el.id}
              el={el}
              selected={selectedIds.has(el.id)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
