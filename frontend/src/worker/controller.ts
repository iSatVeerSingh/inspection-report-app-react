import { RouteHandler } from "workbox-core";
import { createNewJob, getAllJobs, getJobByJobNumber } from "./jobs";

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

const getSuccessResponse = (data: any) => {
  const resData = {
    success: true,
    data: data,
  };

  return new Response(JSON.stringify(resData), {
    status: 200,
  });
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
