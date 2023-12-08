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
import { UseFormRegisterReturn } from "react-hook-form";

type FileInputProps = UseFormRegisterReturn &
  InputProps &
  FormControlProps & {
    inputError?: string;
    subLabel?: string;
  };

const FileInputNormal = (
  {
    label,
    id,
    placeholder,
    inputError,
    multiple,
    subLabel,
    accept,
    ...inputProps
  }: FileInputProps,
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
        placeholder={placeholder}
        borderColor="blue-primary"
        px={0}
        multiple={multiple}
        cursor={"pointer"}
        {...inputProps}
        accept={accept}
        ref={ref}
      />
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default React.forwardRef(FileInputNormal);
