import { PayloadAction, createListenerMiddleware, createSlice } from '@reduxjs/toolkit';
import { NodeID, Point2D, addNode } from './Graph';
import type { TypedStartListening } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './rootStore';

type GestureType = 'move' | 'create';

/** A 'gesture' is a drag action. */
export interface IGesture {
  type: GestureType | null;

  /** The element on which we which we clicked to start the drag.
   *  For now, let's assume it's a node.
   */
  anchorNode: NodeID | null;

  /** Initial pointer position. */
  anchorPos: Point2D;

  /** Node currently being hovered. */
  targetNode: NodeID | null;

  /** Current pointer position. */
  targetPos: Point2D;
}

export const initialState: IGesture = {
  type: null,
  anchorNode: null,
  anchorPos: [0, 0],
  targetNode: null,
  targetPos: [0, 0],
};

/** Redux reducers for IGraph */
export const gestureSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    /** Begin dragging. */
    beginDrag(state, action: PayloadAction<{ anchor: NodeID; pos: Point2D; type: GestureType }>) {
      const { anchor, pos, type } = action.payload;
      state.type = type;
      state.anchorNode = anchor;
      state.anchorPos = state.targetPos = pos;
      state.targetNode = null;
    },

    /** Update the coordinates of the drag. */
    updateDrag(state, action: PayloadAction<{ targetPos: Point2D; targetNode: NodeID | null }>) {
      state.targetPos = action.payload.targetPos;
      state.targetNode = action.payload.targetNode;
    },

    /** Finish dragging. */
    endDrag(state) {
      state.type = null;
      state.anchorNode = state.targetNode = null;
    },

    /** Cancel the drag operation. */
    cancelDrag(state) {
      state.type = null;
      state.anchorNode = state.targetNode = null;
    },
  },
});

// TODO: Move this to a separate file!
export const gestureListener = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening = gestureListener.startListening as AppStartListening;

startAppListening({
  actionCreator: gestureSlice.actions.endDrag,
  effect: async (action, listenerApi) => {
    const gesture = listenerApi.getState().gesture;
    const [x, y] = gesture.targetPos;
    listenerApi.dispatch(
      addNode({
        title: 'New Node',
        position: [x - 25, y - 25],
        width: 50,
        height: 50,
        data: null,
      })
    );
  },
});

export const { beginDrag, updateDrag, endDrag, cancelDrag } = gestureSlice.actions;
