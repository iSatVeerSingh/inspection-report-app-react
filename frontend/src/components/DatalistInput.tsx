"use client";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { ChangeEventHandler, useState, useRef } from "react";

type DatalistInputProps = InputProps & {
  label?: string;
  inputError?: string;
  dataList: string[];
};

const DatalistInput = (
  {
    name,
    isRequired,
    label,
    inputError,
    dataList,
    placeholder,
  }: DatalistInputProps,
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
    <FormControl
      isInvalid={inputError !== undefined}
      isRequired={isRequired}
      position={"relative"}
    >
      {label && (
        <FormLabel color="rich-black" fontSize="xl" mb="0">
          {label}
        </FormLabel>
      )}
      <Input
        name={name}
        isRequired={isRequired}
        borderColor="blue-primary"
        ref={inputRef}
        onChange={filterList}
        placeholder={placeholder}
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
