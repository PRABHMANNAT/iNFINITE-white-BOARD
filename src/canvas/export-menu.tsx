'use client';

import { useRef, useState } from 'react';
import { Download, FileJson, FileImage, FileCode2, Upload } from 'lucide-react';
import { exportJSON, exportPNG, exportSVG, importJSON } from './export';

export function ExportMenu() {
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="pointer-events-auto relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="glass flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm shadow-xl"
      >
        <Download className="h-4 w-4" />
        Export
      </button>
      {open && (
        <div className="glass absolute right-0 top-11 w-52 rounded-xl p-1 shadow-2xl">
          <MenuItem icon={FileImage} label="Export as PNG" onClick={() => { exportPNG(); setOpen(false); }} />
          <MenuItem icon={FileCode2} label="Export as SVG" onClick={() => { exportSVG(); setOpen(false); }} />
          <MenuItem icon={FileJson} label="Export as JSON" onClick={() => { exportJSON(); setOpen(false); }} />
          <div className="my-1 h-px bg-border" />
          <MenuItem
            icon={Upload}
            label="Import JSON…"
            onClick={() => {
              fileRef.current?.click();
              setOpen(false);
            }}
          />
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) importJSON(f);
          e.target.value = '';
        }}
      />
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-fg hover:bg-bg-muted"
    >
      <Icon className="h-4 w-4 text-fg-muted" />
      {label}
    </button>
  );
}
