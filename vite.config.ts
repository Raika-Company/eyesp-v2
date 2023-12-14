import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api-tehran": {
        target: "http://95.38.58.62:666/ping-status",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-tehran/, ""),
      },
      "/api-alborz": {
        target: "http://2.189.59.168:666/ping-status",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-alborz/, ""),
      },
      "/api-ahvaz": {
        target: "http://2.189.59.146:666/ping-status",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-ahvaz/, ""),
      },
    },
  },
  plugins: [react()],
});
