import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import PageLayout from "../Layout/PageLayout";
import allJobs from "../../demo/jobs";
import FilterInput from "../components/FilterInput";
import FilterSelect from "../components/FilterSelect";
import SearchFilter from "../components/SearchFilter";

const Jobs = () => {
  return (
    <PageLayout
      title="All Jobs"
      titleBtn="Create Custom Job"
      onBtnClick={() => {}}
    >
      <Grid px={4} py={3} gap={2}>
        <Flex alignItems={"center"} gap={4} justifyContent={"space-between"}>
          <Text fontSize={"lg"} fontWeight={"medium"} color={"rich-black"}>
            Filter By
          </Text>
          <FilterSelect
            maxW={"200px"}
            options={[{ text: "Opetion 1", value: "option1" }]}
          />
          <FilterSelect
            maxW={"200px"}
            options={[{ text: "Opetion 1", value: "option1" }]}
          />
          <FilterInput maxW={"200px"} type="date" />
        </Flex>
        <Box>
          <SearchFilter placeholder="Search by job nuber, category, customer name" />
        </Box>
        {allJobs.map((job) => (
          <Box
            bg={"main-bg"}
            p={3}
            borderRadius={5}
            border={"stroke"}
            key={job.id}
          >
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Text fontSize={"2xl"} fontWeight={"medium"} color={"rich-black"}>
                #{job.jobNumber} - {job.category}
              </Text>
              <Text as={"span"} color={"dark-gray"} fontSize={"lg"}>
                {job.date}
              </Text>
            </Flex>
            <Flex
              alignItems={"center"}
              fontSize={"lg"}
              color={"dark-gray"}
              gap={3}
            >
              <Text minW={"250px"}>{job.customer}</Text>
              <Text>{job.siteAddress}</Text>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} mt={2}>
              <Text bg={"nav-bg"} px={4} borderRadius={4} color={"rich-black"}>
                {job.category}
              </Text>
              <Text
                bg={"nav-bg"}
                px={3}
                borderRadius={3}
                color={job.status === "Completed" ? "green.500" : "orange.500"}
              >
                {job.status}
              </Text>
            </Flex>
          </Box>
        ))}
      </Grid>
    </PageLayout>
  );
};

export default Jobs;
