import { FC, useRef } from 'react';
import { graphContainerCss, graphContainerScrollCss, graphContentCss } from './GraphView.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { GraphEdge } from './GraphEdge';
import { GestureFeedback } from './GestureFeedback';
import { NodeID, beginDrag, cancelDrag, endDrag, updateDrag } from '../../store';
import clsx from 'clsx';
import { GraphEdgeMarkers } from './GraphEdgeMarkers';
import { HGraphNode } from './HGraphNode';

export const HGraphView: FC = () => {
  const graph = useAppSelector(state => state.graph);
  const isDragging = useAppSelector(state => !!state.gesture.type);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const onStartDragNode = (e: React.PointerEvent, nodeId: NodeID) => {
    if (ref.current) {
      ref.current.setPointerCapture(e.pointerId);
      const rect = ref.current!.getBoundingClientRect();
      dispatch(
        beginDrag({
          anchor: nodeId,
          pos: [e.clientX - rect.left, e.clientY - rect.top],
          type: 'move',
        })
      );
    }
  };

  // TODO: Adjust document dimensions based on content.
  return (
    <div
      ref={ref}
      className={clsx(graphContainerCss, { isDragging })}
      onPointerMove={e => {
        if (ref.current?.hasPointerCapture(e.pointerId)) {
          const rect = ref.current!.getBoundingClientRect();
          const elt = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
          dispatch(
            updateDrag({
              targetPos: [e.clientX - rect.left, e.clientY - rect.top],
              targetNode: (elt && elt.dataset.nodeid) ?? null,
            })
          );
        }
      }}
      onPointerUp={e => {
        if (ref.current?.hasPointerCapture(e.pointerId)) {
          dispatch(endDrag());
        }
      }}
      onPointerCancel={e => {
        if (ref.current?.hasPointerCapture(e.pointerId)) {
          dispatch(cancelDrag());
        }
      }}
    >
      {Object.values(graph.nodes).map(node => (
        <HGraphNode key={node.id} nodeId={node.id} onStartDrag={onStartDragNode} />
      ))}
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
          {graph.edges.map(edge => {
            return <GraphEdge key={`${edge.source}:${edge.target}`} edge={edge} />;
          })}
          <GestureFeedback />;
        </svg>
      </div>
    </div>
  );
};
