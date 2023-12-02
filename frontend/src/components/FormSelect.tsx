"use client";

import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { Ref, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormSelectProps = UseFormRegisterReturn &
  SelectProps &
  FormControlProps & {
    inputError?: string;
    options: string[] | { text: string; value: string }[];
  };

const FormSelect = (
  {
    label,
    id,
    placeholder,
    options,
    inputError,
    ...selectProps
  }: FormSelectProps,
  ref: Ref<HTMLSelectElement>
) => {
  return (
    <FormControl isInvalid={!!inputError}>
      {label && (
        <FormLabel htmlFor={id} color="rich-black" fontSize="xl" mb="0">
          {label}
        </FormLabel>
      )}
      <Select
        placeholder={placeholder}
        {...selectProps}
        ref={ref}
        borderColor="blue-primary"
      >
        {options.map((opt, index) =>
          typeof opt === "string" ? (
            <option value={opt} key={index}>
              {opt}
            </option>
          ) : (
            <option value={opt.value} key={index}>
              {opt.text}
            </option>
          )
        )}
      </Select>
      {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(FormSelect);
