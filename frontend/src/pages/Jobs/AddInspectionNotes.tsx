import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import FormTextArea from "../../components/FormTextAreaNormal";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DatalistInput from "../../components/DatalistInput";
import clientApi from "../../services/clientApi";
import { Inspection, InspectionNote } from "../../types";
import Loading from "../../components/Loading";

const AddInspectionNotes = () => {
  const toast = useToast();

  const commonNoteRef = useRef<HTMLInputElement | null>(null);
  const inspectionNotesRef = useRef<string[]>([]);
  const [isAdded, setIsAdded] = useState(false);
  const customNoteRef = useRef<HTMLTextAreaElement | null>(null);
  const [saving, setSaving] = useState(false);
  const [libraryInspectionNotes, setLibraryInspectionNotes] = useState<
    string[]
  >([]);

  const navigate = useNavigate();

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [inspection, setInspection] = useState<Inspection | null>(null);
  useEffect(() => {
    const getInspection = async () => {
      let response = await clientApi.get(
        `/inspections?inspectionId=${params.inspectionId}`
      );

      if (response.status !== 200) {
        setLoading(false);
        return;
      }

      setInspection(response.data);
      inspectionNotesRef.current =
        (response.data as Inspection).inspectionNotes || [];

      response = await clientApi.get("library-notes");
      if (response.status !== 200) {
        setLoading(false);
        return;
      }

      const libraryNotes = (response.data as InspectionNote[]).map(
        (libNote) => libNote.text
      );

      setLibraryInspectionNotes(libraryNotes);
      setLoading(false);
    };
    getInspection();
  }, []);

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

    const response = await clientApi.put(
      `/inspections/notes?inspectionId=${params.inspectionId}`,
      {
        inspectionNotes: inspectionNotesRef.current,
      }
    );

    if (response.status !== 200) {
      toast({
        title: "Could not add notes.",
        status: "error",
        duration: 4000,
      });
      setSaving(false);
      return;
    }

    setSaving(false);
    navigate(-1);
  };

  return (
    <PageLayout title="Add Inspection Notes">
      {loading ? (
        <Loading />
      ) : (
        <Box p="3" border={"stroke"} bg="main-bg" borderRadius={5}>
          {inspection ? (
            <>
              <Heading
                as="h2"
                fontSize={{ base: "xl", sm: "2xl" }}
                fontWeight={"medium"}
              >
                &#35;{inspection?.jobNumber} - {inspection?.category}
              </Heading>
              <Flex direction={"column"} gap={1} px={3} mt={4}>
                <MiniDetail property="Category" value={inspection?.category!} />
                <MiniDetail
                  property="Customer"
                  value={inspection?.customer!.nameOnReport!}
                />
                <MiniDetail
                  property="Site Address"
                  value={inspection?.siteAddress!}
                />
              </Flex>
              <Box mt={4}>
                <DatalistInput
                  label="You can choose from common notes."
                  name="inspectionNotes"
                  dataList={libraryInspectionNotes}
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
                  If you have not found relevant note to job category, please
                  see in all categories
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
            </>
          ) : (
            <Text>Job Not Found</Text>
          )}
        </Box>
      )}
    </PageLayout>
  );
};

export default AddInspectionNotes;
