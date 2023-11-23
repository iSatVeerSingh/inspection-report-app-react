"use client";

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
import { useEffect, useState } from "react";
import { DeleteIcon } from "../../icons";
import { useNavigate, useParams } from "react-router-dom";
import { Inspection } from "../../types";
import clientApi from "../../services/clientApi";
import Loading from "../../components/Loading";

const AllAddedNotes = () => {
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [inspection, setInspection] = useState<Inspection | null>(null);
  useEffect(() => {
    const getInspectionAndNotes = async () => {
      const response = await clientApi.get(
        `/inspections/notes?inspectionId=${params.inspectionId}`
      );

      if (response.status !== 200) {
        setLoading(false);
        return;
      }

      setInspection(response.data);
      setLoading(false);
    };
    getInspectionAndNotes();
  }, []);

  const deleteNote = (note: string) => {
    setInspection((prev) => {
      return {
        ...prev!,
        inspectionNotes: prev?.inspectionNotes?.filter((item) => item !== note),
      };
    });
    setIsDelete(true);
  };

  const saveNotes = async () => {
    if (!isDelete) {
      navigate(-1);
    }
    setSaving(true);

    const response = await clientApi.put(
      `/inspections/notes?inspectionId=${params.inspectionId}`,
      {
        inspectionNotes: inspection?.inspectionNotes || [],
      }
    );

    if (response.status !== 200) {
      toast({
        title: "Could not save inspection notes",
        duration: 4000,
        status: "error",
      });
      setSaving(false);
      return;
    }

    setSaving(false);
    navigate(-1);
  };

  return (
    <PageLayout
      title="See All Added Notes"
      titleBtn="Save & Close"
      onBtnClick={saveNotes}
      btnLoading={saving}
    >
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
              &#35;{inspection?.jobNumber} - {inspection?.category}
            </Heading>
            <Text fontSize={"lg"} color={"dark-gray"}>
              {inspection?.siteAddress}
            </Text>
          </Box>
          <Grid mt={4} gap={2}>
            {inspection?.inspectionNotes ? (
              inspection.inspectionNotes?.map((note, index) => (
                <Flex gap={2} bg={"main-bg"} p="2" borderRadius={5} key={index}>
                  <IconButton
                    aria-label="Delete Note"
                    icon={<DeleteIcon />}
                    onClick={() => deleteNote(note)}
                    size={"sm"}
                    p={0}
                  />
                  <Text color={"main-text"}>{note}</Text>
                </Flex>
              ))
            ) : (
              <Text>No Inspection Notes</Text>
            )}
          </Grid>
        </Box>
      )}
    </PageLayout>
  );
};

export default AllAddedNotes;
