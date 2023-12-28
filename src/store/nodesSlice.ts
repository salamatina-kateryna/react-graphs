import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface FlowElement {
  id: string;
  type?: string; // 'default', 'input', 'output', 'selectorNode', etc.
  data: { label: string };
  position: { x: number; y: number };
}

const initialNodes: FlowElement[] = [
  {
    id: "1",
    type: "defaultNode",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    type: "defaultNode",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    type: "defaultNode",
    data: { label: "Node 3" },
    position: { x: 400, y: 100 },
  },
  // Add more nodes as needed
];

interface NodeState {
  nodes: FlowElement[];
}

const initialState: NodeState = {
  nodes: initialNodes,
};

export const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<any[]>) => {
      state.nodes = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { setNodes } = nodesSlice.actions;

export const selectNodes = (state: RootState) => state.nodes.nodes;

export default nodesSlice.reducer;
