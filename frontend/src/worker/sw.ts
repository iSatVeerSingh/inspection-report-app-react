import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import {
  addInspectionNoteByJobController,
  getInspectionNotesController,
  getJobCategoriesController,
  getJobsController,
  initInspectionNotesController,
  initJobCategoriesController,
  initJobsController,
  initLibraryItemCategoriesController,
  initLibraryItemsController,
  initUserController,
  startInspectionController,
} from "./controller";

declare let self: ServiceWorkerGlobalScope;

// // self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);
// clean old assets
cleanupOutdatedCaches();

// Install and setup the app and local database
// registerRoute(
//   ({ url }) => url.pathname === "/client/init-status",
//   initStatusController,
//   "GET"
// );

// Setup user in indexeddb
registerRoute(
  ({ url }) => url.pathname === "/client/init-user",
  initUserController,
  "POST"
);

// Init library item categories
registerRoute(
  ({ url }) => url.pathname === "/client/init-library-item-categories",
  initLibraryItemCategoriesController,
  "POST"
);

// Init library items
registerRoute(
  ({ url }) => url.pathname === "/client/init-library-items",
  initLibraryItemsController,
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

// Start new inspection
registerRoute(
  ({ url }) => url.pathname === "/client/jobs",
  startInspectionController,
  "PUT"
);

// Get Inspection Notes
registerRoute(
  ({ url }) => url.pathname === "/client/inspection-notes",
  getInspectionNotesController,
  "GET"
);

// Add Inspection note by job
registerRoute(
  ({ url }) => url.pathname === "/client/jobs/note",
  addInspectionNoteByJobController,
  "POST"
);

// // Get Library Item Category
// registerRoute(
//   ({ url }) => url.pathname === "/client/library-item-categories",
//   getLibraryItemCategoriesController,
//   "GET"
// );

// // Get Library items
// registerRoute(
//   ({ url }) => url.pathname === "/client/library-items",
//   getLibraryItemsController,
//   "GET"
// );

// // Create library items
// registerRoute(
//   ({ url }) => url.pathname === "/client/library-items",
//   createLibraryItemsController,
//   "POST"
// );

// // Update Library Items
// registerRoute(
//   ({ url }) => url.pathname === "/client/library-items",
//   updateLibraryItemsController,
//   "PUT"
// );

// // Delete Library Items
// registerRoute(
//   ({ url }) => url.pathname === "/client/library-items",
//   deleteLibraryItemController,
//   "DELETE"
// );

// // Create inspection notes
// registerRoute(
//   ({ url }) => url.pathname === "/client/inspection-notes",
//   createInspectionNotesController,
//   "POST"
// );

// // Update inspection notes
// registerRoute(
//   ({ url }) => url.pathname === "/client/inspection-notes",
//   editInspectionNotesController,
//   "PUT"
// );

// // Delete inspection items
// registerRoute(
//   ({ url }) => url.pathname === "/client/inspection-notes",
//   deleteInspectionNotesController,
//   "DELETE"
// );

// // Create new job
// registerRoute(
//   ({ url }) => url.pathname === "/client/jobs/new",
//   createJobController,
//   "POST"
// );

// // Inspection route

// // Get Inspection details and job summary
// registerRoute(
//   ({ url }) => url.pathname === "/client/inspection",
//   getJobInspectionSummaryController,
//   "GET"
// );

// // Delete inspection note by job
// registerRoute(
//   ({ url }) => url.pathname === "/client/inspection/note",
//   deleteInspectionNoteByJobController,
//   "PUT"
// );

// // Get LibIndex
// registerRoute(
//   ({ url }) => url.pathname === "/client/library-index",
//   getLibIndexController,
//   "GET"
// );
// registerRoute(
//   ({ url }) => url.pathname === "/client/inspections/notes",
//   addInspectionNotesController,
//   "PUT"
// );

// registerRoute(
//   ({ url }) => url.pathname === "/client/inspections/items",
//   addInspectionItemsController,
//   "POST"
// );
// registerRoute(
//   ({ url }) => url.pathname === "/client/inspections/items",
//   deleteInspectionItemsController,
//   "DELETE"
// );
// registerRoute(
//   ({ url }) => url.pathname === "/client/inspections/recommendation",
//   addRecommendationController,
//   "PUT"
// );

// registerRoute(
//   ({ url }) => url.pathname === "/client/inspections/generate-report",
//   generateReportController,
//   "POST"
// );

// registerRoute(
//   ({ url }) => url.pathname === "/client/library-notes",
//   getLibraryNotesController,
//   "GET"
// );

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) allowlist = [/^\/$/];
// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

self.skipWaiting();
clientsClaim();
