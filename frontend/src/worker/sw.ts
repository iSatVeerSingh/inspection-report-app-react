import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { getAllJobs, getJobByJobNumber } from "./jobs";
import { getInspectionById, startNewInspection } from "./inspection";

declare let self: ServiceWorkerGlobalScope;

// // self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);
// clean old assets
cleanupOutdatedCaches();

// Jobs routes
registerRoute(
  ({ url }) => url.pathname === "/client/jobs",
  async ({ url }) => {
    if (url.searchParams.size === 0) {
      const allJobs = await getAllJobs();
      if (allJobs) {
        return new Response(JSON.stringify(allJobs));
      }

      return new Response(JSON.stringify({ message: "No Jobs Found" }));
    }
    const jobNumber = url.searchParams.get("jobNumber");
    if (jobNumber && jobNumber !== "") {
      const job = await getJobByJobNumber(Number(jobNumber));
      if (job) {
        return new Response(JSON.stringify(job));
      }
      return new Response(
        JSON.stringify({ message: "Job not found for that job number" })
      );
    }
    return new Response("some thing went wrong");
  }
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

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) allowlist = [/^\/$/];
// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

self.skipWaiting();
clientsClaim();
