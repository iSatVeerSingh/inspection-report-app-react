import {
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  Checkbox,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useInspectionData } from "../../services/client/context";
import { Link } from "react-router-dom";
import { useState } from "react";
import SelectAndDelele from "../../components/SelectAndDelele";
import { deleteRequest } from "../../services/client";

const AllAddedItems = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { inspection, deleteItems }: any = useInspectionData();
  const [allSelected, setAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
      setAllSelected(false);
      return;
    }

    const allItems = inspection.inspectionItems.map((item: any) => item.id);
    setSelectedItems(allItems);
    setAllSelected(true);
  };

  const handleSelect = (itemid: string) => {
    if (selectedItems.includes(itemid)) {
      if (allSelected) {
        setAllSelected(false);
      }
      setSelectedItems((prev) => prev.filter((item) => item !== itemid));
      return;
    }
    setSelectedItems((prev) => [...prev, itemid]);
  };

  const handleDelete = () => {
    console.log(selectedItems);
    if (selectedItems.length === 0) {
      return;
    }
    onOpen();
  };

  const deleteSelectedItems = async () => {
    if (selectedItems.length === 0) {
      onClose();
      return;
    }

    setSaving(true);

    const response = await deleteRequest(
      `/client/inspections/items?inspectionId=${inspection.id}`,
      {
        body: JSON.stringify({
          inspectionItems: selectedItems,
        }),
      }
    );

    if (!response.success) {
      toast({
        title: "Could not delete the items.",
        duration: 4000,
        status: "error",
      });
      setSaving(false);
      onClose();
      return;
    }

    toast({
      title: "Items deleted successfully",
      duration: 4000,
      status: "success",
    });
    setSaving(false);
    onClose();
    deleteItems(response.data);
    setSelectedItems([])
  };

  return (
    <PageLayout title="Newly added items">
      <Box>
        <Box>
          <Heading
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            fontWeight={"medium"}
            color={"rich-black"}
          >
            &#35;{inspection?.jobNumber} - {inspection?.category}
          </Heading>
          <Text fontSize={"lg"} color={"dark-gray"}>
            {inspection?.siteAddress}
          </Text>
        </Box>
        <SelectAndDelele
          isAllSelected={allSelected}
          onClickSelectAll={handleSelectAll}
          selectCount={selectedItems.length}
          onClickDelete={handleDelete}
        />
        <Grid mt={4} gap={2}>
          {inspection.inspectionItems.map((item: any) => (
            <Flex gap={2} bg={"main-bg"} p="2" borderRadius={5} key={item.id}>
              <Box mt={1}>
                <Checkbox
                  colorScheme="blue"
                  borderColor={"blue.400"}
                  isChecked={selectedItems.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                />
              </Box>
              <Link to={item.id}>
                <Box flexGrow={1}>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    w={"full"}
                  >
                    <Text
                      fontSize={"lg"}
                      color={"rich-black"}
                      fontWeight={"semibold"}
                    >
                      {item.category || "Custom Item"} :- {item.itemName}
                    </Text>
                    <Text fontSize={"lg"} color={"dark-gray"}>
                      ({item.itemImages.length}) Images
                    </Text>
                  </Flex>
                  {item.itemNote && item.itemNote !== "" && (
                    <Text color={"main-text"}>Note:- {item.itemNote}</Text>
                  )}
                </Box>
              </Link>
            </Flex>
          ))}
        </Grid>
      </Box>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalBody py={0}>
            <Text>You can not undo this action after deletion</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={saving}
              loadingText="Deleting"
              onClick={deleteSelectedItems}
            >
              Yes, Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageLayout>
  );
};

export default AllAddedItems;
