import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NodeID } from './graphSlice';
import { AppPoint } from '../lib/geometry';

/** The kind of action which will be performed when the gesture is completed. */
export type GestureType = 'move' | 'create';

/** A 'gesture' is a drag action. */
export interface IGesture {
  type: GestureType | null;

  /** The element on which we which we clicked to start the drag.
   *  For now, let's assume it's a node.
   */
  anchorNode: NodeID | null;

  /** Initial pointer position. */
  anchorPos: AppPoint;

  /** Node currently being hovered. */
  targetNode: NodeID | null;

  /** Current pointer position. */
  targetPos: AppPoint;
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
    beginDrag(state, action: PayloadAction<{ anchor: NodeID; pos: AppPoint; type: GestureType }>) {
      const { anchor, pos, type } = action.payload;
      state.type = type;
      state.anchorNode = anchor;
      state.anchorPos = state.targetPos = pos;
      state.targetNode = null;
    },

    /** Update the coordinates of the drag. */
    updateDrag(state, action: PayloadAction<{ targetPos: AppPoint; targetNode: NodeID | null }>) {
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

export const { beginDrag, updateDrag, endDrag, cancelDrag } = gestureSlice.actions;
