import { style } from '@vanilla-extract/css';

export const nodeCss = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  border: '1px solid gray',
  borderRadius: 7,
  backgroundColor: 'black',
  fontSize: '13px',
  cursor: 'pointer',
  userSelect: 'none',
  overflow: 'hidden',

  ':hover': {
    boxShadow: '0 0 4px 1px #0f0',
  },

  selectors: {
    '&.isAnchor': {
      boxShadow: '0 0 4px 1px #0f0',
    },
    '&.isTarget': {
      boxShadow: '0 0 4px 2px #f0f',
    },
  },
});

export const nodeHeaderCss = style({
  pointerEvents: 'none',
  backgroundColor: '#222',
  borderBottom: '1px solid #555',
  padding: '2px 0',
});

export const nodeBodyCss = style({
  pointerEvents: 'none',
  padding: '2px 0',
  fontSize: '12px',
  color: '#aaa',
});
