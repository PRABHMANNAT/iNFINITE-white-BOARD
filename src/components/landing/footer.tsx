import Link from 'next/link';
import { Logo } from '@/components/brand/logo';

const groups = [
  {
    title: 'Product',
    links: [
      ['Canvas', '/canvas'],
      ['Templates', '/templates'],
      ['Pricing', '#pricing'],
      ['Changelog', '#'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Docs', '#'],
      ['Roadmap', '#'],
      ['Blog', '#'],
      ['Brand', '#'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '#'],
      ['Careers', '#'],
      ['Contact', '#'],
      ['Privacy', '#'],
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="mt-24 border-t border-border px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-fg-muted">
              An AI-powered infinite whiteboard for thinking, planning, learning
              and collaboration.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-sm font-medium">{g.title}</p>
              <ul className="mt-3 space-y-2">
                {g.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-fg-subtle md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} IngenBoard. All rights reserved.</p>
          <p>Crafted for thinkers, builders, and curious minds.</p>
        </div>
      </div>
    </footer>
  );
}
