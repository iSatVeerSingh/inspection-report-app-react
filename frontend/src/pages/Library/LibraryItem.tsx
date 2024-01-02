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
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clientApi from "../../api/clientApi";
import { LibraryItem as LibraryItemType } from "../../types";
import { getItemPargarph } from "../../utils/itemParagraph";
import LibraryItemForm from "../../components/LibraryItemForm";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useGlobalContext } from "../../context/globalContext";

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
  const { user } = useGlobalContext();

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [libraryItem, setLibraryItem] = useState<LibraryItemType | null>(null);
  const { id } = useParams();
  const toast = useToast();
  useEffect(() => {
    if (!isEditing) {
      (async () => {
        const response = await clientApi.get(`/library-items?id=${id}`);
        if (response.status !== 200) {
          return;
        }
        setLibraryItem(response.data);
        setLoading(false);
      })();
    }
  }, [isEditing]);

  const deleteItem = async () => {
    const response = await clientApi.delete(
      `/library-items?id=${libraryItem?.id}`
    );
    if (response.status !== 200) {
      toast({
        title: response.data.message || "Couldn't delete item",
        duration: 4000,
        status: "error",
      });
      return;
    }
    toast({
      title: response.data.message || "Item deleted successfully",
      duration: 4000,
      status: "success",
    });
    onClose();
    navigate(-1);
  };

  return (
    <PageLayout title="Library Item">
      {!loading && (
        <Box>
          {isEditing && user.role !== "Inspector" ? (
            <LibraryItemForm
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              libraryItem={libraryItem as LibraryItemType}
            />
          ) : (
            <>
              <Flex
                borderRadius={"xl"}
                shadow={"xs"}
                p={2}
                bg={"card-bg"}
                gap={2}
                direction={"column"}
              >
                <Flex>
                  <Text fontSize={"lg"} minW={"150px"}>
                    Name
                  </Text>
                  <Text bg={"card-bg-secondary"} px={2} borderRadius={"lg"}>
                    {libraryItem?.name}
                  </Text>
                </Flex>
                <Flex>
                  <Text fontSize={"lg"} minW={"150px"}>
                    Category
                  </Text>
                  <Text bg={"card-bg-secondary"} px={2} borderRadius={"lg"}>
                    {libraryItem?.category}
                  </Text>
                </Flex>
                <Flex>
                  <Text fontSize={"lg"} minW={"150px"}>
                    Updated At
                  </Text>
                  <Text bg={"card-bg-secondary"} px={2} borderRadius={"lg"}>
                    {libraryItem?.updated_at}
                  </Text>
                </Flex>
                <Flex direction={libraryItem?.summary ? "column" : "row"}>
                  <Text fontSize={"lg"} minW={"150px"}>
                    Summary
                  </Text>
                  <Text bg={"card-bg-secondary"} px={2} borderRadius={"lg"}>
                    {libraryItem?.summary && libraryItem.summary !== ""
                      ? libraryItem.summary
                      : "N/A"}
                  </Text>
                </Flex>
                <Flex direction={"column"}>
                  <Text fontSize={"lg"} minW={"150px"}>
                    Opening Paragraph
                  </Text>
                  <Box
                    color={"text-small"}
                    bg={"card-bg-secondary"}
                    px={2}
                    borderRadius={"lg"}
                  >
                    <ParagraphText paragraph={libraryItem?.openingParagraph!} />
                  </Box>
                </Flex>
                {libraryItem?.embeddedImage && (
                  <Flex flexDir={"column"}>
                    <Text fontSize={"lg"} minW={"150px"}>
                      Embedded Image
                    </Text>
                    <Image
                      src={libraryItem.embeddedImage}
                      maxW={"400px"}
                      maxH={"400px"}
                    />
                  </Flex>
                )}
                <Flex direction={"column"}>
                  <Text fontSize={"lg"} minW={"150px"}>
                    Closing Paragraph
                  </Text>
                  <Box
                    color={"text-small"}
                    bg={"card-bg-secondary"}
                    px={2}
                    borderRadius={"lg"}
                  >
                    <ParagraphText paragraph={libraryItem?.closingParagraph!} />
                  </Box>
                </Flex>
              </Flex>
              {user.role !== "Inspector" && (
                <Flex mt={2} justifyContent={"space-between"}>
                  <Button
                    colorScheme="red"
                    variant={"outline"}
                    onClick={onOpen}
                  >
                    Delete
                  </Button>
                  <ButtonPrimary onClick={() => setIsEditing(true)}>
                    Edit
                  </ButtonPrimary>
                </Flex>
              )}
            </>
          )}
        </Box>
      )}
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Library Item</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter gap={2}>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteItem}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </PageLayout>
  );
};

export default LibraryItem;
