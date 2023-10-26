import { Db } from "../services/clientdb";

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

export const createNewJob = async (jobData: any) => {
  try {
    const jobNumber = await Db.jobs.add(jobData);
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
