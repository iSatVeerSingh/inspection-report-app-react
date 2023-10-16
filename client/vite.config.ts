import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaConfig: VitePWAOptions = {
  injectRegister: null,
  manifest: {
    name: "Inspection Report App",
    short_name: "Inspection App",
    description: "Inspection Report App for Correct Inspections, Australia",
    theme_color: "#ffffff",
    icons: [
      {
        src: "logo512.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        src: "logo192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
  },
  strategies: "injectManifest",
  registerType: "autoUpdate",
  srcDir: "src/workers",
  filename: "sw.ts",
  devOptions: {
    enabled: true,
    type: "module",
  },
  minify: false,
  workbox: undefined,
  injectManifest: undefined,
  includeAssets: "",
  includeManifestIcons: false,
  disable: false,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaConfig)],
  worker: {
    format: "es",
    rollupOptions: {
      output: {
        file: "worker.js",
      },
    },
  },
});
