import { Box, Flex, Text, Grid, Heading } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { Link, useNavigate } from "react-router-dom";
import { LocationIcon, UserIcon } from "../../icons";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import clientApi from "../../services/clientApi";
import { Job } from "../../types";

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      const response = await clientApi.get("/jobs");
      if (response.status !== 200) {
        return;
      }
      setJobs(response.data as Job[]);
      setLoading(false);
    };

    getJobs();
  }, []);

  return (
    <PageLayout
      title="All Jobs"
      titleBtn="Create New Job"
      onBtnClick={() => navigate("/jobs/new")}
      isRoot
    >
      {loading ? (
        <Loading />
      ) : (
        <Box>
          {jobs.length === 0 ? (
            <Box textAlign={"center"} color={"gray.600"}>
              <Heading>Important</Heading>
              <Text fontSize={"lg"}>
                This app is under development. The backend or server
                functionality has not been implemented yet.
              </Text>
              <Text>
                For now please use "Create Custom Jobs" option to create jobs
                manually.
              </Text>
            </Box>
          ) : (
            <Grid p={1} gap={2}>
              {jobs.map((job) => (
                <Link key={job.jobNumber} to={`/jobs/${job.jobNumber}`}>
                  <Box bg={"main-bg"} p={3} borderRadius={5} border={"stroke"}>
                    <Flex
                      alignItems={{ base: "start", sm: "center" }}
                      justifyContent={"space-between"}
                      direction={{ base: "column", sm: "row" }}
                    >
                      <Text
                        fontSize={"xl"}
                        fontWeight={"medium"}
                        color={"rich-black"}
                      >
                        #{job.jobNumber} - {job.category}
                      </Text>
                      <Text as={"span"} color={"dark-gray"} fontSize={"lg"}>
                        {job.startDate}
                      </Text>
                    </Flex>
                    <Flex
                      alignItems={{ base: "start", lg: "center" }}
                      direction={{ base: "column", lg: "row" }}
                      fontSize={"lg"}
                      color={"dark-gray"}
                      gap={{ base: 1, lg: 3 }}
                    >
                      <Text
                        minW={"250px"}
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <UserIcon boxSize={5} /> {job.customer.name}
                      </Text>
                      <Text display={"flex"} alignItems={"center"}>
                        <LocationIcon boxSize={6} /> {job.siteAddress}
                      </Text>
                    </Flex>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      mt={2}
                    >
                      <Text
                        bg={"nav-bg"}
                        px={4}
                        borderRadius={4}
                        color={"rich-black"}
                      >
                        {job.category}
                      </Text>
                      <Text
                        bg={"nav-bg"}
                        px={3}
                        borderRadius={3}
                        color={
                          job.status === "Completed"
                            ? "green.500"
                            : "orange.500"
                        }
                      >
                        {job.status}
                      </Text>
                    </Flex>
                  </Box>
                </Link>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </PageLayout>
  );
};

export default Jobs;
