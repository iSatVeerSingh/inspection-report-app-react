import {
  Box,
  Heading,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import { useNavigate } from "react-router-dom";
import { useInspectionData } from "../../services/client/context";
import FormTextArea from "../../components/FormTextArea";
import { useRef, useState } from "react";
import { putRequest } from "../../services/client";

const JobSummary = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const recommendationRef = useRef<HTMLTextAreaElement | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const { inspection, updateRecom }: any = useInspectionData();
  const addRecommedation = async () => {
    const recommendation = recommendationRef.current!.value.trim();
    if (recommendation === "") {
      return;
    }

    setSaving(true);
    const response = await updateRecommendation(recommendation);

    if (!response.success) {
      toast({
        title: "Could not add recommendation",
        duration: 4000,
        status: "error",
      });
      setSaving(false);
      return;
    }

    toast({
      title: "Recommendation added successfully",
      duration: 4000,
      status: "success",
    });
    setSaving(false);
    updateRecom(recommendation);
    onClose();
  };

  const deleteRecommendation = async () => {
    setSaving(true);
    const response = await updateRecommendation("");

    if (!response.success) {
      toast({
        title: "Could not delete recommendation",
        duration: 4000,
        status: "error",
      });
      setSaving(false);
      return;
    }

    toast({
      title: "Recommendation Deleted successfully",
      duration: 4000,
      status: "success",
    });
    setSaving(false);
    updateRecom("");
  };

  const updateRecommendation = async (recommendation: string) => {
    const response = await putRequest(
      `/client/inspections/recommendation?inspectionId=${inspection.id}`,
      {
        body: JSON.stringify({
          recommendation,
        }),
      }
    );
    return response;
  };

  return (
    <PageLayout title="Job Summary">
      <Box p="3" bg="main-bg" border="stroke" borderRadius={5}>
        <Heading as="h2" fontSize={"2xl"} fontWeight={"semibold"}>
          &#35;{inspection?.jobNumber} - {inspection?.category}
        </Heading>
        <Flex direction={"column"} gap={1} px={3} mt={4}>
          <MiniDetail property="Category" value={inspection?.category} />
          <MiniDetail property="Customer" value={inspection?.customer} />
          <MiniDetail property="Date" value={inspection?.date} />
          <MiniDetail property="Site Address" value={inspection?.siteAddress} />
        </Flex>
        <Box mt={3}>
          <Heading as="h3" fontSize={"xl"} fontWeight={"semibold"}>
            Inspection Notes
          </Heading>
          <Box px={3}>
            <MiniDetail
              noChange
              property="Total Notes"
              value={inspection?.inspectionNotes.length}
            />
            <Flex
              gap={{ base: 2, sm: 4 }}
              mt={2}
              direction={{ base: "column", sm: "row" }}
            >
              <ButtonPrimary
                width={{ base: "full", sm: "150px" }}
                onClick={() => navigate("./add-notes")}
              >
                Add Notes
              </ButtonPrimary>
              {inspection?.inspectionNotes.length !== 0 && (
                <ButtonOutline onClick={() => navigate("./all-notes")}>
                  View / Edit / Delete Notes
                </ButtonOutline>
              )}
            </Flex>
          </Box>
        </Box>
        {/* <Box mt={3}>
          <Heading as="h3" fontSize={"xl"} fontWeight={"semibold"}>
            Previous Inspection Items
          </Heading>
          <Box px={3}>
            <MiniDetail
              property="Total items from previous report"
              value={inspection?.inspectionItems.length}
            />
            <Flex gap={4} mt={2}>
              <ButtonPrimary px={3}>Add / View Previous Items</ButtonPrimary>
            </Flex>
          </Box>
        </Box> */}
        <Box mt={3}>
          <Heading as="h3" fontSize={"xl"} fontWeight={"semibold"}>
            New Report Items
          </Heading>
          <Box px={3}>
            <MiniDetail
              property="Total items from this report"
              value={inspection?.inspectionItems.length}
            />
            <Flex
              gap={{ base: 2, sm: 4 }}
              mt={2}
              direction={{ base: "column", sm: "row" }}
            >
              <ButtonPrimary
                w={{ base: "full", sm: "200px" }}
                onClick={() => navigate("./add-items")}
              >
                Add New Items
              </ButtonPrimary>
              <ButtonOutline onClick={() => navigate("./all-items")}>
                View Added Items
              </ButtonOutline>
            </Flex>
          </Box>
        </Box>
        <Box mt={3}>
          <Heading as="h3" fontSize={"xl"} fontWeight={"semibold"}>
            Recommendation
          </Heading>
          <Box px={3} mt={2}>
            {inspection?.recommendation && inspection?.recommendation !== "" ? (
              <>
                <Text>{inspection?.recommendation}</Text>
                <ButtonOutline onClick={deleteRecommendation}>
                  Delete Recommendation
                </ButtonOutline>
              </>
            ) : (
              <ButtonPrimary w={"200px"} onClick={onOpen}>
                Add Recommendation
              </ButtonPrimary>
            )}
          </Box>
        </Box>
        <Flex gap={4} direction={{ base: "column", sm: "row" }} mt={8}>
          <ButtonPrimary width={{ base: "full", sm: "250px" }} onClick={()=> navigate("./preview")}>
            Review & Generate PDF
          </ButtonPrimary>
          <ButtonOutline width={{ base: "full", sm: "200px" }}>
            Send Report
          </ButtonOutline>
        </Flex>
      </Box>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recommendations</ModalHeader>
          <ModalBody>
            <FormTextArea name="recommendation" ref={recommendationRef} />
          </ModalBody>

          <ModalFooter>
            <Button
              size={{ base: "sm", md: "md" }}
              onClick={addRecommedation}
              isLoading={saving}
              loadingText="Saving"
              colorScheme="blue"
              mr={3}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageLayout>
  );
};

export default JobSummary;
