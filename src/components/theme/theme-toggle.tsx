'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/cn';

const OPTIONS = [
  { id: 'light', icon: Sun, label: 'Light' },
  { id: 'system', icon: Monitor, label: 'System' },
  { id: 'dark', icon: Moon, label: 'Dark' },
] as const;

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Placeholder before mount so layout doesn't jump (theme is unknown on server)
  if (!mounted) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 rounded-full border border-border bg-bg-muted/60 p-0.5',
          compact ? 'h-7' : 'h-8'
        )}
        aria-hidden
      />
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-border bg-bg-muted/60 p-0.5',
        compact ? 'h-7' : 'h-8'
      )}
    >
      {OPTIONS.map(({ id, icon: Icon, label }) => {
        const active = theme === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(id)}
            className={cn(
              'flex items-center justify-center rounded-full transition-all',
              compact ? 'h-6 w-6' : 'h-7 w-7',
              active
                ? 'bg-bg text-fg shadow-sm'
                : 'text-fg-subtle hover:text-fg'
            )}
          >
            <Icon className={cn(compact ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
          </button>
        );
      })}
    </div>
  );
}
