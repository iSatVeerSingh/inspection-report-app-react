import { Box, Grid, Heading, Text, useToast } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Job } from "../../utils/types";
// import { Db } from "../../services/clientdb";
import Loading from "../../components/Loading";
import { getRequest, postRequest } from "../../services/client";

const JobDetails = () => {
  // const job: any = {}
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();

  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const getJobData = async () => {
      const response = await getRequest(
        `/client/jobs?jobNumber=${params.jobNumber}`
      );
      if (!response.success) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setJob(response.data);
      setLoading(false);
    };
    getJobData();
  }, []);

  const startInspection = async () => {
    setStarting(true);
    const response = await postRequest("/client/inspection/new", {
      body: JSON.stringify(job),
    })

    if(!response.success) {
      toast({
        title: response.data,
        description: "Could not start inspection",
        duration: 5000,
        status: "error",
      })
      return;
    }

    setStarting(false);
    navigate(`./${response.data}`);

  };

  const continueInspection = () => {
    navigate(`./${job.inspectionId}`);
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
                &#35;{job?.jobNumber} - {job?.category}
              </Heading>
              <Grid gap={1} mt={3} mb={10}>
                <MiniDetail property="Category" value={job?.category!} />
                <MiniDetail property="Customer" value={job?.customer!} />
                {/* <MiniDetail
                  property="Assigned Inspector"
                  value={job?.inspector!}
                /> */}
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
              {job?.status !== "inprogress" ? (
                <ButtonPrimary loadingText="Starting..." isLoading={starting} onClick={startInspection}>
                  Start Inspection
                </ButtonPrimary>
              ) : (
                <ButtonPrimary onClick={continueInspection}>
                  Continue Inspection
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
