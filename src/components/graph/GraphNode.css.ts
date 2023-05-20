import { style } from '@vanilla-extract/css';

export const graphNodeCss = style({
  fill: 'black',
  strokeWidth: 2,
  stroke: 'red',
  pointerEvents: 'all',

  selectors: {
    '&.isAnchor': {
      fill: 'blue',
    },
    '&.isTarget': {
      fill: 'purple',
    },
  },
});
