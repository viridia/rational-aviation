import { FC } from 'react';
import { IGraph, IGraphNode, Point2D, moveNode } from '../../store';
import { graphContainerCss } from './GraphView.css';
import { useAppDispatch, useGraphSelector } from '../../store/hooks';

interface Props {
  nodeId: number;
}

export const GraphNode: FC<Props> = ({ nodeId }) => {
  const node = useGraphSelector(state => state.graph.nodes[nodeId]);
  const dispatch = useAppDispatch();

  const [x, y] = node.position;

  return (
    <rect
      className={graphContainerCss}
      x={x}
      y={y}
      width={node.width}
      height={node.height}
      strokeWidth={2}
      stroke="red"
      onPointerDown={e => {
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={e => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          dispatch(moveNode({ nodeId, position: [x + e.movementX, y + e.movementY] }));
        }
      }}
    ></rect>
  );
};
