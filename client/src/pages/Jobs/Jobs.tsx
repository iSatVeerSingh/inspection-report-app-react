import {
  Box,
  Flex,
  Text,
  Grid,
  IconButton,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import allJobs from "../../../demo/jobs";
import FilterInput from "../../components/FilterInput";
import FilterSelect from "../../components/FilterSelect";
import SearchFilter from "../../components/SearchFilter";
import { Link, useNavigate } from "react-router-dom";
import { FilterIcon } from "../../icons/icons";
import useIsMobile from "../../hooks/useIsMobile";

const Jobs = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useIsMobile();

  return (
    <PageLayout
      title="All Jobs"
      titleBtn="Create Custom Job"
      onBtnClick={() => {
        navigate("/jobs/custom-job");
      }}
    >
      <Grid px={1} py={1} gap={2}>
        {isMobile ? (
          <Drawer onClose={onClose} isOpen={isOpen} placement="right">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Filter By</DrawerHeader>
              <Flex gap={4} direction={"column"} p="4">
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
            </DrawerContent>
          </Drawer>
        ) : (
          <Flex alignItems={"center"} gap={4} justifyContent={"space-between"}>
            <FilterIcon display={{ base: "block", lg: "none" }} boxSize={5} />
            <Text
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"rich-black"}
              display={{ base: "none", lg: "block" }}
            >
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
        )}
        <Flex gap={2} alignItems={"center"}>
          {isMobile && (
            <IconButton
              aria-label="Open Filter"
              variant={"outline"}
              h={8}
              borderColor={"blue-primary"}
              icon={<FilterIcon boxSize={6} />}
              onClick={onOpen}
            />
          )}
          <SearchFilter placeholder="Search by job nuber, category, customer name" />
        </Flex>
        {allJobs.map((job) => (
          <Link key={job.id} to={`/jobs/${job.jobNumber}`}>
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
                  {job.date}
                </Text>
              </Flex>
              <Flex
                alignItems={{ base: "start", lg: "center" }}
                direction={{ base: "column", lg: "row" }}
                fontSize={"lg"}
                color={"dark-gray"}
                gap={{ base: 1, lg: 3 }}
              >
                <Text minW={"250px"}>{job.customer}</Text>
                <Text>{job.siteAddress}</Text>
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
    </PageLayout>
  );
};

export default Jobs;
