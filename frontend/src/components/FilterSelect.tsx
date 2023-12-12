"use client";

import { Select, SelectProps } from "@chakra-ui/react";

type FilterSelectProps = SelectProps & {
  options: string[] | { text: string; value: string }[];
};

const FilterSelect = ({ options, ...props }: FilterSelectProps) => {
  return (
    <Select {...props} borderColor={"blue-primary"} height={8}>
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
  );
};

export default FilterSelect;

// import { Select, SelectProps } from "@chakra-ui/react";

// type FilterSelectProps = SelectProps & {
//   options: { text: string; value: string }[];
// };

// const FilterSelect = ({
//   options,
//   placeholder,
//   ...props
// }: FilterSelectProps) => {
//   return (
//     <Select
//       height={8}
//       borderColor={"blue-primary"}
//       placeholder={placeholder}
//       {...props}
//     >
//       {options.map((opt) => (
//         <option key={opt.value} value={opt.value}>
//           {opt.text}
//         </option>
//       ))}
//     </Select>
//   );
// };

// export default FilterSelect;
