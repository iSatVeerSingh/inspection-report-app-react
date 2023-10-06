import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FileInput from "../../components/FileInput";
import FormTextArea from "../../components/FormTextArea";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";

const AddInspectionItems = () => {
  return (
    <PageLayout title="Add Inspection Notes">
      <Box bg="main-bg" border="stroke" borderRadius={5} p="3">
        <Heading as="h2" fontSize={"2xl"} fontWeight={"medium"}>
          #23855 - Frame Inspection
        </Heading>
        <Text fontSize={"lg"} color={"dark-gray"}>
          P.O. Box 22, Greensborough
        </Text>
        <Flex
          as="form"
          mt={4}
          direction={"column"}
          gap={3}
          alignItems={"start"}
        >
          <FormSelect
            options={[{ text: "Category", value: "" }]}
            label="Category"
            placeholder="Select item category"
            name="category"
          />
          <FormInput
            type="text"
            name="itemName"
            label="Item Name"
            placeholder="Search Item name here"
          />
          <FileInput
            name="itemImages"
            label="Item Images"
            subLabel="Max 8 images allowed"
            multiple
          />
          <FormTextArea
            label="Item Notes"
            placeholder="Type item note here"
            name="itemNotes"
          />
          <ButtonPrimary width={"200px"} type="submit">
            Add Item
          </ButtonPrimary>
        </Flex>
        <Flex mt={10} justifyContent={"space-between"}>
          <ButtonPrimary>See Added Items</ButtonPrimary>
          <ButtonOutline>Create Custom Item</ButtonOutline>
        </Flex>
      </Box>
    </PageLayout>
  );
};

export default AddInspectionItems;
