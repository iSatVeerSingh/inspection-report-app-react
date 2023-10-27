import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import FormInput from "../../components/FormInput";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import FormTextArea from "../../components/FormTextArea";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading";
import { useInspectionData } from "../../services/client/context";
import DatalistInput from "../../components/DatalistInput";
import { putRequest } from "../../services/client";

const AddInspectionNotes = () => {
  const navigate = useNavigate();
  const customNoteRef = useRef<HTMLTextAreaElement | null>(null);
  const inspectionNotesRef = useRef<string[]>([]);
  const commonNoteRef = useRef<HTMLInputElement | null>(null);

  const [inspection, setInspection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [saving, setSaving] = useState(false);

  const { inspectionData, addNotes }: any = useInspectionData();
  const toast = useToast();

  useEffect(() => {
    setInspection(inspectionData);
    inspectionNotesRef.current = inspectionData.inspectionNotes;
    setLoading(false);
  }, [inspectionData]);

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
  const inspectionNotes = [
    "The concreter was on site preparing for the slab pour.",
    "The plumber was on site.",
    "The electrician was on site.",
    "The heating & cooling contractor was on site.",
    "The wall sarking had been installed.",
    "The carpenter was on site.",
    "The bricklayer was on site.",
    "The fascia & gutter was being installed.",
    "The roofing contractor was on site.",
    "The lower roof areas had not yet been completed.",
    "There are window and door frames that had not yet been installed.",
    "There was a perimeter walkway scaffold installed, which will require the walls be re-checked for plumb at a future inspection.",
    "There were temporary braces fitted to the walls, which will require the walls be re-checked for plumb at a future inspection.",
    "The wall insulation batts had not yet been installed. Therefore, it is our recommendation that the customer arrange for us to do another inspection (a reinspection) to confirm successful completion of the defects/items documented within this report before plasterboard installation, and to properly check ",
    "The electrical rough in had not been completed.",
    "The plumbing rough in had not been completed.",
    "The heating/cooling rough in had not been completed.",
    "There was a scaffold installed, which will require the brickwork/cladding be properly checked at a future inspection.",
    "The brickwork had not yet been cleaned, which will require it be properly checked at a future inspection.",
    "The painting contractor was on site.",
    "The waterproofing was underway.",
    "The balconies had not yet been waterproofed.",
    "There were several minor defects and paint touch ups visible throughout that have been marked for rectification, which have not been individually documented in this report, as they have already been identified.",
    "The final house clean had not yet been completed.",
    "The owner should mark all minor defects and paint touch ups with the builder/site supervisor to ensure all of these issues are addressed to their satisfaction.",
    "There were several minor plaster defects marked for rectification (pre-paint/patch and sand) that have not been individually documented in this report, as the builder has already identified them, and they will be easy to check at the Handover inspection.",
    "The builder/site supervisor was on site during this inspection.",
    "The plasterboard had been painted, making it impossible to properly check that the plasterboard installation complies with Australian Standards and the manufacturer’s installation instructions.",
    "This reinspection report is confirmation of the status of the items from the previous inspection report, with any items that are either not completed, or not completed in all areas remaining as a defect/issue that needs to be rectified by the builder.",
    "There are walls and/or beams that are being temporarily propped until the future brickwork that support them can be installed.",
    "The frame carpenter was on site completing the frame. There are items they were working on that have not been included in this report, as the works were still underway.",
    "The wet area floor and wall tiling is covering the waterproofing, making it impossible to fully inspect and confirm that there are no defects.",
    "Due to the excessive number of defects at this inspection, and the severity of some of them, we strongly recommend that the owners engage us to do a reinspection to confirm that all items are properly rectified prior to works proceeding any further and covering up defective items.",
  ];

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
            {/* <FormInput
              label="Add Note for Frame Inspection"
              placeholder="Search here for relevant notes"
            /> */}
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
          {/* <Box fontSize={"2xl"} textAlign={"center"} mt={4}>
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
          </Box> */}
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
      )}
    </PageLayout>
  );
};

export default AddInspectionNotes;
