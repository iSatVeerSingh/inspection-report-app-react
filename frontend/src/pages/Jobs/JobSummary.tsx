import { Box, Heading, Flex, cookieStorageManager } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const JobSummary = () => {
  const params = useParams();

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
          setInspection(report);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getInspection();
  }, []);

  return (
    <PageLayout title="Job Summary">
      {loading ? (
        <Loading />
      ) : (
        <Box p="3" bg="main-bg" border="stroke" borderRadius={5}>
          <Heading as="h2" fontSize={"2xl"} fontWeight={"semibold"}>
            &#35;{inspection?.jobNumber} - {inspection?.category}
          </Heading>
          <Flex direction={"column"} gap={1} px={3} mt={4}>
            <MiniDetail property="Category" value={inspection?.category} />
            <MiniDetail property="Customer" value={inspection?.customer} />
            <MiniDetail property="Date" value={inspection?.date} />
            <MiniDetail
              property="Site Address"
              value={inspection?.siteAddress}
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
                value={inspection?.inspectionNotes.length}
              />
              <Flex
                gap={{ base: 2, sm: 4 }}
                mt={2}
                direction={{ base: "column", sm: "row" }}
              >
                <ButtonPrimary width={{ base: "full", sm: "150px" }}>
                  Add Notes
                </ButtonPrimary>
                <ButtonOutline>View / Edit / Delete Notes</ButtonOutline>
              </Flex>
            </Box>
          </Box>
          <Box mt={3}>
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
          </Box>
          <Box mt={3}>
            <Heading as="h3" fontSize={"xl"} fontWeight={"semibold"}>
              New Report Items
            </Heading>
            <Box px={3}>
              <MiniDetail property="Total items from this report" value="5" />
              <Flex
                gap={{ base: 2, sm: 4 }}
                mt={2}
                direction={{ base: "column", sm: "row" }}
              >
                <ButtonPrimary w={{ base: "full", sm: "200px" }}>
                  Add New Items
                </ButtonPrimary>
                <ButtonOutline>View Added Items</ButtonOutline>
              </Flex>
            </Box>
          </Box>
          <Box mt={3}>
            <Heading as="h3" fontSize={"xl"} fontWeight={"semibold"}>
              Recommendation
            </Heading>
            <Box px={3} mt={2}>
              <ButtonPrimary w={"200px"}>Add New Items</ButtonPrimary>
            </Box>
          </Box>
          <Flex gap={4} direction={{ base: "column", sm: "row" }} mt={8}>
            <ButtonPrimary width={{ base: "full", sm: "250px" }}>
              Generate PDF
            </ButtonPrimary>
            <ButtonOutline width={{ base: "full", sm: "200px" }}>
              Send Report
            </ButtonOutline>
          </Flex>
        </Box>
      )}
    </PageLayout>
  );
};

export default JobSummary;
