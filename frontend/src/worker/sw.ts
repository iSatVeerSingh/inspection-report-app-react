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
  createInspectionController,
  createJobController,
  deleteInspectionItemsController,
  generateReportController,
  getInspectionsController,
  getJobCategoriesController,
  getJobsController,
  getLibIndexController,
  getLibraryNotesController,
  initInspectionNotesController,
  initJobCategoriesController,
  initJobsController,
  initLibraryItemCategoriesController,
  initLibraryItemsController,
  initStatusController,
  initUserController,
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
registerRoute(
  ({ url }) => url.pathname === "/client/init-user",
  initUserController,
  "POST"
);

registerRoute(
  ({ url }) => url.pathname === "/client/init-library-items",
  initLibraryItemsController,
  "POST"
);
registerRoute(
  ({ url }) => url.pathname === "/client/init-library-item-categories",
  initLibraryItemCategoriesController,
  "POST"
);
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

registerRoute(
  ({ url }) => url.pathname === "/client/inspections/new",
  createInspectionController,
  "POST"
);
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
