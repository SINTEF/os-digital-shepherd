import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },

  // Use environment variables for base and server configuration
  base: "/shepherd/",

  // Variables for running a devcontainer, shouldn't break host development
  server: {
    watch: {
      usePolling: true,
    },
    host: "0.0.0.0", // Host based on .env or default
    port: 5173,
  },
});
