import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    target: "node14.16.0",
    minify: false,
    ssr: true,
    sourcemap: true,
    rollupOptions: {
      external: ["stream", "events", "node:events", "node:stream", "glob", "fs", "cwd", "path"],
      input: {
        server: "./server.tsx",
      },
      output: [
        {
          name: "server",
          dir: "./dist/server",
          entryFileNames: "[name].js",
          chunkFileNames: "[name]-[hash].js",
          format: "esm",
        },
      ],
    },
  },
  plugins: [react()],
});
