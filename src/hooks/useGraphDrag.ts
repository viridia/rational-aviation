import { RefObject } from 'react';
import { NodeID, beginDrag, cancelDrag, endDrag, updateDrag, useAppDispatch } from '../store';

interface IGraphDragResult {
  /** Method to call to start dragging a node. */
  onDragNode(e: React.PointerEvent, nodeId: NodeID): void;

  /** These methods should be spread into the container element for the graph to handle
      pointer events. */
  dragMethods: {
    onPointerMove(e: React.PointerEvent): void;
    onPointerUp(e: React.PointerEvent): void;
    onPointerCancel(e: React.PointerEvent): void;
  };
}

/**
 * A React hook which handles various 'drag gestures' such as dragging a node.
 * @param ref A reference to the root element for the graph view.
 * @returns An object containing functions to initiate the drag, and methods to spread
 *   into the view element.
 *
*/
export const useGraphDrag = (ref: RefObject<HTMLDivElement>): IGraphDragResult => {
  const dispatch = useAppDispatch();

  const onDragNode = (e: React.PointerEvent, nodeId: NodeID) => {
    if (ref.current) {
      ref.current.setPointerCapture(e.pointerId);
      const rect = ref.current!.getBoundingClientRect();
      dispatch(
        beginDrag({
          anchor: nodeId,
          pos: [e.clientX - rect.left, e.clientY - rect.top],
          type: 'move',
        })
      );
    }
  };

  // TODO: Adjust document dimensions based on content.
  return {
    onDragNode,
    dragMethods: {
      onPointerMove: e => {
        if (ref.current?.hasPointerCapture(e.pointerId)) {
          const rect = ref.current!.getBoundingClientRect();
          const elt = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
          dispatch(
            updateDrag({
              targetPos: [e.clientX - rect.left, e.clientY - rect.top],
              targetNode: (elt && elt.dataset.nodeid) ?? null,
            })
          );
        }
      },

      onPointerUp: e => {
        if (ref.current?.hasPointerCapture(e.pointerId)) {
          dispatch(endDrag());
        }
      },

      onPointerCancel: e => {
        if (ref.current?.hasPointerCapture(e.pointerId)) {
          dispatch(cancelDrag());
        }
      },
    },
  };
};
