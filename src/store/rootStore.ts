import { configureStore } from '@reduxjs/toolkit';
import { addNode, graphSlice } from './Graph';

export const rootStore = configureStore({
  reducer: {
    graph: graphSlice.reducer,
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

// Add an initial node for testing
rootStore.dispatch(
  addNode({
    title: 'Test Node',
    position: [10, 10],
    width: 50,
    height: 50,
    data: null,
  })
);

rootStore.dispatch(
  addNode({
    title: 'Test Node 2',
    position: [100, 10],
    width: 100,
    height: 50,
    data: null,
  })
);
