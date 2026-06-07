import {
  Infinity as InfinityIcon,
  Bot,
  Network,
  Users,
  GitBranch,
  FileSearch,
  PenTool,
  Layers,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: InfinityIcon,
    title: 'Infinite canvas',
    body: 'Pan, zoom and scroll with zero friction. Smart grids, snapping and a mini-map keep huge boards navigable.',
  },
  {
    icon: Bot,
    title: 'AI Copilot',
    body: 'Generate mind maps, diagrams, system designs and research boards from one prompt. Built on GPT, Claude and Gemini.',
  },
  {
    icon: Network,
    title: 'Knowledge graph',
    body: 'Every board, note and link becomes part of a personal knowledge graph — your visual second brain.',
  },
  {
    icon: Users,
    title: 'Live collaboration',
    body: 'Multi-cursor editing, presence, comments, reactions and voice rooms — powered by Yjs + Liveblocks.',
  },
  {
    icon: GitBranch,
    title: 'Smart connectors',
    body: 'Connectors that route themselves, auto-avoid overlap and reconnect when you move things. Always tidy.',
  },
  {
    icon: FileSearch,
    title: 'PDF → board',
    body: 'Drop a PDF and IngenBoard turns it into a mind map, study notes or a visual summary in seconds.',
  },
  {
    icon: PenTool,
    title: 'Drawing tools',
    body: 'Pen, marker, highlighter, brush, laser pointer, lasso, magic selection — pressure-aware where supported.',
  },
  {
    icon: Layers,
    title: 'Modes for everything',
    body: 'Mind map, system design, product, startup, education modes — each with bespoke tools and templates.',
  },
  {
    icon: Sparkles,
    title: 'AI layout engine',
    body: 'One click to beautify: align, group, untangle and rebalance the entire board in milliseconds.',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">Everything in one place</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            A canvas that thinks alongside you.
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            IngenBoard fuses the freedom of an infinite whiteboard with the
            intelligence of frontier AI and the rigor of a knowledge system.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative bg-bg p-6 transition-colors hover:bg-bg-subtle"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-muted text-accent transition-colors group-hover:bg-accent/15">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
