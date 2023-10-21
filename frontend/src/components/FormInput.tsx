import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";

type FormInputProps = InputProps & {
  label?: string;
  inputError?: string;
  required?: boolean;
};

const FormInput = ({
  label,
  type,
  name,
  placeholder,
  inputError,
  required,
}: FormInputProps) => {
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
      />
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;
