"use client";

import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useInspectionData } from "../../services/client/context";
import { useState } from "react";
import { DeleteIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import { putRequest } from "../../services/client";

const AllAddedNotes = () => {
  const { inspection, addNotes }: any = useInspectionData();
  const [notes, setNotes] = useState<any[]>(inspection.inspectionNotes);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const deleteNote = (note: string) => {
    setNotes((prev) => prev.filter((item) => item !== note));
    setIsDelete(true);
  };

  const saveNotes = async () => {
    if (!isDelete) {
      navigate(-1);
    }
    setSaving(true);

    const response = await putRequest(
      `/client/inspections/notes?inspectionId=${inspection.id}`,
      {
        body: JSON.stringify({
          inspectionNotes: notes,
        }),
      }
    );

    if (!response.success) {
      toast({
        title: "Could not save inspection notes",
        duration: 5000,
        status: "error",
      });
      setSaving(false);
      return;
    }

    addNotes(notes);
    setSaving(false);
    navigate(-1);
  };

  return (
    <PageLayout
      title="See All Added Notes"
      titleBtn="Save & Close"
      onBtnClick={saveNotes}
      btnLoading={saving}
    >
      <Box>
        <Box>
          <Heading
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            fontWeight={"medium"}
            color={"rich-black"}
          >
            &#35;{inspection?.jobNumber} - {inspection?.category}
          </Heading>
          <Text fontSize={"lg"} color={"dark-gray"}>
            {inspection?.siteAddress}
          </Text>
        </Box>
        <Grid mt={4} gap={2}>
          {notes.map((note, index) => (
            <Flex gap={2} bg={"main-bg"} p="2" borderRadius={5} key={index}>
              <IconButton
                aria-label="Delete Note"
                icon={<DeleteIcon />}
                onClick={() => deleteNote(note)}
                size={"sm"}
                p={0}
              />
              <Text color={"main-text"}>{note}</Text>
            </Flex>
          ))}
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default AllAddedNotes;
