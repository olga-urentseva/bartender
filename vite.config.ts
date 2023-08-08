/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [
    eslint({
      include: ["./src/**/*.ts", "./src/**/*.tsx"],
      exclude: [],
    }),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Bartender",
        description:
          "Application that helps you to make you a perfect cocktail",
        icons: [
          {
            src: "./src/assets/b-logo--72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "./src/assets/b-logo--128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "./src/assets/b-logo--168.png",
            sizes: "168x168",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vitest-setup.ts",
  },
} as import("vite").UserConfigExport); // Type assertion here

export default config;
