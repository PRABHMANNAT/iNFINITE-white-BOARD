import { CanvasSurface } from '@/canvas/surface';
import { CanvasToolbar } from '@/canvas/toolbar';
import { StylePanel } from '@/canvas/style-panel';
import { ZoomControls } from '@/canvas/zoom-controls';
import { Minimap } from '@/canvas/minimap';
import { AICopilot } from '@/canvas/ai-copilot';
import { CanvasTopbar } from '@/canvas/topbar';
import { ShortcutsHint } from '@/canvas/shortcuts-hint';
import { SelectionToolbar } from '@/canvas/selection-toolbar';
import { CommandPalette } from '@/canvas/command-palette';
import { CanvasEmptyState } from '@/canvas/empty-state';
import { TooltipProvider } from '@/components/ui/tooltip';

export const dynamic = 'force-dynamic';

export default function CanvasPage() {
  return (
    <TooltipProvider>
    <div className="relative h-screen w-screen overflow-hidden">
      <CanvasSurface />
      <CanvasEmptyState />

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-3 z-30 flex items-start justify-center px-3">
        <CanvasTopbar />
      </div>

      {/* Floating selection actions */}
      <div className="pointer-events-none absolute inset-x-0 top-20 z-30 flex justify-center">
        <SelectionToolbar />
      </div>

      {/* Bottom toolbar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex justify-center">
        <CanvasToolbar />
      </div>

      {/* Left style panel */}
      <div className="pointer-events-none absolute left-3 top-1/2 z-30 -translate-y-1/2">
        <StylePanel />
      </div>

      {/* Right column: copilot + minimap + zoom */}
      <div className="pointer-events-none absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end gap-3">
        <AICopilot />
        <Minimap />
        <ZoomControls />
      </div>

      {/* Bottom-left helpers */}
      <div className="pointer-events-none absolute bottom-5 left-3 z-30">
        <ShortcutsHint />
      </div>

      <CommandPalette />
    </div>
    </TooltipProvider>
  );
}
