import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Inspection } from "../../types";
import clientApi from "../../services/clientApi";
import MiniDetail from "../../components/MiniDetail";
import { DeleteIcon } from "../../icons";

const ViewAddedNotes = () => {
  const { jobNumber } = useParams();
  const toast = useToast();
  const [job, setJob] = useState<Inspection | null>(null);

  const getJob = async () => {
    const response = await clientApi.get(`/inspection?jobNumber=${jobNumber}`);
    if (response.status !== 200) {
      return;
    }
    setJob(response.data);
  };

  useEffect(() => {
    getJob();
  }, []);

  const deleteNote = async (note: string) => {
    const response = await clientApi.put(
      `/inspection/note?jobNumber=${jobNumber}`,
      {
        note,
      }
    );
    if (response.status !== 200) {
      toast({
        title: response.data.message,
        duration: 4000,
        status: "error",
      });
      return;
    }
    toast({
      title: response.data.message,
      duration: 4000,
      status: "success",
    });
    await getJob();
  };

  return (
    <PageLayout title="All Notes">
      <Box p={3} borderRadius={"xl"} shadow={"xs"} bg={"card-bg"}>
        <Heading as="h2" fontSize={"2xl"} fontWeight={"semibold"}>
          &#35;{job?.jobNumber} - {job?.category}
        </Heading>
        <Flex direction={"column"} gap={1} px={3} mt={4}>
          <MiniDetail property="Category" value={job?.category!} />
          <MiniDetail
            property="Customer"
            value={job?.customer!.nameOnReport!}
          />
          <MiniDetail property="Date" value={job?.startsAt!} />
          <MiniDetail property="Site Address" value={job?.siteAddress!} />
        </Flex>
      </Box>
      {job?.inspectionNotes && job.inspectionNotes.length !== 0 ? (
        <Grid gap={2} mt={3}>
          {job.inspectionNotes.map((note, index) => (
            <Flex
              key={index}
              p={3}
              borderRadius={"xl"}
              shadow={"xs"}
              bg={"card-bg"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text>{note}</Text>
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete Note"
                onClick={() => deleteNote(note)}
              />
            </Flex>
          ))}
        </Grid>
      ) : (
        <Text p={3} bg={"card-bg"} mt={3} borderRadius={"xl"} shadow={"xs"}>
          "Couln't find any notes"
        </Text>
      )}
    </PageLayout>
  );
};

export default ViewAddedNotes;
