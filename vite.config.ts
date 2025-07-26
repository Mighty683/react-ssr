import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  define: {
    'process.env': {
      NODE_ENV: 'development',
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: [
        "./src/entry-client.tsx",
      ],
      name: "ReactMicrofrontend",
      fileName: () => "react-microfrontend.js",
    },
    rollupOptions: {
      output: {
        format: "system",
      },
    },
  },
  plugins: [react()],
});
