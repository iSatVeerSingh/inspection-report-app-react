"use client";

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { inspectionApi } from "../../services/api";
import { LibraryItem as LibraryItemType } from "../../types";
import Loading from "../../components/Loading";
import { getItemPargarph } from "../../utils/itemParagraph";

const ParagraphText = ({ paragraph }: { paragraph: string }) => {
  const parsedText = getItemPargarph(paragraph);

  if (typeof parsedText === "string") {
    return <Text>{parsedText}</Text>;
  }

  return (
    <>
      {parsedText.map((para, index) => (
        <Text key={index}>
          {para.text.map((subPara, index) => (
            <Text
              key={index}
              as={"span"}
              fontWeight={subPara.bold ? "bold" : "normal"}
              fontStyle={subPara.italics ? "italic" : "normal"}
              textDecoration={
                subPara.decoration
                  ? typeof subPara.decoration === "string"
                    ? subPara.decoration
                    : subPara.decoration.join(" ")
                  : "none"
              }
            >
              {subPara.text}
            </Text>
          ))}
        </Text>
      ))}
    </>
  );
};

const LibraryItem = () => {
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();
  const [libraryItem, setLibraryItem] = useState<LibraryItemType | null>(null);

  const getLibraryItem = async () => {
    const response = await inspectionApi.get(`/library-items/${itemId}`);
    if (response.status !== 200) {
      setLoading(false);
      return;
    }

    setLibraryItem(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getLibraryItem();
  }, []);

  return (
    <PageLayout title="Library Item">
      {loading ? (
        <Loading />
      ) : (
        <Box border={"stroke"} bg={"main-bg"} borderRadius={4} p={3}>
          <Flex gap={3} alignItems={"center"} mb={2}>
            <Text fontSize={"lg"} minW={"150px"}>
              Name
            </Text>
            <Text bg={"app-bg"} px={2} borderRadius={3}>
              {libraryItem?.name}
            </Text>
          </Flex>
          <Flex gap={3} alignItems={"center"} mb={2}>
            <Text fontSize={"lg"} minW={"150px"}>
              Category
            </Text>
            <Text bg={"app-bg"} px={2} borderRadius={3}>
              {libraryItem?.category}
            </Text>
          </Flex>
          <Flex gap={3} alignItems={"center"} mb={2}>
            <Text fontSize={"lg"} minW={"150px"}>
              Updated At
            </Text>
            <Text bg={"app-bg"} px={2} borderRadius={3}>
              {libraryItem?.updated_at}
            </Text>
          </Flex>
          
          <Flex
            gap={libraryItem?.summary ? 1 : 3}
            mb={2}
            flexDir={libraryItem?.summary ? "column" : "row"}
          >
            <Text fontSize={"lg"} minW={"150px"}>
              Summary
            </Text>
            <Text bg={"app-bg"} px={2} borderRadius={3}>
              {libraryItem?.summary ? libraryItem.summary : "N/A"}
            </Text>
          </Flex>
          <Flex gap={1} mb={2} flexDir={"column"}>
            <Text fontSize={"lg"} minW={"150px"}>
              Opening Paragraph
            </Text>
            <Box bg={"app-bg"} px={2} borderRadius={3}>
              <ParagraphText paragraph={libraryItem?.openingParagraph!} />
            </Box>
          </Flex>
          {libraryItem?.embeddedImage && (
            <Image
              src={libraryItem.embeddedImage}
              maxW={"400px"}
              maxH={"400px"}
            />
          )}
          <Flex gap={1} mb={2} flexDir={"column"}>
            <Text fontSize={"lg"} minW={"150px"}>
              Closing Paragraph
            </Text>
            <Box bg={"app-bg"} px={2} borderRadius={3}>
              <ParagraphText paragraph={libraryItem?.closingParagraph!} />
            </Box>
          </Flex>
        </Box>
      )}
    </PageLayout>
  );
};

export default LibraryItem;
// import { Box, Card, Flex, Text } from "@chakra-ui/react";
// import PageLayout from "../../Layout/PageLayout";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { libraryApi } from "../../services/api";
// import Loading from "../../components/Loading";

// const LibraryItem = () => {
//   const params = useParams();

//   const [libraryItem, setLibraryItem] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getLibraryItem = async () => {
//       const response = await libraryApi.get("/" + params.itemId);

//       if (response.status !== 200) {
//         return;
//       }

//       setLibraryItem(response.data.data);
//       setLoading(false);
//     };

//     getLibraryItem();
//   }, []);

//   return (
//     <PageLayout title="Library Item">
//       {loading ? (
//         <Loading />
//       ) : (
//         <Card p={2}>
//           <Flex gap={2}>
//             <Text fontWeight={"bold"} minW={"200px"}>
//               Item Name
//             </Text>
//             <Text>{libraryItem?.name}</Text>
//           </Flex>
//           <Flex gap={2}>
//             <Text fontWeight={"bold"} minW={"200px"}>
//               Category
//             </Text>
//             <Text>{libraryItem?.category}</Text>
//           </Flex>
//           <Flex gap={2}>
//             <Text fontWeight={"bold"} minW={"200px"}>
//               Created At
//             </Text>
//             <Text>{libraryItem?.created_at}</Text>
//           </Flex>
//           <Flex gap={2}>
//             <Text fontWeight={"bold"} minW={"200px"}>
//               Last Updated
//             </Text>
//             <Text>{libraryItem?.updated_at}</Text>
//           </Flex>
//           <Flex gap={2}>
//             <Text fontWeight={"bold"} minW={"200px"}>
//               Summary
//             </Text>
//             <Text>{libraryItem?.summary || "This item has no summary"}</Text>
//           </Flex>
//           <Flex gap={2}>
//             <Text fontWeight={"bold"} minW={"200px"}>
//               Opening Paragraph
//             </Text>
//             <Box>
//               {
//                 JSON.parse(libraryItem?.openingParagraph).map((paragraph: any, index: number) => (
//                   <Text key={index}>{'hlll'}</Text>
//                 ))
//               }
//             </Box>
//           </Flex>
//           <Flex gap={2}>
//             <Text fontWeight={"bold"} minW={"200px"}>
//               Closing Paragraph
//             </Text>
//             <Text>20-40-50</Text>
//           </Flex>
//           <Flex gap={2}>
//             <Text fontWeight={"bold"} minW={"200px"}>
//               Closing Paragraph
//             </Text>
//             <Text>20-40-50</Text>
//           </Flex>
//         </Card>
//       )}
//     </PageLayout>
//   );
// };

// export default LibraryItem;
