import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Select,
} from "@chakra-ui/react";

type FormInputProps = InputProps & {
  label?: string;
  inputError?: string;
  required?: boolean;
  options: {
    text: string;
    value: string;
  }[];
};

const FormSelect = ({
  label,
  type,
  name,
  placeholder,
  inputError,
  required,
  options,
}: FormInputProps) => {
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
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.text}</option>
        ))}
      </Select>
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormSelect;
