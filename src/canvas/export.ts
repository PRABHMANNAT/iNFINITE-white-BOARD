'use client';

import { toast } from 'sonner';
import { useCanvas } from './store';

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportJSON() {
  const { elements, viewport, grid } = useCanvas.getState();
  const payload = {
    version: 1,
    app: 'IngenBoard',
    exportedAt: new Date().toISOString(),
    viewport,
    grid,
    elements,
  };
  downloadBlob(
    new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }),
    `ingenboard-${Date.now()}.json`
  );
  toast.success('Exported as JSON');
}

export function exportSVG() {
  // Find canvas SVG and clone it
  const svg = document.querySelector('svg[class*="absolute"][class*="inset-0"]');
  if (!svg) return;
  const clone = svg.cloneNode(true) as SVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(window.innerWidth));
  clone.setAttribute('height', String(window.innerHeight));
  const serialized = new XMLSerializer().serializeToString(clone);
  downloadBlob(
    new Blob([serialized], { type: 'image/svg+xml' }),
    `ingenboard-${Date.now()}.svg`
  );
  toast.success('Exported as SVG');
}

export async function exportPNG() {
  const svg = document.querySelector(
    'svg[class*="absolute"][class*="inset-0"]'
  ) as SVGElement | null;
  if (!svg) return;
  const w = window.innerWidth;
  const h = window.innerHeight;

  const clone = svg.cloneNode(true) as SVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(w));
  clone.setAttribute('height', String(h));
  const xml = new XMLSerializer().serializeToString(clone);
  const svg64 =
    'data:image/svg+xml;base64,' +
    btoa(unescape(encodeURIComponent(xml)));

  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise((resolve, reject) => {
    img.onload = () => resolve(null);
    img.onerror = reject;
    img.src = svg64;
  });

  const canvas = document.createElement('canvas');
  canvas.width = w * window.devicePixelRatio;
  canvas.height = h * window.devicePixelRatio;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  // background
  const bgColor = getComputedStyle(document.body).backgroundColor;
  ctx.fillStyle = bgColor || '#0a0a0f';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  canvas.toBlob((blob) => {
    if (blob) {
      downloadBlob(blob, `ingenboard-${Date.now()}.png`);
      toast.success('Exported as PNG');
    } else {
      toast.error('PNG export failed');
    }
  });
}

export function importJSON(file: File) {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!Array.isArray(data.elements)) throw new Error('Invalid file');
        useCanvas.getState().commit();
        useCanvas.setState({
          elements: data.elements,
          viewport: data.viewport ?? useCanvas.getState().viewport,
          grid: data.grid ?? useCanvas.getState().grid,
          selectedIds: new Set(),
        });
        toast.success(`Imported ${data.elements.length} element${data.elements.length === 1 ? '' : 's'}`);
        resolve();
      } catch (e) {
        toast.error('Import failed — invalid IngenBoard JSON');
        reject(e);
      }
    };
    reader.readAsText(file);
  });
}
