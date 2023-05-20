import { TypedStartListening, configureStore } from '@reduxjs/toolkit';
import { IGraphNodeInput, addNodes, graphSlice, layoutOrdered, addEdges } from './graphSlice';
import { gestureSlice } from './gestureSlice';
import { gestureListener } from './gestureListener';
import { graphListener } from './graphListener';

export const rootStore = configureStore({
  reducer: {
    graph: graphSlice.reducer,
    gesture: gestureSlice.reducer,
  },

  middleware: getDefaultMiddlware =>
    getDefaultMiddlware().prepend(gestureListener.middleware, graphListener.middleware),
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

// Create Test Data.

const nodes: IGraphNodeInput[] = [];
console.log('creating nodes');
for (let i = 0; i < 1000; i++) {
  // Add an initial node for testing
  nodes.push({
    title: `${i + 1}`,
    position: [0, 0],
    size: [80, 50],
    data: null,
  });
}
console.log('adding nodes');
rootStore.dispatch(addNodes(nodes));
// Add an initial node for testing
rootStore.dispatch(
  addEdges([
    {
      source: '1',
      target: '190',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '8',
    },
    {
      source: '10',
      target: '190',
    },
  ])
);
console.log('layout');
rootStore.dispatch(layoutOrdered());
// rootStore.dispatch(routeEdges());
