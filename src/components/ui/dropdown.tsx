'use client';

import * as React from 'react';
import * as RDropdown from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/cn';

export const Dropdown = RDropdown.Root;
export const DropdownTrigger = RDropdown.Trigger;

export const DropdownContent = React.forwardRef<
  React.ElementRef<typeof RDropdown.Content>,
  React.ComponentPropsWithoutRef<typeof RDropdown.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RDropdown.Portal>
    <RDropdown.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-[70] min-w-[12rem] overflow-hidden rounded-xl border border-border bg-bg/95 p-1 shadow-2xl backdrop-blur',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...props}
    />
  </RDropdown.Portal>
));
DropdownContent.displayName = 'DropdownContent';

export const DropdownItem = React.forwardRef<
  React.ElementRef<typeof RDropdown.Item>,
  React.ComponentPropsWithoutRef<typeof RDropdown.Item> & { destructive?: boolean }
>(({ className, destructive, ...props }, ref) => (
  <RDropdown.Item
    ref={ref}
    className={cn(
      'flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-none transition-colors',
      destructive
        ? 'text-red-500 data-[highlighted]:bg-red-500/10'
        : 'text-fg data-[highlighted]:bg-bg-muted',
      className
    )}
    {...props}
  />
));
DropdownItem.displayName = 'DropdownItem';

export const DropdownSeparator = ({ className }: { className?: string }) => (
  <RDropdown.Separator className={cn('my-1 h-px bg-border', className)} />
);

export const DropdownLabel = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <RDropdown.Label
    className={cn('px-2 py-1 text-[10px] uppercase tracking-wide text-fg-subtle', className)}
  >
    {children}
  </RDropdown.Label>
);
