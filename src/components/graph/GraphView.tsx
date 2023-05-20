import { FC, useRef } from 'react';
import { graphContainerCss, graphContainerScrollCss, graphContentCss } from './GraphView.css';
import { GraphNode } from './GraphNode';
import { useAppSelector } from '../../store/hooks';
import { GraphEdge } from './GraphEdge';
import { GestureFeedback } from './GestureFeedback';
import clsx from 'clsx';
import { GraphEdgeMarkers } from './GraphEdgeMarkers';
import { useGraphDrag } from '../../hooks/useGraphDrag';

export const GraphView: FC = () => {
  const graph = useAppSelector(state => state.graph);
  const isDragging = useAppSelector(state => !!state.gesture.type);
  const ref = useRef<HTMLDivElement>(null);
  const { onDragNode, dragMethods } = useGraphDrag(ref);

  // TODO: Adjust document dimensions based on content.
  return (
    <div ref={ref} className={clsx(graphContainerCss, { isDragging })} {...dragMethods}>
      <div className={graphContainerScrollCss}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', left: 0, top: 0 }}
          className={graphContentCss}
          // TODO: Add logic to recompute the viewBox based on the bounding box of all content.
          // viewBox={viewBox()}
          width={6000}
          height={2100}
        >
          <GraphEdgeMarkers />
          {Object.values(graph.nodes).map(node => (
            <GraphNode key={node.id} nodeId={node.id} onStartDrag={onDragNode} />
          ))}
          {graph.edges.map(edge => {
            return <GraphEdge key={`${edge.source}:${edge.target}`} edge={edge} />;
          })}
          <GestureFeedback />;
        </svg>
      </div>
    </div>
  );
};
