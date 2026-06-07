export type Point = { x: number; y: number };

export type Tool =
  | 'select'
  | 'pan'
  | 'pen'
  | 'highlighter'
  | 'marker'
  | 'eraser'
  | 'rectangle'
  | 'ellipse'
  | 'diamond'
  | 'triangle'
  | 'arrow'
  | 'line'
  | 'text'
  | 'sticky';

export type ShapeBase = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  stroke: string;
  fill: string;
  strokeWidth: number;
  opacity: number;
  rotation: number;
};

export type StrokeElement = {
  type: 'stroke';
  tool: 'pen' | 'highlighter' | 'marker';
  points: number[]; // flat: [x1,y1,x2,y2,...]
  stroke: string;
  strokeWidth: number;
  opacity: number;
  id: string;
};

export type RectangleElement = ShapeBase & { type: 'rectangle' };
export type EllipseElement = ShapeBase & { type: 'ellipse' };
export type DiamondElement = ShapeBase & { type: 'diamond' };
export type TriangleElement = ShapeBase & { type: 'triangle' };
export type LineElement = ShapeBase & { type: 'line' };
export type ArrowElement = ShapeBase & { type: 'arrow' };
export type TextElement = ShapeBase & {
  type: 'text';
  text: string;
  fontSize: number;
};
export type StickyElement = ShapeBase & {
  type: 'sticky';
  text: string;
};

export type CanvasElement =
  | StrokeElement
  | RectangleElement
  | EllipseElement
  | DiamondElement
  | TriangleElement
  | LineElement
  | ArrowElement
  | TextElement
  | StickyElement;

export type ViewportState = {
  x: number;
  y: number;
  zoom: number;
};

export type GridMode = 'none' | 'dots' | 'squares' | 'iso';

export type ShapeStyle = 'clean' | 'sketchy';
