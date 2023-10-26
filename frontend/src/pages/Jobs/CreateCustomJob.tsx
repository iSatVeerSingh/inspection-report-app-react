import { Box, Grid, Flex, GridItem, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FormTextArea from "../../components/FormTextArea";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonOutline from "../../components/ButtonOutline";
import { useNavigate } from "react-router-dom";
import { FormEvent, FormEventHandler, useState } from "react";
import { postRequest } from "../../services/client";

const CreateCustomJob = () => {
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

  const [formErrors, setFormErrors] = useState<any>(null);

  const handleCreateJob: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent
  ) => {
    e.preventDefault();
    const jobForm = e.target as HTMLFormElement;
    const formData = new FormData(jobForm);
    const formValues: any = {};
    const formErrors: any = {};
    for (let [key, value] of formData) {
      const trimmedValue = value.toString().trim();
      if (trimmedValue === "") {
        formErrors[key] = "This field is required";
      } else {
        formValues[key] = trimmedValue;
      }
    }

    if (Object.keys(formErrors).length !== 0) {
      setFormErrors(formErrors);
      return;
    }

    setFormErrors(null);
    formValues.category = reportType.find(
      (item) => item.value === formValues.jobType
    )?.text;
    formValues.jobNumber = Number(formValues.jobNumber);
    formValues.status = "Quote";

    const response = await postRequest("/client/jobs/new", {
      body: JSON.stringify(formValues),
    });

    if (!response.success) {
      toast({
        description: response.data,
        status: "error",
        duration: 5000,
      });
      jobForm.reset();
      return;
    }

    toast({
      title: "Job Created",
      description: `${response.data} created in successfully`,
      duration: 5000,
      status: "success",
    });
    navigate("/jobs");
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
              required
              inputError={formErrors?.jobNumber}
            />
            <FormSelect
              label="Job Type"
              name="jobType"
              options={reportType}
              placeholder="Select a job type"
              required
              inputError={formErrors?.jobType}
            />
            <FormInput
              type="text"
              name="customer"
              label="Name on the report"
              placeholder="Enter customer name which you want on report"
              required
              inputError={formErrors?.customerName}
            />
            <FormInput
              type="email"
              name="customerEmail"
              label="Customer Email"
              placeholder="Enter customer email"
              required
              inputError={formErrors?.customerEmail}
            />
            <FormInput
              type="tel"
              name="customerPhone"
              label="Customer Phone"
              placeholder="Enter customer phone"
              required
              inputError={formErrors?.customerPhone}
            />
            {/* <FormSelect
              label="Inspector"
              name="inspector"
              options={[{ text: "hello", value: "option 1" }]}
              placeholder="Select an inspector from list"
            /> */}
            <FormInput
              type="date"
              name="date"
              label="Date"
              placeholder="Enter date"
              required
              inputError={formErrors?.date}
            />
            <FormInput
              type="time"
              name="time"
              label="Time"
              placeholder="Enter time"
              required
              inputError={formErrors?.time}
            />
            <FormInput
              type="text"
              name="siteAddress"
              label="Site Address"
              placeholder="Enter site address"
              required
              inputError={formErrors?.siteAddress}
            />
            <GridItem colSpan={{ base: "auto", xl: 2 }}>
              <FormTextArea
                name="description"
                label="Job Description"
                placeholder="Start typing here"
                required
                inputError={formErrors?.jobDescription}
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

export default CreateCustomJob;
