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
  getJobsController,
  getLibIndexController,
} from "./controller";

declare let self: ServiceWorkerGlobalScope;

// // self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);
// clean old assets
cleanupOutdatedCaches();

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
  ({ url }) => url.pathname === "/client/inspection/new",
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

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) allowlist = [/^\/$/];
// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

self.skipWaiting();
clientsClaim();
