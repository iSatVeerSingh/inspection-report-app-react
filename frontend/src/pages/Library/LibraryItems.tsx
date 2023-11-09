"use client";

import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useEffect, useState } from "react";
import { libraryApi } from "../../services/api";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const LibraryItems = () => {
  const [allItems, setAllItems] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getLibraryItems = async (url?: string) => {
    const apiUrl = url || "https://dev.inspectionapp.com/api/library-items";
    setLoading(true);

    const response = await libraryApi.get(apiUrl);
    https://dev.inspectionapp.com/api/library-items
    if (response.status !== 200) {
      return;
    }

    setAllItems(response.data.data);
    setNext(response.data.links.next);
    setPrev(response.data.links.prev);
    setCurrentPage(response.data.meta.current_page);
    setLoading(false);
  };

  useEffect(() => {
    getLibraryItems();
  }, []);

  return (
    <PageLayout title="All Library Items">
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <Grid gap={2} gridTemplateColumns={{ lg: "1fr 1fr" }}>
            {allItems.map((item: any) => (
              <Link key={item.id} to={`./${item.id}`}>
                <Box
                  bg="main-bg"
                  p="2"
                  borderRadius="md"
                  border="stroke"
                  minH={{ lg: "120px" }}
                >
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Text fontSize="xl">{item?.name}</Text>
                    <Text
                      fontSize="md"
                      bg={"nav-bg"}
                      px={4}
                      borderRadius={4}
                      color={"rich-black"}
                    >
                      {item?.category}
                    </Text>
                  </Flex>
                  <Box>
                    <Text>
                      Created:-{" "}
                      {new Date(item?.created_at).toLocaleDateString()}
                    </Text>
                    <Text color="main-text">
                      <Text as="span" fontWeight={"bold"}>
                        Item Summary:-
                      </Text>{" "}
                      {item?.summary || "This item has no summary"}
                    </Text>
                  </Box>
                </Box>
              </Link>
            ))}
          </Grid>
          <Flex justifyContent={"space-between"} mt={3} alignItems={"center"}>
            <Button
              isDisabled={!prev}
              variant={"outline"}
              onClick={() => getLibraryItems(prev!)}
            >
              Prev
            </Button>
            <Text>Page: {currentPage}</Text>
            <Button
              isDisabled={!next}
              variant={"outline"}
              onClick={() => getLibraryItems(next!)}
            >
              Next
            </Button>
          </Flex>
        </Box>
      )}
    </PageLayout>
  );
};

export default LibraryItems;
