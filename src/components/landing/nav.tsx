import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';

export function LandingNav() {
  return (
    <header className="sticky top-4 z-40 mx-auto w-[min(1100px,calc(100%-2rem))]">
      <nav className="glass flex items-center justify-between rounded-2xl px-4 py-2.5">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {[
            ['Product', '#features'],
            ['AI', '#ai'],
            ['Templates', '#templates'],
            ['Pricing', '#pricing'],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="rounded-lg px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/sign-in" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/canvas">
            <Button size="sm">Open canvas</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
