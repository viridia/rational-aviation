import { FC, memo } from 'react';

export const GraphEdgeMarkers: FC = memo(() => (
  <defs>
    <marker
      id="small-arrow"
      viewBox="0 0 10 10"
      refX="10"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M 0 1 L 10 5 L 0 9 z" fill="green" />
    </marker>
  </defs>
));
