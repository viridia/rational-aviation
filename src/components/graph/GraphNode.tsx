import { FC, memo, useEffect } from 'react';
import { NodeID } from '../../store';
import { useAppSelector } from '../../store/hooks';
import { animated, useSpring } from '@react-spring/web';
import { graphNodeCss } from './GraphNode.css';
import clsx from 'clsx';

interface Props {
  nodeId: NodeID;
  onStartDrag: (e: React.PointerEvent, nodeId: NodeID) => void;
}

export const GraphNode: FC<Props> = memo(({ nodeId, onStartDrag }) => {
  const node = useAppSelector(state => state.graph.nodes[nodeId]);
  const isAnchor = useAppSelector(state => state.gesture.anchorNode === nodeId);
  const isTarget = useAppSelector(state => state.gesture.targetNode === nodeId);

  const [x, y] = node.position;
  const [props, api] = useSpring(() => ({
    from: { x, y },
  }));

  useEffect(() => {
    // api.set({ x, y });
    api.start({
      to: { x, y },
    });
  }, [x, y]);

  return (
    <animated.rect
      className={clsx(graphNodeCss, { isAnchor, isTarget })}
      x={props.x}
      y={props.y}
      width={node.width}
      height={node.height}
      onPointerDown={e => {
        onStartDrag(e, nodeId);
      }}
      data-nodeid={nodeId}
    >
      <text fill="red">{nodeId}</text>
    </animated.rect>
  );
});
