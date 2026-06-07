'use client';

import * as React from 'react';
import * as RTooltip from '@radix-ui/react-tooltip';
import { cn } from '@/lib/cn';

export const TooltipProvider = ({
  children,
  delayDuration = 200,
}: {
  children: React.ReactNode;
  delayDuration?: number;
}) => (
  <RTooltip.Provider delayDuration={delayDuration} skipDelayDuration={400}>
    {children}
  </RTooltip.Provider>
);

export function Tooltip({
  children,
  content,
  side = 'top',
  shortcut,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  shortcut?: string;
}) {
  if (!content) return <>{children}</>;
  return (
    <RTooltip.Root>
      <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
      <RTooltip.Portal>
        <RTooltip.Content
          side={side}
          sideOffset={6}
          className={cn(
            'z-[100] flex items-center gap-2 rounded-lg border border-border bg-bg-muted/95 px-2.5 py-1.5 text-xs text-fg shadow-lg backdrop-blur',
            'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
          )}
        >
          <span>{content}</span>
          {shortcut && (
            <kbd className="rounded border border-border bg-bg/60 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted">
              {shortcut}
            </kbd>
          )}
          <RTooltip.Arrow className="fill-bg-muted" />
        </RTooltip.Content>
      </RTooltip.Portal>
    </RTooltip.Root>
  );
}
