'use client';

import {
  Copy,
  Trash2,
  ArrowUpToLine,
  ArrowDownToLine,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { useCanvas } from './store';
import { Tooltip } from '@/components/ui/tooltip';

export function SelectionToolbar() {
  const count = useCanvas((s) => s.selectedIds.size);
  if (count === 0) return null;

  const a = useCanvas.getState();
  return (
    <div className="pointer-events-auto glass flex items-center gap-1 rounded-2xl px-1.5 py-1.5 shadow-xl">
      <span className="px-2 text-xs text-fg-muted">{count} selected</span>
      <div className="mx-0.5 h-5 w-px bg-border" />
      <Tooltip content="Duplicate" shortcut="⌘D">
        <IconButton onClick={() => a.duplicateSelection()}>
          <Copy className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Bring forward" shortcut="⌘]">
        <IconButton onClick={() => a.bringForward()}>
          <ChevronUp className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Send backward" shortcut="⌘[">
        <IconButton onClick={() => a.sendBackward()}>
          <ChevronDown className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Bring to front" shortcut="⌘⇧]">
        <IconButton onClick={() => a.bringToFront()}>
          <ArrowUpToLine className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Send to back" shortcut="⌘⇧[">
        <IconButton onClick={() => a.sendToBack()}>
          <ArrowDownToLine className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <div className="mx-0.5 h-5 w-px bg-border" />
      <Tooltip content="Delete" shortcut="Del">
        <IconButton onClick={() => a.deleteSelection()} destructive>
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  destructive,
}: {
  children: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        'flex h-8 w-8 items-center justify-center rounded-xl transition-colors ' +
        (destructive
          ? 'text-fg-muted hover:bg-red-500/10 hover:text-red-500'
          : 'text-fg-muted hover:bg-bg-muted hover:text-fg')
      }
    >
      {children}
    </button>
  );
}
