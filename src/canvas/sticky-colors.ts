export const STICKY_PRESETS: Array<{ name: string; fill: string; stroke: string }> = [
  { name: 'Yellow', fill: '#fef08a', stroke: '#facc15' },
  { name: 'Lime', fill: '#d9f99d', stroke: '#a3e635' },
  { name: 'Mint', fill: '#a7f3d0', stroke: '#34d399' },
  { name: 'Sky', fill: '#bae6fd', stroke: '#38bdf8' },
  { name: 'Violet', fill: '#ddd6fe', stroke: '#a78bfa' },
  { name: 'Pink', fill: '#fbcfe8', stroke: '#f472b6' },
  { name: 'Coral', fill: '#fecaca', stroke: '#f87171' },
  { name: 'Cream', fill: '#fef3c7', stroke: '#fbbf24' },
];

export function nextStickyColor(seedIndex: number) {
  return STICKY_PRESETS[seedIndex % STICKY_PRESETS.length];
}
