import { Box, Grid, Heading } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Job } from "../../utils/types";
import { Db } from "../../services/clientdb";
import Loading from "../../components/Loading";

const JobDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const getJobData = async () => {
  //     const jobData = await JobsDB.jobs.get(Number(params.jobNumber));

  //     setJob(jobData);
  //     setLoading(false);
  //   };
  //   getJobData();
  // }, []);

  const startInspection = async () => {
    const report = { ...job };
    report.id = Date.now().toString(36);
    report.status = "inProgress";
    const reportId = await Db.inspectionReports.add(report);
    console.log(reportId);
  };

  return (
    <PageLayout title="Job Details">
      {loading ? (
        <Loading />
      ) : (
        <Box bg={"main-bg"} p="3" borderRadius={5} border={"stroke"}>
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight={"semibold"}
            color={"rich-black"}
          >
            &#35;{job?.jobNumber} - {job?.category}
          </Heading>
          <Grid gap={1} mt={3} mb={10}>
            <MiniDetail property="Category" value={job?.category!} />
            <MiniDetail property="Customer" value={job?.customer!} />
            <MiniDetail property="Assigned Inspector" value={job?.inspector!} />
            <MiniDetail property="Date" value={job?.date!} />
            <MiniDetail property="Time" value={job?.time!} />
            <MiniDetail property="Site Address" value={job?.siteAddress!} />
            <MiniDetail property="Status" value={job?.status!} />
            <MiniDetail
              vertical
              property="Description"
              value={job?.description!}
            />
          </Grid>
          <ButtonPrimary onClick={startInspection}>
            Start Inspection
          </ButtonPrimary>
        </Box>
      )}
    </PageLayout>
  );
};

export default JobDetails;
