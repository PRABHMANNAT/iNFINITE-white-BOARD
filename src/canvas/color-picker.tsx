'use client';

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { cn } from '@/lib/cn';

export function ColorPicker({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}) {
  // currentColor displays the theme foreground swatch
  const isCurrent = value === 'currentColor';
  const isTransparent = value === 'transparent';
  const [open, setOpen] = useState(false);
  const safeValue = isCurrent || isTransparent ? '#888888' : value;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          aria-label={label ?? 'Pick color'}
          className={cn(
            'h-6 w-6 rounded-md border transition-transform hover:scale-105',
            open ? 'border-accent scale-110' : 'border-border',
            isTransparent &&
              'bg-[conic-gradient(at_50%_50%,#0000_25%,#88888822_0_50%,#0000_0_75%,#88888822_0)] bg-[length:8px_8px]'
          )}
          style={{
            background: isTransparent ? undefined : isCurrent ? 'currentColor' : value,
            color: isCurrent ? 'currentColor' : undefined,
          }}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className="z-[80] rounded-2xl border border-border bg-bg p-3 shadow-2xl outline-none"
        >
          <HexColorPicker color={safeValue} onChange={onChange} />
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-fg-muted">#</span>
            <HexColorInput
              color={safeValue}
              onChange={onChange}
              prefixed={false}
              className="flex-1 rounded-md border border-border bg-bg-muted px-2 py-1 font-mono text-xs uppercase outline-none focus:border-accent"
            />
            <button
              onClick={() => onChange('transparent')}
              className="rounded-md bg-bg-muted px-2 py-1 text-xs text-fg-muted hover:bg-bg-subtle"
            >
              None
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
