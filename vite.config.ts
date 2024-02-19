import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "http://95.38.58.11:80",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ""),
      },
    },
  },
});
