"use client";
import { Box, Heading } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useInspectionData } from "../../services/client/context";
import ButtonOutline from "../../components/ButtonOutline";
import { Db } from "../../services/clientdb";
import { useState } from "react";
import { generatePdf } from "../../utils/pdf";

const ReportPreview = () => {
  const { inspection }: any = useInspectionData();
  const [docDef, setDocDef] = useState<any>(inspection);

  const getTemplate = async () => {
    const template = await Db.template.get("defaultTemplate");
    setDocDef((prev: any) => ({ ...prev, template }));

    await generatePdf(inspection, template);
  };

  console.log(docDef);

  return (
    <PageLayout title="Report Preview">
      <Box>
        <ButtonOutline onClick={getTemplate}>Preview</ButtonOutline>
      </Box>
      <Box>
        <Heading fontSize={"xl"}>Perview Here</Heading>
      </Box>
    </PageLayout>
  );
};

export default ReportPreview;
