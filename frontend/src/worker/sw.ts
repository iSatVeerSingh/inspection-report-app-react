import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";

import {
  addInspectionItemsController,
  addInspectionNoteByJobController,
  addInspectionNotesController,
  addRecommendationController,
  createInspectionNotesController,
  createJobController,
  createLibraryItemsController,
  deleteInspectionItemsController,
  deleteInspectionNotesController,
  deleteLibraryItemController,
  editInspectionNotesController,
  generateReportController,
  getInspectionNotesController,
  getJobCategoriesController,
  getJobInspectionSummaryController,
  getJobsController,
  getLibIndexController,
  getLibraryItemCategoriesController,
  getLibraryItemsController,
  getLibraryNotesController,
  initInspectionNotesController,
  initJobCategoriesController,
  initJobsController,
  initLibraryItemCategoriesController,
  initLibraryItemsController,
  initStatusController,
  initUserController,
  startInspectionController,
  updateLibraryItemsController,
} from "./controller";

declare let self: ServiceWorkerGlobalScope;

// // self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);
// clean old assets
cleanupOutdatedCaches();

//Init route
registerRoute(
  ({ url }) => url.pathname === "/client/init-status",
  initStatusController,
  "GET"
);
// Init User
registerRoute(
  ({ url }) => url.pathname === "/client/init-user",
  initUserController,
  "POST"
);

// Init library items
registerRoute(
  ({ url }) => url.pathname === "/client/init-library-items",
  initLibraryItemsController,
  "POST"
);

// Init library item categories
registerRoute(
  ({ url }) => url.pathname === "/client/init-library-item-categories",
  initLibraryItemCategoriesController,
  "POST"
);

// Init inspection notes
registerRoute(
  ({ url }) => url.pathname === "/client/init-inspection-notes",
  initInspectionNotesController,
  "POST"
);

// Init jobs
registerRoute(
  ({ url }) => url.pathname === "/client/init-jobs",
  initJobsController,
  "POST"
);

// Init job categories
registerRoute(
  ({ url }) => url.pathname === "/client/init-job-categories",
  initJobCategoriesController,
  "POST"
);

// Get Library Item Category
registerRoute(
  ({ url }) => url.pathname === "/client/library-item-categories",
  getLibraryItemCategoriesController,
  "GET"
);

// Get Library items
registerRoute(
  ({ url }) => url.pathname === "/client/library-items",
  getLibraryItemsController,
  "GET"
);

// Create library items
registerRoute(
  ({ url }) => url.pathname === "/client/library-items",
  createLibraryItemsController,
  "POST"
);

// Update Library Items
registerRoute(
  ({ url }) => url.pathname === "/client/library-items",
  updateLibraryItemsController,
  "PUT"
);

// Delete Library Items
registerRoute(
  ({ url }) => url.pathname === "/client/library-items",
  deleteLibraryItemController,
  "DELETE"
);

// Get Inspection Notes
registerRoute(
  ({ url }) => url.pathname === "/client/inspection-notes",
  getInspectionNotesController,
  "GET"
);

// Create inspection notes
registerRoute(
  ({ url }) => url.pathname === "/client/inspection-notes",
  createInspectionNotesController,
  "POST"
);

// Update inspection notes
registerRoute(
  ({ url }) => url.pathname === "/client/inspection-notes",
  editInspectionNotesController,
  "PUT"
);

// Delete inspection items
registerRoute(
  ({ url }) => url.pathname === "/client/inspection-notes",
  deleteInspectionNotesController,
  "DELETE"
);

// Get Job categories
registerRoute(
  ({ url }) => url.pathname === "/client/job-categories",
  getJobCategoriesController,
  "GET"
);

// Get jobs
registerRoute(
  ({ url }) => url.pathname === "/client/jobs",
  getJobsController,
  "GET"
);

// Create new job
registerRoute(
  ({ url }) => url.pathname === "/client/jobs/new",
  createJobController,
  "POST"
);

// Inspection route
// Start new inspection
registerRoute(
  ({ url }) => url.pathname === "/client/jobs",
  startInspectionController,
  "PUT"
);

// Get Inspection details and job summary
registerRoute(
  ({ url }) => url.pathname === "/client/inspection",
  getJobInspectionSummaryController,
  "GET"
);

// Add Inspection note by job
registerRoute(
  ({ url }) => url.pathname === "/client/inspection/note",
  addInspectionNoteByJobController,
  "POST"
);

// registerRoute(
//   ({ url }) => url.pathname === "/client/inspections",
//   createInspectionController,
//   "POST"
// );
registerRoute(
  ({ url }) => url.pathname === "/client/library-index",
  getLibIndexController,
  "GET"
);
registerRoute(
  ({ url }) => url.pathname === "/client/inspections/notes",
  addInspectionNotesController,
  "PUT"
);

registerRoute(
  ({ url }) => url.pathname === "/client/inspections/items",
  addInspectionItemsController,
  "POST"
);
registerRoute(
  ({ url }) => url.pathname === "/client/inspections/items",
  deleteInspectionItemsController,
  "DELETE"
);
registerRoute(
  ({ url }) => url.pathname === "/client/inspections/recommendation",
  addRecommendationController,
  "PUT"
);

registerRoute(
  ({ url }) => url.pathname === "/client/inspections/generate-report",
  generateReportController,
  "POST"
);

registerRoute(
  ({ url }) => url.pathname === "/client/library-notes",
  getLibraryNotesController,
  "GET"
);

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) allowlist = [/^\/$/];
// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

self.skipWaiting();
clientsClaim();
