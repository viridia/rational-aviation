import { FC } from 'react';
import { graphContainerCss, graphContentCss } from './GraphView.css';
import { GraphNode } from './GraphNode';
import { useGraphSelector } from '../../store/hooks';
import { GraphConnection } from './GraphConnection';

export const GraphView: FC = () => {
  const graph = useGraphSelector(state => state.graph);

  // TODO: Adjust document dimensions based on content.
  return (
    <div className={graphContainerCss}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', left: 0, top: 0 }}
        className={graphContentCss}
        // TODO: Add logic to recompute the viewBox based on the bounding box of all content.
        // viewBox={viewBox()}
        // class="connectors"
        width={1000}
        height={1000}
      >
        {Object.values(graph.nodes).map(node => (
          <GraphNode key={node.id} nodeId={node.id} />
        ))}
        {graph.connections.map(conn => {
          // Note: I'm not familiar enough with Redux to be certain that this is efficient.
          // I worry that adding or removing a connection will require re-rendering all connections.
          // The previous section, with the nodes, doesn't have this problem since it only
          // passes the node id.
          const startNode = graph.nodes[conn.startNode];
          const endNode = graph.nodes[conn.endNode];
          return (
            startNode &&
            endNode && (
              <GraphConnection
                key={`${conn.startNode}:${conn.endNode}`}
                startNode={startNode}
                endNode={endNode}
              />
            )
          );
        })}
      </svg>
    </div>
  );
};
