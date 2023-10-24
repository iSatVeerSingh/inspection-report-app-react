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
