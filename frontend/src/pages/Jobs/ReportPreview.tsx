"use client";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import PageLayout from "../../Layout/PageLayout";
import { useInspectionData } from "../../services/client/context";
import { useState, useRef, useEffect } from "react";
import Loading from "../../components/Loading";
import { postRequest } from "../../services/client";
import ButtonPrimary from "../../components/ButtonPrimary";
import inspectionApi from "../../services/api";

const ReportPreview = () => {
  const { inspection }: any = useInspectionData();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [pdfUrl, setPdfUrl] = useState<any>(null);

  useEffect(() => {
    const getPDF = async () => {
      const maxwidth = 495 - 20;
      const maxHeightInpx = 1009;
      const itemsHeights: any[] = [];

      parentRef.current!.innerHTML = "";

      const items = inspection.inspectionItems as any[];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemDiv = document.createElement("div");
        itemDiv.style.width = `${maxwidth}pt`;
        itemDiv.style.backgroundColor = "#fff8dc";
        itemDiv.style.fontFamily = "'Times New Roman', serif";
        itemDiv.style.fontSize = "11pt";
        itemDiv.style.lineHeight = "1.2";
        itemDiv.style.paddingTop = "5pt";
        itemDiv.className = "tableRow";

        parentRef.current!.appendChild(itemDiv);

        const itemNamepara = document.createElement("p");
        itemNamepara.style.fontWeight = "bold";
        itemNamepara.textContent = item.itemName;

        itemDiv.appendChild(itemNamepara);

        const openingPara = document.createElement("p");
        if (typeof item.openingParagraph === "string") {
          openingPara.textContent = item.openingParagraph;
        } else {
          for (let j = 0; j < item.openingParagraph.length; j++) {
            const subItem = item.openingParagraph[j];
            const span = document.createElement("span");
            span.textContent = subItem.text;

            if (subItem.bold) {
              span.style.fontWeight = "bold";
            }
            if (subItem.italics) {
              span.style.fontStyle = "italic";
            }
            if (subItem.decoration) {
              span.style.textDecoration = "underline";
            }

            openingPara.appendChild(span);
          }
        }
        itemDiv.appendChild(openingPara);

        if (item.itemNote && item.itemNote !== "") {
          const notePara = document.createElement("p");
          notePara.textContent = `Note:- ${item.itemNote}`;

          itemDiv.appendChild(notePara);
        }

        const imageDiv = document.createElement("div");
        imageDiv.style.display = "flex";
        imageDiv.style.flexWrap = "wrap";
        imageDiv.style.gap = "5pt";

        for (let j = 0; j < item.itemImages.length; j++) {
          const imgStr = item.itemImages[j];

          const img = document.createElement("img");
          img.src = imgStr;
          img.style.width = "220pt";
          img.style.height = "200pt";
          imageDiv.appendChild(img);
        }

        itemDiv.appendChild(imageDiv);

        const closingPara = document.createElement("p");
        if (typeof item.closingParagraph === "string") {
          closingPara.textContent = item.closingParagraph;
        } else {
          for (let j = 0; j < item.closingParagraph.length; j++) {
            const subItem = item.closingParagraph[j];
            const span = document.createElement("span");
            span.textContent = subItem.text;

            if (subItem.bold) {
              span.style.fontWeight = "bold";
            }
            if (subItem.italics) {
              span.style.fontStyle = "italic";
            }
            if (subItem.decoration) {
              span.style.textDecoration = "underline";
            }

            closingPara.appendChild(span);
          }
        }
        itemDiv.appendChild(closingPara);

        const height = itemDiv.clientHeight;
        itemsHeights.push({
          id: item.id,
          height,
        });
      }

      const final: any[] = [];

      for (let i = 0; i < itemsHeights.length; i++) {
        let item = itemsHeights[i];
        let total = 0;

        if (final.includes(item)) {
          continue;
        }

        if (item.height >= maxHeightInpx) {
          item.pageBreak = true;
          final.push(item);
          total = maxHeightInpx - item.height;
        }

        for (let j = i; j < itemsHeights.length; j++) {
          const current = itemsHeights[j];
          if (total + current.height < maxHeightInpx) {
            if (i === j) {
              current.pageBreak = true;
            }
            final.push(current);
            total += current.height;
          }
        }
      }

      const response = await postRequest(
        `/client/inspections/generate-report?inspectionId=${inspection.id}`,
        {
          body: JSON.stringify({
            items: final,
          }),
        }
      );

      if (!response.success) {
        console.log("not suuces");
        return;
      }

      setPdfUrl(response.data);
    };

    getPDF();
  }, []);

  const sendReport = async () => {
    if (!pdfUrl) {
      return;
    }

    const reportGenDate = new Date();
    const day = reportGenDate.getDate().toString();
    const month = (reportGenDate.getMonth() + 1).toString();

    const year = reportGenDate.getFullYear().toString();

    const newFolderName = `${day.length === 2 ? day : "0" + day}${
      month.length === 2 ? month : "0" + month
    }${year} - ${inspection.customer} - ${
      inspection.jobType
    } Inspection Report`;

    const response = await inspectionApi.post(
      "https://script.google.com/macros/s/AKfycbzwe0Glz4kODE6IH8qf_AooyxcfI-Zp13XQYtkRr3Fc_FakhxmFnEn4Bh_JtQ0IWOPA/exec",
      {
        folderName: newFolderName,
        base64Pdf: pdfUrl,
        subject: `${inspection.jobNumber} - ${inspection.jobType}`,
      },
      {
        onUploadProgress: (e) => {
          console.log(e.progress);
        },
      }
    );

    console.log(response)
  };

  return (
    <PageLayout title="Report Preview">
      <Box bg="main-bg" border="stroke" borderRadius={5} p="3">
        {pdfUrl ? (
          <>
            <Box mx="auto" width={"600px"} border={"1px"}>
              <embed
                type="application/pdf"
                src={pdfUrl}
                width="600"
                height="700"
              />
            </Box>
            <Box mt={5} textAlign={"center"}>
              <ButtonPrimary onClick={sendReport}>Send Report</ButtonPrimary>
            </Box>
          </>
        ) : (
          <Box h={"500px"} position={"relative"} overflow={"hidden"}>
            <div
              ref={parentRef}
              style={{ position: "absolute", zIndex: "-1" }}
            ></div>
            <Flex
              h={"full"}
              mx={"auto"}
              alignItems={"center"}
              justifyContent={"center"}
              direction={"column"}
            >
              <Box>
                <Loading />
              </Box>
              <Text>Please wait while generating Report PDF</Text>
            </Flex>
          </Box>
        )}
      </Box>
    </PageLayout>
  );
};

export default ReportPreview;
