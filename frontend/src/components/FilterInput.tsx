import { Input, InputProps } from "@chakra-ui/react";

const FilterInput = (props: InputProps) => {
  return (
    <Input h="8" borderColor={"blue-primary"} color={"dark-gray"} {...props} />
  );
};

export default FilterInput;
