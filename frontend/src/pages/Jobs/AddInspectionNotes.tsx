import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import FormInput from "../../components/FormInput";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import FormTextArea from "../../components/FormTextArea";

const AddInspectionNotes = () => {
  return (
    <PageLayout title="Add Inspection Notes" titleBtn="Suggest Note">
      <Box p="3" border={"stroke"} bg="main-bg" borderRadius={5}>
        <Heading
          as="h2"
          fontSize={{ base: "xl", sm: "2xl" }}
          fontWeight={"medium"}
        >
          #23755 - Frame Inspection
        </Heading>
        <Flex direction={"column"} gap={1} px={3} mt={4}>
          <MiniDetail property="Category" value="Frame Inspection" />
          <MiniDetail property="Customer" value="John Abrahm" />
          <MiniDetail
            property="Site Address"
            value="P.O. Box 22, Greensborough"
          />
        </Flex>
        <Box mt={4}>
          <FormInput
            label="Add Note for Frame Inspection"
            placeholder="Search here for relevant notes"
          />
          <ButtonPrimary mt={2} width={{ base: "full", sm: "200px" }}>
            Add Note
          </ButtonPrimary>
        </Box>
        <Box fontSize={"2xl"} textAlign={"center"} mt={4}>
          Or
        </Box>
        <Box>
          <Text fontSize={"lg"} color="dark-gray">
            If you have not found relevant note to job category, please see in
            all categories
          </Text>
          <ButtonOutline mt={2} width={{ base: "full", sm: "auto" }}>
            See All Notes from All Categories
          </ButtonOutline>
        </Box>
        <Box fontSize={"2xl"} textAlign={"center"} mt={4}>
          Or
        </Box>
        <Box>
          <Text fontSize={"lg"} color={"dark-gray"}>
            If you have not found relevant note to job category, please see in
            all categories
          </Text>
          <FormTextArea
            label="Add Custom Note"
            placeholder="Start typing here"
          />
          <ButtonPrimary mt={2} width={{ base: "full", sm: "auto" }}>
            Add Custom Note
          </ButtonPrimary>
        </Box>
        <Box mt={5}>
          <ButtonPrimary width={{base: "full", sm: "250px"}}>Save and Close</ButtonPrimary>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default AddInspectionNotes;
