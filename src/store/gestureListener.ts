import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addNode } from './graphSlice';
import { gestureSlice } from './gestureSlice';
import type { AppStartListening } from './rootStore';

export const gestureListener = createListenerMiddleware();
const startAppListening = gestureListener.startListening as AppStartListening;

startAppListening({
  actionCreator: gestureSlice.actions.endDrag,
  effect: async (action, listenerApi) => {
    const gesture = listenerApi.getState().gesture;
    const [x, y] = gesture.targetPos;
    listenerApi.dispatch(
      addNode({
        title: 'New Node',
        position: [x - 25, y - 25],
        size: [50, 50],
        data: null,
      })
    );
  },
});
