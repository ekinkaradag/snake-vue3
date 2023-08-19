import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

process.env.VUE_APP_VERSION = process.env.npm_package_version;

export default defineConfig({
  base: "/snake-vue3/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
