"use client";

import { useEffect, useRef, useState } from "react";
import PageLayout from "../../Layout/PageLayout";
import { inspectionApi } from "../../services/api";
import { User, UserForm } from "../../types";
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
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MoreIcon } from "../../icons";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import FormSelect from "../../components/FormSelect";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";

const roles = ["Inspector", "Admin", "Owner"];

const Users = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  if (user.role !== "Owner") {
    navigate("/jobs");
    return;
  }

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Partial<User>[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteUserRef = useRef<any>();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<UserForm>();

  const getAllUsers = async () => {
    setLoading(true);
    const response = await inspectionApi.get("/users");

    if (response.status !== 200) {
      setLoading(false);
      return;
    }

    setUsers(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleNewUserBtn = () => {
    setIsEditing(false);
    reset({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
    onOpen();
  };

  const handleEditUserBtn = (user: UserForm) => {
    setIsEditing(true);
    reset(user);
    onOpen();
  };

  const onSubmitUserForm: SubmitHandler<UserForm> = async (formData: any) => {
    setSubmitting(true);
    if (isEditing) {
      const updatedUser: any = {};
      for (const key in dirtyFields) {
        updatedUser[key] = formData[key];
      }
      const response = await inspectionApi.put(
        `/users/${formData["id"]}`,
        updatedUser
      );
      if (response.status !== 200) {
        toast({
          title: response.data.message || "Couldn't update the user.",
          duration: 4000,
          status: "error",
        });
        setSubmitting(false);
        return;
      }
      toast({
        title: response.data.message,
        duration: 4000,
        status: "success",
      });
      setIsEditing(false);
      setSubmitting(false);
      onClose();

      await getAllUsers();
    } else {
      const response = await inspectionApi.post("/users", formData);
      if (response.status !== 201) {
        toast({
          title: response.data.message || "Couldn't create user",
          duration: 4000,
          status: "error",
        });
        setSubmitting(false);
        return;
      }
      toast({
        title: "User created successfully",
        duration: 4000,
        status: "success",
      });
      setSubmitting(false);
      onClose();
      await getAllUsers();
    }
  };

  const handleDeleteUserBtn = (id: any) => {
    deleteUserRef.current = id;
    onOpenAlert();
  };

  const deleteUser = async () => {
    if (deleteUserRef.current) {
      const response = await inspectionApi.delete(
        `/users/${deleteUserRef.current}`
      );

      if (response.status < 200 || response.status > 299) {
        toast({
          title: response.data.message || "Couldn't delete user",
          status: "error",
          duration: 4000,
        });
        onCloseAlert();
        return;
      }

      toast({
        title: "User deleted successfully",
        status: "success",
        duration: 4000,
      });
      onCloseAlert();
      await getAllUsers();
    }
  };

  return (
    <PageLayout
      isRoot
      title="All Users"
      titleBtn="Create User"
      onBtnClick={handleNewUserBtn}
    >
      {loading ? (
        <Loading />
      ) : (
        <Box
          bg={"card-bg"}
          shadow={"xs"}
          borderRadius={"lg"}
          overflow={"hidden"}
        >
          {users.length !== 0 ? (
            <>
              <Grid
                px={2}
                py={1}
                bg={"nav-bg"}
                gridTemplateColumns={"auto 350px 130px 100px 60px"}
                gap={3}
                color={"white"}
                fontWeight={"semibold"}
              >
                <Text flexGrow={1}>Name</Text>
                <Text>Email</Text>
                <Text>Phone</Text>
                <Text>Role</Text>
                <Text>Action</Text>
              </Grid>
              {users.map((user) => (
                <Grid
                  key={user.id}
                  px={2}
                  py={3}
                  alignItems={"center"}
                  gridTemplateColumns={"auto 350px 130px 100px 60px"}
                  gap={3}
                  _hover={{
                    backgroundColor: "card-bg-secondary",
                    boxShadow: "xs",
                  }}
                >
                  <Text fontSize={"lg"} fontWeight={"medium"} flexGrow={1}>
                    {user.name}
                  </Text>
                  <Text>{user.email}</Text>
                  <Text>{user.phone}</Text>
                  <Text>{user.role}</Text>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      variant={"simple"}
                      icon={<MoreIcon />}
                    />
                    <MenuList>
                      <MenuItem
                        onClick={() => handleEditUserBtn(user as UserForm)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteUserBtn(user.id)}>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Grid>
              ))}
            </>
          ) : (
            "No users found"
          )}
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Edit User" : "Create New User"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="user_form" onSubmit={handleSubmit(onSubmitUserForm)}>
              <VStack>
                <FormInput
                  label="Name"
                  id="name"
                  placeholder="Enter name here"
                  {...register("name", {
                    required: !isEditing ? "Name is required" : false,
                  })}
                  inputError={errors.name?.message}
                />
                <FormInput
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="Enter email here"
                  {...register("email", {
                    required: !isEditing ? "Email is required" : false,
                  })}
                  inputError={errors.email?.message}
                />
                <FormInput
                  label="Phone"
                  id="phone"
                  placeholder="Enter phone here"
                  {...register("phone")}
                  inputError={errors.phone?.message}
                />
                <FormSelect
                  placeholder="Select a role"
                  id="role"
                  label="Role"
                  {...register("role", {
                    required: !isEditing ? "Please select a role" : false,
                  })}
                  options={roles}
                  inputError={errors.role?.message}
                />
                <FormInput
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="Enter password here"
                  {...register("password", {
                    required: !isEditing ? "Password is required" : false,
                  })}
                  inputError={errors.password?.message}
                />
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter gap={3}>
            <ButtonPrimary
              type="submit"
              form="user_form"
              isLoading={submitting}
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
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
              Delete User
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter gap={3}>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteUser}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </PageLayout>
  );
};

export default Users;
