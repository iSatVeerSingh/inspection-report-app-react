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
  deleteInspectionItems,
  getAllInspections,
  getInspectionById,
  startNewInspection,
} from "./inspection";
import { json } from "stream/consumers";

export const getJobsController: RouteHandler = async ({ url }) => {
  if (url.searchParams.size === 0) {
    const jobs = await getAllJobs();
    if (jobs && jobs.length !== 0) {
      return getSuccessResponse(jobs);
    }
    return getNotFoundResponse();
  }

  const jobNumber = url.searchParams.get("jobNumber");
  if (jobNumber && jobNumber !== "") {
    const job = await getJobByJobNumber(Number(jobNumber));
    if (job) {
      return getSuccessResponse(job);
    }
    return getNotFoundResponse();
  }

  return getBadRequestResponse();
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
  return getSuccessResponse(jobNumber);
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
  return getSuccessResponse(inspectionId);
};

export const getInspectionsController: RouteHandler = async ({ url }) => {
  if (url.searchParams.size === 0) {
    const inspections = await getAllInspections();
    if (!inspections || inspections.length === 0) {
      return getNotFoundResponse();
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

const getSuccessResponse = (data: any) => {
  const resData = {
    success: true,
    data: data,
  };

  return new Response(JSON.stringify(resData), {
    status: 200,
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
  return getSuccessResponse(inspection);
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

const getNotFoundResponse = () => {
  const resData = {
    success: false,
    data: "Resource not found",
  };

  return new Response(JSON.stringify(resData), {
    status: 404,
  });
};

const getBadRequestResponse = (message?: string) => {
  const resData = {
    success: false,
    data: message || "Invalid request",
  };

  return new Response(JSON.stringify(resData), {
    status: 400,
  });
};
