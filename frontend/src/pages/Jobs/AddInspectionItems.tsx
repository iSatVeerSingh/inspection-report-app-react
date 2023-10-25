import {
  Box,
  Heading,
  Text,
  Flex,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FileInput from "../../components/FileInput";
import FormTextArea from "../../components/FormTextArea";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import { FormEventHandler, FormEvent } from "react";
import { useParams } from "react-router-dom";

const AddInspectionItems = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();
  console.log(params);

  const handleAddItem: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent
  ) => {
    e.preventDefault();
    console.log(e.target);

    const itemData = new FormData(e.target as HTMLFormElement);

    const response = await fetch(
      `/client/inspection/items?id=${params.inspectionId}`,
      {
        method: "PUT",
        body: itemData,
      }
    );
    if(response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <PageLayout title="Add Inspection Notes">
      <Box bg="main-bg" border="stroke" borderRadius={5} p="3">
        <Heading as="h2" fontSize={"2xl"} fontWeight={"medium"}>
          #23855 - Frame Inspection
        </Heading>
        <Text fontSize={"lg"} color={"dark-gray"}>
          P.O. Box 22, Greensborough
        </Text>
        <form onSubmit={handleAddItem}>
          <Flex mt={4} direction={"column"} gap={3} alignItems={"start"}>
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
              label="Item Note"
              placeholder="Type item note here"
              name="itemNote"
            />
            <ButtonPrimary width={"200px"} type="submit">
              Add Item
            </ButtonPrimary>
          </Flex>
        </form>
        <Flex mt={10} justifyContent={"space-between"}>
          <ButtonPrimary>See Added Items</ButtonPrimary>
          <ButtonOutline onClick={onOpen}>Create Custom Item</ButtonOutline>
        </Flex>
      </Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "md", md: "2xl" }}
      >
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader>Create Custom Item</ModalHeader>
          <ModalCloseButton />
          <Flex
            as="form"
            direction={"column"}
            px={{ base: 4, sm: "10" }}
            py={4}
            gap={3}
          >
            <FormInput
              type="text"
              name="itemName"
              label="Name"
              placeholder="Enter item name"
            />
            <FormTextArea
              label="Summary"
              name="itemSummary"
              placeholder="Type item summary"
            />
            <FileInput
              name="itemImages"
              label="Item Images"
              subLabel="Max 8 Images"
            />
            <FormTextArea
              label="Opening Paragraph"
              name="openingParagraph"
              placeholder="Type paragraph here"
            />
            <FileInput label="Embedded Image" name="embeddedImage" />
            <FormTextArea
              label="Closing paragraph"
              name="closingParagraph"
              placeholder="Type paragraph here"
            />
            <Flex
              gap={3}
              justifyContent={"space-between"}
              direction={{ base: "column", sm: "row" }}
            >
              <ButtonPrimary type="submit" width={{ sm: "200px" }}>
                Create Item
              </ButtonPrimary>
              <ButtonOutline onClick={onClose}>Cancel</ButtonOutline>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </PageLayout>
  );
};

export default AddInspectionItems;
