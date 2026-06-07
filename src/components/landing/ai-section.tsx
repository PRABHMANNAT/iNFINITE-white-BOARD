import { Wand2 } from 'lucide-react';

const prompts = [
  'Generate a startup roadmap for an AI tutoring app',
  'Design the database schema for a multi-tenant SaaS',
  'Turn this PDF into a study mind map',
  'Build a system design for a real-time chat product',
];

export function LandingAISection() {
  return (
    <section id="ai" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-medium text-accent">AI-native, end to end</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Type a prompt.<br />Get a whole board.
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            The IngenBoard Copilot doesn&apos;t just chat — it draws. Generate
            entire diagrams, mind maps, system designs and research boards from
            a single sentence. Then refine, expand and rearrange visually.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-fg-muted">
            {[
              'Mind-map generator with auto-expansion',
              'Text → diagram (flow, ER, UML, sequence)',
              'PDF → visual notes',
              'Board chat — ask questions about your canvas',
              'Autonomous Board Builder for whole objectives',
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass relative rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs text-fg-muted">
            <Wand2 className="h-3.5 w-3.5 text-accent" />
            Copilot
          </div>
          <div className="mt-3 space-y-2">
            {prompts.map((p, i) => (
              <div
                key={p}
                className="flex items-center justify-between rounded-xl border border-border bg-bg/60 px-3 py-2 text-sm"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="truncate text-fg">{p}</span>
                <span className="ml-3 rounded-md bg-accent/15 px-2 py-0.5 text-xs text-accent">
                  Run
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-border p-4 text-xs text-fg-muted">
            Prompt: <span className="text-fg">&ldquo;Explain transformers as a board&rdquo;</span>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {['Self-attention', 'Positional encoding', 'Feed forward', 'Multi-head', 'Residuals', 'LayerNorm'].map(
                (t) => (
                  <div
                    key={t}
                    className="rounded-lg border border-border bg-bg-subtle px-2 py-1.5 text-center text-[11px] text-fg"
                  >
                    {t}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
