import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  Select,
} from "@chakra-ui/react";
import { Ref, forwardRef } from "react";

type FormInputProps = InputProps & {
  label?: string;
  inputError?: string;
  required?: boolean;
  options: {
    text: string;
    value: string;
  }[];
};

const FormSelect = (
  { label, name, placeholder, inputError, required, options }: FormInputProps,
  ref: Ref<HTMLSelectElement>
) => {
  return (
    <FormControl isInvalid={inputError !== undefined} isRequired={required}>
      {label && (
        <FormLabel color="rich-black" fontSize="xl" mb="0">
          {label}
        </FormLabel>
      )}
      <Select
        borderColor="blue-primary"
        required={required}
        name={name}
        placeholder={placeholder}
        ref={ref}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </Select>
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(FormSelect);
