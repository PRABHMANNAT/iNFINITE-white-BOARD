'use client';

import * as React from 'react';
import * as RDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

export const Dialog = RDialog.Root;
export const DialogTrigger = RDialog.Trigger;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RDialog.Content> & { hideCloseButton?: boolean }
>(({ className, children, hideCloseButton, ...props }, ref) => (
  <RDialog.Portal>
    <RDialog.Overlay className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
    <RDialog.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-[81] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-bg p-5 shadow-2xl outline-none',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        className
      )}
      {...props}
    >
      {children}
      {!hideCloseButton && (
        <RDialog.Close
          className="absolute right-3 top-3 rounded-md p-1 text-fg-muted hover:bg-bg-muted hover:text-fg"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </RDialog.Close>
      )}
    </RDialog.Content>
  </RDialog.Portal>
));
DialogContent.displayName = 'DialogContent';

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof RDialog.Title>
>(({ className, ...props }, ref) => (
  <RDialog.Title
    ref={ref}
    className={cn('text-base font-semibold', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof RDialog.Description>
>(({ className, ...props }, ref) => (
  <RDialog.Description
    ref={ref}
    className={cn('mt-1 text-sm text-fg-muted', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';
