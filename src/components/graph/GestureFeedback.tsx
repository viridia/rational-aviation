import { FC, memo, useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { gestureFeedbackCss } from './GestureFeedback.css';

export const GestureFeedback: FC = memo(() => {
  const gesture = useAppSelector(state => state.gesture);
  const [ax, ay] = gesture.anchorPos;
  const [px, py] = gesture.targetPos;

  const path = useMemo(() => {
    const fragments: string[] = [];
    fragments.push(`${ax} ${ay}`);
    fragments.push(`${px} ${py}`);
    return `M${fragments.join(' ')}`;
  }, [ax, ay, px, py]);

  return gesture.type ? (
    <>
      <defs>
        {/* <marker
          id="feedback-end"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="red" />
        </marker> */}
        <marker
          id="feedback-end"
          viewBox="0 0 20 20"
          refX="10"
          refY="5"
          markerWidth="12"
          markerHeight="12"
          orient="auto-start-reverse"
        >
          <path
            d="M 10 2 L 2 5 L 10 8 L 18 5 z"
            stroke="yellow"
            strokeWidth={2}
            strokeLinejoin="miter"
          />
        </marker>
      </defs>
      <path
        className={gestureFeedbackCss}
        stroke="yellow"
        strokeWidth={3}
        strokeDasharray="8"
        d={path}
        fill="transparent"
        opacity={.3}
        markerEnd="url(#feedback-end)"
      ></path>
    </>
  ) : null;
});
