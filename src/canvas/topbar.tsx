'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Share2, Users, MoreHorizontal, Check } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { ExportMenu } from './export-menu';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export function CanvasTopbar() {
  const [title, setTitle] = useState('Untitled board');
  const [saved] = useState<'saved' | 'saving'>('saved');

  return (
    <div className="pointer-events-auto glass flex items-center gap-2 rounded-2xl px-2.5 py-2 shadow-xl">
      <Link href="/" className="px-1">
        <Logo />
      </Link>
      <div className="mx-1 h-5 w-px bg-border" />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-44 rounded-md bg-transparent px-2 py-1 text-sm font-medium outline-none focus:bg-bg-muted"
      />
      <div className="flex items-center gap-1 rounded-md bg-bg-muted/60 px-2 py-1 text-[11px] text-fg-muted">
        <Check className="h-3 w-3 text-emerald-500" />
        {saved === 'saved' ? 'Saved' : 'Saving…'}
      </div>
      <div className="mx-1 h-5 w-px bg-border" />
      <ThemeToggle compact />
      <Button variant="ghost" size="sm">
        <Users className="h-3.5 w-3.5" />
        Invite
      </Button>
      <ExportMenu />
      <Button size="sm">
        <Share2 className="h-3.5 w-3.5" />
        Share
      </Button>
      <button className="flex h-8 w-8 items-center justify-center rounded-xl text-fg-muted hover:bg-bg-muted hover:text-fg">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}
