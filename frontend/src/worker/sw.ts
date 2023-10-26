import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import {
  addInspectionItem,
  addInspectionNotes,
  getInspectionById,
  startNewInspection,
} from "./inspection";
import { createJobController, getJobsController } from "./controller";

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
  async ({ request }) => {
    const job = await request.json();
    const report = await startNewInspection(job);
    return new Response(JSON.stringify({ message: report }));
  },
  "POST"
);

registerRoute(
  ({ url }) => url.pathname === "/client/inspection",
  async ({ url }) => {
    const id = url.searchParams.get("id");
    if (id) {
      const inspection = await getInspectionById(id);
      if (inspection) {
        return new Response(JSON.stringify(inspection));
      }
    }
    return new Response(JSON.stringify({ message: "Report not found" }));
  },
  "GET"
);

registerRoute(
  ({ url }) => url.pathname === "/client/inspection/notes",
  async ({ url, request }) => {
    const id = url.searchParams.get("id");
    if (id) {
      const body = await request.json();
      const insId = await addInspectionNotes(body.inspectionNotes, id);
      if (insId) {
        return new Response(JSON.stringify({ message: insId }));
      }
    }
    return new Response(
      JSON.stringify({ message: "Couldn't add inspection note for " + id })
    );
  },
  "PUT"
);

registerRoute(
  ({ url }) => url.pathname === "/client/inspection/items",
  async ({ url, request }) => {
    const id = url.searchParams.get("id");
    if (id) {
      const body = await request.formData();
      const insId = await addInspectionItem(body, id);
      if (insId) {
        return new Response(JSON.stringify({ message: insId }));
      }
    }
    return new Response("Couldn't add inspection note for " + id);
  },
  "PUT"
);

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) allowlist = [/^\/$/];
// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

self.skipWaiting();
clientsClaim();
