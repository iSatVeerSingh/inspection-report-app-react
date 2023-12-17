import { RouteHandler } from "workbox-core";
import { createNewJob, getLibIndex } from "./jobService";
import {
  addInspectionItem,
  addInspectionNotes,
  addRecommendation,
  deleteInspectionItem,
  getAllInspections,
  getInspectionById,
  getLibraryNotes,
  getPdf,
} from "./inspection";
import Dexie from "dexie";
import { Db, UserDB } from "../services/clientdb";
import { Inspection, Job, JobStatus, LibraryItem } from "../types";

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

// init jobCategories
export const initJobCategoriesController: RouteHandler = async ({
  request,
}) => {
  const jobCategories = await request.json();
  if (!jobCategories) {
    return getBadRequestResponse();
  }
  try {
    await Db.jobCategories.bulkAdd(jobCategories);
    return getSuccessResponse({ message: "Job Categories added successfully" });
  } catch (err) {
    return getBadRequestResponse();
  }
};

// Get Job categories
export const getJobCategoriesController: RouteHandler = async () => {
  try {
    const jobCategories = await Db.jobCategories.toArray();
    return getSuccessResponse(jobCategories);
  } catch (err) {
    return getBadRequestResponse();
  }
};

//get jobs
export const getJobsController: RouteHandler = async ({ url }) => {
  try {
    const jobNumber = url.searchParams.get("jobNumber");
    if (jobNumber) {
      const job = await Db.jobs.get(jobNumber);
      if (!job) {
        return getSuccessResponse(null);
      }
      return getSuccessResponse(job);
    }

    const query = url.searchParams;
    const page = query.get("page");
    const status = query.get("status");
    const category = query.get("category");
    const startsAt = query.get("startsAt");

    const dbQuery = {
      status: status || "Work Order",
      ...(category ? { category } : {}),
      ...(startsAt ? { startsAt } : {}),
    };

    const perPage = 6;
    const pageNumber = Number(page);
    const skip = pageNumber === 0 ? 0 : (pageNumber - 1) * perPage;
    const jobsCollection = Db.jobs.where(dbQuery);
    const total = await jobsCollection.count();
    const totalPages =
      total % perPage === 0 ? total / perPage : Math.floor(total / perPage) + 1;

    const jobs = await jobsCollection.offset(skip).limit(perPage).toArray();
    return getSuccessResponse({
      data: jobs,
      pages: totalPages,
      currentPage: pageNumber === 0 ? 1 : pageNumber,
    });
  } catch (err) {
    console.log(err);
    return getBadRequestResponse(err);
  }
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

// Start new inspection
export const startInspectionController: RouteHandler = async ({ url }) => {
  const jobNumber = url.searchParams.get("jobNumber");
  if (!jobNumber) {
    return getBadRequestResponse();
  }

  try {
    const isUpdated = await Db.jobs.update(jobNumber, {
      status: JobStatus.IN_PROGRESS,
    } as Partial<Job>);
    if (isUpdated === 0) {
      return getBadRequestResponse("Job Not Found");
    }
    return getSuccessResponse({ message: "Job updated successfully" });
  } catch (err) {
    return getBadRequestResponse(err);
  }
};

// Get Job / Inspection Summary
export const getJobInspectionSummaryController: RouteHandler = async ({
  url,
}) => {
  const jobNumber = url.searchParams.get("jobNumber");
  if (!jobNumber) {
    return getBadRequestResponse();
  }

  try {
    const trs = await Db.transaction(
      "rw",
      Db.jobs,
      Db.inspectionItems,
      async () => {
        const job = await Db.jobs.get(jobNumber);
        if (!job) {
          return getBadRequestResponse("No Job Found");
        }
        const inspectionItems = await Db.inspectionItems
          .where("job_id")
          .equals(job.id)
          .toArray();
        return {
          ...job,
          inspectionItems,
        } as Inspection;
      }
    );

    return getSuccessResponse(trs);
  } catch (err) {
    return getBadRequestResponse(err);
  }
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

const getBadRequestResponse = (message?: any) => {
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
