"use client";

import { Box, Grid, Heading, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clientApi from "../../services/clientApi";
import { Job, JobStatus } from "../../types";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobNumber } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const response = await clientApi.get(`/jobs?jobNumber=${jobNumber}`);
      if (response.status !== 200) {
        return;
      }
      setJob(response.data);
    })();
  }, []);

  const startInspection = async () => {
    if (job?.status !== JobStatus.WORK_ORDER) {
      return;
    }
    const response = await clientApi.put(`/jobs?jobNumber=${jobNumber}`);
    if (response.status !== 200) {
      toast({
        title: response.data.message || "Invalid request",
        status: "error",
        duration: 4000,
      });
      return;
    }
    navigate("./summary");
  };

  return (
    <PageLayout title="Job Details">
      <Box bg={"card-bg"} p="3" borderRadius={"xl"} shadow={"xs"}>
        {job ? (
          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight={"semibold"}
              color={"text-big"}
            >
              &#35;{job?.jobNumber} - {job?.category}
            </Heading>
            <Grid gap={1} mt={3} mb={10}>
              <MiniDetail property="Category" value={job?.category!} />
              <MiniDetail property="Customer" value={job?.customer!.name!} />
              <MiniDetail
                property="Name On Report"
                value={job?.customer!.nameOnReport!}
              />

              <MiniDetail
                property="Customer Email"
                value={job?.customer!.email!}
              />
              <MiniDetail
                property="Customer Phone"
                value={job?.customer!.phone!}
              />
              <MiniDetail property="Date" value={job?.startsAt} />
              <MiniDetail property="Time" value={job?.startTime!} />
              <MiniDetail property="Site Address" value={job?.siteAddress!} />
              <MiniDetail property="Status" value={job?.status!} />
              <MiniDetail
                vertical
                property="Description"
                value={
                  !job?.description || job?.description === ""
                    ? "N/A"
                    : job?.description!
                }
              />
            </Grid>
            {job.status === JobStatus.WORK_ORDER ? (
              <ButtonPrimary onClick={startInspection}>
                Start Inspection
              </ButtonPrimary>
            ) : (
              <ButtonPrimary onClick={() => navigate("./summary")}>
                Continue Inspection
              </ButtonPrimary>
            )}
          </Box>
        ) : (
          "No Job Found"
        )}
      </Box>
    </PageLayout>
  );
};

export default JobDetails;
