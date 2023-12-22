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
import { useEffect, useRef, useState } from "react";
import clientApi from "../services/clientApi";
import FormTextArea from "./FormTextArea";
import { useForm } from "react-hook-form";
import FormSelect from "./FormSelect";
import FormInput from "./FormInput";
import FileInput from "./FileInput";
import RichEditor from "./RichEditor";
import { CLEAR_EDITOR_COMMAND, LexicalEditor } from "lexical";
import ButtonPrimary from "./ButtonPrimary";
import ButtonOutline from "./ButtonOutline";
import {
  getParsedDataFromEditorState,
  parsedDataToEditorState,
} from "../utils/editorData";
import { getResizedImagesBase64Main } from "../utils/resize";
import { useNavigate } from "react-router-dom";

type LibraryItemFormProps = {
  isEditing?: boolean;
  libraryItem?: LibraryItem;
  setIsEditing?: (state: any) => void;
};

const LibraryItemForm = ({
  isEditing,
  libraryItem,
  setIsEditing,
}: LibraryItemFormProps) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ text: string; value: any }[]>(
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LibraryItem>();
  const [formErrors, setFormErrors] = useState<any>(null);
  const [isImgRemoved, setIsImgRemoved] = useState(false);
  const openingParagraphEditorRef = useRef<LexicalEditor>(null);
  const closingParagraphEditorRef = useRef<LexicalEditor>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [openingParagraphState, setOpeningParagraphState] = useState<any>(
    libraryItem
      ? parsedDataToEditorState(libraryItem.openingParagraph)
      : undefined
  );
  const [closingParagraphState, setClosingParagraphState] = useState<any>(
    libraryItem
      ? parsedDataToEditorState(libraryItem.closingParagraph)
      : undefined
  );

  useEffect(() => {
    (async () => {
      const response = await clientApi.get("/library-item-categories");
      if (response.status !== 200) {
        return;
      }
      const allCategories = (response.data as LibraryItemCategory[]).map(
        (category) => ({ text: category.name, value: category.id })
      );
      setCategories(allCategories);

      if (isEditing && libraryItem) {
        reset({
          category_id: libraryItem.category_id,
          name: libraryItem.name,
          summary: libraryItem.summary,
        });
      }
    })();
  }, []);

  const onSubmitItemForm = async (formData: any) => {
    const { category_id, name, summary, embeddedImage } = formData;

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
      category_id: parseInt(category_id as string),
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
      const response = await clientApi.put(
        `/library-items?id=${libraryItem?.id}`,
        libItemData
      );
      if (response.status !== 200) {
        toast({
          title: response.data.message || "Couln't update item",
          status: "error",
          duration: 4000,
        });
        setSaving(false);
        return;
      }

      toast({
        title: response.data.message || "Item updated successfully",
        status: "success",
        duration: 4000,
      });
      setSaving(false);
      if (typeof setIsEditing === "function") {
        setIsEditing(false);
      }
    } else {
      const response = await clientApi.post("/library-items", libItemData);
      if (response.status !== 201) {
        toast({
          title: response.data.message || "Couldn't create item",
          status: "error",
          duration: 4000,
        });
        setSaving(false);
        return;
      }

      toast({
        title: response.data.message || "Item created successfully",
        duration: 4000,
        status: "success",
      });
      setSaving(false);
    }

    reset({
      category_id: "" as any,
      name: "",
      summary: "",
      embeddedImage: "",
    });

    openingParagraphEditorRef.current!.dispatchCommand(
      CLEAR_EDITOR_COMMAND,
      undefined
    );
    closingParagraphEditorRef.current!.dispatchCommand(
      CLEAR_EDITOR_COMMAND,
      undefined
    );
  };

  const handleCancel = () => {
    if (isEditing) {
      if (typeof setIsEditing === "function") {
        setIsEditing(false);
      }
    } else {
      navigate(-1);
    }
  };
  return (
    <Box bg={"card-bg"} p={3} borderRadius={"xl"} shadow={"xs"}>
      <form onSubmit={handleSubmit(onSubmitItemForm)}>
        <VStack alignItems={"stretch"}>
          <FormSelect
            id="category"
            label="Category"
            placeholder="Select a category"
            {...register("category_id", {
              required: !isEditing ? "Select a category" : false,
            })}
            options={categories}
            inputError={errors.category_id?.message}
          />
          <FormInput
            id="name"
            label="Name"
            placeholder="enter name here"
            {...register("name", {
              required: !isEditing ? "Name is required" : false,
            })}
            inputError={errors.name?.message}
          />
          <FormTextArea
            label="Summary"
            id="summary"
            placeholder="type summary here"
            {...register("summary", {
              required: !isEditing ? "Summary is required" : false,
              maxLength: 200,
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
        <Flex gap={3} mt={3}>
          <ButtonPrimary type="submit" isLoading={saving} loadingText="Saving">
            Submit
          </ButtonPrimary>
          <ButtonOutline onClick={handleCancel}>Cancel</ButtonOutline>
        </Flex>
      </form>
    </Box>
  );
};

export default LibraryItemForm;

// import {
//   Box,
//   Button,
//   Flex,
//   Image,
//   Text,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";
// import { LibraryItem, LibraryItemCategory } from "../types";
// import { useForm } from "react-hook-form";
// import FormSelect from "./FormSelect";
// import { inspectionApi } from "../services/api";
// import { useEffect, useRef, useState } from "react";
// import Loading from "./Loading";
// import FormInput from "./FormInput";
// import FormTextArea from "./FormTextArea";
// import FileInput from "./FileInput";
// import RichEditor from "./RichEditor";
// import { CLEAR_EDITOR_COMMAND, LexicalEditor } from "lexical";
// import {
//   getParsedDataFromEditorState,
//   parsedDataToEditorState,
// } from "../utils/editorData";
// import ButtonPrimary from "./ButtonPrimary";
// import { getResizedImagesBase64Main } from "../utils/resize";
// import ButtonOutline from "./ButtonOutline";
// import { useNavigate } from "react-router-dom";
// import clientApi from "../services/clientApi";

// type LibraryItemFormProps = {
//   isEditing?: boolean;
//   libraryItem?: LibraryItem;
//   newItem?: boolean;
// };

// const LibraryItemForm = ({
//   isEditing,
//   libraryItem,
//   newItem,
// }: LibraryItemFormProps) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<LibraryItem>();
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState<any>([]);
//   const [formErrors, setFormErrors] = useState<any>(null);

//   const openingParagraphEditorRef = useRef<LexicalEditor>(null);
//   const closingParagraphEditorRef = useRef<LexicalEditor>(null);
//   const [saving, setSaving] = useState(false);
//   const navigate = useNavigate();
//   const toast = useToast();

//   const [openingParagraphState, setOpeningParagraphState] = useState<any>();
//   const [closingParagraphState, setClosingParagraphState] = useState<any>();
//   const [isImgRemoved, setIsImgRemoved] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const response = await clientApi.get("/library-item-categories");
//       if (response.status !== 200) {
//         return;
//       }
//       const allCategories = (response.data as LibraryItemCategory[]).map(
//         (category) => ({ text: category.name, value: category.id })
//       );
//       setCategories(allCategories);

//       if (isEditing && libraryItem && !newItem) {
//         reset({
//           category: libraryItem.category_id?.toString(),
//           name: libraryItem.name,
//           summary: libraryItem.summary,
//         });
//         setOpeningParagraphState(
//           parsedDataToEditorState(libraryItem?.openingParagraph!)
//         );
//         setClosingParagraphState(
//           parsedDataToEditorState(libraryItem?.closingParagraph!)
//         );
//       }
//       setLoading(false);
//     })();
//   }, []);

//   const onSubmitItemForm = async (formData: any) => {
//     const { category, name, summary, embeddedImage } = formData;

//     const openingParagraph = getParsedDataFromEditorState(
//       openingParagraphState
//     );
//     const closingParagraph = getParsedDataFromEditorState(
//       closingParagraphState
//     );

//     const errors: any = {};

//     if (openingParagraph.length === 0) {
//       errors.openingParagraph = "Opening Paragraph is required";
//     }

//     if (closingParagraph.length === 0) {
//       errors.closingParagraph = "Closing paragraph is required";
//     }

//     if (Object.keys(errors).length !== 0) {
//       setFormErrors(errors);
//       return;
//     }

//     setFormErrors(null);

//     const libItemData: any = {
//       category_id: parseInt(category as string),
//       name,
//       summary,
//       openingParagraph: JSON.stringify(openingParagraph),
//       closingParagraph: JSON.stringify(closingParagraph),
//     };

//     if (isImgRemoved) {
//       libItemData.embeddedImage = null;
//     }

//     if (
//       embeddedImage &&
//       embeddedImage.length === 1 &&
//       embeddedImage[0].size > 0
//     ) {
//       const base64Image = await getResizedImagesBase64Main(
//         embeddedImage as unknown as File[]
//       );
//       libItemData.embeddedImage = base64Image[0];
//     }

//     setSaving(true);

//     if (isEditing) {
//       const response = await inspectionApi.put(
//         `/library-items/${libraryItem?.id}`,
//         libItemData
//       );
//       if (response.status !== 200) {
//         toast({
//           title: "Couldn't update the item.",
//           duration: 4000,
//           status: "error",
//         });
//         setSaving(false);
//         return;
//       }

//       toast({
//         title: "Library item successfully updated",
//         duration: 4000,
//         status: "success",
//       });
//       navigate(-1);
//     } else {
//       const response = await inspectionApi.post("/library-items", libItemData);
//       if (response.status !== 201) {
//         toast({
//           title: "Couldn't create library item",
//           duration: 4000,
//           status: "error",
//         });
//         setSaving(false);
//         return;
//       }

//       toast({
//         title: "Library item created successfully",
//         duration: 4000,
//         status: "success",
//       });

//       reset({
//         name: "",
//         category: "",
//         summary: "",
//         embeddedImage: "",
//       });

//       openingParagraphEditorRef.current?.dispatchCommand(
//         CLEAR_EDITOR_COMMAND,
//         undefined
//       );
//       closingParagraphEditorRef.current?.dispatchCommand(
//         CLEAR_EDITOR_COMMAND,
//         undefined
//       );
//       setSaving(false);
//     }
//   };

//   return loading ? (
//     <Loading />
//   ) : (
//     <Box bg={"card-bg"} borderRadius={"xl"} py={3} px={4} shadow={"xs"}>
//       <form onSubmit={handleSubmit(onSubmitItemForm)}>
//         <VStack alignItems={"start"}>
//           <FormSelect
//             id="category"
//             label="Category"
//             placeholder="Select a category"
//             inputError={errors.category?.message}
//             {...register("category", {
//               required: !isEditing ? "Please select a category" : false,
//             })}
//             options={categories}
//           />
//           <FormInput
//             id="name"
//             label="Name"
//             placeholder="Enter name here"
//             inputError={errors.name?.message}
//             {...register("name", {
//               required: !isEditing ? "Name is required" : false,
//             })}
//           />
//           <FormTextArea
//             id="summary"
//             label="Summary"
//             placeholder="Type summary here"
//             {...register("summary", {
//               required: !isEditing ? "Summary is required" : false,
//               maxLength: 210,
//             })}
//             inputError={errors.summary?.message}
//           />
//           {isEditing &&
//             libraryItem &&
//             libraryItem.embeddedImage &&
//             libraryItem.embeddedImage !== "" &&
//             !isImgRemoved && (
//               <Box>
//                 <Text fontSize={"lg"}>Embedded Image</Text>
//                 <Image src={libraryItem.embeddedImage} maxW={"300px"} />
//                 <Button
//                   size={"sm"}
//                   variant={"outline"}
//                   onClick={() => setIsImgRemoved(true)}
//                 >
//                   Remove Image
//                 </Button>
//               </Box>
//             )}
//           <FileInput
//             id="embeddedImage"
//             label={isEditing ? "New Embedded Image" : "Embedded Image"}
//             subLabel="Optional"
//             accept=".jpg, .jpeg, .png"
//             {...register("embeddedImage")}
//           />
//           <RichEditor
//             label="Opening Paragraph"
//             ref={openingParagraphEditorRef}
//             editorState={openingParagraphState}
//             setEditorState={setOpeningParagraphState}
//             inputError={formErrors?.openingParagraph}
//           />
//           <RichEditor
//             label="Closing Paragraph"
//             ref={closingParagraphEditorRef}
//             editorState={closingParagraphState}
//             setEditorState={setClosingParagraphState}
//             inputError={formErrors?.closingParagraph}
//           />
//         </VStack>
//         <Flex mt={3} gap={3}>
//           <ButtonPrimary
//             type="submit"
//             isLoading={saving}
//             loadingText={isEditing ? "Updating" : "Creating"}
//           >
//             Submit
//           </ButtonPrimary>
//           <ButtonOutline onClick={() => navigate(-1)}>Cancel</ButtonOutline>
//         </Flex>
//       </form>
//     </Box>
//   );
// };

// export default LibraryItemForm;
