import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope;

// // self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);
// clean old assets
cleanupOutdatedCaches();

// Jobs Route
// self.addEventListener("install", e=> {
//   console.log(e)
//   postMessage("hello");
// })

// self.addEventListener("message", (e)=> {
//   console.log(e.data)
//   self.clients.matchAll({
//     includeUncontrolled: true,
//     type: "window",
//   }).then(clients => console.log(clients))
// })

registerRoute(
  ({ url }) => {
    return url.pathname === "/hello";
  },
  async () => {
    self.clients
      .matchAll({
        includeUncontrolled: true,
        type: "window",
      })
      .then((clients) => {
        clients[0].postMessage({
          type: "REPLY_COUNT",
          count: "hello satu form worker"
        });
      });
    return new Response(`hello`);
  }
);

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) allowlist = [/^\/$/];
// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

self.skipWaiting();
clientsClaim();
