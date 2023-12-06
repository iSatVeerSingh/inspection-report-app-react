"use client";

import { useEffect, useState } from "react";
import PageLayout from "../../Layout/PageLayout";
import { inspectionApi } from "../../services/api";
import { LibraryItem } from "../../types";
import Loading from "../../components/Loading";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LibraryItems = () => {
  const [loading, setLoading] = useState(true);
  const [libraryItems, setLibraryItems] = useState<Partial<LibraryItem>[]>([]);
  const [paginationLinks, setPaginationLinks] = useState<any>(null);

  const getLibraryItems = async (url?: string) => {
    setLoading(true)
    const response = await inspectionApi.get(url || "/library-items");
    if (response.status !== 200) {
      setLoading(false);
      return;
    }

    setLibraryItems(response.data.data);
    setPaginationLinks(response.data.links);
    setLoading(false);
  };

  useEffect(() => {
    getLibraryItems();
  }, []);

  return (
    <PageLayout title="Library Items">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box>
            {libraryItems.length !== 0 ? (
              <Grid gap={2}>
                {libraryItems.map((item) => (
                  <Link key={item.id} to={"./" + item.id}>
                    <GridItem bg={"main-bg"} p={2} borderRadius={4}>
                      <Flex
                        gap={2}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Text fontSize={"xl"}>{item.name}</Text>
                        <Text>Updated At:- {item.updated_at}</Text>
                      </Flex>
                      <Text
                        bg={"app-bg"}
                        px={2}
                        borderRadius={3}
                        w={"min-content"}
                      >
                        {item.category}
                      </Text>
                      <Text color={"main-text"}>
                        {item.summary
                          ? item.summary.length > 230
                            ? item.summary.slice(0, 230) + "..."
                            : item.summary
                          : "No Summary"}
                      </Text>
                    </GridItem>
                  </Link>
                ))}
              </Grid>
            ) : (
              "No items found"
            )}
          </Box>
          {paginationLinks && (
            <Flex mt={3} justifyContent={"space-between"}>
              <Button
                isDisabled={!paginationLinks.prev}
                onClick={() => getLibraryItems(paginationLinks.prev)}
              >
                Prev
              </Button>
              <Button
                isDisabled={!paginationLinks.next}
                onClick={() => getLibraryItems(paginationLinks.next)}
              >
                Next
              </Button>
            </Flex>
          )}
        </>
      )}
    </PageLayout>
  );
};

export default LibraryItems;
