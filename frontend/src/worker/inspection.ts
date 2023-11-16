import { Db } from "../services/clientdb";
import {
  Inspection,
  InspectionItem,
  InspectionNote,
  JobDetails,
} from "../types";
import { generatePdf } from "../utils/pdf";
import reportType from "../utils/reportType";

export const startNewInspection = async (jobData: JobDetails) => {
  try {
    const trs = await Db.transaction(
      "rw",
      Db.inspectionReports,
      Db.jobs,
      async () => {
        const newInspection: Inspection = {
          ...jobData,
          id: Date.now().toString(36),
          startedAt: new Date(),
          status: "In progress",
          category: reportType[jobData.jobType] || reportType.Other,
        };

        const inspectionId = await Db.inspectionReports.add(newInspection);
        if (inspectionId !== null) {
          const success = await Db.jobs.update(jobData.jobNumber, {
            status: "In progress",
            inspection: inspectionId,
          } as Partial<JobDetails>);
          if (success !== null) {
            return inspectionId;
          }
        }
        return null;
      }
    );

    return trs;
  } catch (err: any) {
    if (
      err.name === "ConstraintError" &&
      err.message.includes("Key already exists in the object store")
    ) {
      return {
        error: "DuplicateKey",
      };
    }
    return null;
  }
};

export const getAllInspections = async () => {
  try {
    const inspections = await Db.inspectionReports.toArray();
    return inspections;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getInspectionById = async (id: string) => {
  try {
    const inspection = await Db.inspectionReports.get(id);
    return inspection;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const addInspectionNotes = async (
  notes: InspectionNote[],
  id: string
) => {
  try {
    const insId = await Db.inspectionReports.update(id, {
      inspectionNotes: notes,
    } as Inspection);
    return insId;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const addInspectionItem = async (itemData: FormData, id: string) => {
  const itemName = itemData.get("itemName");
  const custom = itemData.get("custom");
  const type = itemData.get("type");
  const itemNote = itemData.get("itemNote");
  const itemImages = itemData.getAll("itemImages") as unknown as
    | string[]
    | File[];

  const embeddedImage = itemData.get("embeddedImage");
  const itemSummary = itemData.get("itemSummary");
  const openingParagraph = itemData.get("openingParagraph");
  const closingParagraph = itemData.get("closingParagraph");

  let resizedImages: any;
  if (type === "resized") {
    resizedImages = itemImages;
  } else {
    resizedImages = await getResizedBase64Images(itemImages as File[]);
  }

  if (custom === "custom") {
    try {
      const newInspectionItem: InspectionItem = {
        id: Date.now().toString(36),
        name: itemName as string,
        category: "Custom Item",
        images: resizedImages,
        summary: (itemSummary as string) || undefined,
        openingParagraph: openingParagraph as string,
        embeddedImage: (embeddedImage as string) || undefined,
        closingParagraph: closingParagraph as string,
      };

      const inspectionid = await Db.inspectionReports
        .where("id")
        .equals(id)
        .modify((inspection) => {
          if (!inspection.inspectionItems) {
            inspection.inspectionItems = [newInspectionItem];
          } else {
            inspection.inspectionItems.push(newInspectionItem);
          }
        });

      return inspectionid;
    } catch (err) {
      return null;
    }
  }

  const libraryId = itemData.get("libraryId") as string;

  try {
    const trs = Db.transaction(
      "rw",
      Db.libraryItems,
      Db.inspectionReports,
      async () => {
        const libraryItem = await Db.libraryItems.get(parseInt(libraryId));
        if (!libraryItem) {
          return null;
        }

        const newInspectionItem: InspectionItem = {
          ...libraryItem,
          images: resizedImages,
          note: (itemNote as string) || undefined,
          id: Date.now().toString(36),
        };

        const inspectionid = await Db.inspectionReports
          .where("id")
          .equals(id)
          .modify((inspection) => {
            if (!inspection.inspectionItems) {
              inspection.inspectionItems = [newInspectionItem];
            } else {
              inspection.inspectionItems.push(newInspectionItem);
            }
          });
        return inspectionid;
      }
    );
    return trs;
  } catch (err: any) {
    if (
      err.name === "ConstraintError" &&
      err.message.includes("Key already exists in the object store")
    ) {
      return {
        error: "DuplicateKey",
      };
    }
    return null;
  }
};

export const getResizedBase64Images = async (itemImages: File[]) => {
  const imagePromises = [];

  for (let i = 0; i < itemImages.length; i++) {
    const imgFile = itemImages[i];
    const imgBitmap = await createImageBitmap(imgFile);

    if (imgBitmap.width > 300 || imgBitmap.height > 300) {
      const promiseImg = getResizedImage(imgBitmap);
      imagePromises.push(promiseImg);
    } else {
      const promiseImg = getBase64(imgFile);
      imagePromises.push(promiseImg);
    }
  }

  return Promise.all(imagePromises);
};

const getResizedImage = async (imgBitmap: ImageBitmap) => {
  const { width, height } = imgBitmap;
  const maxwidth = 300;
  const scaleSize = maxwidth / width;
  const maxheight = height * scaleSize;

  const canvas = new OffscreenCanvas(maxwidth, maxheight);
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(imgBitmap, 0, 0, canvas.width, canvas.height);

  const imgBlob = await ctx.canvas.convertToBlob({
    quality: 0.9,
    type: "image/jpeg",
  });

  const base64img = await getBase64(imgBlob);
  return base64img;
};

const getBase64 = async (imgBlob: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgBlob);
    reader.addEventListener("load", (e) => {
      resolve(e.target?.result);
    });
  });
};

export const deleteInspectionItem = async (itemId: string, id: string) => {
  try {
    const success = Db.inspectionReports
      .where("id")
      .equals(id)
      .modify((inspection) => {
        inspection.inspectionItems = inspection.inspectionItems?.filter(
          (item) => item.id !== itemId
        );
      });
    return success;
  } catch (err: any) {
    return null;
  }
};

export const addRecommendation = async (recommendation: string, id: string) => {
  try {
    const inspectionid = await Db.inspectionReports.update(id, {
      recommendation,
    });
    return inspectionid;
  } catch (err) {
    return null;
  }
};

export const getPdf = async (itemsHeights: any[], id: string) => {
  try {
    const trs = await Db.transaction(
      "rw",
      Db.inspectionReports,
      Db.template,
      async () => {
        const inspection = await Db.inspectionReports.get(id);
        const template = await Db.template.get("defaultTemplate");
        if (inspection && template) {
          return { inspection, template };
        }
        return null;
      }
    );

    if (!trs) {
      return null;
    }

    const { inspection, template } = trs;

    inspection.inspectionItems = itemsHeights.map((height: any) => {
      const inspectionItem = inspection.inspectionItems?.find(
        (item) => item.id === height.id
      );
      inspectionItem!.pageBreak = height.pageBreak;
      return inspectionItem!;
    });

    const pdfUrl = await generatePdf(inspection, template);

    return pdfUrl;
  } catch (err) {
    return null;
  }
};
