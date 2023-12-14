import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/get-history": "http://2.189.59.122:3000", // existing proxy setup
      "/API": "http://185.11.89.120:6969" // add this line to proxy the new API
    },
  },
  plugins: [react()],
});
