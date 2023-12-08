"use client";

import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { LibraryItem, LibraryItemCategory } from "../types";
import { useForm } from "react-hook-form";
import FormSelect from "./FormSelect";
import { inspectionApi } from "../services/api";
import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import FileInput from "./FileInput";
import RichEditor from "./RichEditor";
import { CLEAR_EDITOR_COMMAND, LexicalEditor } from "lexical";
import {
  getParsedDataFromEditorState,
  parsedDataToEditorState,
} from "../utils/editorData";
import ButtonPrimary from "./ButtonPrimary";
import { getResizedImagesBase64Main } from "../utils/resize";
import ButtonOutline from "./ButtonOutline";
import { useNavigate } from "react-router-dom";

type LibraryItemFormProps = {
  isEditing?: boolean;
  libraryItem?: LibraryItem;
  newItem?: boolean;
};

const LibraryItemForm = ({
  isEditing,
  libraryItem,
  newItem,
}: LibraryItemFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LibraryItem>();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([]);
  const [formErrors, setFormErrors] = useState<any>(null);

  const openingParagraphEditorRef = useRef<LexicalEditor>(null);
  const closingParagraphEditorRef = useRef<LexicalEditor>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const [openingParagraphState, setOpeningParagraphState] = useState<any>();
  const [closingParagraphState, setClosingParagraphState] = useState<any>();
  const [isImgRemoved, setIsImgRemoved] = useState(false);
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

    if (isEditing && libraryItem && !newItem) {
      reset({
        category: libraryItem.category_id?.toString(),
        name: libraryItem.name,
        summary: libraryItem.summary,
      });
      setOpeningParagraphState(
        parsedDataToEditorState(libraryItem?.openingParagraph!)
      );
      setClosingParagraphState(
        parsedDataToEditorState(libraryItem?.closingParagraph!)
      );
    }
  }, []);

  const onSubmitItemForm = async (formData: any) => {
    const { category, name, summary, embeddedImage } = formData;

    const openingParagraph = getParsedDataFromEditorState(
      openingParagraphState
    );
    const closingParagraph = getParsedDataFromEditorState(
      closingParagraphState
    );

    const errors: any = {};

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

    const libItemData: any = {
      category_id: parseInt(category as string),
      name,
      summary,
      openingParagraph: JSON.stringify(openingParagraph),
      closingParagraph: JSON.stringify(closingParagraph),
    };

    if (isImgRemoved) {
      libItemData.embeddedImage = null;
    }

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

    setSaving(true);

    if (isEditing) {
      const response = await inspectionApi.put(
        `/library-items/${libraryItem?.id}`,
        libItemData
      );
      if (response.status !== 200) {
        toast({
          title: "Couldn't update the item.",
          duration: 4000,
          status: "error",
        });
        setSaving(false);
        return;
      }

      toast({
        title: "Library item successfully updated",
        duration: 4000,
        status: "success",
      });
      navigate(-1);
    } else {
      const response = await inspectionApi.post("/library-items", libItemData);
      if (response.status !== 201) {
        toast({
          title: "Couldn't create library item",
          duration: 4000,
          status: "error",
        });
        setSaving(false);
        return;
      }

      toast({
        title: "Library item created successfully",
        duration: 4000,
        status: "success",
      });

      reset({
        name: "",
        category: "",
        summary: "",
        embeddedImage: "",
      });

      openingParagraphEditorRef.current?.dispatchCommand(
        CLEAR_EDITOR_COMMAND,
        undefined
      );
      closingParagraphEditorRef.current?.dispatchCommand(
        CLEAR_EDITOR_COMMAND,
        undefined
      );
      setSaving(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Box bg={"main-bg"} border={"stroke"} borderRadius={4} py={3} px={10}>
      <form onSubmit={handleSubmit(onSubmitItemForm)}>
        <VStack alignItems={"start"}>
          <FormSelect
            id="category"
            label="Category"
            placeholder="Select a category"
            inputError={errors.category?.message}
            {...register("category", {
              required: !isEditing ? "Please select a category" : false,
            })}
            options={categories}
          />
          <FormInput
            id="name"
            label="Name"
            placeholder="Enter name here"
            inputError={errors.name?.message}
            {...register("name", {
              required: !isEditing ? "Name is required" : false,
            })}
          />
          <FormTextArea
            id="summary"
            label="Summary"
            placeholder="Type summary here"
            {...register("summary", {
              required: !isEditing ? "Summary is required" : false,
              maxLength: 210,
            })}
            inputError={errors.summary?.message}
          />
          {isEditing &&
            libraryItem &&
            libraryItem.embeddedImage &&
            libraryItem.embeddedImage !== "" &&
            !isImgRemoved && (
              <Box>
                <Text fontSize={"lg"}>Embedded Image</Text>
                <Image src={libraryItem.embeddedImage} maxW={"300px"} />
                <Button
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => setIsImgRemoved(true)}
                >
                  Remove Image
                </Button>
              </Box>
            )}
          <FileInput
            id="embeddedImage"
            label={isEditing ? "New Embedded Image" : "Embedded Image"}
            subLabel="Optional"
            accept=".jpg, .jpeg, .png"
            {...register("embeddedImage")}
          />
          <RichEditor
            label="Opening Paragraph"
            ref={openingParagraphEditorRef}
            editorState={openingParagraphState}
            setEditorState={setOpeningParagraphState}
            inputError={formErrors?.openingParagraph}
          />
          <RichEditor
            label="Closing Paragraph"
            ref={closingParagraphEditorRef}
            editorState={closingParagraphState}
            setEditorState={setClosingParagraphState}
            inputError={formErrors?.closingParagraph}
          />
        </VStack>
        <Flex mt={3} gap={3}>
          <ButtonPrimary
            type="submit"
            isLoading={saving}
            loadingText={isEditing ? "Updating" : "Creating"}
          >
            Submit
          </ButtonPrimary>
          <ButtonOutline onClick={() => navigate(-1)}>Cancel</ButtonOutline>
        </Flex>
      </form>
    </Box>
  );
};

export default LibraryItemForm;
