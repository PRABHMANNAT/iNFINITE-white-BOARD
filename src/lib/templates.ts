export type Template = {
  slug: string;
  title: string;
  category:
    | 'business'
    | 'engineering'
    | 'education'
    | 'research'
    | 'product'
    | 'startup'
    | 'marketing'
    | 'personal'
    | 'career';
  description: string;
};

export const TEMPLATES: Template[] = [
  // business
  { slug: 'lean-canvas', title: 'Lean Canvas', category: 'business', description: 'Single-page business model snapshot for early-stage ideas.' },
  { slug: 'swot', title: 'SWOT Analysis', category: 'business', description: 'Strengths, weaknesses, opportunities, threats — at a glance.' },
  { slug: 'business-model-canvas', title: 'Business Model Canvas', category: 'business', description: 'Nine-block canvas to visualize how your business creates value.' },
  { slug: 'okrs', title: 'OKR Board', category: 'business', description: 'Quarterly objectives and key results, mapped to owners.' },

  // engineering
  { slug: 'system-design', title: 'System Design', category: 'engineering', description: 'Load balancer, services, DBs, caches, queues — drag and drop.' },
  { slug: 'er-diagram', title: 'ER Diagram', category: 'engineering', description: 'Entity-relationship modeling for database schema design.' },
  { slug: 'sequence-diagram', title: 'Sequence Diagram', category: 'engineering', description: 'Time-ordered interactions between services and actors.' },
  { slug: 'flowchart', title: 'Flowchart', category: 'engineering', description: 'Decision and process flows with smart connectors.' },

  // product
  { slug: 'user-journey', title: 'User Journey', category: 'product', description: 'Map the full experience of your user across phases.' },
  { slug: 'product-roadmap', title: 'Product Roadmap', category: 'product', description: 'Timeline-based plan of product initiatives by quarter.' },
  { slug: 'sprint-planning', title: 'Sprint Planning', category: 'product', description: 'Backlog → in-progress → done with story sizing.' },
  { slug: 'kanban', title: 'Kanban Board', category: 'product', description: 'Lightweight task flow with WIP limits.' },

  // research
  { slug: 'research-board', title: 'Research Board', category: 'research', description: 'Topics, sources, summaries and timelines on one canvas.' },
  { slug: 'literature-map', title: 'Literature Map', category: 'research', description: 'Map how papers cite, support and challenge each other.' },

  // education
  { slug: 'concept-map', title: 'Concept Map', category: 'education', description: 'Connect ideas with labeled relationships.' },
  { slug: 'study-notes', title: 'Visual Study Notes', category: 'education', description: 'Mind-map style notes from a chapter or PDF.' },

  // startup
  { slug: 'startup-plan', title: 'Startup One-Pager', category: 'startup', description: 'Problem, solution, market, GTM, competitors, revenue.' },
  { slug: 'pitch-outline', title: 'Pitch Outline', category: 'startup', description: 'Storyline beats for an investor pitch.' },

  // marketing
  { slug: 'gtm-plan', title: 'Go-To-Market Plan', category: 'marketing', description: 'Personas, channels, message, launch sequencing.' },
  { slug: 'content-calendar', title: 'Content Calendar', category: 'marketing', description: 'Weeks of content mapped to themes and channels.' },

  // personal & career
  { slug: 'weekly-review', title: 'Weekly Review', category: 'personal', description: 'Wins, lessons, next-week priorities.' },
  { slug: 'career-map', title: 'Career Map', category: 'career', description: 'Skills, roles, milestones over a 5-year horizon.' },
];

export const CATEGORIES: Array<{ id: Template['category']; label: string }> = [
  { id: 'business', label: 'Business' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'product', label: 'Product' },
  { id: 'research', label: 'Research' },
  { id: 'education', label: 'Education' },
  { id: 'startup', label: 'Startup' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'personal', label: 'Personal' },
  { id: 'career', label: 'Career' },
];
