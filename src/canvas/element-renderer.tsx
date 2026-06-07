'use client';

import { memo } from 'react';
import type { CanvasElement } from './types';

function strokePoints(points: number[]) {
  if (points.length < 2) return '';
  let d = `M ${points[0]} ${points[1]}`;
  for (let i = 2; i < points.length; i += 2) {
    d += ` L ${points[i]} ${points[i + 1]}`;
  }
  return d;
}

export const ElementRenderer = memo(function ElementRenderer({
  el,
  selected,
}: {
  el: CanvasElement;
  selected?: boolean;
}) {
  const selOutline = selected
    ? { filter: 'drop-shadow(0 0 0.5px hsl(var(--accent))) drop-shadow(0 0 4px hsl(var(--accent) / 0.5))' }
    : undefined;

  if (el.type === 'stroke') {
    return (
      <path
        d={strokePoints(el.points)}
        stroke={el.stroke}
        strokeWidth={el.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={el.opacity}
        style={selOutline}
      />
    );
  }

  if (el.type === 'rectangle') {
    return (
      <rect
        x={el.x}
        y={el.y}
        width={el.width}
        height={el.height}
        rx={6}
        stroke={el.stroke}
        strokeWidth={el.strokeWidth}
        fill={el.fill}
        opacity={el.opacity}
        style={selOutline}
      />
    );
  }

  if (el.type === 'ellipse') {
    return (
      <ellipse
        cx={el.x + el.width / 2}
        cy={el.y + el.height / 2}
        rx={Math.abs(el.width / 2)}
        ry={Math.abs(el.height / 2)}
        stroke={el.stroke}
        strokeWidth={el.strokeWidth}
        fill={el.fill}
        opacity={el.opacity}
        style={selOutline}
      />
    );
  }

  if (el.type === 'diamond') {
    const cx = el.x + el.width / 2;
    const cy = el.y + el.height / 2;
    const pts = `${cx},${el.y} ${el.x + el.width},${cy} ${cx},${el.y + el.height} ${el.x},${cy}`;
    return (
      <polygon
        points={pts}
        stroke={el.stroke}
        strokeWidth={el.strokeWidth}
        fill={el.fill}
        opacity={el.opacity}
        style={selOutline}
      />
    );
  }

  if (el.type === 'triangle') {
    const pts = `${el.x + el.width / 2},${el.y} ${el.x + el.width},${el.y + el.height} ${el.x},${el.y + el.height}`;
    return (
      <polygon
        points={pts}
        stroke={el.stroke}
        strokeWidth={el.strokeWidth}
        fill={el.fill}
        opacity={el.opacity}
        style={selOutline}
      />
    );
  }

  if (el.type === 'line') {
    return (
      <line
        x1={el.x}
        y1={el.y}
        x2={el.x + el.width}
        y2={el.y + el.height}
        stroke={el.stroke}
        strokeWidth={el.strokeWidth}
        strokeLinecap="round"
        opacity={el.opacity}
        style={selOutline}
      />
    );
  }

  if (el.type === 'arrow') {
    const x2 = el.x + el.width;
    const y2 = el.y + el.height;
    const angle = Math.atan2(el.height, el.width);
    const headLen = 12;
    const hx1 = x2 - headLen * Math.cos(angle - Math.PI / 7);
    const hy1 = y2 - headLen * Math.sin(angle - Math.PI / 7);
    const hx2 = x2 - headLen * Math.cos(angle + Math.PI / 7);
    const hy2 = y2 - headLen * Math.sin(angle + Math.PI / 7);
    return (
      <g style={selOutline} opacity={el.opacity}>
        <line
          x1={el.x}
          y1={el.y}
          x2={x2}
          y2={y2}
          stroke={el.stroke}
          strokeWidth={el.strokeWidth}
          strokeLinecap="round"
        />
        <polygon
          points={`${x2},${y2} ${hx1},${hy1} ${hx2},${hy2}`}
          fill={el.stroke}
        />
      </g>
    );
  }

  if (el.type === 'text') {
    return (
      <text
        x={el.x}
        y={el.y + el.fontSize}
        fill={el.stroke}
        fontSize={el.fontSize}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity={el.opacity}
        style={selOutline}
      >
        {el.text}
      </text>
    );
  }

  if (el.type === 'sticky') {
    return (
      <g style={selOutline} opacity={el.opacity}>
        <rect
          x={el.x}
          y={el.y}
          width={el.width}
          height={el.height}
          rx={10}
          fill={el.fill || '#fef08a'}
          stroke={el.stroke}
          strokeWidth={el.strokeWidth}
        />
        <foreignObject
          x={el.x + 8}
          y={el.y + 8}
          width={el.width - 16}
          height={el.height - 16}
        >
          <div
            style={{
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              fontSize: 14,
              color: '#1f2937',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {el.text}
          </div>
        </foreignObject>
      </g>
    );
  }

  return null;
});
