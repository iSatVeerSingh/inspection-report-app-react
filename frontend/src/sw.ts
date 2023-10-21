import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope;

const getItemsData = async () => {
  try {
    console.log("hello")
  } catch (err) {
    console.log(err);
    return null;
  }
};

// // self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);
self.addEventListener("install", (e) => {
  console.log("Plese wait while sw intalling");
  e.waitUntil(getItemsData());
});
// clean old assets
cleanupOutdatedCaches();

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) allowlist = [/^\/$/];
// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

self.skipWaiting();
clientsClaim();
