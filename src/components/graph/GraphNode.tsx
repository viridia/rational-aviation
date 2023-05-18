import { FC, useEffect } from 'react';
import { NodeID } from '../../store';
import { useAppSelector } from '../../store/hooks';
import { animated, useSpring } from '@react-spring/web';
import { graphNodeCss } from './GraphNode.css';
import clsx from 'clsx';

interface Props {
  nodeId: number;
  onStartDrag: (e: React.PointerEvent, nodeId: NodeID) => void;
}

export const GraphNode: FC<Props> = ({ nodeId, onStartDrag }) => {
  const node = useAppSelector(state => state.graph.nodes[nodeId]);
  const isAnchor = useAppSelector(state => state.gesture.anchorNode === nodeId);

  const [x, y] = node.position;
  const [props, api] = useSpring(() => ({
    from: { x, y },
  }));

  useEffect(() => {
    api.start({
      to: { x, y },
    });
  }, [x, y]);

  return (
    <animated.rect
      className={clsx(graphNodeCss, { isAnchor })}
      x={props.x}
      y={props.y}
      width={node.width}
      height={node.height}
      onPointerDown={e => {
        onStartDrag(e, nodeId);
      }}
    ></animated.rect>
  );
};
