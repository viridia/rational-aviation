import { FC, useRef } from 'react';
import { graphContainerCss, graphContainerScrollCss, graphContentCss } from './GraphView.css';
import { GraphNode } from './GraphNode';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { GraphConnection } from './GraphConnection';
import { GestureFeedback } from './GestureFeedback';
import { NodeID, beginDrag, cancelDrag, endDrag, updateDrag } from '../../store';
import clsx from 'clsx';

export const GraphView: FC = () => {
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
      <div className={graphContainerScrollCss}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', left: 0, top: 0 }}
          className={graphContentCss}
          // TODO: Add logic to recompute the viewBox based on the bounding box of all content.
          // viewBox={viewBox()}
          // class="connectors"
          width={20000}
          height={20000}
        >
          {Object.values(graph.nodes).map(node => (
            <GraphNode key={node.id} nodeId={node.id} onStartDrag={onStartDragNode} />
          ))}
          {graph.connections.map(conn => {
            // Note: I'm not familiar enough with Redux to be certain that this is efficient.
            // I worry that adding or removing a connection will require re-rendering all connections.
            // The previous section, with the nodes, doesn't have this problem since it only
            // passes the node id.
            const startNode = graph.nodes[conn.startNode];
            const endNode = graph.nodes[conn.endNode];
            return (
              startNode &&
              endNode && (
                <GraphConnection
                  key={`${conn.startNode}:${conn.endNode}`}
                  startNode={startNode}
                  endNode={endNode}
                />
              )
            );
          })}
          <GestureFeedback />;
        </svg>
      </div>
    </div>
  );
};
