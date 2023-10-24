import { Db } from "../services/clientdb";
import { Job } from "../utils/types";

export const startNewInspection = async (jobData: Job) => {
  try {
    const newReport: any = { ...jobData };
    newReport.id = Date.now().toString(36);
    newReport.status = "inprogress";
    newReport.inspectionStart = new Date();
    newReport.inspectionNotes = [];
    newReport.inspectionItems = [];

    const reportId = await Db.inspectionReports.add(newReport);
    if (reportId) {
      const job = await Db.jobs.get(jobData.jobNumber);
      if (job) {
        job.status = "inprogress";
        const success = await Db.jobs.put(job, job.jobNumber);
        if (success) {
          return reportId;
        }
      }
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
