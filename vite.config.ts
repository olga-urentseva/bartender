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
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Bart-t-tender",
        short_name: "Bart-t-tender",
        description:
          "Application that helps you to make you a perfect cocktail",
        start_url: "/",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icon-72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icon-76.png",
            sizes: "76x76",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
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
} as import("vite").UserConfigExport);

export default config;
