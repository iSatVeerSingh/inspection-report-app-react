import { Box, Flex, Heading, Text, Grid } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import clientApi from "../../services/clientApi";
import Loading from "../../components/Loading";
import { InspectionItemContext } from "../../Layout/InspectionItemLayout";

const AllAddedItems = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { inspection, setInspection } = useContext(InspectionItemContext);

  useEffect(() => {
    const getInspection = async () => {
      const response = await clientApi.get(
        `/inspections?inspectionId=${params.inspectionId}`
      );

      if (response.status !== 200) {
        setLoading(false);
        return;
      }

      setInspection(response.data);
      setLoading(false);
    };

    getInspection();
  }, []);

  return (
    <PageLayout title="Newly added items">
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <Box>
            <Heading
              fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
              fontWeight={"medium"}
              color={"rich-black"}
            >
              &#35;{inspection?.jobNumber} - {inspection?.jobType}
            </Heading>
            <Text fontSize={"lg"} color={"dark-gray"}>
              {inspection?.siteAddress}
            </Text>
          </Box>
          {inspection?.inspectionItems &&
          inspection.inspectionItems.length !== 0 ? (
            <Grid mt={4} gap={2}>
              {inspection.inspectionItems.map((item) => (
                <Link to={"./" + item.id} key={item.id}>
                  <Box bg={"main-bg"} p={2} borderRadius={5}>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      w={"full"}
                    >
                      <Text
                        fontSize={"lg"}
                        color={"rich-black"}
                        fontWeight={"semibold"}
                      >
                        {item.category} :- {item.name}
                      </Text>
                      <Text>({item.images?.length}) Images</Text>
                    </Flex>
                    <Text color={"main-text"}>Note:- {item.note || "N/A"}</Text>
                  </Box>
                </Link>
              ))}
            </Grid>
          ) : (
            <Box mt={3} bg="main-bg" p="3" borderRadius={5}>
              <Text>No Items Found</Text>
            </Box>
          )}
        </Box>
      )}
    </PageLayout>
  );
};

export default AllAddedItems;
