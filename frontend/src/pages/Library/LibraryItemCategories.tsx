import { useEffect, useState, useRef } from "react";
import PageLayout from "../../Layout/PageLayout";
import { LibraryItemCategory } from "../../types";
import { inspectionApi } from "../../services/api";
import Loading from "../../components/Loading";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MoreIcon } from "../../icons";
import FormInput from "../../components/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";

const LibraryItemCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<LibraryItemCategory[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const deleteCategoryRef = useRef<any>();
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<any>();
  const toast = useToast();

  const getAllCategories = async () => {
    setLoading(true);
    const response = await inspectionApi.get("/library-item-categories");
    if (response.status !== 200) {
      setLoading(false);
      return;
    }
    setCategories(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleNewCategoryBtn = () => {
    setIsEditing(false);
    reset({
      name: "",
    });
    onOpen();
  };

  const handleEditCategoryBtn = (category: any) => {
    setIsEditing(true);
    reset(category);
    onOpen();
  };

  const onSubmitCategoryForm: SubmitHandler<any> = async (formData: any) => {
    setSaving(true);
    if (isEditing) {
      if (!dirtyFields.name) {
        return;
      }

      const response = await inspectionApi.put(
        `/library-item-categories/${formData.id}`,
        {
          name: formData.name,
        }
      );

      if (response.status !== 200) {
        toast({
          title: response.data.message || "Coudn't update category",
          duration: 4000,
          status: "error",
        });
        setSaving(false);
        return;
      }

      toast({
        title: "Category updated successfully",
        status: "success",
        duration: 4000,
      });
      setIsEditing(false);
      setSaving(false);
      onClose();
      await getAllCategories();
    } else {
      const response = await inspectionApi.post(
        "/library-item-categories",
        formData
      );
      if (response.status !== 201) {
        toast({
          title: response.data.message || "Coundn't create category",
          duration: 4000,
          status: "error",
        });
        setSaving(false);
        return;
      }
      toast({
        title: "Category created successfully",
        duration: 4000,
        status: "success",
      });
      setSaving(false);
      onClose();
      await getAllCategories();
    }
  };

  const handleDeleteCategoryBtn = (id: any, count: number) => {
    if (count && count !== 0) {
      toast({
        title: "Category is not empty",
        description: "Please remove all items from this category to delete it",
        status: "error",
      });
      return;
    }

    deleteCategoryRef.current = id;
    onOpenAlert();
  };

  const deleteCategory = async () => {
    if (deleteCategoryRef.current) {
      const response = await inspectionApi.delete(
        `/library-item-categories/${deleteCategoryRef.current}`
      );
      if (response.status < 200 || response.status > 299) {
        toast({
          title: response.data.message || "Couldn't delete category",
          status: "error",
          duration: 4000,
        });
        onCloseAlert();
        return;
      }

      toast({
        title: "Category deleted successfully",
        status: "success",
        duration: 4000,
      });

      onCloseAlert();
      await getAllCategories();
    }
  };

  return (
    <PageLayout
      title="Library Items Categories"
      titleBtn="Create Category"
      onBtnClick={handleNewCategoryBtn}
    >
      {loading ? (
        <Loading />
      ) : (
        <Box>
          {categories.length === 0 ? (
            "No Categories Found"
          ) : (
            <Grid gap={2} gridTemplateColumns={"repeat(2, 1fr)"}>
              {categories.map((category) => (
                <Flex
                  alignItems={"center"}
                  key={category.id}
                  bg={"card-bg"}
                  p="2"
                  borderRadius={"lg"}
                  shadow={"xs"}
                >
                  <Box flexGrow={1}>
                    <Text fontSize={"lg"} color={"text-big"}>
                      Name: {category.name}
                    </Text>
                    <Text color={"text-small"}>
                      Items: {category.itemsCount}
                    </Text>
                  </Box>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      variant={"simple"}
                      icon={<MoreIcon />}
                    />
                    <MenuList>
                      <MenuItem onClick={() => handleEditCategoryBtn(category)}>
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleDeleteCategoryBtn(
                            category.id,
                            category.itemsCount!
                          )
                        }
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              ))}
            </Grid>
          )}
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Item Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="category_form"
              onSubmit={handleSubmit(onSubmitCategoryForm)}
            >
              <FormInput
                type="text"
                label="Category"
                placeholder="Enter category name here"
                {...register("name", {
                  required: !isEditing ? "Category name is required" : false,
                })}
                inputError={errors?.name?.message as string}
              />
            </form>
          </ModalBody>
          <ModalFooter gap={3}>
            <ButtonPrimary
              type="submit"
              form="category_form"
              isLoading={saving}
              loadingText="Submitting"
            >
              Submit
            </ButtonPrimary>
            <ButtonOutline onClick={onClose}>Cancel</ButtonOutline>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
              Delete Category
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter gap={3}>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteCategory}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </PageLayout>
  );
};

export default LibraryItemCategories;
