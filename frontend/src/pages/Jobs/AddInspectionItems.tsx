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
  useToast,
} from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FileInput from "../../components/FileInputNormal";
import FormTextArea from "../../components/FormTextAreaNormal";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import {
  FormEventHandler,
  FormEvent,
  useState,
  ChangeEventHandler,
  useRef,
  useEffect,
} from "react";
import DatalistInput from "../../components/DatalistInput";
import { getResizedBase64Images } from "../../utils/resize";
import { useParams } from "react-router-dom";
import { Inspection } from "../../types";
import clientApi from "../../services/clientApi";
import Loading from "../../components/Loading";

const AddInspectionItems = () => {
  const datalistRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemNames, setItemNames] = useState([]);
  const [formErrors, setFormErrors] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [libIndex, setLibIndex] = useState<any>(null);
  const [inspection, setInspection] = useState<Inspection | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const getInspection = async () => {
      const response = await clientApi.get(
        `/inspections?inspectionId=${params.inspectionId}`
      );

      if (response.status !== 200) {
        setLoading(false);
        return;
      }

      setInspection(response.data);
      setLoading(false);
    };

    const getLibIndex = async () => {
      const response = await clientApi.get("/library-index");
      if (response.status !== 200) {
        return;
      }
      setLibIndex(response.data);

      const allCategories = Array.from(
        new Set(response.data.map((item: any) => item.category))
      );

      setCategories(allCategories);
    };

    getInspection();
    getLibIndex();
  }, []);

  const filterItemNames: ChangeEventHandler = (e) => {
    e.preventDefault();
    datalistRef.current!.value = "";
    const target = e.target as HTMLInputElement;
    const filteredNames = libIndex
      .filter((item: any) => item.category === target.value)
      .map((item: any) => item.name);
    setItemNames(filteredNames);
  };

  const handleAddItem: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    const isOffScreen = typeof OffscreenCanvas !== undefined;

    const target = e.target as HTMLFormElement;
    const itemData = new FormData(target);
    const formErrors: any = {};

    const category = itemData.get("category")?.toString().trim();
    const itemName = itemData.get("itemName")?.toString().trim();
    const images = itemData.getAll("itemImages") as File[];

    if (category === "") {
      formErrors.category = "Please select a category";
    }

    if (itemName === "") {
      formErrors.itemName = "Please select an item name";
    }

    if (images.length === 0) {
      formErrors.itemImages = "Please select minimum 1 image";
    }
    if (images.length > 8) {
      formErrors.itemImages = "Max 8 images allowed";
    }

    if (Object.keys(formErrors).length !== 0) {
      setFormErrors(formErrors);
      return;
    }

    setFormErrors(null);
    setSaving(true);
    const library = libIndex.find((item: any) => item.name === itemName);
    itemData.append("libraryId", library.id);

    if (!isOffScreen) {
      itemData.delete("itemImages");
      const resizedImages = await getResizedBase64Images(images);
      for (let img of resizedImages) {
        itemData.append("itemImages", img as string);
      }
      itemData.append("type", "resized");
    }

    const response = await clientApi.post(
      `/inspections/items?inspectionId=${params.inspectionId}`,
      itemData
    );

    if (response.status !== 201) {
      toast({
        title: response.data.message || "Invalid request",
        duration: 4000,
        status: "error",
      });
      setSaving(false);
      return;
    }

    toast({
      title: "Item created successfully",
      description: itemName + " saved",
      duration: 4000,
      status: "success",
    });

    target.reset();
    setSaving(false);
  };

  const handleAddCustomItem: FormEventHandler = async (e) => {
    e.preventDefault();

    const isOffScreen = typeof OffscreenCanvas !== undefined;
    const target = e.target as HTMLFormElement;
    const formErrors: any = {};

    const itemData = new FormData(target);
    const itemName = itemData.get("itemName")?.toString().trim();
    const images = itemData.getAll("itemImages") as File[];
    const openingParagraph = itemData
      .get("openingParagraph")
      ?.toString()
      .trim();
    const closingParagraph = itemData
      .get("closingParagraph")
      ?.toString()
      .trim();
    const embeddedImage = itemData.get("embeddedImage") as File;

    if (itemName === "") {
      formErrors.itemName = "Please provide an item name";
    }

    if (images.length === 0) {
      formErrors.itemImages = "Please select minimum 1 image";
    }
    if (images.length > 8) {
      formErrors.itemImages = "Max 8 images allowed";
    }

    if (openingParagraph === "") {
      formErrors.openingParagraph = "Please provide opening paragraph";
    }
    if (closingParagraph === "") {
      formErrors.closingParagraph = "Please provide closing paragraph";
    }

    if (Object.keys(formErrors).length !== 0) {
      setFormErrors(formErrors);
      return;
    }

    setSaving(true);

    if (embeddedImage.size > 0) {
      itemData.delete("embeddedImage");
      const resizedEmb = await getResizedBase64Images([embeddedImage]);
      itemData.append("embeddedImage", resizedEmb[0] as string);
    } else {
      itemData.delete("embeddedImage");
    }

    if (!isOffScreen) {
      itemData.delete("itemImages");
      const resizedImages = await getResizedBase64Images(images);
      for (let img of resizedImages) {
        itemData.append("itemImages", img as string);
      }
      itemData.append("type", "resized");
    }

    itemData.append("custom", "custom");

    const response = await clientApi.post(
      `/inspections/items?inspectionId=${params.inspectionId}`,
      itemData
    );

    if (response.status !== 201) {
      toast({
        title: response.data.message || "Invalid request",
        duration: 4000,
        status: "error",
      });
      setSaving(false);
      return;
    }

    toast({
      title: "Item created successfully",
      description: itemName + " saved",
      duration: 4000,
      status: "success",
    });

    target.reset();
    setSaving(false);
  };

  return (
    <PageLayout title="Add New Items">
      {loading ? (
        <Loading />
      ) : (
        <Box bg="main-bg" border="stroke" borderRadius={5} p="3">
          <Heading as="h2" fontSize={"2xl"} fontWeight={"medium"}>
            &#35;{inspection?.jobNumber} - {inspection?.category}
          </Heading>
          <Text fontSize={"lg"} color={"dark-gray"}>
            {inspection?.siteAddress}
          </Text>
          <form onSubmit={handleAddItem}>
            <Flex mt={4} direction={"column"} gap={3} alignItems={"start"}>
              <FormSelect
                options={categories}
                label="Category"
                placeholder="Select item category"
                name="category"
                onChange={filterItemNames}
                inputError={formErrors?.category}
                required
              />
              <DatalistInput
                name="itemName"
                label="Item Name"
                placeholder="Search item name here"
                dataList={itemNames}
                inputError={formErrors?.itemName}
                ref={datalistRef}
              />
              <FileInput
                name="itemImages"
                label="Item Images"
                subLabel="Max 8 images allowed"
                multiple
                inputError={formErrors?.itemImages}
              />
              <FormTextArea
                label="Item Note"
                placeholder="Type item note here"
                name="itemNote"
              />
              <ButtonPrimary
                width={"200px"}
                type="submit"
                isLoading={saving}
                loadingText="Saving"
              >
                Add Item
              </ButtonPrimary>
            </Flex>
          </form>
          <Flex mt={10} justifyContent={"space-between"}>
            <ButtonOutline onClick={onOpen}>Create Custom Item</ButtonOutline>
          </Flex>
        </Box>
      )}
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
          <form onSubmit={handleAddCustomItem}>
            <Flex
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
                inputError={formErrors?.itemName}
                required
              />
              <FormTextArea
                label="Summary"
                name="itemSummary"
                placeholder="Type item summary"
                inputError={formErrors?.itemSummary}
              />
              <FileInput
                name="itemImages"
                label="Item Images"
                subLabel="Max 8 Images"
                multiple
                required
                inputError={formErrors?.itemImages}
              />
              <FormTextArea
                label="Opening Paragraph"
                name="openingParagraph"
                placeholder="Type paragraph here"
                required
                inputError={formErrors?.openingParagraph}
              />
              <FileInput
                label="Embedded Image"
                name="embeddedImage"
                type="file"
              />
              <FormTextArea
                label="Closing paragraph"
                name="closingParagraph"
                placeholder="Type paragraph here"
                required
                inputError={formErrors?.closingParagraph}
              />
              <Flex
                gap={3}
                justifyContent={"space-between"}
                direction={{ base: "column", sm: "row" }}
              >
                <ButtonPrimary
                  type="submit"
                  width={{ sm: "200px" }}
                  loadingText="Saving"
                  isLoading={saving}
                >
                  Create Item
                </ButtonPrimary>
                <ButtonOutline onClick={onClose}>Close</ButtonOutline>
              </Flex>
            </Flex>
          </form>
        </ModalContent>
      </Modal>
    </PageLayout>
  );
};

export default AddInspectionItems;
