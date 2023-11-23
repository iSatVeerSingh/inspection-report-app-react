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
import { useNavigate, useParams } from "react-router-dom";
import FormTextArea from "../../components/FormTextArea";
import { useEffect, useRef, useState } from "react";
import clientApi from "../../services/clientApi";
import { Inspection } from "../../types";
import Loading from "../../components/Loading";

const JobSummary = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const recommendationRef = useRef<HTMLTextAreaElement | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inspection, setInspection] = useState<Inspection | null>(null);
  useEffect(() => {
    const getInspection = async () => {
      const response = await clientApi.get(
        `/inspections?inspectionId=${params.inspectionId}`
      );

      if (response.status !== 200) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setInspection(response.data);
      setLoading(false);
    };
    getInspection();
  }, []);

  const updateRecommendation = async ({ isDelete }: { isDelete: boolean }) => {
    let recommendation: string;
    if (isDelete) {
      recommendation = "";
    } else {
      recommendation = recommendationRef.current!.value.trim();
      if (recommendation === "") {
        return;
      }
    }

    setSaving(true);
    const response = await clientApi.put(
      `/inspections/recommendation?inspectionId=${params.inspectionId}`,
      {
        recommendation,
      }
    );

    if (response.status !== 200) {
      toast({
        title: `Could not ${isDelete ? "delete" : "add"} recommendation`,
        status: "error",
        duration: 4000,
      });
      setSaving(false);
      return;
    }

    setInspection((prev) => {
      return {
        ...prev!,
        recommendation: recommendation,
      };
    });

    toast({
      title: `Recommendation ${isDelete ? "deleted" : "added"} successfully`,
      status: "success",
      duration: 4000,
    });
    onClose();
    setSaving(false);
  };

  return (
    <PageLayout title="Job Summary">
      {loading ? (
        <Loading />
      ) : (
        <Box p="3" bg="main-bg" border="stroke" borderRadius={5}>
          {notFound ? (
            <Text>Job not found</Text>
          ) : (
            <>
              <Heading as="h2" fontSize={"2xl"} fontWeight={"semibold"}>
                &#35;{inspection?.jobNumber} - {inspection?.category}
              </Heading>
              <Flex direction={"column"} gap={1} px={3} mt={4}>
                <MiniDetail property="Category" value={inspection?.category!} />
                <MiniDetail
                  property="Customer"
                  value={inspection?.customer!.nameOnReport!}
                />
                <MiniDetail
                  property="Start Date"
                  value={inspection?.startDate!}
                />
                <MiniDetail
                  property="Site Address"
                  value={inspection?.siteAddress!}
                />
              </Flex>
              <Box mt={3}>
                <Heading as="h3" fontSize={"xl"} fontWeight={"semibold"}>
                  Inspection Notes
                </Heading>
                <Box px={3}>
                  <MiniDetail
                    noChange
                    property="Total Notes"
                    value={inspection?.inspectionNotes?.length || "0"}
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
                    {inspection?.inspectionNotes &&
                      inspection.inspectionNotes.length !== 0 && (
                        <ButtonOutline onClick={() => navigate("./all-notes")}>
                          View / Edit / Delete Notes
                        </ButtonOutline>
                      )}
                  </Flex>
                </Box>
              </Box>
              <Box mt={3}>
                <Heading as="h3" fontSize={"xl"} fontWeight={"semibold"}>
                  New Report Items
                </Heading>
                <Box px={3}>
                  <MiniDetail
                    property="Total items from this report"
                    value={inspection?.inspectionItems?.length || 0}
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
                    {inspection?.inspectionItems &&
                      inspection.inspectionItems.length !== 0 && (
                        <ButtonOutline onClick={() => navigate("./all-items")}>
                          View Added Items
                        </ButtonOutline>
                      )}
                  </Flex>
                </Box>
              </Box>
              <Box mt={3}>
                <Heading as="h3" fontSize={"xl"} fontWeight={"semibold"}>
                  Recommendation
                </Heading>
                <Box px={3} mt={2}>
                  {inspection?.recommendation &&
                  inspection?.recommendation !== "" ? (
                    <>
                      <Text>{inspection?.recommendation}</Text>
                      <ButtonOutline
                        onClick={() => updateRecommendation({ isDelete: true })}
                      >
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
                <ButtonPrimary
                  width={{ base: "full", sm: "250px" }}
                  onClick={() => navigate("./preview")}
                >
                  Review & Generate PDF
                </ButtonPrimary>
                <ButtonOutline width={{ base: "full", sm: "200px" }}>
                  Send Report
                </ButtonOutline>
              </Flex>
            </>
          )}
        </Box>
      )}
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
              onClick={() => updateRecommendation({ isDelete: false })}
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
