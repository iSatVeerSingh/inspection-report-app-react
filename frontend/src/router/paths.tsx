export const ROOT = "/";
export const JOBS = "/jobs";
export const JOBS_DETAILS = "/jobs/:jobNumber";
export const CUSTOM_JOB = JOBS + "/custom-job";
export const JOB_SUMMARY = JOBS_DETAILS + "/:inspectionId";
export const ADD_INSPECTION_NOTES = JOB_SUMMARY + "/add-notes";
export const ADD_INSPECTION_ITEMS = JOB_SUMMARY + "/add-items";
export const ALL_ADDED_NOTES = JOB_SUMMARY + "/all-notes";
export const ALL_ADDED_ITEMS = JOB_SUMMARY + "/all-items";
export const ITEM_PREVIEW = ALL_ADDED_ITEMS + "/:item";
export const PREVIOUS_REPORT_ITEMS = JOBS_DETAILS + "/previous-report-items";
export const REPORTS = "/reports";
export const INSPECTION_NOTES = "/inspection-notes";
export const INSPECTION_ITEMS = "/inspection-items";
export const USERS = "/users";
export const SETTINGS = "/settings";
