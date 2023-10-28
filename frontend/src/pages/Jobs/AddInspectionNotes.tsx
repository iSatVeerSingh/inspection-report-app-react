import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import FormTextArea from "../../components/FormTextArea";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useInspectionData } from "../../services/client/context";
import DatalistInput from "../../components/DatalistInput";
import { putRequest } from "../../services/client";
import inspectionNotes from "../../utils/inspectionNote";

const AddInspectionNotes = () => {
  const toast = useToast();

  const { inspection, addNotes }: any = useInspectionData();
  const commonNoteRef = useRef<HTMLInputElement | null>(null);
  const inspectionNotesRef = useRef<string[]>(inspection?.inspectionNotes);
  const [isAdded, setIsAdded] = useState(false);
  const customNoteRef = useRef<HTMLTextAreaElement | null>(null);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const addCommonNote = () => {
    const note = commonNoteRef.current?.value.trim();
    if (!note || note === "") {
      return;
    }

    if (inspectionNotesRef.current.includes(note)) {
      toast({
        duration: 3000,
        title: "This note already added",
        status: "error",
      });
      return;
    }

    inspectionNotesRef.current.push(note);
    setIsAdded(true);
    toast({
      duration: 3000,
      title: "Note added",
      status: "success",
    });
    commonNoteRef.current!.value = "";
  };

  const handleAddCustomNote = () => {
    const note = customNoteRef.current?.value?.trim();
    if (!note || note === "") {
      return;
    }

    if (inspectionNotesRef.current.includes(note)) {
      toast({
        duration: 3000,
        title: "This note already added",
        status: "error",
      });
      return;
    }

    inspectionNotesRef.current.push(note);
    setIsAdded(true);
    toast({
      duration: 3000,
      title: "Note added",
      status: "success",
    });
    customNoteRef.current!.value = "";
  };

  const handleAddInspectionNotes = async () => {
    if (!isAdded) {
      navigate(-1);
    }
    setSaving(true);

    const response = await putRequest(
      `/client/inspections/notes?inspectionId=${inspection.id}`,
      {
        body: JSON.stringify({
          inspectionNotes: inspectionNotesRef.current,
        }),
      }
    );

    if (!response.success) {
      toast({
        title: "Could not add inspection notes",
        duration: 5000,
        status: "error",
      });
      setSaving(false);
      return;
    }

    addNotes(inspectionNotesRef.current);
    setSaving(false);
    navigate(-1);
  };

  return (
    <PageLayout title="Add Inspection Notes">
      <Box p="3" border={"stroke"} bg="main-bg" borderRadius={5}>
        <Heading
          as="h2"
          fontSize={{ base: "xl", sm: "2xl" }}
          fontWeight={"medium"}
        >
          &#35;{inspection?.jobNumber} - {inspection?.category}
        </Heading>
        <Flex direction={"column"} gap={1} px={3} mt={4}>
          <MiniDetail property="Category" value={inspection.category} />
          <MiniDetail property="Customer" value={inspection.customer} />
          <MiniDetail property="Site Address" value={inspection.siteAddress} />
        </Flex>
        <Box mt={4}>
          <DatalistInput
            label="You can choose from common notes."
            name="inspectionNotes"
            dataList={inspectionNotes}
            ref={commonNoteRef}
          />
          <ButtonPrimary
            mt={2}
            width={{ base: "full", sm: "200px" }}
            onClick={addCommonNote}
          >
            Add Note
          </ButtonPrimary>
        </Box>
        <Box fontSize={"2xl"} textAlign={"center"} mt={4}>
          Or
        </Box>
        <Box>
          <Text fontSize={"lg"} color={"dark-gray"}>
            If you have not found relevant note to job category, please see in
            all categories
          </Text>
          <FormTextArea
            label="Add Custom Note"
            placeholder="Start typing here"
            ref={customNoteRef}
          />
          <ButtonPrimary
            mt={2}
            width={{ base: "full", sm: "auto" }}
            onClick={handleAddCustomNote}
          >
            Add Custom Note
          </ButtonPrimary>
        </Box>
        <Box mt={5}>
          <ButtonPrimary
            width={{ base: "full", sm: "250px" }}
            onClick={handleAddInspectionNotes}
            isLoading={saving}
            loadingText="Saving"
          >
            Save and Close
          </ButtonPrimary>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default AddInspectionNotes;
