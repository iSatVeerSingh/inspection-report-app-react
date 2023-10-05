import { Flex, Text } from "@chakra-ui/react";

const MiniDetail = ({
  property,
  value,
  vertical,
}: {
  property: string;
  value: string;
  vertical?: boolean;
}) => {
  return (
    <Flex
      flexDirection={vertical ? "column" : "row"}
      alignItems={vertical ? "start" : "center"}
      gap={vertical ? 1 : 3}
    >
      <Text
        minW={"200px"}
        fontSize={"xl"}
        fontWeight={"medium"}
        color={"rich-black"}
      >
        {property}
      </Text>
      <Text
        color={"dark-gray"}
        bg={"text-bg"}
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
