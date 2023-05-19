import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { graphSlice, routeEdges } from './graph';
import type { AppStartListening } from './rootStore';

export const graphListener = createListenerMiddleware();
const startAppListening = graphListener.startListening as AppStartListening;

startAppListening({
  matcher: isAnyOf(graphSlice.actions.layoutOrdered, graphSlice.actions.layoutRandom),
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(routeEdges());
  },
});
