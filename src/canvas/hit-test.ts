import type { CanvasElement } from './types';

const STROKE_THRESHOLD = 8; // world-space px

function bbox(el: CanvasElement) {
  if (el.type === 'stroke') {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0; i < el.points.length; i += 2) {
      const x = el.points[i];
      const y = el.points[i + 1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }
  const w = el.width;
  const h = el.height;
  return {
    x: Math.min(el.x, el.x + w),
    y: Math.min(el.y, el.y + h),
    w: Math.abs(w),
    h: Math.abs(h),
  };
}

function distToSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

export function hitTest(el: CanvasElement, x: number, y: number): boolean {
  if (el.type === 'stroke') {
    for (let i = 0; i < el.points.length - 2; i += 2) {
      if (
        distToSegment(x, y, el.points[i], el.points[i + 1], el.points[i + 2], el.points[i + 3]) <
        Math.max(STROKE_THRESHOLD, (el.strokeWidth ?? 2) + 4)
      ) {
        return true;
      }
    }
    return false;
  }
  const b = bbox(el);
  return x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
}

export function rectIntersectsElement(
  el: CanvasElement,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): boolean {
  const b = bbox(el);
  return !(rx + rw < b.x || ry + rh < b.y || rx > b.x + b.w || ry > b.y + b.h);
}

export function findTopHit(els: CanvasElement[], x: number, y: number): CanvasElement | null {
  // top of z-order = last in array; iterate in reverse
  for (let i = els.length - 1; i >= 0; i--) {
    if (hitTest(els[i], x, y)) return els[i];
  }
  return null;
}

export function elementBBox(el: CanvasElement) {
  return bbox(el);
}
