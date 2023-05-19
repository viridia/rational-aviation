import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Point2D = [number, number];
export type NodeID = string;

/** A node graph. */
export interface IGraph {
  /** Map of ids to nodes. */
  nodes: Record<NodeID, IGraphNode>;

  /** List of connections. */
  connections: IConnection[];

  /** Next node id for adding nodes. */
  nextNodeId: number;
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

/** When inputting nodes for the first time, 'id' is not included. */
export type IGraphNodeInput = Omit<IGraphNode, 'id'>;

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
    addNode(state, action: PayloadAction<IGraphNodeInput>) {
      const nodeId = `${state.nextNodeId++}`;
      state.nodes[nodeId] = {
        ...action.payload,
        id: nodeId,
      };
    },

    /** Add multiple nodes to the graph in a single operation. */
    addNodes(state, action: PayloadAction<IGraphNodeInput[]>) {
      action.payload.forEach(node => {
        const nodeId = `${state.nextNodeId++}`;
        state.nodes[nodeId] = {
          ...node,
          id: nodeId,
        };
      });
    },

    /** Move a node to a new location. */
    moveNode(state, action: PayloadAction<IGraphMoveNodeParams>) {
      const { nodeId, position } = action.payload;
      const node = state.nodes[nodeId];
      node.position = position;
    },

    /** Create a connection between two nodes. */
    connect(state, action: PayloadAction<{ startNode: NodeID; endNode: NodeID }>) {
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
    disconnect(state, action: PayloadAction<{ startNode: NodeID; endNode: NodeID }>) {
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

    layoutOrdered(state) {
      const nodeIds = Object.keys(state.nodes).sort();
      for (let i = 0, ct = nodeIds.length; i < ct; i++) {
        const node = state.nodes[nodeIds[i]];
        const y = Math.floor(i / 50);
        const x = i - y * 50;
        node.position = [x * 100 + 50, y * 100 + 50];
      }
    },

    layoutRandom(state) {
      const nodeIds = shuffle(Object.keys(state.nodes));
      for (let i = 0, ct = nodeIds.length; i < ct; i++) {
        const node = state.nodes[nodeIds[i]];
        const y = Math.floor(i / 50);
        const x = i - y * 50;
        node.position = [x * 100 + 50, y * 100 + 50];
      }
    },
  },
});

export const { addNode, addNodes, moveNode, connect, disconnect, layoutOrdered, layoutRandom } =
  graphSlice.actions;

function shuffle(array: NodeID[]): NodeID[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
