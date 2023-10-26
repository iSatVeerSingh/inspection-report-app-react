import { RouteHandler } from "workbox-core";
import { getAllJobs, getJobByJobNumber } from "./jobs";

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

const getBadRequestResponse = () => {
  const resData = {
    success: false,
    data: "Invalid request",
  };

  return new Response(JSON.stringify(resData), {
    status: 400,
  });
};
