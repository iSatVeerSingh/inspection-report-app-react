import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Text,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { Ref, forwardRef } from "react";

type FormTextAreaProps = FormControlProps &
  TextareaProps & {
    inputError?: string;
    subLabel?: string;
  };

const FormTextArea = (
  { inputError, label, id, isRequired, subLabel, ...props }: FormTextAreaProps,
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
          {subLabel && (
            <Text as="span" color={"text.500"} fontSize={"sm"} ml={3}>
              {subLabel}
            </Text>
          )}
        </FormLabel>
      )}
      <Textarea
        id={id}
        bg={"neutral.50"}
        border={"stroke"}
        borderRadius={"xl"}
        isRequired={isRequired}
        {...props}
        autoComplete="off"
        ref={ref}
      />
      {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(FormTextArea);

// "use client";

// import {
//   FormControl,
//   FormControlProps,
//   FormErrorMessage,
//   FormLabel,
//   Textarea,
//   TextareaProps,
// } from "@chakra-ui/react";
// import { Ref, forwardRef } from "react";
// import { UseFormRegisterReturn } from "react-hook-form";

// type FormTextAreaProps = UseFormRegisterReturn &
//   FormControlProps &
//   TextareaProps & {
//     inputError?: any;
//   };

// const FormTextArea = (
//   { label, id, placeholder, inputError, ...inputProps }: FormTextAreaProps,
//   ref: Ref<HTMLInputElement>
// ) => {
//   return (
//     <FormControl isInvalid={!!inputError}>
//       {label && (
//         <FormLabel htmlFor={id} color="rich-black" fontSize="xl" mb="0">
//           {label}
//         </FormLabel>
//       )}
//       <Textarea
//         id={id}
//         placeholder={placeholder}
//         {...inputProps}
//         ref={ref}
//         bg={"card-bg-secondary"}
//         height={"12"}
//         borderRadius={"lg"}
//         border={"1px"}
//         borderColor={"gray.400"}
//         shadow={"xs"}
//         _placeholder={{
//           color: "text-secondary",
//         }}
//         autoComplete="off"
//       />
//       {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
//     </FormControl>
//   );
// };

// export default forwardRef(FormTextArea);
