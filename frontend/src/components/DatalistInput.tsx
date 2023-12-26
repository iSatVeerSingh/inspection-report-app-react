"use client";

import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { ChangeEventHandler, useState, useRef } from "react";

type DatalistInputProps = InputProps &
  FormControlProps & {
    inputError?: string;
    dataList: string[];
  };

const DatalistInput = (
  { id, label, name, dataList, inputError, placeholder }: DatalistInputProps,
  ref: any
) => {
  const inputRef = ref || useRef(null);
  const [listItems, setListItems] = useState<any[]>([]);

  const filterList: ChangeEventHandler = (e) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const searchText = target.value.trim();
    if (searchText === "") {
      setListItems([]);
      return;
    }

    const filteredList = dataList.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
    setListItems(filteredList);
  };

  const selectValue = (value: string) => {
    inputRef!.current.value = value;
    setListItems([]);
  };

  return (
    <FormControl isInvalid={inputError !== undefined} position={"relative"}>
      {label && (
        <FormLabel color="rich-black" fontSize="xl" mb="0">
          {label}
        </FormLabel>
      )}
      <Input
        id={id}
        name={name}
        ref={inputRef}
        onChange={filterList}
        placeholder={placeholder}
        bg={"card-bg-secondary"}
        height={"12"}
        borderRadius={"lg"}
        shadow={"xs"}
        border={"1px"}
        borderColor={"gray.400"}
        _placeholder={{
          color: "text-secondary",
        }}
      />
      {inputError && <FormErrorMessage mt="0">{inputError}</FormErrorMessage>}
      {listItems.length !== 0 && (
        <List
          position={"absolute"}
          zIndex={10}
          bg={"white"}
          width={"full"}
          border="1px"
          borderRadius={"md"}
          maxH={"200px"}
          overflowY={"scroll"}
        >
          {listItems.map((item, index) => (
            <ListItem
              key={index}
              p={1}
              borderBottom={"1px"}
              _hover={{ backgroundColor: "gray.200" }}
              cursor={"pointer"}
              onClick={() => selectValue(item)}
            >
              {item}
            </ListItem>
          ))}
        </List>
      )}
    </FormControl>
  );
};

export default React.forwardRef(DatalistInput);
