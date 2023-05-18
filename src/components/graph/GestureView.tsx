import { FC, memo, useMemo } from 'react';
import { graphContainerCss } from './GraphView.css';
import { useAppSelector } from '../../store/hooks';

export const GestureView: FC = memo(() => {
  const gesture = useAppSelector(state => state.gesture);
  const [ax, ay] = gesture.anchorPos;
  const [px, py] = gesture.pointerPos;

  const path = useMemo(() => {
    const fragments: string[] = [];
    fragments.push(`${ax} ${ay}`);
    fragments.push(`${px} ${py}`);
    return `M${fragments.join(' ')}`;
  }, [ax, ay, px, py]);

  return gesture.type ? (
    <path
      className={graphContainerCss}
      strokeWidth={2}
      stroke="red"
      d={path}
      fill="transparent"
    ></path>
  ) : null;
});
