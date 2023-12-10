import { RouteHandler } from "workbox-core";
import {
  createNewJob,
  getAllJobs,
  getJobByJobNumber,
  getLibIndex,
} from "./jobs";
import {
  addInspectionItem,
  addInspectionNotes,
  addRecommendation,
  deleteInspectionItem,
  getAllInspections,
  getInspectionById,
  getLibraryNotes,
  getPdf,
  startNewInspection,
} from "./inspection";
import Dexie from "dexie";
import { Db, UserDB } from "../services/clientdb";
import { LibraryItem } from "../types";

// check init status
export const initStatusController: RouteHandler = async () => {
  try {
    const isExists = await Dexie.exists("inspection-db");
    if (!isExists) {
      return getSuccessResponse({ message: "Not Started" });
    }
    const count = await Db.libraryItems.count();
    if (count === 0) {
      return getSuccessResponse({ message: "Pending" });
    }
    return getSuccessResponse({ message: "Done" });
  } catch (err) {
    return getSuccessResponse({ message: "Not Started" });
  }
};

// init user database
export const initUserController: RouteHandler = async ({ request }) => {
  const userData = await request.json();

  if (!userData) {
    return getBadRequestResponse();
  }

  try {
    await UserDB.user.clear();
    const user = await UserDB.user.add({ user: "user", ...userData });
    if (!user) {
      return getBadRequestResponse();
    }
    return getSuccessResponse({ message: "User added to indexeddb" });
  } catch (err) {
    console.log(err);
    return getBadRequestResponse();
  }
};

// init library items
export const initLibraryItemsController: RouteHandler = async ({ request }) => {
  const allItems = (await request.json()) as LibraryItem[];
  if (!allItems) {
    return getBadRequestResponse();
  }

  try {
    await Db.libraryItems.bulkAdd(allItems);
    const libIndexitems = allItems.map((item) => ({
      id: item.id,
      category_id: item.category_id,
      name: item.name,
    }));

    await Db.libraryIndex.bulkAdd(libIndexitems);
    return getSuccessResponse({ message: "Items added successfully" });
  } catch (err) {
    return getBadRequestResponse();
  }
};

// init library item categories
export const initLibraryItemCategoriesController: RouteHandler = async ({
  request,
}) => {
  const allCategories = await request.json();
  if (!allCategories) {
    return getBadRequestResponse();
  }
  try {
    await Db.libraryItemCategories.bulkAdd(allCategories);
    return getSuccessResponse({ message: "Categories added successfully" });
  } catch (err) {
    return getBadRequestResponse();
  }
};

// init library inspection notes
export const initInspectionNotesController: RouteHandler = async ({
  request,
}) => {
  const allInspectionNotes = await request.json();
  if (!allInspectionNotes) {
    return getBadRequestResponse();
  }
  try {
    await Db.inspectionNotes.bulkAdd(allInspectionNotes);
    return getSuccessResponse({
      message: "Inspection notes added successfully",
    });
  } catch (err) {
    return getBadRequestResponse();
  }
};

// init jobs
export const initJobsController: RouteHandler = async ({ request }) => {
  const jobs = await request.json();
  if (!jobs) {
    return getBadRequestResponse();
  }
  try {
    await Db.jobs.bulkAdd(jobs);
    return getSuccessResponse({
      message: "Jobs added successfully added successfully",
    });
  } catch (err) {
    return getBadRequestResponse();
  }
};

export const getJobsController: RouteHandler = async ({ url }) => {
  if (url.searchParams.size === 0) {
    const jobs = await getAllJobs();
    if (!jobs) {
      return getBadRequestResponse("Something went wrong");
    }
    return getSuccessResponse(jobs);
  }

  const jobNumber = url.searchParams.get("jobNumber");
  if (!jobNumber || jobNumber === "") {
    return getBadRequestResponse();
  }

  const job = await getJobByJobNumber(jobNumber);
  if (!job) {
    return getNotFoundResponse();
  }

  return getSuccessResponse(job);
};

export const createJobController: RouteHandler = async ({ request }) => {
  const body = await request.json();
  if (!body) {
    return getBadRequestResponse();
  }

  const jobNumber: any = await createNewJob(body);
  if (jobNumber.error === "DuplicateKey") {
    return getBadRequestResponse("Job Already Exists.");
  }
  if (!jobNumber) {
    return getBadRequestResponse();
  }
  return getSuccessResponse(jobNumber, 201);
};

export const createInspectionController: RouteHandler = async ({ request }) => {
  const body = await request.json();
  if (!body) {
    return getBadRequestResponse();
  }
  const inspectionId: any = await startNewInspection(body);
  if (inspectionId.error === "DuplicateKey") {
    return getBadRequestResponse("Inspection already started for this job");
  }
  if (!inspectionId) {
    return getBadRequestResponse();
  }
  return getSuccessResponse(inspectionId, 201);
};

export const getInspectionsController: RouteHandler = async ({ url }) => {
  if (url.searchParams.size === 0) {
    const inspections = await getAllInspections();
    if (!inspections) {
      return getBadRequestResponse();
    }
    return getSuccessResponse(inspections);
  }

  const inspectionId = url.searchParams.get("inspectionId");
  if (!inspectionId || inspectionId === "") {
    return getBadRequestResponse();
  }
  const inspection = await getInspectionById(parseInt(inspectionId));
  if (!inspection) {
    return getNotFoundResponse();
  }
  return getSuccessResponse(inspection);
};

export const getLibIndexController = async () => {
  const libs = await getLibIndex();
  if (!libs || libs.length === 0) {
    return getBadRequestResponse();
  }
  return getSuccessResponse(libs);
};

export const addInspectionNotesController: RouteHandler = async ({
  url,
  request,
}) => {
  const id = url.searchParams.get("inspectionId");
  if (!id || id === "") {
    return getBadRequestResponse();
  }

  const body = await request.json();
  if (!body) {
    return getBadRequestResponse();
  }

  const inspectionId = await addInspectionNotes(
    body.inspectionNotes,
    parseInt(id)
  );
  if (!inspectionId) {
    return getBadRequestResponse();
  }
  return getSuccessResponse(inspectionId);
};

const getSuccessResponse = (data: any, status?: number) => {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addInspectionItemsController: RouteHandler = async ({
  url,
  request,
}) => {
  const inspectionId = url.searchParams.get("inspectionId");
  if (!inspectionId || inspectionId === "") {
    return getBadRequestResponse();
  }

  const itemData = await request.formData();
  if (!itemData) {
    return getBadRequestResponse();
  }

  const inspection = await addInspectionItem(itemData, inspectionId);
  if (!inspection) {
    return getBadRequestResponse();
  }
  return getSuccessResponse(inspection, 201);
};

export const deleteInspectionItemsController: RouteHandler = async ({
  url,
}) => {
  const inspectionId = url.searchParams.get("inspectionId");
  if (!inspectionId || inspectionId === "") {
    return getBadRequestResponse();
  }

  const itemId = url.searchParams.get("itemId");
  if (!itemId || itemId === "") {
    return getBadRequestResponse();
  }

  const inspection = await deleteInspectionItem(itemId, inspectionId);
  if (!inspection) {
    return getBadRequestResponse();
  }
  return getSuccessResponse(inspection);
};

export const addRecommendationController: RouteHandler = async ({
  url,
  request,
}) => {
  const inspectionId = url.searchParams.get("inspectionId");
  if (!inspectionId || inspectionId === "") {
    return getBadRequestResponse();
  }

  const body = await request.json();
  if (!body) {
    return getBadRequestResponse();
  }
  const inspection = await addRecommendation(body.recommendation, inspectionId);
  if (!inspection) {
    return getBadRequestResponse();
  }
  return getSuccessResponse(inspection);
};

const getNotFoundResponse = () => {
  return new Response(
    JSON.stringify({
      message: "Resource Not Found",
    }),
    {
      status: 404,
    }
  );
};

const getBadRequestResponse = (message?: string) => {
  return new Response(
    JSON.stringify({
      message: message || "Invalid request",
    }),
    {
      status: 400,
    }
  );
};

export const generateReportController: RouteHandler = async ({
  url,
  request,
}) => {
  const inspectionId = url.searchParams.get("inspectionId");
  if (!inspectionId || inspectionId === "") {
    return getBadRequestResponse();
  }

  const body = await request.json();
  if (!body) {
    return getBadRequestResponse();
  }

  const reportData = await getPdf(body.items, inspectionId);
  if (!reportData) {
    return getBadRequestResponse();
  }
  return getSuccessResponse(reportData);
};

export const getLibraryNotesController: RouteHandler = async () => {
  const libraryNotes = await getLibraryNotes();
  if (!libraryNotes) {
    return getBadRequestResponse();
  }

  return getSuccessResponse(libraryNotes);
};
