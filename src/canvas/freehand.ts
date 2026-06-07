import getStroke from 'perfect-freehand';

/** Convert a flat [x1,y1,x2,y2,...] array to perfect-freehand input. */
export function toPoints(flat: number[]): number[][] {
  const pts: number[][] = [];
  for (let i = 0; i < flat.length; i += 2) pts.push([flat[i], flat[i + 1]]);
  return pts;
}

/** Convert perfect-freehand outline points back to an SVG path "d" string. */
export function outlineToSvgPath(outline: number[][]): string {
  if (outline.length === 0) return '';
  const d: string[] = [];
  d.push(`M ${outline[0][0]} ${outline[0][1]}`);
  for (let i = 1; i < outline.length; i++) {
    const [x0, y0] = outline[i - 1];
    const [x1, y1] = outline[i];
    d.push(`Q ${x0} ${y0} ${(x0 + x1) / 2} ${(y0 + y1) / 2}`);
  }
  d.push('Z');
  return d.join(' ');
}

export type StrokeStyle = 'pen' | 'highlighter' | 'marker';

const PRESETS: Record<StrokeStyle, Parameters<typeof getStroke>[1]> = {
  pen: {
    size: 4,
    thinning: 0.6,
    smoothing: 0.5,
    streamline: 0.5,
    easing: (t) => t,
    simulatePressure: true,
  },
  marker: {
    size: 10,
    thinning: 0.1,
    smoothing: 0.5,
    streamline: 0.6,
    simulatePressure: true,
  },
  highlighter: {
    size: 22,
    thinning: 0,
    smoothing: 0.3,
    streamline: 0.6,
    simulatePressure: false,
  },
};

export function strokeToPath(
  flat: number[],
  style: StrokeStyle,
  sizeOverride?: number
): string {
  const opts = { ...PRESETS[style] };
  if (sizeOverride && sizeOverride > 0) opts.size = sizeOverride;
  const outline = getStroke(toPoints(flat), opts);
  return outlineToSvgPath(outline);
}
