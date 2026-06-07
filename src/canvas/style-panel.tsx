'use client';

import { useCanvas } from './store';
import { cn } from '@/lib/cn';

// First swatch is `currentColor` — follows theme foreground.
const STROKES = [
  'currentColor',
  '#f43f5e',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#6366f1',
  '#a855f7',
  '#ec4899',
  '#71717a',
];

const FILLS = [
  'transparent',
  '#f43f5e22',
  '#f9731622',
  '#eab30822',
  '#22c55e22',
  '#06b6d422',
  '#6366f122',
  '#a855f722',
];

const WIDTHS = [1, 2, 4, 8, 14];

export function StylePanel() {
  const stroke = useCanvas((s) => s.stroke);
  const fill = useCanvas((s) => s.fill);
  const strokeWidth = useCanvas((s) => s.strokeWidth);
  const setStyle = useCanvas((s) => s.setStyle);

  return (
    <div className="pointer-events-auto glass flex flex-col gap-3 rounded-2xl p-3 text-xs shadow-xl">
      <div>
        <p className="mb-1.5 text-fg-muted">Stroke</p>
        <div className="grid grid-cols-5 gap-1">
          {STROKES.map((c) => (
            <button
              key={c}
              onClick={() => setStyle({ stroke: c })}
              aria-label={`Stroke ${c}`}
              className={cn(
                'h-6 w-6 rounded-md border transition-transform',
                stroke === c ? 'border-accent scale-110' : 'border-border',
                c === 'currentColor' && 'text-fg'
              )}
              style={{
                background: c === 'currentColor' ? 'currentColor' : c,
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-fg-muted">Fill</p>
        <div className="grid grid-cols-4 gap-1">
          {FILLS.map((c) => (
            <button
              key={c}
              onClick={() => setStyle({ fill: c })}
              aria-label={`Fill ${c}`}
              className={cn(
                'h-6 w-full rounded-md border transition-colors',
                fill === c ? 'border-accent' : 'border-border',
                c === 'transparent' &&
                  'bg-[conic-gradient(at_50%_50%,#0000_25%,#88888822_0_50%,#0000_0_75%,#88888822_0)] bg-[length:8px_8px]'
              )}
              style={c === 'transparent' ? undefined : { background: c }}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-fg-muted">Width</p>
        <div className="flex items-center gap-1">
          {WIDTHS.map((w) => (
            <button
              key={w}
              onClick={() => setStyle({ strokeWidth: w })}
              aria-label={`Width ${w}`}
              className={cn(
                'flex h-7 flex-1 items-center justify-center rounded-md border',
                strokeWidth === w
                  ? 'border-accent bg-accent/10'
                  : 'border-border'
              )}
            >
              <span
                className="block rounded-full"
                style={{
                  width: Math.max(2, w),
                  height: Math.max(2, w),
                  background: 'hsl(var(--fg))',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
