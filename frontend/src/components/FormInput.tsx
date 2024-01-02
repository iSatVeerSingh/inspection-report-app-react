import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { Ref, forwardRef } from "react";

type FormInputProps = FormControlProps &
  InputProps & {
    inputError?: string;
  };

const FormInput = (
  { inputError, label, id, isRequired, ...props }: FormInputProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={inputError !== undefined && inputError !== ""}
    >
      {label && (
        <FormLabel mb={0} fontSize={"lg"} color={"text.700"} htmlFor={id}>
          {label}
        </FormLabel>
      )}
      <Input
        id={id}
        bg={"neutral.50"}
        border={"stroke"}
        borderRadius={"xl"}
        isRequired={isRequired}
        height={10}
        autoComplete="off"
        ref={ref}
        {...props}
      />
      {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(FormInput);
