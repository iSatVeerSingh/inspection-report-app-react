import {
  FormControl,
  FormControlProps,
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
  { inputError, isRequired, label, id, ...props }: FormInputProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <FormControl
      isInvalid={inputError !== undefined && inputError !== ""}
      isRequired={isRequired}
    >
      {label && (
        <FormLabel htmlFor={id} mb={0} fontSize={"xl"} color={"text.700"}>
          {label}
        </FormLabel>
      )}
      <Input
        id={id}
        {...props}
        border={"stroke"}
        borderRadius={"full"}
        h="10"
        autoComplete="off"
        ref={ref}
      />
    </FormControl>
  );
};

export default forwardRef(FormInput);
