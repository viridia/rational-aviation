import { FC } from 'react';
import { graphContainerCss, graphContentCss } from './GraphView.css';
import { GraphNode } from './GraphNode';
import { useGraphSelector } from '../../store/hooks';

export const GraphView: FC = () => {
  const graph = useGraphSelector(state => state.graph);

  // TODO: Adjust document dimensions based on content.
  return (
    <div className={graphContainerCss}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', left: 0, top: 0 }}
        className={graphContentCss}
        // viewBox={viewBox()}
        // class="connectors"
        width={1000}
        height={1000}
      >
        {Object.values(graph.nodes).map(node => (
          <GraphNode key={node.id} nodeId={node.id} />
        ))}
      </svg>
    </div>
  );
};
