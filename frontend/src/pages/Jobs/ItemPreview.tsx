import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import MiniDetail from "../../components/MiniDetail";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { InspectionItemContext } from "../../Layout/InspectionItemLayout";
import ButtonOutline from "../../components/ButtonOutline";
import clientApi from "../../services/clientApi";

const ItemPreview = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { inspection } = useContext(InspectionItemContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inspectionItem =
    inspection?.inspectionItems?.find((item) => item.id === params.itemId) ||
    null;

  useEffect(() => {
    if (!inspection || !inspectionItem) {
      navigate(-1);
    }
  }, []);

  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [deleting, setDeleting] = useState(false);

  const deleteInspectionItem = async () => {
    setDeleting(true);
    const response = await clientApi.delete(
      `/inspections/items?inspectionId=${params.inspectionId}&itemId=${inspectionItem?.id}`
    );

    if (response.status !== 200) {
      toast({
        title: "Could not delete item",
        status: "error",
        duration: 4000,
      });
      setDeleting(false);
      onClose();
      return;
    }

    toast({
      title: "Item deleted successfully",
      duration: 4000,
      status: "success",
    });
    setDeleting(false);
    onClose();
    navigate(-1);
  };

  return (
    <PageLayout title="Item Preview">
      {inspection && inspectionItem ? (
        <Box bg="main-bg" border="stroke" borderRadius={5} p="3">
          <Box>
            <Heading fontSize={"2xl"} fontWeight={"medium"}>
              &#35;{inspection?.jobNumber} - {inspection?.jobType}
            </Heading>
            <Text>{inspection?.siteAddress}</Text>
          </Box>
          <Flex direction={"column"} mt={4} gap={1}>
            <MiniDetail property="Category" value={inspectionItem?.category} />
            <MiniDetail property="Name" value={inspectionItem?.name} />
            <MiniDetail
              vertical
              property="Summary"
              value={inspectionItem?.summary || "No Summary"}
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
                {inspectionItem?.images?.map((image: string, index: number) => (
                  <Image key={index} src={image} maxW={"200px"} />
                ))}
              </Flex>
            </Box>
            <MiniDetail
              property="Notes"
              value={inspectionItem?.note || "N/A"}
              vertical
            />
            {typeof inspectionItem.openingParagraph === "string" ? (
              <MiniDetail
                property="Opening Paragraph"
                value={inspectionItem.openingParagraph}
              />
            ) : (
              <Box>
                <Text
                  minW={"200px"}
                  fontSize={"xl"}
                  fontWeight={"medium"}
                  color={"rich-black"}
                >
                  Opening Paragraph
                </Text>
                <Box>
                  {inspectionItem.openingParagraph.map((paragraph, index) => (
                    <Text
                      key={index}
                      bg="text-bg"
                      px={3}
                      borderRadius={3}
                      color={"main-text"}
                    >
                      {paragraph.text.map((text, index) => (
                        <Text
                          as="span"
                          key={index}
                          fontWeight={text.bold ? "bold" : "normal"}
                          fontStyle={text.italics ? "italic" : "normal"}
                          textDecoration={
                            text.decoration
                              ? typeof text.decoration === "string"
                                ? text.decoration
                                : "underline line-through"
                              : "none"
                          }
                        >
                          {text.text}
                        </Text>
                      ))}
                    </Text>
                  ))}
                </Box>
              </Box>
            )}
            {inspectionItem.embeddedImage && (
              <Box>
                <Text
                  minW={"200px"}
                  fontSize={"xl"}
                  fontWeight={"medium"}
                  color={"rich-black"}
                >
                  Embedded Image
                </Text>
                <Image src={inspectionItem.embeddedImage} maxW={"200px"} />
              </Box>
            )}
            {typeof inspectionItem.closingParagraph === "string" ? (
              <MiniDetail
                property="Opening Paragraph"
                value={inspectionItem.closingParagraph}
              />
            ) : (
              <Box>
                <Text
                  minW={"200px"}
                  fontSize={"xl"}
                  fontWeight={"medium"}
                  color={"rich-black"}
                >
                  Closing Paragraph
                </Text>
                <Box>
                  {inspectionItem.closingParagraph.map((paragraph, index) => (
                    <Text
                      key={index}
                      bg="text-bg"
                      px={3}
                      borderRadius={3}
                      color={"main-text"}
                    >
                      {paragraph.text.map((text, index) => (
                        <Text
                          as="span"
                          key={index}
                          fontWeight={text.bold ? "bold" : "normal"}
                          fontStyle={text.italics ? "italic" : "normal"}
                          textDecoration={
                            text.decoration
                              ? typeof text.decoration === "string"
                                ? text.decoration
                                : "underline line-through"
                              : "none"
                          }
                        >
                          {text.text}
                        </Text>
                      ))}
                    </Text>
                  ))}
                </Box>
              </Box>
            )}
          </Flex>
          <Flex justifyContent={"space-between"} mt={5}>
            <ButtonPrimary width={"200px"} onClick={() => navigate(-1)}>
              Close
            </ButtonPrimary>
            <ButtonOutline colorScheme="red" onClick={onOpen}>
              Delete Item
            </ButtonOutline>
          </Flex>
        </Box>
      ) : (
        <Text>Item Not Found</Text>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {inspectionItem?.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteInspectionItem}
                ml={3}
                isLoading={deleting}
                loadingText="Deleting"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </PageLayout>
  );
};

export default ItemPreview;
