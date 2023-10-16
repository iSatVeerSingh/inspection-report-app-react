import { precacheAndRoute } from "workbox-precaching/precacheAndRoute";

// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox-webpack-plugin with the list of dependecies to be cached
precacheAndRoute(self.__WB_MANIFEST)