import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1/analysis/result": {
        target: "http://95.38.58.41:8000",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/v1\/analysis\/result/,
            "/api/v1/analysis/result"
          ),
      },
      // Match the path you use for API requests
      "/api/v1": {
        // The target is your actual API server
        target: "http://95.38.58.11:8000",
        changeOrigin: true,
        // Optionally rewrite the path
        rewrite: (path) => path.replace(/^\/api\/v1/, ""),
      },
    },
  },
});
