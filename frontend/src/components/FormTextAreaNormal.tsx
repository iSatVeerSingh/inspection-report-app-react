import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  InputProps,
  Textarea,
} from "@chakra-ui/react";
import React, { Ref } from "react";

type FormInputProps = InputProps &
  FormControlProps & {
    inputError?: string;
  };

const FormTextAreaNormal = (
  { label, name, placeholder, inputError, id }: FormInputProps,
  ref: Ref<HTMLTextAreaElement>
) => {
  return (
    <FormControl isInvalid={!!inputError}>
      {label && (
        <FormLabel color="rich-black" fontSize="xl" htmlFor={id} mb="0">
          {label}
        </FormLabel>
      )}
      <Textarea
        name={name}
        id={id}
        placeholder={placeholder}
        borderColor="blue-primary"
        ref={ref}
      />
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default React.forwardRef(FormTextAreaNormal);
