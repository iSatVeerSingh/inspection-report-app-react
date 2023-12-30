import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { Ref, forwardRef } from "react";

type FormSelectProps = FormControlProps &
  SelectProps & {
    inputError?: string;
    options: string[] | { text: string; value: string }[];
  };

const FormSelect = (
  { inputError, label, id, isRequired, options, ...props }: FormSelectProps,
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
      <Select
        id={id}
        bg={"neutral.50"}
        border={"stroke"}
        borderRadius={"xl"}
        isRequired={isRequired}
        height={10}
        {...props}
        autoComplete="off"
        ref={ref}
      >
        {options.map((opt, index) =>
          typeof opt === "string" ? (
            <option value={opt} key={index}>
              {opt}
            </option>
          ) : (
            <option value={opt.value} key={index}>
              {opt.text}
            </option>
          )
        )}
      </Select>
      {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
    </FormControl>
  );
};

export default forwardRef(FormSelect);

// "use client";

// import {
//   FormControl,
//   FormControlProps,
//   FormErrorMessage,
//   FormLabel,
//   Select,
//   SelectProps,
// } from "@chakra-ui/react";
// import { Ref, forwardRef } from "react";
// import { UseFormRegisterReturn } from "react-hook-form";

// type FormSelectProps = UseFormRegisterReturn &
//   SelectProps &
//   FormControlProps & {
//     inputError?: any;
//     options: string[] | { text: string; value: string }[];
//   };

// const FormSelect = (
//   {
//     label,
//     id,
//     placeholder,
//     options,
//     inputError,
//     ...selectProps
//   }: FormSelectProps,
//   ref: Ref<HTMLSelectElement>
// ) => {
//   return (
//     <FormControl isInvalid={!!inputError}>
//       {label && (
//         <FormLabel htmlFor={id} color={"text-big"} fontSize={"xl"} mb={0}>
//           {label}
//         </FormLabel>
//       )}
//       <Select
//         placeholder={placeholder}
//         {...selectProps}
//         ref={ref}
//         bg={"card-bg-secondary"}
//         height={"12"}
//         borderRadius={"lg"}
//         shadow={"xs"}
//         border={"1px"}
//         borderColor={"gray.400"}
//         _placeholder={{
//           color: "text-secondary",
//         }}
//       >
//         {options.map((opt, index) =>
//           typeof opt === "string" ? (
//             <option value={opt} key={index}>
//               {opt}
//             </option>
//           ) : (
//             <option value={opt.value} key={index}>
//               {opt.text}
//             </option>
//           )
//         )}
//       </Select>
//       {inputError && <FormErrorMessage>{inputError}</FormErrorMessage>}
//     </FormControl>
//   );
// };

// export default forwardRef(FormSelect);
