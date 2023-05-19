import { style } from '@vanilla-extract/css';

export const graphContainerCss = style({
  textAlign: 'center',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'var(--background)',
  cursor: 'crosshair',
  overflow: 'auto',

  // CSS checkerboard pattern
  backgroundImage: [
    `linear-gradient(
    45deg,
    var(--colorGraphBgSquares) 25%,
    transparent 25%,
    transparent 75%,
    var(--colorGraphBgSquares) 75%,
    var(--colorGraphBgSquares)
  ), linear-gradient(
    45deg,
    var(--colorGraphBgSquares) 25%,
    transparent 25%,
    transparent 75%,
    var(--colorGraphBgSquares) 75%,
    var(--colorGraphBgSquares)
  )`,
  ],
  backgroundSize: '32px 32px',
  backgroundPosition: '0 0, 16px 16px',

  // Theme variables for graph background - put these somewhere
  vars: {
    '--colorGraphBgSquares': 'rgba(255, 255, 255, 0.03)',
  },

  selectors: {
    '&.isDragging': {
      cursor: 'none',
    },
  },
});

export const graphContainerScrollCss = style({});

export const graphContentCss = style({
  left: 0,
  top: 0,
  pointerEvents: 'none',
});
