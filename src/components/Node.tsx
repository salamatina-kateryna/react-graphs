import React, { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { MultiSelect } from "react-multi-select-component";

interface DefaultNodeProps {
  data: {
    label: string;
    [key: string]: any; // Additional data properties
  };
}

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const DefaultNode: React.FC<DefaultNodeProps> = ({ data }) => {
  const [selected, setSelected] = useState([]);

  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} />
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      <div>
        {data.label}
        {/* Render any additional data properties as needed */}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default DefaultNode;
