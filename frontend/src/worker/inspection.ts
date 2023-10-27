import { Db } from "../services/clientdb";
import { Job } from "../utils/types";

export const startNewInspection = async (jobData: Job) => {
  try {
    const trs = await Db.transaction(
      "rw",
      Db.inspectionReports,
      Db.jobs,
      async () => {
        const newReport = {
          ...jobData,
          id: Date.now().toString(36),
          inspectionStart: new Date(),
          status: "inprogress",
          inspectionNotes: [],
          inspectionItems: [],
        };

        const reportId = await Db.inspectionReports.add(newReport);
        if (reportId !== null) {
          const success = await Db.jobs.update(jobData.jobNumber, {
            status: "inprogress",
            inspectionId: reportId,
          });
          if (success !== null) {
            return reportId;
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
    if (!inspection) {
      return null;
    }
    return inspection;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const addInspectionNotes = async (notes: any[], id: string) => {
  try {
    const insId = await Db.inspectionReports.update(id, {
      inspectionNotes: notes,
    });
    if (!insId) {
      return null;
    }
    return insId;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const addInspectionItem = async (itemData: FormData, id: string) => {
  const itemCategory = itemData.get("category");
  const itemName = itemData.get("itemName");
  const itemNote = itemData.get("itemNote");
  const itemImages = itemData.getAll("itemImages") as unknown as File[];

  const resizedImages = await getResizedBase64Images(itemImages);

  const newInspectionItem = {
    category: itemCategory,
    itemName,
    itemNote,
    itemImages: resizedImages,
  };

  const insId = await Db.inspectionReports
    .where("id")
    .equals(id)
    .modify((report) => {
      report.inspectionItems.push(newInspectionItem);
    });

  return insId;
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
