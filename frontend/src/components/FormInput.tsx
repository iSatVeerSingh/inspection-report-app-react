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
  FormControlProps & InputProps & {
    inputError?: string;
  };

const FormInput = (
  { label, id, placeholder, inputError, ...inputProps }: FormInputProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <FormControl isInvalid={!!inputError}>
      {label && <FormLabel htmlFor={id} color="rich-black" fontSize="xl" mb="0">{label}</FormLabel>}
      <Input id={id} placeholder={placeholder} {...inputProps} ref={ref} borderColor="blue-primary" autoComplete="off" />
      {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(FormInput);
