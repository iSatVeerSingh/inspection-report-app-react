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
  deleteInspectionItems,
  getAllInspections,
  getInspectionById,
  getPdf,
  startNewInspection,
} from "./inspection";

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

  const job = await getJobByJobNumber(parseInt(jobNumber));
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
  const inspection = await getInspectionById(inspectionId);
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

  const inspectionId = await addInspectionNotes(body.inspectionNotes, id);
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

  const inspection = await deleteInspectionItems(
    body.inspectionItems as string[],
    inspectionId
  );
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
