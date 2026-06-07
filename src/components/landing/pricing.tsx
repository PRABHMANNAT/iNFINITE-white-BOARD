import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    description: 'For curious minds and side projects.',
    features: [
      'Infinite canvas',
      '3 boards',
      'AI Copilot — 30 prompts/mo',
      'PNG / SVG / JSON export',
      'Solo use',
    ],
    cta: 'Start free',
    accent: false,
  },
  {
    name: 'Pro',
    price: '$12',
    cadence: 'per month',
    description: 'Power user, all-day driver.',
    features: [
      'Unlimited boards',
      'AI Copilot — 600 prompts/mo',
      'PDF → board',
      'Version history (30 days)',
      'Custom templates',
      'Priority support',
    ],
    cta: 'Go Pro',
    accent: true,
  },
  {
    name: 'Team',
    price: '$24',
    cadence: 'per seat / month',
    description: 'Built for thinking together.',
    features: [
      'Everything in Pro',
      'Real-time multiplayer',
      'Workspace permissions',
      'Voice rooms + comments',
      'Shared templates',
      'SAML SSO (add-on)',
    ],
    cta: 'Try Team',
    accent: false,
  },
];

export function LandingPricing() {
  return (
    <section id="pricing" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Pricing</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Start free.<br />Scale as your team scales.
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            Every plan includes the AI Copilot, real-time canvas, and all
            export formats. Upgrade for unlimited boards and seats.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={cn(
                'relative rounded-2xl border p-6 transition-all',
                t.accent
                  ? 'border-accent/50 bg-accent/[0.04] glow'
                  : 'border-border bg-bg-subtle'
              )}
            >
              {t.accent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-fg">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-fg-muted">{t.description}</p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight">
                  {t.price}
                </span>
                <span className="text-sm text-fg-muted">{t.cadence}</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-accent" />
                    <span className="text-fg">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={t.accent ? 'primary' : 'outline'}
                size="md"
                className="mt-6 w-full justify-center"
              >
                {t.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-fg-muted">
          Need SSO, audit logs, on-prem, or a custom AI key?{' '}
          <a className="text-fg underline underline-offset-4" href="#">
            Talk to us about Enterprise →
          </a>
        </p>
      </div>
    </section>
  );
}
