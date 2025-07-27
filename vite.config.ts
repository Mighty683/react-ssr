import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": {
      NODE_ENV: "development",
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: ["./src/entry-client.ts"],
      name: "VueMicrofrontend",
      formats: ["es"],
    },
  },
  plugins: [vue()],
});
