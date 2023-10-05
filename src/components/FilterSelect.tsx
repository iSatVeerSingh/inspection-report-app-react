import { Select, SelectProps } from "@chakra-ui/react";

type FilterSelectProps = SelectProps & {
  options: { text: string; value: string }[];
};

const FilterSelect = ({
  options,
  placeholder,
  ...props
}: FilterSelectProps) => {
  return (
    <Select
      height={8}
      borderColor={"blue-primary"}
      placeholder={placeholder}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </Select>
  );
};

export default FilterSelect;
