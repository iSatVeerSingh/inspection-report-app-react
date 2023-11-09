"use client";

import { Box, Flex, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { useRef, useState } from "react";
import RichEditor from "../../components/RichEditor";
import FileInput from "../../components/FileInput";
import FormTextArea from "../../components/FormTextArea";
import ButtonPrimary from "../../components/ButtonPrimary";
import { getParagraphDataFromEditor } from "../../utils/editorData";
import { SerializedEditorState } from "lexical";
import { getResizedBase64Images } from "../../utils/resize";
import { libraryApi } from "../../services/api";

const NewLibraryItem = () => {
  const [formErrors, setFormErrors] = useState<any>(null);
  const openingParagraphRef = useRef<any>();
  const closingParagraphRef = useRef<any>();
  const cateogryRef = useRef<HTMLSelectElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const embeddedImageRef = useRef<HTMLInputElement | null>(null);
  const summaryRef = useRef<HTMLTextAreaElement | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const handleCreateItem = async () => {
    const errors: any = {};
    const category = cateogryRef.current?.value.trim();
    const itemName = nameRef.current?.value.trim();
    const openingParagraph = getParagraphDataFromEditor(
      openingParagraphRef.current!.state as SerializedEditorState
    );
    const embeddedImage = embeddedImageRef.current?.files;
    const closingParagraph = getParagraphDataFromEditor(
      closingParagraphRef.current.state as SerializedEditorState
    );
    const summary = summaryRef.current?.value.trim();

    if (category === "") {
      errors.category = "Please select a category";
    }
    if (itemName === "") {
      errors.itemName = "Item name is required";
    }
    if (openingParagraph.length === 0) {
      errors.openingParagraph = "Opening paragraph is required";
    }
    if (closingParagraph.length === 0) {
      errors.closingParagraph = "Closing Paragraph is required";
    }

    if (Object.entries(errors).length !== 0) {
      setFormErrors(errors);
      return;
    }

    setSaving(true);

    const itemData: any = {
      category,
      name: itemName,
      openingParagraph: JSON.stringify(openingParagraph),
      closingParagraph: JSON.stringify(closingParagraph),
    };

    if (embeddedImage?.length === 1) {
      const resizedBas64img = await getResizedBase64Images(
        embeddedImage as unknown as File[]
      );
      itemData.embeddedImage = resizedBas64img[0];
    }

    if (summary !== "") {
      itemData.summary = summary;
    }

    const response = await libraryApi.post("", itemData);
    if (response.status !== 201) {
      toast({
        title: "Item creation is unsuccessful",
        status: "error",
        duration: 4000,
      });
      setSaving(false);
      return;
    }

    toast({
      title: "Inspection Item Created successfull",
      duration: 4000,
      status: "success",
    });

    cateogryRef.current!.value = "";
    nameRef.current!.value = "";
    embeddedImageRef.current!.value = "";
    summaryRef.current!.value = "";
    openingParagraphRef.current.clearEditor();
    closingParagraphRef.current.clearEditor();
    setSaving(false);
  };

  const categories = ["Pre-Slab", "Post-Slab", "Waterproofling"];

  return (
    <PageLayout title="New Library Item">
      <Box bg="main-bg" border="stroke" borderRadius={5} p="3">
        <Flex direction={"column"} px={{ base: 4, sm: "10" }} py={4} gap={3}>
          <FormSelect
            options={categories}
            label="Category"
            ref={cateogryRef}
            inputError={formErrors?.category}
            placeholder="Select a category"
          />
          <FormInput
            type="text"
            name="itemName"
            label="Name"
            placeholder="Enter Item Name"
            ref={nameRef}
            inputError={formErrors?.itemName}
          />
          <RichEditor
            ref={openingParagraphRef}
            label="Opening Paragraph"
            inputError={formErrors?.openingParagraph}
          />
          <FileInput
            label="Embedded Image"
            name="embeddedImage"
            type="file"
            ref={embeddedImageRef}
          />
          <RichEditor
            ref={closingParagraphRef}
            label="Closing Paragraph"
            inputError={formErrors?.closingParagraph}
          />
          <FormTextArea
            label="Summary"
            name="itemSummary"
            placeholder="Type item summary"
            inputError={formErrors?.itemSummary}
            ref={summaryRef}
          />
          <ButtonPrimary
            onClick={handleCreateItem}
            isLoading={saving}
            loadingText="Saving"
          >
            Create Item
          </ButtonPrimary>
        </Flex>
      </Box>
    </PageLayout>
  );
};

export default NewLibraryItem;
