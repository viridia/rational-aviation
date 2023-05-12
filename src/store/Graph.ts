import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Point2D = [number, number];

/** A node graph. */
export interface IGraph {
  /** Map of ids to nodes. */
  nodes: Record<number, IGraphNode>;

  /** List of connections. */
  connections: IConnection[];

  /** Next node id for adding nodes. */
  nextNodeId: number;
}

/** Defines an individual node in the graph. */
export interface IGraphNode<Payload = unknown> {
  id: number;
  position: Point2D;
  width: number;
  height: number;
  title: string;
  data: Payload;
}

/** A connection between two nodes. */
export interface IConnection {
  startNode: number;
  endNode: number;
  route: Point2D[];
}

export const emptyGraph: IGraph = {
  nodes: {},
  connections: [],
  nextNodeId: 1,
};

export interface IGraphMoveNodeParams {
  nodeId: number;
  position: Point2D;
}

/** Redux reducers for IGraph */
export const graphSlice = createSlice({
  name: 'graph',
  initialState: emptyGraph,
  reducers: {
    addNode(state, action: PayloadAction<Omit<IGraphNode, 'id'>>) {
      const nodeId = state.nextNodeId++;
      state.nodes[nodeId] = {
        ...action.payload,
        id: nodeId,
      };
    },

    moveNode(state, action: PayloadAction<IGraphMoveNodeParams>) {
      const { nodeId, position } = action.payload;
      const node = state.nodes[nodeId];
      node.position = position
    },
  },
});

export const { addNode, moveNode } = graphSlice.actions;
