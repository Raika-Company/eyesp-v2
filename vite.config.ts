import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/analysis/result': {
        target: 'http://95.38.58.41:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/analysis\/result/, '/api/v1/analysis/result')
      }
    }
  }
});
