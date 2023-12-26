export const ROOT = "/";
export const USERS = "/users";
export const LIBRARY_ITEM_CATEGORIES = "/library-item-categories";
export const LIBRARY_ITEMS = "/library-items";
export const LIBRARY_ITEM_VIEW = LIBRARY_ITEMS + "/:id";
export const NEW_LIBRARY_ITEM = LIBRARY_ITEMS + "/new";
export const INSPECTION_NOTES = "/inspection-notes";
export const JOBS = "/jobs";
export const JOBS_DETAILS = "/jobs/:jobNumber";
export const NEW_JOB = JOBS + "/new";
export const JOB_SUMMARY = JOBS_DETAILS + "/summary";
export const ADD_INSPECTION_NOTES = JOB_SUMMARY + "/add-notes";
export const ALL_ADDED_NOTES = JOB_SUMMARY + "/all-notes";
export const ADD_INSPECTION_ITEMS = JOB_SUMMARY + "/add-items";
export const ALL_ADDED_ITEMS = JOB_SUMMARY + "/all-items";
export const ITEM_PREVIEW = ALL_ADDED_ITEMS + "/:itemId";
export const REPORT_PREVIEW = JOB_SUMMARY + "/preview";
