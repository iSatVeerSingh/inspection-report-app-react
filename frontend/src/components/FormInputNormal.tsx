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

type FormInputNormalProps = FormControlProps &
  InputProps & {
    inputError?: string;
  };

const FormInputNormal = (
  { label, id, type, placeholder, inputError, name }: FormInputNormalProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <FormControl isInvalid={!!inputError}>
      {label && (
        <FormLabel htmlFor={id} color="rich-black" fontSize="xl" mb="0">
          {label}
        </FormLabel>
      )}
      <Input
        type={type || "text"}
        placeholder={placeholder}
        id={id}
        borderColor="blue-primary"
        autoComplete="off"
        name={name}
        ref={ref}
      />
      {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(FormInputNormal);
