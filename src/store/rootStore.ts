import { configureStore } from '@reduxjs/toolkit';
import { addNode, connect, graphSlice } from './Graph';
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

// Add an initial node for testing
const node1 = rootStore.getState().graph.nextNodeId;
rootStore.dispatch(
  addNode({
    title: 'Test Node',
    position: [10, 10],
    width: 50,
    height: 50,
    data: null,
  })
);

const node2 = rootStore.getState().graph.nextNodeId;
rootStore.dispatch(
  addNode({
    title: 'Test Node 2',
    position: [100, 150],
    width: 100,
    height: 50,
    data: null,
  })
);

rootStore.dispatch(
  connect({
    startNode: node1,
    endNode: node2,
  })
);
