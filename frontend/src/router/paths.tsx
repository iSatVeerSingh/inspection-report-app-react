export const ROOT = "/";
export const JOBS = "/jobs";
export const JOBS_DETAILS = "/jobs/:jobNumber";
export const NEW_JOB = JOBS + "/new"
export const JOB_SUMMARY = JOBS_DETAILS + "/:inspectionId";
export const ADD_INSPECTION_NOTES = JOB_SUMMARY + "/add-notes";
export const ADD_INSPECTION_ITEMS = JOB_SUMMARY + "/add-items";
export const ALL_ADDED_NOTES = JOB_SUMMARY + "/all-notes";
export const ALL_ADDED_ITEMS = JOB_SUMMARY + "/all-items";
export const ITEM_PREVIEW = ALL_ADDED_ITEMS + "/:itemId";
export const REPORT_PREVIEW  = JOB_SUMMARY + "/preview";
export const LIBRARY_ITEMS = "/library-items"
export const LIBRARY_ITEM_VIEW_EDIT = LIBRARY_ITEMS + "/:itemId"
export const NEW_LIBRARY_ITEM = LIBRARY_ITEMS + "/new"
export const USERS = '/users'
