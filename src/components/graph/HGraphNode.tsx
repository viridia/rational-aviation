import { FC, memo, useEffect } from 'react';
import { NodeID } from '../../store';
import { useAppSelector } from '../../store/hooks';
import { animated, useSpring } from '@react-spring/web';
import clsx from 'clsx';
import { nodeBodyCss, nodeCss, nodeHeaderCss } from './HGraphNode.css';

interface Props {
  nodeId: NodeID;
  onStartDrag: (e: React.PointerEvent, nodeId: NodeID) => void;
}

export const HGraphNode: FC<Props> = memo(({ nodeId, onStartDrag }) => {
  const node = useAppSelector(state => state.graph.nodes[nodeId]);
  const isAnchor = useAppSelector(state => state.gesture.anchorNode === nodeId);
  const isTarget = useAppSelector(state => state.gesture.targetNode === nodeId);

  const [x, y] = node.position;
  const [width, height] = node.size;
  const [style, api] = useSpring(() => ({
    from: { x, y, width, height },
  }));

  useEffect(() => {
    // api.set({ x, y });
    api.start({
      to: { x, y },
    });
  }, [x, y]);

  return (
    <animated.div
      className={clsx(nodeCss, { isAnchor, isTarget })}
      style={{ ...style }}
      onPointerDown={e => {
        onStartDrag(e, nodeId);
      }}
      data-nodeid={nodeId}
    >
      <header className={nodeHeaderCss}>{nodeId}</header>
      <div className={nodeBodyCss}>Node #{nodeId}</div>
    </animated.div>
  );
});
