import { Box, Heading, Flex } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import { useParams } from "react-router-dom";

const JobSummary = () => {
  const params = useParams();
  console.log(params)

  return (
    <PageLayout title="Job Summary">
      <Box p="3" bg="main-bg" border="stroke" borderRadius={5}>
        <Heading as="h2" fontSize={"2xl"} fontWeight={"semibold"}>
          #23755 - Frame Inspection
        </Heading>
        <Flex direction={"column"} gap={1} px={3} mt={4}>
          <MiniDetail property="Category" value="Frame Inspection" />
          <MiniDetail property="Customer" value="John Abrahm" />
          <MiniDetail property="Date" value="23-04-2023" />
          <MiniDetail
            property="Site Address"
            value="P.O. Box 22, Greensborough"
          />
        </Flex>
        <Box mt={3}>
          <Heading as="h3" fontSize={"xl"} fontWeight={"semibold"}>
            Inspection Notes
          </Heading>
          <Box px={3}>
            <MiniDetail noChange property="Total Notes" value="5" />
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
            <MiniDetail property="Total items from previous report" value="5" />
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
    </PageLayout>
  );
};

export default JobSummary;
