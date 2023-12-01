import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type FormInputProps = UseFormRegister<any> &
  FormControlProps &
  InputProps & {
    inputError?: string;
  };

const FormInput = ({
  id,
  label,
  inputError,
  placeholder,
  type,
  ...rest
}: FormInputProps) => {
  return (
    <FormControl isInvalid={!!inputError}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <Input id={id} placeholder={placeholder} type={type} {...rest} />
      {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

// const FormInput = (
//   { label, type, name, placeholder, inputError, required, value }: FormInputProps,
//   ref: React.Ref<HTMLInputElement>
// ) => {
//   return (
//     <FormControl
//       isInvalid={inputError !== undefined && inputError !== ""}
//       isRequired={required}
//     >
//       {label && (
//         <FormLabel color="rich-black" fontSize="xl" mb="0">
//           {label}
//         </FormLabel>
//       )}
//       <Input
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         borderColor="blue-primary"
//         autoComplete="off"
//         value={value}
//         ref={ref}
//       />
//       {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
//     </FormControl>
//   );
// };

export default React.forwardRef(FormInput);
