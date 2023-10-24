import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  Textarea,
} from "@chakra-ui/react";
import React, { Ref } from "react";

type FormInputProps = InputProps & {
  label?: string;
  inputError?: string;
  required?: boolean;
};

const FormTextArea = (
  { label, name, placeholder, inputError, required }: FormInputProps,
  ref: Ref<HTMLTextAreaElement>
) => {
  return (
    <FormControl isInvalid={inputError !== undefined} isRequired={required}>
      {label && (
        <FormLabel color="rich-black" fontSize="xl" mb="0">
          {label}
        </FormLabel>
      )}
      <Textarea
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

export default React.forwardRef(FormTextArea);
