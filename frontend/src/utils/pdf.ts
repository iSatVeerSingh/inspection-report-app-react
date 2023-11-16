import pdfMake from "pdfmake/build/pdfmake";
import {
  Content,
  ContentTable,
  PageBreak,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import pdfFonts from "./pdfFonts";
import {
  Inspection,
  InspectionItem,
  InspectionNote,
  ItemImage,
} from "../types";

(pdfMake as any).vfs = pdfFonts;
pdfMake.fonts = {
  Times: {
    normal: "Times-Normal.ttf",
    bold: "Times-Bold.ttf",
    italics: "Times-Italic.ttf",
    bolditalics: "Times-Bold-Italic.ttf",
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    italics: "Roboto-Italic.ttf",
    bold: "Roboto-Medium.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const generatePdf = async (reportData: Inspection, template: any) => {
  const docDefinition: TDocumentDefinitions = {
    ...getMeta(reportData, template),
    content: [
      getTitlePage(reportData, template),
      getTableOfContents(),
      getClientPropertyDetails(reportData),
      getReportDetails(reportData),
      getInspectionNotes(reportData.inspectionNotes!),
      getReportSummary(reportData),
      getPurpose(template),
      getGeneral(template),
      getBuildingDefects(template),
      getItemsTable(reportData.inspectionItems!),
      getResponsibility(template),
      getTandC(template),
    ],
    defaultStyle: {
      font: "Times",
      fontSize: 11,
    },
    info: {
      title: `${reportData.jobNumber} - ${reportData.jobType} Inspection Report`,
      author: "Correct Inspections",
      subject: `${reportData.jobType}`,
      keywords: "Inspection Report, Correct Inspections",
    },
  };

  return new Promise((resolve) => {
    pdfMake.createPdf(docDefinition).getDataUrl((result) => {
      resolve(result);
    });
    // pdfMake.createPdf(docDefinition).getBlob((result) => {
    //   resolve(result);
    // });
  });
};

const getMeta = (
  reportData: Inspection,
  template: any
): Partial<TDocumentDefinitions> => {
  return {
    pageSize: {
      width: 595,
      height: 842,
    },
    header: (currentPage: number) => {
      return currentPage === 1
        ? undefined
        : {
            table: {
              widths: ["*", "*"],
              body: [
                [
                  {
                    image: template.images.logoImage,
                    marginLeft: 20,
                    marginTop: 10,
                    width: 50,
                  },
                  {
                    text: currentPage.toString(),
                    alignment: "right",
                    marginRight: 40,
                    marginTop: 10,
                  },
                ],
              ],
            },
            layout: "noBorders",
          };
    },
    footer: (currentPage: number) => {
      return currentPage === 1
        ? undefined
        : {
            text: `${reportData.jobNumber} - ${reportData.category} Inspection Report`,
            color: "#002060",
            fontSize: 10,
            font: "Roboto",
            marginLeft: 40,
          };
    },
    pageOrientation: "portrait",
    pageMargins: [50, 60, 50, 25],
  };
};

const getTitlePage = (reportData: Inspection, template: any): Content => {
  return [
    {
      image: template.images.topImage,
      width: 595,
      absolutePosition: { x: 0, y: 0 },
    },
    {
      image: template.images.bottomImage,
      width: 595,
      height: 225,
      absolutePosition: { x: 0, y: 617 },
    },
    {
      stack: [
        {
          text: [
            {
              text: "Call us on: ",
              bold: true,
            },
            {
              text: "(03) 9434 1120",
              link: "tel:0394341120",
            },
          ],
        },
        {
          text: "admin@correctinspections.com.au",
          link: "mailto:admin@correctinspections.com.au",
          decoration: "underline",
        },
        {
          text: "www.correctinspections.com.au",
          link: "https://www.correctinspections.com.au",
          decoration: "underline",
        },
        {
          text: [
            {
              text: "Postal Address: ",
              bold: true,
            },
            {
              text: "P.O. Box 22\nGreensborough VIC 3088",
            },
          ],
        },
      ],
      color: "#002060",
      absolutePosition: {
        x: 350,
        y: 745,
      },
      alignment: "right",
    },
    {
      image: template.images.logoImage,
      width: 250,
      marginTop: 100,
      alignment: "center",
    },
    {
      text: `${reportData.category}\nINSPECTION REPORT\n& DEFECTS LIST`,
      alignment: "right",
      fontSize: 33,
      marginBottom: 10,
      marginTop: 50,
      color: "#002060",
    },
    {
      text: reportData.siteAddress,
      alignment: "right",
      fontSize: 18,
      color: "#404040",
    },
  ];
};

const getTableOfContents = (): Content => {
  return {
    pageBreak: "before",
    toc: {
      title: getMainHeading("Table Of Contents"),
    },
  };
};

const getMainHeading = (heading: string, pageBreak?: PageBreak): Content => {
  return {
    pageBreak: pageBreak,
    stack: [
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 0,
            w: 495,
            h: 20,
            color: "#002060",
          },
        ],
      },
      {
        tocItem: heading.toLowerCase() !== "table of contents",
        text: heading,
        fontSize: 13,
        bold: true,
        lineHeight: 1,
        color: "#ffffff",
        marginTop: -17,
        marginLeft: 5,
      },
    ],
    marginBottom: 10,
  };
};

const getClientPropertyDetails = (reportData: Inspection): Content => {
  return {
    pageBreak: "before",
    stack: [
      getMainHeading("Client & Property Details"),
      getMiniDetails("Client Names(s):", reportData.customer),
      getMiniDetails("Subject Property:", reportData.siteAddress),
    ],
    marginBottom: 15,
  };
};

const getMiniDetails = (property: string, value: string): Content => {
  return {
    table: {
      widths: [130, "*"],
      body: [
        [
          {
            text: property,
            bold: true,
          },
          {
            text: value,
          },
        ],
      ],
    },
    layout: "noBorders",
  };
};

const getReportDetails = (reportData: Inspection): Content => {
  return {
    stack: [
      getMainHeading("Inspection & Report Details"),
      getMiniDetails("Inspection Date:", getDateString(reportData.startedAt)),
      getMiniDetails("Inspection Time:", timeTo12Hours(reportData.time)),
      getMiniDetails("Stage Of Works:", getStage(reportData.category)),
      getMiniDetails("Date of this report:", getDateString()),
    ],
    marginBottom: 15,
  };
};

const getStage = (type: string): string => {
  const stage: any = {
    "PRE-SLAB": "Prior to concrete slab pour.",
    "POST-SLAB": "After the concrete slab has been poured.",
    FRAME: "Approaching frame stage.",
    "PRE-PLASTER": "Approaching lock-up stage.",
    "LOCK-UP": "Approaching lock-up stage.",
    FIXING: "Approaching fixing stage.",
    WATERPROOFING: "Approaching fixing stage.",
    "POINT IN TIME":
      "A point in time not necessarily aligning with a building contract stage.",
    HANDOVER: "Approaching completion.",
    "MAINTENANCE & WARRANTY": "Maintenance/Warranty stage, after settlement.",
    REINSPECTION: "Reinspection of previous report.",
  };

  return stage[type] || "Not Applicable";
};

const getDateString = (str?: any) => {
  const date = str ? new Date(str) : new Date();

  const dateString = `${WEEKDAYS[date.getDay()]} ${date.getDate()}th ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;

  return dateString;
};

const timeTo12Hours = (time24: string) => {
  let hours12;
  let period = "";
  const [hours, minutes] = time24.split(":").map(Number);
  if (hours === 0) {
    hours12 = "12";
    period = "AM";
  } else if (hours === 12) {
    hours12 = "12";
    period = "PM";
  } else if (hours > 12) {
    hours12 = (hours % 12).toString();
    period = "PM";
  } else {
    hours12 = hours.toString();
    period = "AM";
  }
  const time12 = `${getFormatDateValue(hours12)}:${getFormatDateValue(
    minutes.toString()
  )} ${period}`;
  return time12;
};

const getFormatDateValue = (str: string) => {
  return str.length === 2 ? str : "0" + str;
};

const getInspectionNotes = (notes: InspectionNote[]): Content => {
  return {
    stack: [
      getMainHeading("Inspection Notes"),
      {
        text: "At the time of this inspection, we note the following:",
      },
      {
        ol: notes,
      },
    ],
    marginBottom: 15,
  };
};

const getPurpose = (template: any): Content => {
  return {
    stack: [
      getMainHeading("Report Purpose"),
      {
        text: template.sections["Report Purpose"],
      },
    ],
    marginBottom: 15,
  };
};

const getGeneral = (template: any): Content => {
  return {
    stack: [
      getMainHeading("General"),
      {
        text: template.sections["General"],
      },
    ],
    marginBottom: 15,
  };
};

const getBuildingDefects = (template: any): Content => {
  return {
    stack: [
      getMainHeading("Schedule of Building Defects", "before"),
      {
        text: template.sections["Schedule of Building Defects"],
      },
    ],
    marginBottom: 15,
  };
};

const getItemsTable = (inspectionItems: InspectionItem[]): Content => {
  const body = [];

  for (let i = 0; i < inspectionItems.length; i++) {
    const item = inspectionItems[i];

    const reportItem: Content = {
      pageBreak: i !== 0 && item.pageBreak ? "before" : undefined,
      stack: [
        {
          text: item.name,
          bold: true,
        },
        ...((typeof item.openingParagraph === "string"
          ? [{ text: item.openingParagraph }]
          : item.openingParagraph) as unknown as Content[]),
      ],
    };
    if (item.note) {
      reportItem.stack.push({
        text: `Note:- ${item.note}`,
      });
    }

    reportItem.stack.push(getImages(item.images!));

    reportItem.stack.push(
      ...((typeof item.closingParagraph === "string"
        ? [{ text: item.closingParagraph }]
        : item.closingParagraph) as unknown as Content[])
    );

    const serial: Content = {
      pageBreak: i !== 0 && item.pageBreak ? "before" : undefined,
      text: `${i + 1}`,
    };

    body.push([serial, reportItem]);
  }

  return {
    table: {
      widths: [20, "*"],
      body: body,
    },
    layout: {
      vLineWidth: function (i: number, node: ContentTable) {
        return i === 0 || i === node.table.widths!.length ? 1 : 0;
      },
      hLineColor: "#002060",
      vLineColor: "#002060",
      paddingTop: function (_i, _node) {
        return 5;
      },
    },
  };
};

const getImages = (itemImages: ItemImage[]): Content => {
  const imgStack: Content = [];

  const imgRow: Content = {
    columnGap: 5,
    columns: [],
    marginBottom: 5,
    marginTop: 5,
  };
  for (let i = 0; i < itemImages.length; i++) {
    const img = itemImages[i];

    if (i === itemImages.length - 1 && itemImages.length % 2 !== 0) {
      imgStack.push({
        image: img,
        width: 220,
        height: 200,
        alignment: "center",
        marginBottom: 5,
      });
      break;
    }

    imgRow.columns.push({
      image: img,
      width: 220,
      height: 220,
    });

    if (i % 2 !== 0) {
      imgStack.push({ ...imgRow });
      imgRow.columns = [];
    }
  }

  return imgStack;
};

const getResponsibility = (template: any): Content => {
  const resObj = template.sections["Builder’s Responsibility To Rectify"];

  const stack: Content = {
    stack: [getMainHeading("Builder’s Responsibility To Rectify", "before")],
  };
  for (const key in resObj) {
    stack.stack.push({
      stack: [
        {
          text: key,
          bold: true,
        },
        {
          text: resObj[key],
        },
      ],
      marginBottom: 3,
    });
  }

  return stack;
};

const getTandC = (template: any): Content => {
  return {
    stack: [
      getMainHeading(
        "Terms & Conditions for the Provision of this Report",
        "before"
      ),
      {
        ol: template.sections[
          "Terms & Conditions for the Provision of this Report"
        ],
        fontSize: 11,
      },
    ],
  };
};

const getReportSummary = (reportData: any): Content => {
  return {
    stack: [
      getMainHeading("Report Summary"),
      {
        text: [
          {
            text: "Total Items:   ",
            bold: true,
          },
          {
            text: reportData.inspectionItems.length.toString(),
          },
        ],
      },
      ...(reportData.recommendation && reportData.recommendation !== ""
        ? [
            {
              text: "Inspector Recommendations:",
              bold: true,
            },
            {
              text: reportData.recommendation,
            },
          ]
        : []),
    ],
    marginBottom: 15,
  };
};
