import { Box, Grid, Flex } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FormTextArea from "../../components/FormTextArea";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import { useNavigate } from "react-router-dom";

const CreateCustomJob = () => {
  const navigate = useNavigate();

  return (
    <PageLayout title="Create Custom Job">
      <Box bg="main-bg" border="stroke" p="3" borderRadius={5}>
        <Grid as="form" px={12} gap={3}>
          <FormInput
            type="text"
            name="jobNumber"
            label="Job Number"
            placeholder="Enter job number"
          />
          <FormSelect
            label="Job Type"
            name="jobType"
            options={[{ text: "hello", value: "option 1" }]}
            placeholder="Select a job type"
          />
          <FormInput
            type="text"
            name="customerName"
            label="Name on the report"
            placeholder="Enter customer name which you want on report"
          />
          <FormInput
            type="email"
            name="customerEmail"
            label="Customer Email"
            placeholder="Enter customer email"
          />
          <FormInput
            type="tel"
            name="customerPhone"
            label="Customer Phone"
            placeholder="Enter customer phone"
          />
          <FormSelect
            label="Inspector"
            name="inspector"
            options={[{ text: "hello", value: "option 1" }]}
            placeholder="Select an inspector from list"
          />
          <FormInput
            type="date"
            name="date"
            label="Date"
            placeholder="Enter date"
          />
          <FormInput
            type="time"
            name="time"
            label="Time"
            placeholder="Enter time"
          />
          <FormTextArea
            name="jobDescription"
            label="Job Description"
            placeholder="Start typing here"
          />
          <Flex justifyContent={"space-between"}>
            <ButtonPrimary minW={"200px"} type="submit">
              Create Job
            </ButtonPrimary>
            <ButtonOutline
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </ButtonOutline>
          </Flex>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default CreateCustomJob;
