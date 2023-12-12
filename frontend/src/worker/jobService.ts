import { Db } from "../services/clientdb";
import { Job } from "../types";

export const getAllJobs = async () => {
  try {
    const allJobs = await Db.jobs.where('status').notEqual('');
    console.log(allJobs);
    // return allJobs;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getJobByJobNumber = async (jobNumber: string) => {
  try {
    const job = await Db.jobs.get(jobNumber);
    return job;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createNewJob = async (jobData: Job) => {
  try {
    const jobNumber = await Db.jobs.add({
      ...jobData,
      status: "Not started",
      jobNumber: jobData.jobNumber,
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
