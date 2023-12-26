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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import PageLayout from "../Layout/PageLayout";
import { useEffect, useRef, useState } from "react";
import { InspectionNote } from "../types";
import clientApi from "../services/clientApi";
import { MoreIcon } from "../icons";
import Loading from "../components/Loading";
import { useForm } from "react-hook-form";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonOutline from "../components/ButtonOutline";
import FormTextArea from "../components/FormTextArea";
import { useGlobalContext } from "../context/globalContext";

const InspectionNotes = () => {
  const { user } = useGlobalContext();

  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<InspectionNote[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteNoteRef = useRef<any>();
  const toast = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const getNotes = async () => {
    setLoading(true);
    const response = await clientApi.get("/inspection-notes");
    if (response.status !== 200) {
      setLoading(false);
      return;
    }
    setNotes(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleEditBtn = (note: InspectionNote) => {
    setIsEditing(true);
    reset(note);
    onOpen();
  };

  const handleNewNoteBtn = () => {
    setIsEditing(false);
    onOpen();
  };

  const onSubmitNoteForm = async (formData: any) => {
    if (isEditing) {
      const response = await clientApi.put(
        `/inspection-notes?id=${formData.id}`,
        {
          text: formData.text,
        }
      );
      if (response.status !== 200) {
        toast({
          title: response.data.message || "Couldn't update note",
          duration: 4000,
          status: "error",
        });
        return;
      }
      toast({
        title: response.data.message || "Note updated successfully",
        duration: 4000,
        status: "success",
      });
    } else {
      const response = await clientApi.post("/inspection-notes", {
        text: formData.text,
      });
      if (response.status !== 201) {
        toast({
          title: response.data.message || "Couldn't create note",
          duration: 4000,
          status: "error",
        });
        return;
      }
      toast({
        title: response.data.message || "Note created successfully",
        duration: 4000,
        status: "success",
      });
    }

    onClose();
    await getNotes();
  };

  const handleDeleteNoteBtn = (id: any) => {
    deleteNoteRef.current = id;
    onOpenAlert();
  };

  const deleteNote = async () => {
    const response = await clientApi.delete(
      `/inspection-notes?id=${deleteNoteRef.current}`
    );
    if (response.status !== 200) {
      toast({
        title: response.data.message || "Couldn't delete note",
        duration: 4000,
        status: "error",
      });
      return;
    }
    toast({
      title: response.data.message || "Note delete successfully",
      duration: 4000,
      status: "success",
    });

    onCloseAlert();
    await getNotes();
  };

  return (
    <PageLayout
      title="Inspection Notes"
      isRoot
      titleBtn={user.role !== "Inspector" ? "New Note" : undefined}
      onBtnClick={handleNewNoteBtn}
    >
      {loading ? (
        <Loading />
      ) : (
        <Box>
          {notes.length === 0 ? (
            "Couldn't get any notes"
          ) : (
            <Grid gap={2}>
              {notes.map((note) => (
                <Flex
                  key={note.id}
                  bg={"card-bg"}
                  shadow={"xs"}
                  borderRadius={"xl"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box p={2}>
                    <Text fontSize={"lg"} color={"text-big"}>
                      {note.text}
                    </Text>
                    <Text color={"text-small"}>
                      Update at: {note.updated_at}
                    </Text>
                  </Box>
                  {user.role !== "Inspector" && (
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        variant={"simple"}
                        icon={<MoreIcon />}
                      />
                      <MenuList boxShadow={"lg"}>
                        <MenuItem onClick={() => handleEditBtn(note)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteNoteBtn(note.id)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
              ))}
            </Grid>
          )}
        </Box>
      )}
      {user.role !== "Inspector" && (
        <>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            size={"lg"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Inspection Note</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form id="note_form" onSubmit={handleSubmit(onSubmitNoteForm)}>
                  <FormTextArea
                    id="text"
                    placeholder="note text"
                    label="Note Text"
                    rows={10}
                    {...register("text", {
                      required: "Note text is required",
                    })}
                    inputError={errors.text?.message}
                  />
                </form>
              </ModalBody>
              <ModalFooter gap={2}>
                <ButtonPrimary form="note_form" type="submit">
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
                  Delete Inspection Note
                </AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>
                <AlertDialogFooter gap={3}>
                  <Button ref={cancelRef} onClick={onCloseAlert}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={deleteNote}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}
    </PageLayout>
  );
};

export default InspectionNotes;
