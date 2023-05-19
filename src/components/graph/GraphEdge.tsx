import { FC, memo, useMemo } from 'react';
import { graphContainerCss } from './GraphView.css';
import { IEdge } from '../../store';

interface Props {
  edge: IEdge;
}

const CORNER_RADIUS = 32;

export const GraphEdge: FC<Props> = memo(({ edge }) => {
  const route = edge.route;

  const splinePath = useMemo(() => {
    if (route.length === 0) {
      return '';
    }

    const fragments: string[] = [];
    for (let i = 0, ct = route.length - 2; i < ct; i++) {
      const [x0, y0] = route[i];
      const [x1, y1] = route[i + 1];
      const [x2, y2] = route[i + 2];
      if (i === 0) {
        fragments.push(`M${x0} ${y0}`);
      }

      // Control points for rounded corners.
      let xm = x1;
      let ym = y1;
      let xn = x1;
      let yn = y1;

      const l0 = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
      const l1 = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

      xm = x0 + ((x1 - x0) * Math.max(0, l0 - CORNER_RADIUS)) / l0;
      ym = y0 + ((y1 - y0) * Math.max(0, l0 - CORNER_RADIUS)) / l0;

      xn = x2 - ((x2 - x1) * Math.max(0, l1 - CORNER_RADIUS)) / l1;
      yn = y2 - ((y2 - y1) * Math.max(0, l1 - CORNER_RADIUS)) / l1;

      // Use quadratic spline
      fragments.push(`L${xm} ${ym}`);
      fragments.push(`Q${x1} ${y1} ${xn} ${yn}`);

      if (i === ct - 1) {
        fragments.push(`L${x2} ${y2}`);
      }
    }
    return fragments.join(' ');
  }, [route]);

  return splinePath ? (
    <path
      className={graphContainerCss}
      strokeWidth={2}
      stroke="green"
      d={splinePath}
      fill="transparent"
      markerEnd="url(#small-arrow)"
    ></path>
  ) : null;
});
