"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

type SelectAndDeleleProps = {
  isAllSelected: boolean;
  onClickSelectAll: React.MouseEventHandler<HTMLButtonElement>;
  selectCount: number;
  onClickDelete: React.MouseEventHandler<HTMLButtonElement>;
};

const SelectAndDelele = ({
  isAllSelected,
  onClickSelectAll,
  selectCount,
  onClickDelete,
}: SelectAndDeleleProps) => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} mt={3}>
      <Flex alignItems={"center"} gap={4}>
        <Button
          size={"sm"}
          variant="outline"
          colorScheme="linkedin"
          onClick={onClickSelectAll}
        >
          {isAllSelected ? "Deselect All" : "Select All"}
        </Button>
        <Text color="dark-gray" fontSize={"lg"}>
          {selectCount} Selected
        </Text>
      </Flex>
      <Button
        colorScheme="red"
        size={"sm"}
        variant={"outline"}
        onClick={onClickDelete}
      >
        Delete Selected
      </Button>
    </Flex>
  );
};

export default SelectAndDelele;
