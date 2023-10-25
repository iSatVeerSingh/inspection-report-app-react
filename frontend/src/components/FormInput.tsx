import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import React from 'react';

type FormInputProps = InputProps & {
  label?: string;
  inputError?: string;
  required?: boolean;
};

const FormInput = (
  { label, type, name, placeholder, inputError, required }: FormInputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <FormControl isInvalid={inputError !== undefined} isRequired={required}>
      {label && (
        <FormLabel color="rich-black" fontSize="xl" mb="0">
          {label}
        </FormLabel>
      )}
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        borderColor="blue-primary"
        ref={ref}
      />
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default React.forwardRef(FormInput);
