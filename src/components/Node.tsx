import React, { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import Select, {
  GetStyles,
  GroupBase,
  OptionsOrGroups,
  components,
} from "react-select";

interface DefaultNodeProps {
  data: {
    label: string;
    [key: string]: any; // Additional data properties
  };
}

const allOptions = [
  { value: "option 1", label: "option 1" },
  { value: "option 2", label: "option 2" },
  { value: "option 3", label: "option 3" },
  { value: "option 4", label: "option 4" },
];

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
    console.log(123123);
    setIsActive(true);
  };
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
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

const DefaultNode: React.FC<DefaultNodeProps> = ({ data }) => {
  const [selectedOptions, setSelectedOptions] = useState<
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

  return (
    <div className="react-flow__node-default nodrag" style={styleGraph}>
      <Handle type="target" position={Position.Top} />
      <div style={styleBlock}></div>
      <Select
        defaultValue={[]}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        onChange={(options: any) => {
          console.log(options);
          if (Array.isArray(options)) {
            setSelectedOptions(options.map((opt) => opt.value));
          }
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
