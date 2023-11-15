import { Db } from "../services/clientdb";
import { JobDetails } from "../types";

export const getAllJobs = async () => {
  try {
    const allJobs = await Db.jobs.toArray();
    return allJobs;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getJobByJobNumber = async (jobNumber: number) => {
  try {
    const job = await Db.jobs.get(jobNumber);
    return job;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createNewJob = async (jobData: JobDetails) => {
  try {
    const jobNumber = await Db.jobs.add({
      ...jobData,
      created: new Date(),
      status: "Not started",
      jobNumber: Number(jobData.jobNumber),
    });
    return jobNumber;
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

export const getLibIndex = async () => {
  try {
    const allLibs = await Db.libraryIndex.toArray();
    return allLibs;
  } catch (err) {
    console.log(err);
    return null;
  }
};
