"use client";

import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { Ref, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = UseFormRegisterReturn &
  FormControlProps &
  InputProps & {
    inputError?: any;
  };

const FormInput = (
  { label, id, placeholder, inputError, ...inputProps }: FormInputProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <FormControl isInvalid={inputError !== undefined && inputError !== ""}>
      {label && (
        <FormLabel htmlFor={id} color={"text-big"} fontSize={"xl"} mb={0}>
          {label}
        </FormLabel>
      )}
      <Input
        id={id}
        placeholder={placeholder}
        {...inputProps}
        ref={ref}
        bg={"card-bg-secondary"}
        height={"12"}
        borderRadius={"lg"}
        shadow={"xs"}
        border={"1px"}
        borderColor={"gray.400"}
        _placeholder={{
          color: "text-secondary",
        }}
        autoComplete="off"
      />
      {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(FormInput);
