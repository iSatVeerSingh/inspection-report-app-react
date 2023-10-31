import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigate, useParams } from "react-router-dom";
import { useInspectionData } from "../../services/client/context";

const ItemPreview = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { inspection }: any = useInspectionData();

  const inspectionItem = inspection.inspectionItems.find(
    (item: any) => item.id === params.item
  );

  return (
    <PageLayout title="Item Preview">
      <Box bg="main-bg" border="stroke" borderRadius={5} p="3">
        <Box>
          <Heading fontSize={"2xl"} fontWeight={"medium"}>
            &#35;{inspection?.jobNumber} - {inspection?.category}
          </Heading>
          <Text>{inspection?.siteAddress}</Text>
        </Box>
        <Flex direction={"column"} mt={4} gap={1}>
          <MiniDetail
            property="Category"
            value={inspectionItem?.category || "Custom Item"}
          />
          <MiniDetail property="Name" value={inspectionItem?.itemName} />
          <MiniDetail
            vertical
            property="Summary"
            value={inspectionItem?.itemSummary || "No Summary"}
          />
          <Box>
            <Text
              minW={"200px"}
              fontSize={"xl"}
              fontWeight={"medium"}
              color={"rich-black"}
            >
              Images
            </Text>
            <Flex flexWrap={"wrap"} w={"full"} gap={2}>
              {inspectionItem?.itemImages.map(
                (image: string, index: number) => (
                  <Image key={index} src={image} maxW={"200px"} />
                )
              )}
            </Flex>
          </Box>
          <MiniDetail
            property="Notes"
            value={inspectionItem?.itemNote}
            vertical
          />
          {typeof inspectionItem?.openingParagraph === "string" ? (
            <MiniDetail
              property="Opening Paragraph"
              value={inspectionItem?.openingParagraph}
            />
          ) : (
            <Box mt={2}>
              <Text
                minW={"200px"}
                fontSize={"xl"}
                fontWeight={"medium"}
                color={"rich-black"}
              >
                Opening Paragraph
              </Text>
              <Box bg="text-bg" px={3} borderRadius={3} fontSize={"lg"}>
                {inspectionItem?.openingParagraph.map(
                  (paragraph: any, index: any) => (
                    <Text
                      key={index}
                      fontWeight={paragraph.bold ? "bold" : "normal"}
                      fontStyle={paragraph.italics ? "italic" : "normal"}
                    >
                      {paragraph.text}
                    </Text>
                  )
                )}
              </Box>
            </Box>
          )}
          <MiniDetail
            property="Embedded Image"
            value="Item notes will be here"
            vertical
          />
          {typeof inspectionItem?.closingParagraph === "string" ? (
            <MiniDetail
              property="Closing Paragraph"
              value={inspectionItem?.closingParagraph}
            />
          ) : (
            <Box mt={2}>
              <Text
                minW={"200px"}
                fontSize={"xl"}
                fontWeight={"medium"}
                color={"rich-black"}
              >
                Closing Paragraph
              </Text>
              <Box bg="text-bg" px={3} borderRadius={3}>
                {inspectionItem?.closingParagraph.map(
                  (paragraph: any, index: any) => (
                    <Text
                      as={"span"}
                      key={index}
                      fontWeight={paragraph.bold ? "bold" : "normal"}
                      fontStyle={paragraph.italics ? "italic" : "normal"}
                    >
                      {paragraph.text}&nbsp;
                    </Text>
                  )
                )}
              </Box>
            </Box>
          )}
        </Flex>
        <Flex justifyContent={"space-between"} mt={5}>
          <ButtonPrimary width={"200px"} onClick={() => navigate(-1)}>
            Close
          </ButtonPrimary>
        </Flex>
      </Box>
    </PageLayout>
  );
};

export default ItemPreview;
