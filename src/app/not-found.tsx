import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 50% 30%, hsl(230 90% 60% / 0.25), transparent 60%)',
        }}
      />
      <Logo className="mb-8" />
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
        Lost in the canvas.
      </h1>
      <p className="mt-3 max-w-md text-fg-muted">
        The page you&apos;re looking for has been zoomed out of view.
      </p>
      <div className="mt-6 flex gap-2">
        <Link href="/">
          <Button>Back to home</Button>
        </Link>
        <Link href="/canvas">
          <Button variant="outline">Open canvas</Button>
        </Link>
      </div>
    </main>
  );
}
