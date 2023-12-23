import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";

import {
  addInspectionItemsController,
  addInspectionNotesController,
  addRecommendationController,
  createInspectionNotesController,
  createJobController,
  createLibraryItemsController,
  deleteInspectionItemsController,
  deleteLibraryItemController,
  generateReportController,
  getInspectionNotesController,
  getInspectionsController,
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
// Init user
registerRoute(
  ({ url }) => url.pathname === "/client/init-user",
  initUserController,
  "POST"
);

// init library items
registerRoute(
  ({ url }) => url.pathname === "/client/init-library-items",
  initLibraryItemsController,
  "POST"
);

// init library items categories
registerRoute(
  ({ url }) => url.pathname === "/client/init-library-item-categories",
  initLibraryItemCategoriesController,
  "POST"
);

// init inspection notes
registerRoute(
  ({ url }) => url.pathname === "/client/init-inspection-notes",
  initInspectionNotesController,
  "POST"
);
registerRoute(
  ({ url }) => url.pathname === "/client/init-jobs",
  initJobsController,
  "POST"
);
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

// create inspection notes
registerRoute(
  ({ url }) => url.pathname === "/client/inspection-notes",
  createInspectionNotesController,
  "POST"
);

// Job categories
registerRoute(
  ({ url }) => url.pathname === "/client/job-categories",
  getJobCategoriesController,
  "GET"
);

// Jobs routes

registerRoute(
  ({ url }) => url.pathname === "/client/jobs",
  getJobsController,
  "GET"
);

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

// get inspection job summary
registerRoute(
  ({ url }) => url.pathname === "/client/inspection",
  getJobInspectionSummaryController,
  "GET"
);

// registerRoute(
//   ({ url }) => url.pathname === "/client/inspections",
//   createInspectionController,
//   "POST"
// );
registerRoute(
  ({ url }) => url.pathname === "/client/inspections",
  getInspectionsController,
  "GET"
);
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
