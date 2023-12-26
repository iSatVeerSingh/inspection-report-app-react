import { Box, Flex, Heading, Text, Textarea, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useEffect, useRef, useState } from "react";
import clientApi from "../../services/clientApi";
import { useParams } from "react-router-dom";
import { Inspection, InspectionNote } from "../../types";
import MiniDetail from "../../components/MiniDetail";
import DatalistInput from "../../components/DatalistInput";
import ButtonPrimary from "../../components/ButtonPrimary";

const AddInspectionNotes = () => {
  const { jobNumber } = useParams();
  const toast = useToast();
  const [job, setJob] = useState<Inspection | null>(null);
  const [libraryNotes, setLibraryNotes] = useState<string[]>([]);
  const commonNoteRef = useRef<HTMLInputElement>(null);
  const customNoteRef = useRef<HTMLTextAreaElement>(null);
  const getLibraryNotes = async () => {
    const response = await clientApi.get("/inspection-notes");
    if (response.status !== 200) {
      return;
    }
    const notes = (response.data as InspectionNote[]).map((note) => note.text);
    setLibraryNotes(notes);
  };

  useEffect(() => {
    getLibraryNotes();
    (async () => {
      const response = await clientApi.get(
        `/inspection?jobNumber=${jobNumber}`
      );
      if (response.status !== 200) {
        return;
      }
      setJob(response.data);
    })();
  }, []);

  const addInspectionNote = async (note: string) => {
    const response = await clientApi.post(
      `/inspection/note?jobNumber=${jobNumber}`,
      {
        note,
      }
    );
    if (response.status !== 200) {
      toast({
        title: response.data.message,
        duration: 4000,
        status: "error",
      });
      return;
    }
    toast({
      title: response.data.message,
      duration: 4000,
      status: "success",
    });
    commonNoteRef.current!.value = "";
    customNoteRef.current!.value = "";
  };

  const handleAddCommonNote = async () => {
    const note = commonNoteRef.current?.value.trim();
    if (note && note === "") {
      return;
    }
    await addInspectionNote(note!);
  };

  const handleAddCustomNote = async () => {
    const note = customNoteRef.current?.value.trim();
    if (note && note === "") {
      return;
    }
    await addInspectionNote(note!);
  };

  return (
    <PageLayout title="Add Inspection Notes">
      <Box bg={"card-bg"} shadow={"xs"} borderRadius={"xl"} p={3}>
        <Heading
          as="h2"
          fontSize={{ base: "xl", sm: "2xl" }}
          fontWeight={"medium"}
        >
          &#35;{job?.jobNumber} - {job?.category}
        </Heading>
        <Flex direction={"column"} gap={1} px={3} mt={4}>
          <MiniDetail property="Category" value={job?.category!} />
          <MiniDetail
            property="Customer"
            value={job?.customer!.nameOnReport!}
          />
          <MiniDetail property="Site Address" value={job?.siteAddress!} />
        </Flex>
        <Box mt={4}>
          <DatalistInput
            label="Choose from a list of common notes"
            dataList={libraryNotes}
            ref={commonNoteRef}
          />
          <ButtonPrimary mt={2} w={"250px"} onClick={handleAddCommonNote}>
            Add Note
          </ButtonPrimary>
        </Box>
        <Box mt={4} fontSize={"2xl"} textAlign={"center"}>
          OR
        </Box>
        <Box mt={4}>
          <Text color={"text-small"}>
            If you have not found any relevant note in common list you can
            custom note.
          </Text>
          <Textarea
            bg={"card-bg-secondary"}
            height={"12"}
            borderRadius={"lg"}
            shadow={"xs"}
            border={"1px"}
            borderColor={"gray.400"}
            _placeholder={{
              color: "text-secondary",
            }}
            ref={customNoteRef}
            placeholder="type here"
          />
          <ButtonPrimary mt={2} w={"250px"} onClick={handleAddCustomNote}>
            Add Custom Note
          </ButtonPrimary>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default AddInspectionNotes;
