'use client';

import { toast } from 'sonner';
import { toPng, toSvg } from 'html-to-image';
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

function findCanvasContainer(): HTMLElement | null {
  // The CanvasSurface root div is positioned `relative h-full w-full overflow-hidden touch-none`.
  // Fall back to body if not found (full-page export).
  return (
    (document.querySelector('[data-canvas-surface]') as HTMLElement) ??
    (document.body as HTMLElement)
  );
}

export async function exportSVG() {
  const node = findCanvasContainer();
  if (!node) return;
  try {
    const dataUrl = await toSvg(node, {
      backgroundColor: getComputedStyle(document.body).backgroundColor || '#ffffff',
      pixelRatio: 1,
      filter: (el) => !(el instanceof HTMLElement && el.dataset.exportIgnore === 'true'),
    });
    const blob = await (await fetch(dataUrl)).blob();
    downloadBlob(blob, `ingenboard-${Date.now()}.svg`);
    toast.success('Exported as SVG');
  } catch (e) {
    console.error(e);
    toast.error('SVG export failed');
  }
}

export async function exportPNG() {
  const node = findCanvasContainer();
  if (!node) return;
  try {
    const dataUrl = await toPng(node, {
      backgroundColor: getComputedStyle(document.body).backgroundColor || '#ffffff',
      pixelRatio: 2,
      cacheBust: true,
      filter: (el) => !(el instanceof HTMLElement && el.dataset.exportIgnore === 'true'),
    });
    const blob = await (await fetch(dataUrl)).blob();
    downloadBlob(blob, `ingenboard-${Date.now()}.png`);
    toast.success('Exported as PNG');
  } catch (e) {
    console.error(e);
    toast.error('PNG export failed');
  }
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
