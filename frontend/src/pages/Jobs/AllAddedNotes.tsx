"use client";

import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import FilterSelect from "../../components/FilterSelect";
import SearchFilter from "../../components/SearchFilter";
import { useInspectionData } from "../../services/client/context";
import { useRef, useState } from "react";
import { DeleteIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import { putRequest } from "../../services/client";

const AllAddedNotes = () => {
  const navigate = useNavigate();
  const { inspectionData: inspection, addNotes }: any = useInspectionData();
  const toast = useToast();

  const [notes, setNotes] = useState<any[]>(inspection.inspectionNotes);
  const [isDelete, setIsDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const deleteNote = (note: string) => {
    setIsDelete(true);
    setNotes((prev) => prev.filter((item) => item !== note));
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
        {/* <Flex
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "start", md: "center" }}
          gap={4}
          justifyContent={"space-between"}
          mt={4}
        >
          <Flex alignItems={"center"}>
            <Text
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"rich-black"}
              minW={"100px"}
            >
              Filter By
            </Text>
            <FilterSelect
              flexGrow={1}
              width={{ base: "full", md: "200px" }}
              options={[{ text: "Opetion 1", value: "option1" }]}
            />
          </Flex>
          <SearchFilter placeholder="Search by job nuber, category, customer name" />
        </Flex> */}
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
