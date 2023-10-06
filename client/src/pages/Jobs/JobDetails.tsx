import { Box, Grid, Heading } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const JobDetails = () => {
  const navigate = useNavigate();

  return (
    <PageLayout title="Job Details">
      <Box bg={"main-bg"} p="3" borderRadius={5} border={"stroke"}>
        <Heading
          as="h2"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight={"semibold"}
          color={"rich-black"}
        >
          #23497 - Frame Inspection
        </Heading>
        <Grid gap={1} mt={3} mb={10}>
          <MiniDetail property="Category" value="Frame Inspection" />
          <MiniDetail property="Customer" value="Frame Inspection" />
          <MiniDetail property="Assigned Inspector" value="Frame Inspection" />
          <MiniDetail property="Date" value="Frame Inspection" />
          <MiniDetail property="Time" value="Frame Inspection" />
          <MiniDetail property="Site Address" value="Frame Inspection" />
          <MiniDetail property="Status" value="Frame Inspection" />
          <MiniDetail
            vertical
            property="Description"
            value="The main contact for a customer in SM8 is the “Billing Contact”, which is where we will get the Email, phone and first name variables above.
However, we will also need to collect all of the other contact types, such as the name for the report, builders, or supervisor which are all stored in the customer contact area."
          />
        </Grid>
        <ButtonPrimary onClick={() => navigate("./summary")}>
          Start Inspection
        </ButtonPrimary>
      </Box>
    </PageLayout>
  );
};

export default JobDetails;
