"use client";

import { Link } from "react-router-dom";
import PageLayout from "../../Layout/PageLayout";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FilterSelect from "../../components/FilterSelect";
import clientApi from "../../services/clientApi";
import FilterInput from "../../components/FilterInput";
import ButtonOutline from "../../components/ButtonOutline";
import { Job } from "../../types";
import { LocationIcon, UserIcon } from "../../icons";

type Filter = {
  status?: string;
  category?: string;
  startsAt?: string;
  page?: string;
};

const Jobs = () => {
  const [filter, setFilter] = useState<Filter>({ status: "Work Order" });
  const [jobCategories, setJobCategories] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pages, setPages] = useState<{ pages: number; currentPage: number }>();

  const updateSearch = (key: keyof Filter, value: string) => {
    if (value && value !== "") {
      console.log(key, value);
      setFilter((prev) => ({ ...prev, [key]: value }));
    }
  };

  useEffect(() => {
    (async () => {
      const response = await clientApi.get("/job-categories");
      if (response.status === 200) {
        setJobCategories(response.data.map((item: any) => item.name));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log("useEFfect run now");
      const searchParams = new URLSearchParams(filter);
      const response = await clientApi.get(
        searchParams.size === 0 ? "/jobs" : "/jobs?" + searchParams.toString()
      );
      if (response.status !== 200) {
        return;
      }
      setJobs(response.data.data);
      setPages({
        pages: response.data.pages,
        currentPage: response.data.currentPage,
      });
    })();
  }, [filter.status, filter.category, filter.startsAt, filter.page]);

  const clearFilter = () => {
    setFilter({ status: "Work Order" });
  };

  return (
    <PageLayout title="All Jobs" isRoot>
      <Flex
        direction={{ base: "column", lg: "row" }}
        alignItems={{ base: "start", lg: "center" }}
        gap={2}
      >
        <Flex gap={3}>
          <FilterSelect
            value={filter.status}
            options={[
              "Work Order",
              "In Progress",
              "Not Submitted",
              "Completed",
            ]}
            onChange={(e) => updateSearch("status", e.target.value)}
          />
          <FilterSelect
            options={jobCategories}
            value={filter.category || ""}
            placeholder="Select a category"
            onChange={(e) => updateSearch("category", e.target.value)}
          />
          <FilterInput
            value={filter.startsAt || ""}
            onChange={(e) => updateSearch("startsAt", e.target.value)}
            type="date"
          />
        </Flex>
        <ButtonOutline size={"sm"} onClick={clearFilter}>
          Clear
        </ButtonOutline>
      </Flex>
      <Box mt={4}>
        {jobs.length === 0 ? (
          <Text>Couldn't get any jobs</Text>
        ) : (
          <Grid gap={2}>
            {jobs.map((job) => (
              <Link to={"./" + job.jobNumber} key={job.id}>
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
                      {job.startsAt} {job.startTime}
                    </Text>
                  </Flex>
                  <Flex
                    alignItems={{ base: "start", lg: "center" }}
                    direction={{ base: "column", lg: "row" }}
                    fontSize={"lg"}
                    color={"dark-gray"}
                    gap={{ base: 1, lg: 3 }}
                  >
                    <Text minW={"250px"} display={"flex"} alignItems={"center"}>
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
                        job.status === "Completed" ? "green.500" : "orange.500"
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
      {pages && jobs.length !== 0 && (
        <Flex mt={4} justifyContent={"space-between"} alignItems={"center"}>
          <Button
            isDisabled={pages.currentPage <= 1}
            onClick={() =>
              updateSearch("page", (pages.currentPage - 1).toString())
            }
          >
            Prev
          </Button>
          <Text>Current Page: {pages.currentPage}</Text>
          <Button
            isDisabled={pages.currentPage >= pages.pages}
            onClick={() =>
              updateSearch("page", (pages.currentPage + 1).toString())
            }
          >
            Next
          </Button>
        </Flex>
      )}
    </PageLayout>
  );
};

export default Jobs;
