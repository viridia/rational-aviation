import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Point2D = [number, number];
export type NodeID = number;

/** A node graph. */
export interface IGraph {
  /** Map of ids to nodes. */
  nodes: Record<NodeID, IGraphNode>;

  /** List of connections. */
  connections: IConnection[];

  /** Next node id for adding nodes. */
  nextNodeId: NodeID;
}

/** Defines an individual node in the graph. */
export interface IGraphNode<Payload = unknown> {
  id: NodeID;
  position: Point2D;
  width: number;
  height: number;
  title: string;
  data: Payload;
}

/** A connection between two nodes. */
export interface IConnection {
  startNode: NodeID;
  endNode: NodeID;
  route: Point2D[];
}

export const emptyGraph: IGraph = {
  nodes: {},
  connections: [],
  nextNodeId: 1,
};

interface IGraphMoveNodeParams {
  nodeId: number;
  position: Point2D;
}

/** Redux reducers for IGraph */
export const graphSlice = createSlice({
  name: 'graph',
  initialState: emptyGraph,
  reducers: {
    /** Add a node to the graph. */
    addNode(state, action: PayloadAction<Omit<IGraphNode, 'id'>>) {
      const nodeId = state.nextNodeId++;
      state.nodes[nodeId] = {
        ...action.payload,
        id: nodeId,
      };
    },

    /** Move a node to a new location. */
    moveNode(state, action: PayloadAction<IGraphMoveNodeParams>) {
      const { nodeId, position } = action.payload;
      const node = state.nodes[nodeId];
      node.position = position;
    },

    /** Create a connection between two nodes. */
    connect(state, action: PayloadAction<{ startNode: number; endNode: number }>) {
      const { startNode, endNode } = action.payload;
      // TODO: Check for existing connection?
      // TODO: Should we do routing here (sync) or asynchronously?
      state.connections.push({
        startNode,
        endNode,
        route: [],
      });
    },

    /** Delete a connection between two nodes. */
    disconnect(state, action: PayloadAction<{ startNode: number; endNode: number }>) {
      const { startNode, endNode } = action.payload;
      // Could also do this with connections.filter - don't know which is better
      const index = state.connections.findIndex(conn => {
        (conn.startNode === startNode && conn.endNode === endNode) ||
          (conn.startNode === endNode && conn.endNode === startNode);
      });
      if (index >= 0) {
        state.connections.splice(index, 1);
      }
    },
  },
});

export const { addNode, moveNode, connect, disconnect } = graphSlice.actions;
