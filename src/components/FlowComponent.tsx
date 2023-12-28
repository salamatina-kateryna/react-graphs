import React, { useEffect } from "react";
import ReactFlow, { ReactFlowProvider } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import { selectNodes, setNodes } from "../store/nodesSlice";
import DefaultNode from "./Node";

const nodeTypes = {
  defaultNode: DefaultNode, // Register the custom node
};

export const FlowComponent: React.FC = () => {
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);

  useEffect(() => {
    // Load nodes from persistence layer and dispatch to store
    const savedNodes = null;
    if (savedNodes) {
      dispatch(setNodes(savedNodes));
    }
  }, [dispatch]);

  // Handle node position updates
  const onNodesChange = (changes: any) => {
    // Update nodes in the store and persist the changes
  };

  // Handle selection changes
  const onSelectionChange = (elements: any) => {
    // Dynamically change lower node values based on the selection
  };

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onSelectionChange={onSelectionChange}
        />
      </ReactFlowProvider>
    </div>
  );
};
