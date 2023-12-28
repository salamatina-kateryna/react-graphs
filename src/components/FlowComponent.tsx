import React, { useEffect } from "react";
import ReactFlow, { ReactFlowProvider } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import { selectNodes, setNodes } from "../store/nodesSlice";
import DefaultNode from "./Node";

const nodeTypes = {
  defaultNode: DefaultNode,
};

export const FlowComponent: React.FC = () => {
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);

  useEffect(() => {
    const savedNodes = null;
    if (savedNodes) {
      dispatch(setNodes(savedNodes));
    }
  }, [dispatch]);

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <ReactFlowProvider>
        <ReactFlow nodes={nodes} nodeTypes={nodeTypes} />
      </ReactFlowProvider>
    </div>
  );
};
