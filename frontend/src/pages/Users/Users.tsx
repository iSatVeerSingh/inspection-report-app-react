"use client";

import { useEffect, useState } from "react";
import PageLayout from "../../Layout/PageLayout";
import { inspectionApi } from "../../services/api";
import { User, UserForm } from "../../types";
import Loading from "../../components/Loading";
import {
  Box,
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
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MoreIcon } from "../../icons";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import FormSelect from "../../components/FormSelect";

const roles = ["Inspector", "Admin", "Owner"];

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Partial<User>[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserForm>();

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await inspectionApi.get("/users");

      if (response.status !== 200) {
        setLoading(false);
        return;
      }

      setUsers(response.data.data);
      setLoading(false);
    };

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

  const onSubmitUserForm: SubmitHandler<UserForm> = (data) => console.log(data);

  return (
    <PageLayout
      title="All Users"
      titleBtn="Create User"
      onBtnClick={handleNewUserBtn}
    >
      {loading ? (
        <Loading />
      ) : (
        <Box
          border={"stroke"}
          bg={"main-bg"}
          borderRadius={5}
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
                  gridTemplateColumns={"auto 350px 130px 100px 60px"}
                  gap={3}
                  borderBottom={"stroke"}
                  _hover={{
                    backgroundColor: "secondary-bg",
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
                      <MenuItem>Delete</MenuItem>
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
                  placeholder="Enter password here"
                  {...register("password", {
                    required: !isEditing ? "Password is required" : false,
                  })}
                  inputError={errors.password?.message}
                />
              </VStack>
              <Flex></Flex>
            </form>
          </ModalBody>
          <ModalFooter gap={3}>
            <ButtonPrimary type="submit" form="user_form">Submit</ButtonPrimary>
            <ButtonOutline onClick={onClose}>Cancel</ButtonOutline>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageLayout>
  );
};

export default Users;
