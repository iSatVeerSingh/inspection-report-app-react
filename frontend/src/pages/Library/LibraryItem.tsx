"use client";

import { Box, Card, Flex, Text } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { libraryApi } from "../../services/api";
import Loading from "../../components/Loading";

const LibraryItem = () => {
  const params = useParams();

  const [libraryItem, setLibraryItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLibraryItem = async () => {
      const response = await libraryApi.get("/" + params.itemId);

      if (response.status !== 200) {
        return;
      }

      setLibraryItem(response.data.data);
      setLoading(false);
    };

    getLibraryItem();
  }, []);

  return (
    <PageLayout title="Library Item">
      {loading ? (
        <Loading />
      ) : (
        <Card p={2}>
          <Flex gap={2}>
            <Text fontWeight={"bold"} minW={"200px"}>
              Item Name
            </Text>
            <Text>{libraryItem?.name}</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={"bold"} minW={"200px"}>
              Category
            </Text>
            <Text>{libraryItem?.category}</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={"bold"} minW={"200px"}>
              Created At
            </Text>
            <Text>{libraryItem?.created_at}</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={"bold"} minW={"200px"}>
              Last Updated
            </Text>
            <Text>{libraryItem?.updated_at}</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={"bold"} minW={"200px"}>
              Summary
            </Text>
            <Text>{libraryItem?.summary || "This item has no summary"}</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={"bold"} minW={"200px"}>
              Opening Paragraph
            </Text>
            <Box>
              {
                JSON.parse(libraryItem?.openingParagraph).map((paragraph: any, index: number) => (
                  <Text key={index}>{'hlll'}</Text>
                ))
              }
            </Box>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={"bold"} minW={"200px"}>
              Closing Paragraph
            </Text>
            <Text>20-40-50</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={"bold"} minW={"200px"}>
              Closing Paragraph
            </Text>
            <Text>20-40-50</Text>
          </Flex>
        </Card>
      )}
    </PageLayout>
  );
};

export default LibraryItem;
