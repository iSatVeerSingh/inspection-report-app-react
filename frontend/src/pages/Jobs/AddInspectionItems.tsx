import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../../Layout/PageLayout";
import Card from "../../components/Card";
import { InspectionItemForm, Job } from "../../types";
import { Box, Flex, Grid, Heading, VStack, useToast } from "@chakra-ui/react";
import MiniDetail from "../../components/MiniDetail";
import FormSelect from "../../components/FormSelect";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import clientApi from "../../api/clientApi";
import Loading from "../../components/Loading";
import DatalistInput from "../../components/DatalistInput";
import FileInput from "../../components/FileInput";
import FormTextArea from "../../components/FormTextArea";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import { getResizedImagesBase64Main } from "../../utils/resize";

const AddInspectionItems = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { state: job }: { state: Job } = useLocation();
  const [categories, setCategories] = useState<string[]>([]);
  const [libraryItems, setLibraryItems] = useState<
    { name: string; category: string }[]
  >([]);

  const [itemNames, setItemNames] = useState<string[]>([]);
  const datalistRef = useRef<HTMLInputElement>(null);

  const [formErrors, setFormErrors] =
    useState<Partial<InspectionItemForm> | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const response = await clientApi.get("/library-index");
      if (response.status !== 200) {
        setLoading(false);
        return;
      }
      setCategories(response.data.categories);
      setLibraryItems(response.data.libraryItems);
      setLoading(false);
    })();
  }, []);

  const filterItemNames: ChangeEventHandler<HTMLSelectElement> &
    FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLSelectElement;

    datalistRef!.current!.value = "";
    const filteredNames = libraryItems
      .filter((item) => item.category === target.value)
      .map((item) => item.name);

    setItemNames(filteredNames);
  };

  const onSubmitItemForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const itemData: InspectionItemForm = {
      category: formData.get("category")?.toString().trim()!,
      name: formData.get("name")?.toString().trim()!,
      images: formData.getAll("images") as File[],
      note: formData.get("note")?.toString().trim(),
    };

    const errors: Partial<InspectionItemForm> = {};
    if (itemData.category === "") {
      errors.category = "Please select a category";
    }
    if (itemData.name === "") {
      errors.name = "Please choose a name";
    }

    if (itemData.images.length === 0) {
      errors.images = "Please select atleast one image";
    }

    if (itemData.images.length > 8) {
      errors.images = "Max 8 images allowed";
    }

    if (itemData.note!.length > 200) {
      errors.note = "Note should be max 200 characters";
    }

    if (Object.keys(errors).length !== 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors(null);
    setSaving(true);

    const resizedImages = await getResizedImagesBase64Main(
      itemData.images as File[]
    );

    itemData.images = resizedImages;

    const response = await clientApi.post(
      `/jobs/inspection-items?jobNumber=${job.jobNumber}`,
      itemData
    );
    if (response.status !== 200) {
      toast({
        title: response.data.message,
        duration: 4000,
        status: "error",
      });
      setSaving(false);
      return;
    }

    toast({
      title: response.data.message,
      status: "success",
      duration: 4000,
    });
    setSaving(false);

    target.reset();
  };

  return (
    <PageLayout title="Add Inspection Items">
      {loading ? (
        <Loading />
      ) : (
        <Card>
          <Heading
            as="h2"
            fontSize={{ base: "xl", sm: "2xl" }}
            fontWeight={"semibold"}
            color={"text.700"}
          >
            &#35;{job?.jobNumber} - {job?.category}
          </Heading>
          <Grid gap={2} mt={2}>
            <MiniDetail property="Category" value={job?.category!} />
            <MiniDetail
              property="Customer"
              value={job?.customer!.nameOnReport!}
            />
            <MiniDetail property="Site Address" value={job?.siteAddress!} />
          </Grid>
          <Box mt={4}>
            <form onSubmit={onSubmitItemForm}>
              <VStack>
                <FormSelect
                  options={categories}
                  isRequired
                  label="Category"
                  id="category"
                  name="category"
                  placeholder="Select a category"
                  onChange={filterItemNames}
                  inputError={formErrors?.category}
                />
                <DatalistInput
                  dataList={itemNames}
                  isRequired
                  label="Name"
                  id="name"
                  name="name"
                  placeholder="type here name"
                  ref={datalistRef}
                  inputError={formErrors?.name}
                />
                <FileInput
                  isRequired
                  label="Images"
                  subLabel="Max (8)"
                  id="images"
                  name="images"
                  multiple
                  accept=".jpeg, .jpg, .png"
                  inputError={formErrors?.images as string}
                />
                <FormTextArea
                  label="Note"
                  subLabel="Optional"
                  id="note"
                  name="note"
                  placeholder="type note here"
                  inputError={formErrors?.note}
                />
              </VStack>
              <Flex mt={2} gap={3}>
                <ButtonPrimary
                  w={"200px"}
                  type="submit"
                  isLoading={saving}
                  loadingText="Adding"
                >
                  Add Item
                </ButtonPrimary>
                <ButtonOutline onClick={() => navigate(-1)}>
                  Cancel
                </ButtonOutline>
              </Flex>
            </form>
          </Box>
        </Card>
      )}
    </PageLayout>
  );
};

export default AddInspectionItems;

// import { Box, Flex, Heading } from "@chakra-ui/react";
// import PageLayout from "../../Layout/PageLayout";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ChangeEvent,
//   ChangeEventHandler,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import clientApi from "../../services/clientApi";
// import { Job, InspectionItem } from "../../types";
// import MiniDetail from "../../components/MiniDetail";
// import FormSelect from "../../components/FormSelect";
// import { useForm } from "react-hook-form";
// import DatalistInput from "../../components/DatalistInput";
// import FileInput from "../../components/FileInput";
// import FormTextArea from "../../components/FormTextArea";
// import ButtonPrimary from "../../components/ButtonPrimary";

// const AddInspectionItems = () => {
//   const navigate = useNavigate();
//   const { jobNumber } = useParams();
//   const [job, setJob] = useState<Job | null>(null);
//   const [libraryIndex, setLibraryIndex] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [itemNames, setItemNames] = useState<string[]>([]);
//   const datalistRef = useRef<HTMLInputElement>(null);
//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<InspectionItem>();

//   useEffect(() => {
//     (async () => {
//       const response = await clientApi.get(
//         `/inspection?jobNumber=${jobNumber}`
//       );
//       if (response.status !== 200) {
//         return;
//       }
//       setJob(response.data);

//       const libindexResponse = await clientApi.get("/library-index");
//       if (libindexResponse.status !== 200) {
//         return;
//       }
//       setCategories(libindexResponse.data.categories);
//       setLibraryIndex(libindexResponse.data.items);
//     })();
//   }, []);

//   const filterItemNames = (e: ChangeEvent<HTMLSelectElement>) => {
//     e.preventDefault();
//     const target = e.target as HTMLSelectElement;
//     datalistRef.current!.value = "";
//     const filteredNames = libraryIndex
//       .filter((item: any) => item.category_id === Number(target.value))
//       .map((item: any) => item.name);
//     setItemNames(filteredNames);
//   };

//   const onSubmitItemForm = (formData: any) => {
//     console.log(formData);
//   };

//   return (
//     <PageLayout title="Add Inspection Items">
//       <Box bg={"card-bg"} shadow={"xs"} p={3} borderRadius={"xl"}>
//         <Heading
//           as="h2"
//           fontSize={{ base: "xl", sm: "2xl" }}
//           fontWeight={"medium"}
//         >
//           &#35;{job?.jobNumber} - {job?.category}
//         </Heading>
//         <Flex direction={"column"} gap={1} px={3} mt={4}>
//           <MiniDetail property="Category" value={job?.category!} />
//           <MiniDetail
//             property="Customer"
//             value={job?.customer!.nameOnReport!}
//           />
//           <MiniDetail property="Site Address" value={job?.siteAddress!} />
//         </Flex>
//         <form onSubmit={handleSubmit(onSubmitItemForm)}>
//           <FormSelect
//             id="category"
//             label="Category"
//             placeholder="Select a category"
//             options={categories}
//             {...register("category_id", {
//               required: true,
//               onChange: filterItemNames,
//             })}
//           />
//           <DatalistInput
//             id="name"
//             label="Name"
//             dataList={itemNames}
//             placeholder="Enter item name here"
//             ref={datalistRef}
//           />
//           <FileInput
//             id="images"
//             label="Item Images"
//             subLabel="Max 8 images"
//             multiple
//             accept=".jpeg, .jpg, .png"
//             {...register("images", {
//               required: true,
//               max: 3,
//             })}
//           />
//           <FormTextArea
//             id="note"
//             label="Note (optional)"
//             placeholder="type here"
//             {...register("note", {
//               maxLength: 200,
//             })}
//           />
//           <ButtonPrimary type="submit">Add Item</ButtonPrimary>
//         </form>
//       </Box>
//     </PageLayout>
//   );
// };

// export default AddInspectionItems;

// // const AddInspectionItems = () => {
// //   const datalistRef = useRef<HTMLInputElement | null>(null);
// //   const { isOpen, onOpen, onClose } = useDisclosure();
// //   const [itemNames, setItemNames] = useState([]);
// //   const [formErrors, setFormErrors] = useState<any>(null);
// //   const [saving, setSaving] = useState(false);
// //   const toast = useToast();

// //   const params = useParams();
// //   const [loading, setLoading] = useState(true);
// //   const [libIndex, setLibIndex] = useState<any>(null);
// //   const [inspection, setInspection] = useState<Inspection | null>(null);
// //   const [categories, setCategories] = useState<any[]>([]);

// //   useEffect(() => {
// //     const getInspection = async () => {
// //       const response = await clientApi.get(
// //         `/inspections?inspectionId=${params.inspectionId}`
// //       );

// //       if (response.status !== 200) {
// //         setLoading(false);
// //         return;
// //       }

// //       setInspection(response.data);
// //       setLoading(false);
// //     };

// //     const getLibIndex = async () => {
// //       const response = await clientApi.get("/library-index");
// //       if (response.status !== 200) {
// //         return;
// //       }
// //       setLibIndex(response.data);

// //       const allCategories = Array.from(
// //         new Set(response.data.map((item: any) => item.category))
// //       );

// //       setCategories(allCategories);
// //     };

// //     getInspection();
// //     getLibIndex();
// //   }, []);

// //   const filterItemNames: ChangeEventHandler = (e) => {
// //     e.preventDefault();
// //     datalistRef.current!.value = "";
// //     const target = e.target as HTMLInputElement;
// //     const filteredNames = libIndex
// //       .filter((item: any) => item.category === target.value)
// //       .map((item: any) => item.name);
// //     setItemNames(filteredNames);
// //   };

// //   const handleAddItem: FormEventHandler<HTMLFormElement> = async (
// //     e: FormEvent
// //   ) => {
// //     e.preventDefault();

// //     const isOffScreen = typeof OffscreenCanvas !== undefined;

// //     const target = e.target as HTMLFormElement;
// //     const itemData = new FormData(target);
// //     const formErrors: any = {};

// //     const category = itemData.get("category")?.toString().trim();
// //     const itemName = itemData.get("itemName")?.toString().trim();
// //     const images = itemData.getAll("itemImages") as File[];

// //     if (category === "") {
// //       formErrors.category = "Please select a category";
// //     }

// //     if (itemName === "") {
// //       formErrors.itemName = "Please select an item name";
// //     }

// //     if (images.length === 0) {
// //       formErrors.itemImages = "Please select minimum 1 image";
// //     }
// //     if (images.length > 8) {
// //       formErrors.itemImages = "Max 8 images allowed";
// //     }

// //     if (Object.keys(formErrors).length !== 0) {
// //       setFormErrors(formErrors);
// //       return;
// //     }

// //     setFormErrors(null);
// //     setSaving(true);
// //     const library = libIndex.find((item: any) => item.name === itemName);
// //     itemData.append("libraryId", library.id);

// //     if (!isOffScreen) {
// //       itemData.delete("itemImages");
// //       const resizedImages = await getResizedBase64Images(images);
// //       for (let img of resizedImages) {
// //         itemData.append("itemImages", img as string);
// //       }
// //       itemData.append("type", "resized");
// //     }

// //     const response = await clientApi.post(
// //       `/inspections/items?inspectionId=${params.inspectionId}`,
// //       itemData
// //     );

// //     if (response.status !== 201) {
// //       toast({
// //         title: response.data.message || "Invalid request",
// //         duration: 4000,
// //         status: "error",
// //       });
// //       setSaving(false);
// //       return;
// //     }

// //     toast({
// //       title: "Item created successfully",
// //       description: itemName + " saved",
// //       duration: 4000,
// //       status: "success",
// //     });

// //     target.reset();
// //     setSaving(false);
// //   };

// //   const handleAddCustomItem: FormEventHandler = async (e) => {
// //     e.preventDefault();

// //     const isOffScreen = typeof OffscreenCanvas !== undefined;
// //     const target = e.target as HTMLFormElement;
// //     const formErrors: any = {};

// //     const itemData = new FormData(target);
// //     const itemName = itemData.get("itemName")?.toString().trim();
// //     const images = itemData.getAll("itemImages") as File[];
// //     const openingParagraph = itemData
// //       .get("openingParagraph")
// //       ?.toString()
// //       .trim();
// //     const closingParagraph = itemData
// //       .get("closingParagraph")
// //       ?.toString()
// //       .trim();
// //     const embeddedImage = itemData.get("embeddedImage") as File;

// //     if (itemName === "") {
// //       formErrors.itemName = "Please provide an item name";
// //     }

// //     if (images.length === 0) {
// //       formErrors.itemImages = "Please select minimum 1 image";
// //     }
// //     if (images.length > 8) {
// //       formErrors.itemImages = "Max 8 images allowed";
// //     }

// //     if (openingParagraph === "") {
// //       formErrors.openingParagraph = "Please provide opening paragraph";
// //     }
// //     if (closingParagraph === "") {
// //       formErrors.closingParagraph = "Please provide closing paragraph";
// //     }

// //     if (Object.keys(formErrors).length !== 0) {
// //       setFormErrors(formErrors);
// //       return;
// //     }

// //     setSaving(true);

// //     if (embeddedImage.size > 0) {
// //       itemData.delete("embeddedImage");
// //       const resizedEmb = await getResizedBase64Images([embeddedImage]);
// //       itemData.append("embeddedImage", resizedEmb[0] as string);
// //     } else {
// //       itemData.delete("embeddedImage");
// //     }

// //     if (!isOffScreen) {
// //       itemData.delete("itemImages");
// //       const resizedImages = await getResizedBase64Images(images);
// //       for (let img of resizedImages) {
// //         itemData.append("itemImages", img as string);
// //       }
// //       itemData.append("type", "resized");
// //     }

// //     itemData.append("custom", "custom");

// //     const response = await clientApi.post(
// //       `/inspections/items?inspectionId=${params.inspectionId}`,
// //       itemData
// //     );

// //     if (response.status !== 201) {
// //       toast({
// //         title: response.data.message || "Invalid request",
// //         duration: 4000,
// //         status: "error",
// //       });
// //       setSaving(false);
// //       return;
// //     }

// //     toast({
// //       title: "Item created successfully",
// //       description: itemName + " saved",
// //       duration: 4000,
// //       status: "success",
// //     });

// //     target.reset();
// //     setSaving(false);
// //   };

// //   return (
// //     <PageLayout title="Add New Items">
// //       {loading ? (
// //         <Loading />
// //       ) : (
// //         <Box bg="main-bg" border="stroke" borderRadius={5} p="3">
// //           <Heading as="h2" fontSize={"2xl"} fontWeight={"medium"}>
// //             &#35;{inspection?.jobNumber} - {inspection?.category}
// //           </Heading>
// //           <Text fontSize={"lg"} color={"dark-gray"}>
// //             {inspection?.siteAddress}
// //           </Text>
// //           <form onSubmit={handleAddItem}>
// //             <Flex mt={4} direction={"column"} gap={3} alignItems={"start"}>
// //               <FormSelect
// //                 options={categories}
// //                 label="Category"
// //                 placeholder="Select item category"
// //                 name="category"
// //                 onChange={filterItemNames}
// //                 inputError={formErrors?.category}
// //                 required
// //               />
// //               <DatalistInput
// //                 name="itemName"
// //                 label="Item Name"
// //                 placeholder="Search item name here"
// //                 dataList={itemNames}
// //                 inputError={formErrors?.itemName}
// //                 ref={datalistRef}
// //               />
// //               <FileInput
// //                 name="itemImages"
// //                 label="Item Images"
// //                 subLabel="Max 8 images allowed"
// //                 multiple
// //                 inputError={formErrors?.itemImages}
// //               />
// //               <FormTextArea
// //                 label="Item Note"
// //                 placeholder="Type item note here"
// //                 name="itemNote"
// //               />
// //               <ButtonPrimary
// //                 width={"200px"}
// //                 type="submit"
// //                 isLoading={saving}
// //                 loadingText="Saving"
// //               >
// //                 Add Item
// //               </ButtonPrimary>
// //             </Flex>
// //           </form>
// //           <Flex mt={10} justifyContent={"space-between"}>
// //             <ButtonOutline onClick={onOpen}>Create Custom Item</ButtonOutline>
// //           </Flex>
// //         </Box>
// //       )}
// //       <Modal
// //         closeOnOverlayClick={false}
// //         isOpen={isOpen}
// //         onClose={onClose}
// //         size={{ base: "md", md: "2xl" }}
// //       >
// //         <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
// //         <ModalContent>
// //           <ModalHeader>Create Custom Item</ModalHeader>
// //           <ModalCloseButton />
// //           <form onSubmit={handleAddCustomItem}>
// //             <Flex
// //               direction={"column"}
// //               px={{ base: 4, sm: "10" }}
// //               py={4}
// //               gap={3}
// //             >
// //               <FormInput
// //                 type="text"
// //                 name="itemName"
// //                 label="Name"
// //                 placeholder="Enter item name"
// //                 inputError={formErrors?.itemName}
// //                 required
// //               />
// //               <FormTextArea
// //                 label="Summary"
// //                 name="itemSummary"
// //                 placeholder="Type item summary"
// //                 inputError={formErrors?.itemSummary}
// //               />
// //               <FileInput
// //                 name="itemImages"
// //                 label="Item Images"
// //                 subLabel="Max 8 Images"
// //                 multiple
// //                 required
// //                 inputError={formErrors?.itemImages}
// //               />
// //               <FormTextArea
// //                 label="Opening Paragraph"
// //                 name="openingParagraph"
// //                 placeholder="Type paragraph here"
// //                 required
// //                 inputError={formErrors?.openingParagraph}
// //               />
// //               <FileInput
// //                 label="Embedded Image"
// //                 name="embeddedImage"
// //                 type="file"
// //               />
// //               <FormTextArea
// //                 label="Closing paragraph"
// //                 name="closingParagraph"
// //                 placeholder="Type paragraph here"
// //                 required
// //                 inputError={formErrors?.closingParagraph}
// //               />
// //               <Flex
// //                 gap={3}
// //                 justifyContent={"space-between"}
// //                 direction={{ base: "column", sm: "row" }}
// //               >
// //                 <ButtonPrimary
// //                   type="submit"
// //                   width={{ sm: "200px" }}
// //                   loadingText="Saving"
// //                   isLoading={saving}
// //                 >
// //                   Create Item
// //                 </ButtonPrimary>
// //                 <ButtonOutline onClick={onClose}>Close</ButtonOutline>
// //               </Flex>
// //             </Flex>
// //           </form>
// //         </ModalContent>
// //       </Modal>
// //     </PageLayout>
// //   );
// // };

// // export default AddInspectionItems;
