'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { nanoid } from '@/lib/id';
import { useCanvas } from './store';
import type { ImageElement } from './types';

const MAX_SIZE = 720;

function fileToDataURL(file: File) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function imageDimensions(src: string) {
  return new Promise<{ w: number; h: number }>((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 400, h: 300 });
    img.src = src;
  });
}

async function addImage(file: File, world: { x: number; y: number }) {
  if (!file.type.startsWith('image/')) return;
  const src = await fileToDataURL(file);
  const dims = await imageDimensions(src);
  const ratio = dims.w / dims.h;
  let w = dims.w;
  let h = dims.h;
  if (w > MAX_SIZE) {
    w = MAX_SIZE;
    h = w / ratio;
  }
  const el: ImageElement = {
    type: 'image',
    id: nanoid(),
    x: world.x - w / 2,
    y: world.y - h / 2,
    width: w,
    height: h,
    src,
    naturalWidth: dims.w,
    naturalHeight: dims.h,
    stroke: 'transparent',
    fill: 'transparent',
    strokeWidth: 0,
    opacity: 1,
    rotation: 0,
  };
  useCanvas.getState().commit();
  useCanvas.getState().addElement(el);
  useCanvas.getState().select(el.id);
  toast.success(`Added ${file.name || 'image'}`);
}

export function useImageInput(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const screenToWorld = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const v = useCanvas.getState().viewport;
      return {
        x: (clientX - rect.left - v.x) / v.zoom,
        y: (clientY - rect.top - v.y) / v.zoom,
      };
    };

    const onDragOver = (e: DragEvent) => {
      if (e.dataTransfer?.types.includes('Files')) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      }
    };

    const onDrop = (e: DragEvent) => {
      const files = e.dataTransfer?.files;
      if (!files || files.length === 0) return;
      e.preventDefault();
      const world = screenToWorld(e.clientX, e.clientY);
      Array.from(files).forEach((f, i) => {
        addImage(f, { x: world.x + i * 30, y: world.y + i * 30 });
      });
    };

    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const center = screenToWorld(window.innerWidth / 2, window.innerHeight / 2);
      let idx = 0;
      for (const it of items) {
        if (it.kind === 'file' && it.type.startsWith('image/')) {
          const f = it.getAsFile();
          if (f) {
            addImage(f, { x: center.x + idx * 30, y: center.y + idx * 30 });
            idx++;
          }
        }
      }
    };

    el.addEventListener('dragover', onDragOver);
    el.addEventListener('drop', onDrop);
    window.addEventListener('paste', onPaste);
    return () => {
      el.removeEventListener('dragover', onDragOver);
      el.removeEventListener('drop', onDrop);
      window.removeEventListener('paste', onPaste);
    };
  }, [ref]);
}
