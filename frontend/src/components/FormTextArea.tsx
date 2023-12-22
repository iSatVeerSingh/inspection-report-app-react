"use client";

import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { Ref, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormTextAreaProps = UseFormRegisterReturn &
  FormControlProps &
  TextareaProps & {
    inputError?: string;
  };

const FormTextArea = (
  { label, id, placeholder, inputError, ...inputProps }: FormTextAreaProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <FormControl isInvalid={!!inputError}>
      {label && (
        <FormLabel htmlFor={id} color="rich-black" fontSize="xl" mb="0">
          {label}
        </FormLabel>
      )}
      <Textarea
        id={id}
        placeholder={placeholder}
        {...inputProps}
        ref={ref}
        bg={"card-bg-secondary"}
        height={"12"}
        borderRadius={"lg"}
        border={"1px"}
        borderColor={"gray.400"}
        shadow={"xs"}
        _placeholder={{
          color: "text-secondary",
        }}
        autoComplete="off"
      />
      {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(FormTextArea);
