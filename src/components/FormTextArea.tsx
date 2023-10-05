import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Textarea,
} from "@chakra-ui/react";

type FormInputProps = InputProps & {
  label?: string;
  inputError?: string;
  required?: boolean;
};

const FormTextArea = ({
  label,
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
      <Textarea
        name={name}
        placeholder={placeholder}
        required={required}
        borderColor="blue-primary"
      />
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormTextArea;
