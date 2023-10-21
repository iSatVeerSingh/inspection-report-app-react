import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";

const ItemPreview = () => {
  return (
    <PageLayout title="Item Preview" titleBtn="Edit Item">
      <Box bg="main-bg" border="stroke" borderRadius={5} p="3">
        <Box>
          <Heading fontSize={"2xl"} fontWeight={"medium"}>
            #23855 - Frame Inspection - John Abrahm
          </Heading>
          <Text>P.O. Box 22, Greensborough</Text>
        </Box>
        <Flex direction={"column"} mt={4} gap={1}>
          <MiniDetail property="Category" value="Pre-Slab" />
          <MiniDetail property="Name" value="Bar Chairs Missing (Fabric)" />
          <MiniDetail
            vertical
            property="Summary"
            value="is a whole element, and as such matches the rules from the UA stylesheet. In particular, fonts and colors won't necessarily inherit from the input element."
          />
          <Box>
            <Text
              minW={"200px"}
              fontSize={"xl"}
              fontWeight={"medium"}
              color={"rich-black"}
            >
              Images
            </Text>
            <Box>Images here</Box>
          </Box>
          <MiniDetail
            property="Notes"
            value="Item notes will be here"
            vertical
          />
          <MiniDetail
            property="Opening Paragraph"
            value="Opening paragraph"
            vertical
          />
          <MiniDetail
            property="Embedded Image"
            value="Item notes will be here"
            vertical
          />
          <MiniDetail
            property="Closing Paragraph"
            value="Closing paragraph is here"
            vertical
          />
        </Flex>
        <Flex justifyContent={"space-between"} mt={5}>
          <ButtonPrimary width={"200px"}>Close</ButtonPrimary>
          <ButtonOutline>Delete</ButtonOutline>
        </Flex>
      </Box>
    </PageLayout>
  );
};

export default ItemPreview;
