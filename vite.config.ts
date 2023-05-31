import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        dir: "./dist/client",
      },
    },
  },
  plugins: [react()],
});
