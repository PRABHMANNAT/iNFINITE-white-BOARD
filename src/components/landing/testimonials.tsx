const QUOTES = [
  {
    quote:
      "It feels like Figma and Notion had a baby — but the baby is genuinely creative on its own.",
    name: 'Maya Patel',
    role: 'Founder, Northwave AI',
  },
  {
    quote:
      "Our system-design interviews moved from Excalidraw to IngenBoard the week the AI Copilot dropped a real architecture for me.",
    name: 'Daniel Yu',
    role: 'Staff Engineer, Stripe',
  },
  {
    quote:
      "Turning a PDF chapter into a study board in 10 seconds changed how I revise. It's basically magic.",
    name: 'Sara Lindqvist',
    role: 'PhD Candidate, KTH',
  },
  {
    quote:
      "We replaced four tools with one. The team finally has a single canvas where strategy lives.",
    name: 'Felix Romero',
    role: 'Head of Product, Helix',
  },
];

export function LandingTestimonials() {
  return (
    <section className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-accent">Loved by thinkers</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          Built for the way your mind works.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="rounded-2xl border border-border bg-bg-subtle p-6"
            >
              <blockquote className="text-base leading-relaxed text-fg">
                <span className="text-accent">&ldquo;</span>
                {q.quote}
                <span className="text-accent">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, hsl(${
                      (q.name.charCodeAt(0) * 7) % 360
                    } 70% 60%), hsl(${(q.name.charCodeAt(1) * 11) % 360} 70% 60%))`,
                  }}
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-medium">{q.name}</p>
                  <p className="text-xs text-fg-muted">{q.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
