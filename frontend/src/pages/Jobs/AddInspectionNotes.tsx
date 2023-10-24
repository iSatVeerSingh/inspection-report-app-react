import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import FormInput from "../../components/FormInput";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import FormTextArea from "../../components/FormTextArea";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading";

const AddInspectionNotes = () => {
  const navigate = useNavigate();
  const params = useParams();
  const customNoteRef = useRef<HTMLTextAreaElement | null>(null);
  const inspectionNotesRef = useRef<string[]>([]);

  const [inspection, setInspection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInspection = async () => {
      try {
        const response = await fetch(
          `/client/inspection?id=${params.inspectionId}`
        );
        if (response.ok) {
          const report = await response.json();
          inspectionNotesRef.current = report.inspectionNotes;
          setInspection(report);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getInspection();
  }, []);

  const handleAddCustomNote = () => {
    const note = customNoteRef.current?.value?.trim();
    if (!note) {
      return;
    }
    if (note === "") {
      return;
    }

    inspectionNotesRef.current.push(note);
    customNoteRef.current!.value = "";
    console.log(inspectionNotesRef);
  };

  const handleAddInspectionNotes = async () => {
    const notes = inspectionNotesRef.current;
    if (notes.length === 0) {
      console.log("you haven't added any notes.");
      return;
    }

    const response = await fetch(
      `/client/inspection/notes?id=${inspection.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          inspectionNotes: notes,
        }),
      }
    );

    if (response.ok) {
      const insId = await response.json();
      console.log(insId);
      navigate(-1);
    }
  };

  return (
    <PageLayout title="Add Inspection Notes" titleBtn="Suggest Note">
      {loading ? (
        <Loading />
      ) : (
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
            <MiniDetail
              property="Site Address"
              value={inspection.siteAddress}
            />
          </Flex>
          <Box mt={4}>
            <FormInput
              label="Add Note for Frame Inspection"
              placeholder="Search here for relevant notes"
            />
            <ButtonPrimary mt={2} width={{ base: "full", sm: "200px" }}>
              Add Note
            </ButtonPrimary>
          </Box>
          <Box fontSize={"2xl"} textAlign={"center"} mt={4}>
            Or
          </Box>
          <Box>
            <Text fontSize={"lg"} color="dark-gray">
              If you have not found relevant note to job category, please see in
              all categories
            </Text>
            <ButtonOutline mt={2} width={{ base: "full", sm: "auto" }}>
              See All Notes from All Categories
            </ButtonOutline>
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
            >
              Save and Close
            </ButtonPrimary>
          </Box>
        </Box>
      )}
    </PageLayout>
  );
};

export default AddInspectionNotes;
