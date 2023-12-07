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

type FormSelectNormalProps = SelectProps &
  FormControlProps & {
    inputError?: string;
    options: string[] | { text: string; value: string }[];
  };

const FormSelectNormal = (
  { label, id, options, inputError, placeholder, name }: FormSelectNormalProps,
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
        id={id}
        ref={ref}
        name={name}
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

export default forwardRef(FormSelectNormal);
