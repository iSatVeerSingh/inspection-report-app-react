import { Flex, Text } from "@chakra-ui/react";

const MiniDetail = ({
  property,
  value,
  vertical,
  noChange,
}: {
  property: string;
  value: string | number;
  vertical?: boolean;
  noChange?: boolean;
}) => {
  return (
    <Flex
      flexDirection={{
        base: noChange ? "row" : "column",
        sm: vertical ? "column" : "row",
      }}
      alignItems={{
        base: noChange ? "center" : "start",
        sm: vertical ? "start" : "center",
      }}
      gap={{ base: 1, sm: vertical ? 1 : 3 }}
    >
      <Text
        minW={"200px"}
        fontSize={"xl"}
        fontWeight={"medium"}
        color={"text-big"}
      >
        {property}
      </Text>
      <Text
        color={"text-small"}
        bg={"card-bg-secondary"}
        px={3}
        borderRadius={3}
        fontSize={"lg"}
      >
        {value}
      </Text>
    </Flex>
  );
};

export default MiniDetail;
