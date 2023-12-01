"use client";

import { useEffect, useRef, useState } from "react";
import PageLayout from "../../Layout/PageLayout";
import { User, UserForm } from "../../types";
import { inspectionApi } from "../../services/api";
import Loading from "../../components/Loading";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
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
import { MenuIcon, MoreIcon, UserIcon } from "../../icons";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";

const Users = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>({
    defaultValues: {
      name: "Stver",
      email: "helo@moto.com",
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const onSubmitUserForm: SubmitHandler<UserForm> = (data) => console.log(data);

  // const [loading, setLoading] = useState(true);
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     const response = await inspectionApi.get("/users");

  //     if (response.status !== 200) {
  //       setLoading(false);
  //       return;
  //     }

  //     setUsers(response.data.data);
  //     setLoading(false);
  //   };

  //   getAllUsers();
  // }, []);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <PageLayout
      title="All Users"
      titleBtn="Create User"
      // onBtnClick={handleNewUserBtn}
    >
      <form onSubmit={handleSubmit(onSubmitUserForm)}>
        <FormInput
          id="name"
          label="Name"
          placeholder="Enter name here"
          inputError={errors.name?.message}
          {...register("name", { required: true })}
        />

        <Button type="submit" isLoading={isSubmitting}>
          Submit
        </Button>
      </form>

      {/* {loading ? (
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
                      <MenuItem onClick={() => handleEditUser(user)}>
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
      )} */}

      {/* <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editing ? "Edit User" : "Create New User"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubminUserForm)}>
              <VStack>

              </VStack>
              <ModalFooter pr={0} gap={2}>
                <ButtonPrimary type="submit">Submit</ButtonPrimary>
                <ButtonOutline onClick={onClose}>Cancel</ButtonOutline>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </PageLayout>
  );
};

export default Users;
