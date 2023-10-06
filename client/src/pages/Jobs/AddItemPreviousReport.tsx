import { Box, Checkbox, Flex, Grid, Text } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import FilterSelect from "../../components/FilterSelect";
import SearchFilter from "../../components/SearchFilter";

const AddItemPreviousReport = () => {
  return (
    <PageLayout title="Add Items From Previous Report">
      <Box>
        <Flex gap={4}>
          <Text fontSize={"lg"} fontWeight={"semibold"} color={"rich-black"}>
            Current Report
          </Text>
          <Text fontSize={"lg"} color={"dark-gray"}>
            #23855 - Frame Inspection
          </Text>
        </Flex>
        <Flex gap={4}>
          <Text fontSize={"lg"} fontWeight={"semibold"} color={"rich-black"}>
            Previous Report
          </Text>
          <Text fontSize={"lg"} color={"dark-gray"}>
            #89798 - Pre-Slab Inspection
          </Text>
        </Flex>
        <Box mt={3}>
          <Text fontSize={"lg"} color={"main-text"}>
            Select items from #89798 - Pre-Slab Inspection
          </Text>
          <Flex gap={3}>
            <Flex>
              <Text minW={"80px"}>Filter By: </Text>
              <FilterSelect
                minW={"150px"}
                options={[{ text: "option 1", value: "option1" }]}
              />
            </Flex>
            <SearchFilter placeholder="Search Here" />
          </Flex>
        </Box>
        <Grid mt={3}>
          <Flex gap={2} bg="main-bg" p="2" border="stroke" borderRadius={5}>
            <Box mt={1}>
              <Checkbox colorScheme="blue" borderColor={"blue.400"} />
            </Box>
            <Box>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"lg"} color={"rich-black"}>
                  Bar Chairs Missing (Fabric)
                </Text>
                <Text fontSize={"lg"} color={"dark-gray"}>
                  Pre-Slab
                </Text>
              </Flex>
              <Text color={"dark-gray"}>2 Images</Text>
              <Text color={"main-text"}>
                Item Note:- Whether you are building your first home, your dream
                home, or an investment property, we are here to ensure that it
                is built properly{" "}
              </Text>
            </Box>
          </Flex>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default AddItemPreviousReport;
