import React, { useEffect, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import Select, {
  GetStyles,
  GroupBase,
  OptionsOrGroups,
  components,
} from "react-select";
import { selectNodes, setNodes } from "../store/nodesSlice";

interface DefaultNodeProps {
  id: string;
  data: {
    label: string;
    [key: string]: any;
  };
}

interface IInputPropsOption {
  getStyles: GetStyles<any, false, GroupBase<any>>;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
  children: React.ReactNode;
  innerProps: any;
}

const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}: IInputPropsOption) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => {
    setIsActive(true);
  };
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    // @ts-expect-error "Incorrect types passing"
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} readOnly={true} />
      {children}
    </components.Option>
  );
};

const DefaultNode: React.FC<DefaultNodeProps> = ({ id, data }) => {
  const [selectedOption, setSelectedOption] = useState<
    OptionsOrGroups<never, GroupBase<never>> | undefined
  >([]);

  const styleGraph = {
    width: 235,
    height: 118,
    padding: "18px 3px 5px",
    backgroundColor: "#D1E7DD",
    borderRadius: 4,
    border: "none",
  };

  const styleBlock = {
    width: 235,
    height: 72,
    backgroundColor: "#ffffff",
    marginBottom: 4,
    borderRadius: 4,
  };

  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);

  const [selectedValue, setSelectedValue] = useState(1);
  const [allOptions, setAllOptions] = useState<any[]>([]);

  useEffect(() => {
    const newAllOptions = new Array(6).fill(1).map((item, index) => {
      const value = index + 1;

      const nodeLabels = nodes
        .filter((node, nodeIndex) => nodeIndex < parseInt(id) - 1)
        .map((item) => item.data.label);

      const label = (id !== "1" ? [...nodeLabels, value] : [value]).join("-");

      return {
        value,
        label,
      };
    });

    setAllOptions(newAllOptions);
    setSelectedOption(newAllOptions[selectedValue - 1] as any);
  }, [id, nodes, selectedValue, setAllOptions]);

  return (
    <div className="react-flow__node-default nodrag" style={styleGraph}>
      <Handle type="target" position={Position.Top} />
      <div style={styleBlock}></div>
      <Select
        defaultValue={[]}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        value={selectedOption}
        onChange={(option: any) => {
          setSelectedOption(allOptions[option.value - 1]);
          setSelectedValue(option.value);

          const currentIndex = parseInt(id) - 1;
          const newIndex = currentIndex + 1;
          const updatedNodes = nodes.map((node) => node);

          const currentItem = updatedNodes[currentIndex];
          updatedNodes[currentIndex] = {
            ...currentItem,
            data: {
              ...currentItem.data,
              label: `${option.value}`,
            },
          };

          if (nodes.length <= 3) {
            updatedNodes[newIndex] = {
              id: (newIndex + 1).toString(),
              type: "defaultNode",
              data: { label: "" },
              position: { x: 250 * (newIndex + 1), y: 100 * (newIndex + 1) },
            };
          }

          dispatch(setNodes(updatedNodes));
        }}
        options={allOptions}
        components={{
          Option: InputOption,
        }}
        placeholder={"Виберіть значення"}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: "#479F76",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            textAlign: "left",
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            svg: {
              fill: "#2C7DFA",
            },
          }),
        }}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default DefaultNode;
