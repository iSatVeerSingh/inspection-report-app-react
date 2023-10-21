import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import { SearchIcon } from "../icons";

const SearchFilter = (props: InputProps) => {
  return (
    <InputGroup color={"dark-gray"}>
      <InputLeftElement pointerEvents={"none"} h={8}>
        <SearchIcon boxSize={5} />
      </InputLeftElement>
      <Input type="search" h="8" borderColor={"blue-primary"} {...props} />
    </InputGroup>
  );
};

export default SearchFilter;
