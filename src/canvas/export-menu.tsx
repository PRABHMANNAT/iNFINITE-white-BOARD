'use client';

import { useRef } from 'react';
import { Download, FileJson, FileImage, FileCode2, Upload } from 'lucide-react';
import { exportJSON, exportPNG, exportSVG, importJSON } from './export';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from '@/components/ui/dropdown';

export function ExportMenu() {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button className="pointer-events-auto glass flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm shadow-xl">
          <Download className="h-4 w-4" />
          Export
        </button>
      </DropdownTrigger>
      <DropdownContent align="end">
        <DropdownItem onSelect={() => exportPNG()}>
          <FileImage className="h-4 w-4 text-fg-muted" />
          Export as PNG
        </DropdownItem>
        <DropdownItem onSelect={() => exportSVG()}>
          <FileCode2 className="h-4 w-4 text-fg-muted" />
          Export as SVG
        </DropdownItem>
        <DropdownItem onSelect={() => exportJSON()}>
          <FileJson className="h-4 w-4 text-fg-muted" />
          Export as JSON
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem onSelect={() => fileRef.current?.click()}>
          <Upload className="h-4 w-4 text-fg-muted" />
          Import JSON…
        </DropdownItem>
      </DropdownContent>
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
    </Dropdown>
  );
}
