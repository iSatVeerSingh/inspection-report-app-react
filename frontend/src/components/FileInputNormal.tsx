import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Text,
} from "@chakra-ui/react";
import React from "react";

type FileInputProps = InputProps &
  FormControlProps & {
    inputError?: string;
    subLabel?: string;
  };

const FileInputNormal = (
  { label, name, placeholder,id, inputError, multiple, subLabel, accept }: FileInputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <FormControl isInvalid={!!inputError}>
      {label && (
        <FormLabel color="rich-black" fontSize="xl" mb="0" htmlFor={id}>
          {label}
          {subLabel && (
            <Text as="span" color={"main-text"} fontSize={"sm"} ml={3}>
              {subLabel}
            </Text>
          )}
        </FormLabel>
      )}
      <Input
        type="file"
        id={id}
        name={name}
        placeholder={placeholder}
        borderColor="blue-primary"
        px={0}
        multiple={multiple}
        cursor={"pointer"}
        accept={accept}
        ref={ref}
      />
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default React.forwardRef(FileInputNormal);
