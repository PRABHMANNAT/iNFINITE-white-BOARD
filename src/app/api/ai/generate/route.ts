import { NextRequest } from 'next/server';

export const runtime = 'edge';

type Tool =
  | { name: 'addNode'; args: { id: string; x: number; y: number; text: string } }
  | { name: 'addEdge'; args: { from: string; to: string } }
  | { name: 'arrange'; args: { algorithm: 'tree' | 'radial' | 'grid' } };

/**
 * AI generation stub. Today it returns a deterministic radial mind map.
 * Drop in OpenAI / Anthropic streaming + tool-calls to make it real — the
 * client already consumes Server-Sent Events of shape:
 *   event: tool   data: { name, args }
 *   event: done   data: {}
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const prompt: string = body.prompt ?? 'Untitled idea';

  const branches = ['Why', 'How', 'Who', 'When', 'Where', 'Risks'];
  const events: Array<{ event: string; data: unknown }> = [
    { event: 'tool', data: { name: 'addNode', args: { id: 'root', x: 0, y: 0, text: prompt } } satisfies Tool },
    ...branches.flatMap((label, i): Array<{ event: string; data: Tool }> => {
      const angle = (i / branches.length) * Math.PI * 2;
      const r = 240;
      const id = `b${i}`;
      return [
        {
          event: 'tool',
          data: {
            name: 'addNode',
            args: { id, x: Math.cos(angle) * r, y: Math.sin(angle) * r, text: label },
          },
        },
        { event: 'tool', data: { name: 'addEdge', args: { from: 'root', to: id } } },
      ];
    }),
    { event: 'tool', data: { name: 'arrange', args: { algorithm: 'radial' } } satisfies Tool },
    { event: 'done', data: {} },
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (const e of events) {
        controller.enqueue(
          encoder.encode(`event: ${e.event}\ndata: ${JSON.stringify(e.data)}\n\n`)
        );
        await new Promise((r) => setTimeout(r, 120));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
