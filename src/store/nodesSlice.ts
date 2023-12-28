import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface FlowElement {
  id: string;
  type?: string;
  data: { label: string };
  position: { x: number; y: number };
}

const initialNodes: FlowElement[] = [
  {
    id: "1",
    type: "defaultNode",
    data: { label: "1" },
    position: { x: 250, y: 5 },
  },
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
  },
});

export const { setNodes } = nodesSlice.actions;

export const selectNodes = (state: RootState) => state.nodes.nodes;

export default nodesSlice.reducer;
