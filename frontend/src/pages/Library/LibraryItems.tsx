import { useEffect, useState } from "react";
import PageLayout from "../../Layout/PageLayout";
import clientApi from "../../services/clientApi";
import { LibraryItem, LibraryItemCategory } from "../../types";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import FilterSelect from "../../components/FilterSelect";
import ButtonOutline from "../../components/ButtonOutline";
import FilterInput from "../../components/FilterInput";

type Filter = {
  category?: string;
  updated_at?: string;
  page?: string;
};

const LibraryItems = () => {
  const [categories, setCategories] = useState<{ text: string; value: any }[]>(
    []
  );
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [pages, setPages] = useState<{ pages: number; currentPage: number }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearch = (key: keyof Filter, value: string) => {
    if (value && value !== "") {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        [key]: value,
      }));
    }
  };

  useEffect(() => {
    (async () => {
      const response = await clientApi.get("/library-item-categories");
      if (response.status !== 200) {
        return;
      }
      const allCategories = (response.data as LibraryItemCategory[]).map(
        (category) => ({ text: category.name, value: category.id })
      );
      setCategories(allCategories);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const searchUrl =
        searchParams.size === 0
          ? "/library-items"
          : "/library-items?" + searchParams.toString();
      const response = await clientApi.get(searchUrl);
      if (response.status !== 200) {
        return;
      }
      setLibraryItems(response.data.data);
      setPages({
        pages: response.data.pages,
        currentPage: response.data.currentPage,
      });
    })();
  }, [searchParams]);

  const clearFilter = () => {
    setSearchParams({});
  };

  return (
    <PageLayout title="Library items" isRoot>
      <Flex
        direction={{ base: "column", lg: "row" }}
        alignItems={{ base: "start", lg: "center" }}
        gap={2}
      >
        <Flex gap={3}>
          <FilterSelect
            options={categories}
            value={searchParams.get("category") || ""}
            placeholder="Select a category"
            onChange={(e) => updateSearch("category", e.target.value)}
          />
          <FilterInput
            value={searchParams.get("updated_at") || ""}
            onChange={(e) => updateSearch("updated_at", e.target.value)}
            type="date"
          />
        </Flex>
        <ButtonOutline size={"sm"} onClick={clearFilter}>
          Clear
        </ButtonOutline>
      </Flex>
      <Box mt={4}>
        {libraryItems.length === 0 ? (
          "Couldn't find any items"
        ) : (
          <Grid gap={2}>
            {libraryItems.map((item) => (
              <Link to={"./" + item.id} key={item.id}>
                <GridItem
                  bg={"card-bg"}
                  p="2"
                  borderRadius={"lg"}
                  shadow={"xs"}
                >
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Text fontSize={"xl"} color={"text-big"}>
                      {item.name}
                    </Text>
                    <Text color={"text-small"}>
                      Updated At:- {item.updated_at}
                    </Text>
                  </Flex>
                  <Text
                    bg={"app-bg"}
                    w={"max-content"}
                    borderRadius={"lg"}
                    px={3}
                  >
                    {item.category}
                  </Text>
                  <Text color={"text-small"}>
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
        )}
      </Box>
      {pages && libraryItems.length !== 0 && (
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

export default LibraryItems;
