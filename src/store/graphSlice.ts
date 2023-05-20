import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppPoint, AppSize } from '../lib/geometry';
import { invariant } from '../lib/invariant';

export type NodeID = string;

/** A node graph. */
export interface IGraph {
  /** Map of ids to nodes. */
  nodes: Record<NodeID, IGraphNode>;

  /** List of edges. */
  edges: IEdge[];

  /** Next node id for adding nodes. */
  nextNodeId: number;
}

/** Defines an individual node in the graph. */
export interface IGraphNode<Payload = unknown> {
  id: NodeID;
  position: AppPoint;
  size: AppSize;
  title: string;
  data: Payload;
}

/** When inputting nodes for the first time, 'id' is not included. */
export type IGraphNodeInput = Omit<IGraphNode, 'id'>;

/** A connection between two nodes. */
export interface IEdge {
  source: NodeID;
  target: NodeID;
  route: AppPoint[];
  baseRoute: AppPoint[];
}

export type IEdgeInput = Omit<IEdge, 'route' | 'baseRoute'>;

export const emptyGraph: IGraph = {
  nodes: {},
  edges: [],
  nextNodeId: 1,
};

interface IGraphMoveNodeParams {
  nodeId: number;
  position: AppPoint;
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

    /** Create an edge between two nodes. */
    addEdge(state, action: PayloadAction<IEdgeInput>) {
      const { source, target } = action.payload;
      // TODO: Check for existing edge?
      state.edges.push({
        source,
        target,
        route: [],
        baseRoute: [],
      });
    },

    /** Create an edge between two nodes. */
    addEdges(state, action: PayloadAction<IEdgeInput[]>) {
      // TODO: Check for existing edge?
      state.edges.push(
        ...action.payload.map(({ source, target }) => ({
          source,
          target,
          route: [],
          baseRoute: [],
        }))
      );
    },

    /** Delete an edge between two nodes. */
    removeEdge(state, action: PayloadAction<IEdgeInput>) {
      const { source, target } = action.payload;
      // Could also do this with edges.filter - don't know which is better
      const index = state.edges.findIndex(conn => {
        (conn.source === source && conn.target === target) ||
          (conn.source === target && conn.target === source);
      });
      if (index >= 0) {
        state.edges.splice(index, 1);
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

    routeEdges(state) {
      state.edges.forEach(edge => {
        const source = state.nodes[edge.source];
        const target = state.nodes[edge.target];
        invariant(source);
        invariant(target);
        const [sx, sy] = source.position;
        const [sw, sh] = source.size;
        const [ex, ey] = target.position;
        const [, eh] = target.size;

        const smy = sy + sh * 0.5;
        const emy = ey + eh * 0.5;

        const sr = sx + sw;

        // Super-cheesy layout algorithm.

        const vertices: AppPoint[] = [[sr, smy]];
        if (smy !== emy) {
          vertices.push([sr + (ex - sr) * 0.25, smy], [sr + (ex - sr) * 0.75, emy]);
        }
        vertices.push([ex, emy]);

        edge.baseRoute = edge.route;
        edge.route = vertices;
        if (edge.baseRoute.length === 0) {
          edge.baseRoute = edge.route;
        }
      });
    },
  },
});

export const {
  addNode,
  addNodes,
  moveNode,
  addEdge,
  addEdges,
  removeEdge,
  layoutOrdered,
  layoutRandom,
  routeEdges,
} = graphSlice.actions;

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
