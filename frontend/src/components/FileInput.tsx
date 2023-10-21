import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Text,
} from "@chakra-ui/react";

type FileInputProps = InputProps & {
  label?: string;
  inputError?: string;
  required?: boolean;
  multiple?: boolean;
  subLabel?: string;
};

const FileInput = ({
  label,
  name,
  placeholder,
  inputError,
  required,
  multiple,
  subLabel,
}: FileInputProps) => {
  return (
    <FormControl isInvalid={inputError !== undefined} isRequired={required}>
      {label && (
        <FormLabel color="rich-black" fontSize="xl" mb="0">
          {label}
          {subLabel && (
            <Text as="span" color={"main-text"} fontSize={"sm"} ml={3}>
              {subLabel}
            </Text>
          )}
        </FormLabel>
      )}
      <Input
        type="file"
        name={name}
        placeholder={placeholder}
        required={required}
        borderColor="blue-primary"
        px={0}
        multiple={multiple}
        cursor={"pointer"}
      />
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default FileInput;
