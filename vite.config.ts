import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api-tehran": {
        target: "http://95.38.58.62:666/ping-status",
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api-tehran/, ""),
      },
      "/tehran-state": {
        target: "http://95.38.58.62:555/ping-status",
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/tehran-state/, ""),
      },

      "/api-alborz": {
        target: "http://2.189.59.168:666/ping-status",
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api-alborz/, ""),
      },
      "/alborz-state": {
        target: "http://2.189.59.168:555/ping-status",
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/alborz-state/, ""),
      },

      "/api-ahvaz": {
        target: "http://2.189.59.146:666/ping-status",
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api-ahvaz/, ""),
      },
      "/ahvaz-state": {
        target: "http://2.189.59.146:555/ping-status",
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/ahvaz-state/, ""),
      },
      "/get-history": "http://2.189.59.122:3000", // existing proxy setup
      "/api/status": "http://185.11.89.120:6969" // add this line to proxy the new API
    },
  },
  plugins: [react()],
});
