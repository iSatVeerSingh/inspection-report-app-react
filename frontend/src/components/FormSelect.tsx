import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { Ref, forwardRef } from "react";

type FormInputProps = SelectProps & {
  label?: string;
  inputError?: string;
  required?: boolean;
  options:
    | {
        text: string;
        value: string;
      }[]
    | string[];
};

const FormSelect = (
  { label, name, placeholder, inputError, required, options, onChange, value }: FormInputProps,
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
        value={value}
        onChange={onChange}
      >
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ) : (
            <option value={opt.value} key={opt.value}>
              {opt.text}
            </option>
          )
        )}
      </Select>
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(FormSelect);
