import { FC, memo, useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { gestureFeedbackCss } from './GestureFeedback.css';

export const GestureFeedback: FC = memo(() => {
  const gesture = useAppSelector(state => state.gesture);
  const [ax, ay] = gesture.anchorPos;
  const [px, py] = gesture.targetPos;

  const path = useMemo(() => {
    if (!gesture.type) {
      return '';
    }
    const fragments: string[] = [];
    const l = Math.sqrt((px - ax) ** 2 + (py - ay) ** 2);
    if (l <= 0.0001) {
      return '';
    }
    const backOff = Math.min(l, 20);
    const ix = px - (px - ax) * backOff / l;
    const iy = py - (py - ay) * backOff / l;

    fragments.push(`M${ax} ${ay}`);
    fragments.push(`L${ix} ${iy}`);
    fragments.push(`M${px} ${py}`);
    return fragments.join(' ');
  }, [ax, ay, px, py]);

  return gesture.type && path ? (
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
          refX="20"
          refY="5"
          markerWidth="10"
          markerHeight="10"
          orient="auto-start-reverse"
        >
          <path
            d="M 10 1 L 2 5 L 10 9 L 18 5 z"
            stroke="yellow"
            strokeWidth={2}
            strokeLinejoin="miter"
            strokeDasharray="100"
            fill="transparent"
          />
        </marker>
      </defs>
      <path
        className={gestureFeedbackCss}
        stroke="yellow"
        strokeWidth={2}
        strokeDasharray="6,2"
        d={path}
        fill="transparent"
        opacity={.5}
        markerEnd="url(#feedback-end)"
      ></path>
    </>
  ) : null;
});
