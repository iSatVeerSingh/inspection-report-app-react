import { Box, Flex, Heading, Text, Grid, Checkbox } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import FilterSelect from "../../components/FilterSelect";
import SearchFilter from "../../components/SearchFilter";

const AllAddedItems = () => {
  return (
    <PageLayout title="See Added Items To Current Report">
      <Box>
        <Box>
          <Heading
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            fontWeight={"medium"}
            color={"rich-black"}
          >
            #23855 - Frame Inspection - John Abrahm
          </Heading>
          <Text fontSize={"lg"} color={"dark-gray"}>
            P.O. Box 22, Greensborough
          </Text>
        </Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "start", md: "center" }}
          gap={4}
          justifyContent={"space-between"}
          mt={4}
        >
          <Flex alignItems={"center"}>
            <Text
              fontSize={"lg"}
              fontWeight={"medium"}
              color={"rich-black"}
              minW={"100px"}
            >
              Filter By
            </Text>
            <FilterSelect
              flexGrow={1}
              width={{ base: "full", md: "200px" }}
              options={[{ text: "Opetion 1", value: "option1" }]}
            />
          </Flex>
          <SearchFilter placeholder="Search by job nuber, category, customer name" />
        </Flex>
        <Grid mt={4}>
          <Flex gap={2} bg={"main-bg"} p="2" borderRadius={5}>
            <Box mt={1}>
              <Checkbox colorScheme="blue" borderColor={"blue.400"} />
            </Box>
            <Box>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text
                  fontSize={"lg"}
                  color={"rich-black"}
                  fontWeight={"semibold"}
                >
                  Pre - Slab :- Bar Chairs Missing (Fabric)
                </Text>
                <Text fontSize={"lg"} color={"dark-gray"}>
                  (4) Images
                </Text>
              </Flex>
              <Text color={"main-text"}>
                <b>Items Notes:- </b>Whether you are building your first home,
                your dream home, or an investment property, we are here to
                ensure that it is built properly
              </Text>
            </Box>
          </Flex>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default AllAddedItems;
