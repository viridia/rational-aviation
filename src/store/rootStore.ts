import { configureStore } from '@reduxjs/toolkit';
import { IGraphNodeInput, addNodes, connect, graphSlice, layoutOrdered } from './Graph';
import { gestureListener, gestureSlice } from './Gesture';

export const rootStore = configureStore({
  reducer: {
    graph: graphSlice.reducer,
    gesture: gestureSlice.reducer,
  },

  middleware: getDefaultMiddlware => getDefaultMiddlware().prepend(gestureListener.middleware),
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

const nodes: IGraphNodeInput[] = [];
console.log('creating nodes');
for (let i = 0; i < 1000; i++) {
  // Add an initial node for testing
  nodes.push({
    title: `${i + 1}`,
    position: [0, 0],
    width: 50,
    height: 50,
    data: null,
  });
}
console.log('adding nodes');
rootStore.dispatch(addNodes(nodes));
console.log('layout');
rootStore.dispatch(layoutOrdered());

// Add an initial node for testing
rootStore.dispatch(
  connect({
    startNode: '1',
    endNode: '2',
  })
);
