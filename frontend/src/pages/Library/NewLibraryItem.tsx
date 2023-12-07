"use client";

import { Box, Flex, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useEffect, useRef, useState } from "react";
import { inspectionApi } from "../../services/api";
import { LibraryItemCategory } from "../../types";
import Loading from "../../components/Loading";
import FormSelectNormal from "../../components/FormSelectNormal";
import FormInputNormal from "../../components/FormInputNormal";
import FormTextAreaNormal from "../../components/FormTextAreaNormal";
import RichEditor from "../../components/RichEditor";
import FileInputNormal from "../../components/FileInputNormal";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import { getParagraphDataFromEditor } from "../../utils/editorData";
import {
  CLEAR_EDITOR_COMMAND,
  LexicalEditor,
  SerializedEditorState,
} from "lexical";
import { getResizedImagesBase64Main } from "../../utils/resize";
import { useNavigate } from "react-router-dom";

const NewLibraryItem = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([]);
  const [formErrors, setFormErrors] = useState<any>(null);
  const [openingParagraphState, setOpeningParagraphState] = useState<any>();
  const [closingParagraphState, setClosingParagraphState] = useState<any>();
  const [saving, setSaving] = useState(false);

  const toast = useToast();

  const categoryRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const embeddedImageRef = useRef<HTMLInputElement>(null);
  const openingParagraphEditorRef = useRef<LexicalEditor>(null);
  const closingParagraphEditorRef = useRef<LexicalEditor>(null);

  const getAllCategories = async () => {
    const response = await inspectionApi.get("/library-item-categories");
    if (response.status !== 200) {
      setLoading(false);
      return;
    }

    const allCategories = response.data.data.map(
      (category: LibraryItemCategory) => ({
        text: category.name,
        value: category.id,
      })
    );

    setCategories(allCategories);
    setLoading(false);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const onSubmitItemForm = async () => {
    const category = categoryRef.current?.value;
    const name = nameRef.current?.value.trim();
    const summary = summaryRef.current?.value.trim();
    const openingParagraph = getParagraphDataFromEditor(
      openingParagraphState as SerializedEditorState
    );
    const embeddedImage = embeddedImageRef.current?.files;
    const closingParagraph = getParagraphDataFromEditor(
      closingParagraphState as SerializedEditorState
    );

    const errors: any = {};
    if (category === "") {
      errors.category = "Please select a category";
    }

    if (name === "") {
      errors.name = "Please provide a name";
    }
    if (summary === "") {
      errors.summary = "Please provide a short summary";
    } else if (summary!.length > 210) {
      errors.summary = "Please kepp the summary short";
    }
    if (openingParagraph.length === 0) {
      errors.openingParagraph = "Opening Paragraph is required";
    }

    if (closingParagraph.length === 0) {
      errors.closingParagraph = "Closing paragraph is required";
    }

    if (Object.keys(errors).length !== 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors(null);
    setSaving(true);
    const libItemData: any = {
      category_id: parseInt(category as string),
      name,
      summary,
      openingParagraph: JSON.stringify(openingParagraph),
      closingParagraph: JSON.stringify(closingParagraph),
    };

    if (
      embeddedImage &&
      embeddedImage.length === 1 &&
      embeddedImage[0].size > 0
    ) {
      const base64Image = await getResizedImagesBase64Main(
        embeddedImage as unknown as File[]
      );
      libItemData.embeddedImage = base64Image[0];
    }

    const response = await inspectionApi.post("/library-items", libItemData);
    if (response.status < 200 || response.status > 299) {
      setSaving(false);
      toast({
        title: response.data.message || "Couldn't create item",
        status: "error",
        duration: 4000,
      });
      return;
    }

    toast({
      title: response.data.message,
      status: "success",
      duration: 4000,
    });

    setSaving(false);
    categoryRef.current!.value = "";
    nameRef.current!.value = "";
    summaryRef.current!.value = "";
    embeddedImageRef.current!.value = "";
    openingParagraphEditorRef.current?.dispatchCommand(
      CLEAR_EDITOR_COMMAND,
      undefined
    );
    closingParagraphEditorRef.current?.dispatchCommand(
      CLEAR_EDITOR_COMMAND,
      undefined
    );
  };

  return (
    <PageLayout title="New Library Item">
      {loading ? (
        <Loading />
      ) : (
        <Box bg={"main-bg"} border={"stroke"} borderRadius={4} py={3} px={10}>
          <Flex flexDir={"column"} gap={2}>
            <FormSelectNormal
              options={categories}
              label="Category"
              id="category"
              placeholder="Please select a category"
              ref={categoryRef}
              inputError={formErrors?.category}
            />
            <FormInputNormal
              id="name"
              label="Name"
              placeholder="Enter item name"
              ref={nameRef}
              inputError={formErrors?.name}
            />
            <FormTextAreaNormal
              id="summary"
              placeholder="Type summary here"
              label="Summary"
              ref={summaryRef}
              inputError={formErrors?.summary}
            />
            <RichEditor
              label="Opening Paragraph"
              inputError={formErrors?.openingParagraph}
              editorState={openingParagraphState}
              setEditorState={setOpeningParagraphState}
              ref={openingParagraphEditorRef}
            />
            <FileInputNormal
              id="embeddedImage"
              label="Embedded Image"
              subLabel="Optional"
              accept=".jpg, .jpeg, .png"
              ref={embeddedImageRef}
            />
            <RichEditor
              label="Closing Paragraph"
              inputError={formErrors?.closingParagraph}
              editorState={closingParagraphState}
              setEditorState={setClosingParagraphState}
              ref={closingParagraphEditorRef}
            />
            <Flex gap={3}>
              <ButtonPrimary
                onClick={onSubmitItemForm}
                isLoading={saving}
                loadingText="Creating"
              >
                Submit
              </ButtonPrimary>
              <ButtonOutline onClick={() => navigate(-1)}>Cancel</ButtonOutline>
            </Flex>
          </Flex>
        </Box>
      )}
    </PageLayout>
  );
};

export default NewLibraryItem;
