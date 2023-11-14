import { Box, Grid, Flex, GridItem, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FormTextArea from "../../components/FormTextArea";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import { useNavigate } from "react-router-dom";
import { FormEvent, FormEventHandler, useState } from "react";
import { validateJobForm } from "../../utils/validation";
import { JobDetails } from "../../types";
import clientApi from "../../services/clientApi";

const NewJob = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const reportType = [
    {
      text: "Pre-Slab Inspection",
      value: "PRE-SLAB",
    },
    {
      text: "Post-Slab Inspection",
      value: "POST-SLAB",
    },
    {
      text: "Frame Inspection",
      value: "FRAME",
    },
    {
      text: "Pre-Plaster Inspection",
      value: "PRE-PLASTER",
    },
    {
      text: "Lock-up Inspection",
      value: "LOCK-UP",
    },
    {
      text: "Fixing Inspection",
      value: "FIXING",
    },
    {
      text: "Waterproofing Inspection",
      value: "WATERPROOFING",
    },
    {
      text: "Point In Time Inspection",
      value: "POINT IN TIME",
    },
    {
      text: "Handover Inspection",
      value: "HANDOVER",
    },
    {
      text: "Maintenance Inspection",
      value: "MAINTENANCE & WARRANTY",
    },
    {
      text: "Other",
      value: "BUILDING",
    },
  ];

  const [formErrors, setFormErrors] = useState<Partial<JobDetails> | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const handleCreateJob: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent
  ) => {
    e.preventDefault();
    const jobForm = e.target as HTMLFormElement;
    const formValues = new FormData(jobForm);
    const jobData: any = {};

    for (const [key, value] of formValues) {
      jobData[key] = value.toString().trim();
    }

    const isInvalid = validateJobForm(jobData);
    if (isInvalid) {
      setFormErrors(isInvalid);
      return;
    }

    setFormErrors(null);
    setLoading(true);

    const response = await clientApi.post("/jobs/new", jobData);
    if (response.status !== 201) {
      toast({
        title: response.data["message"],
        status: "error",
        duration: 4000,
      });
      setLoading(false);
      return;
    }

    toast({
      title: `Job ${response.data} created successfully`,
      status: "success",
      duration: 4000,
    });

    jobForm.reset();
    setLoading(false);
  };

  return (
    <PageLayout title="Create Custom Job">
      <Box bg="main-bg" border="stroke" p={{ base: 2, sm: 3 }} borderRadius={5}>
        <form onSubmit={handleCreateJob}>
          <Grid
            px={{ base: 1, sm: 8, md: 12 }}
            gap={3}
            gridTemplateColumns={{ base: "auto", xl: "1fr 1fr" }}
          >
            <FormInput
              type="text"
              name="jobNumber"
              label="Job Number"
              placeholder="Enter job number"
              inputError={formErrors?.jobNumber as string}
            />
            <FormSelect
              label="Job Type"
              name="jobType"
              options={reportType}
              placeholder="Select a job type"
              inputError={formErrors?.jobType}
            />
            <FormInput
              type="text"
              name="customer"
              label="Name on the report"
              placeholder="Enter customer name which you want on report"
              inputError={formErrors?.customer}
            />
            <FormInput
              type="email"
              name="customerEmail"
              label="Customer Email"
              placeholder="Enter customer email"
              inputError={formErrors?.customerEmail}
            />
            <FormInput
              type="tel"
              name="customerPhone"
              label="Customer Phone"
              placeholder="Enter customer phone"
              inputError={formErrors?.customerPhone}
            />
            <FormInput
              type="date"
              name="date"
              label="Date"
              placeholder="Enter date"
              inputError={formErrors?.date}
            />
            <FormInput
              type="time"
              name="time"
              label="Time"
              placeholder="Enter time"
              inputError={formErrors?.time}
            />
            <FormInput
              type="text"
              name="siteAddress"
              label="Site Address"
              placeholder="Enter site address"
              inputError={formErrors?.siteAddress}
            />
            <GridItem colSpan={{ base: "auto", xl: 2 }}>
              <FormTextArea
                name="description"
                label="Job Description"
                placeholder="Start typing here"
                inputError={formErrors?.description}
              />
            </GridItem>
            <Flex
              justifyContent={{ base: "space-between", xl: "flex-start" }}
              gap={{ lg: 4 }}
            >
              <ButtonPrimary
                minW={"200px"}
                type="submit"
                minWidth={{ lg: "200px" }}
                isLoading={loading}
                loadingText="Creating"
              >
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
        </form>
      </Box>
    </PageLayout>
  );
};

export default NewJob;
