import { Box, Grid, Heading, Text, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import clientApi from "../../services/clientApi";
import { JobDetails as JobType } from "../../types";

const JobDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();

  const [job, setJob] = useState<JobType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const getJob = async () => {
      const response = await clientApi.get(
        `/jobs?jobNumber=${params.jobNumber}`
      );

      if (response.status !== 200) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setJob(response.data);
      setLoading(false);
    };

    getJob();
  }, []);

  const startInspection = async () => {
    setStarting(true);
    const response = await clientApi.post("/inspection/new", job);
    if (response.status !== 201) {
      toast({
        title: response.data.message || "Invalid request",
        status: "error",
        duration: 4000,
      });
      setStarting(false);
      return;
    }

    setStarting(false);
    navigate("./" + response.data);
  };

  return (
    <PageLayout title="Job Details">
      {loading ? (
        <Loading />
      ) : (
        <Box bg={"main-bg"} p="3" borderRadius={5} border={"stroke"}>
          {notFound ? (
            <Text>Job not found</Text>
          ) : (
            <>
              <Heading
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight={"semibold"}
                color={"rich-black"}
              >
                &#35;{job?.jobNumber} - {job?.jobType}
              </Heading>
              <Grid gap={1} mt={3} mb={10}>
                <MiniDetail property="Category" value={job?.jobType!} />
                <MiniDetail property="Customer" value={job?.customer!} />
                <MiniDetail property="Date" value={job?.date!} />
                <MiniDetail property="Time" value={job?.time!} />
                <MiniDetail property="Site Address" value={job?.siteAddress!} />
                <MiniDetail property="Status" value={job?.status!} />
                <MiniDetail
                  vertical
                  property="Description"
                  value={job?.description === "" ? "N/A" : job?.description!}
                />
              </Grid>
              {job?.status === "In progress" ? (
                <ButtonPrimary onClick={() => navigate("./" + job?.inspection)}>
                  Continue Inspection
                </ButtonPrimary>
              ) : (
                <ButtonPrimary
                  onClick={startInspection}
                  isLoading={starting}
                  loadingText="Starting"
                >
                  Start Inspection
                </ButtonPrimary>
              )}
            </>
          )}
        </Box>
      )}
    </PageLayout>
  );
};

export default JobDetails;
