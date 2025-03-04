import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/plantShopping/", // Ensure correct path when deploying to GitHub Pages
  build: {
    outDir: "dist", // Output directory for production build
  },
  resolve: {
    alias: {
      "@": "/src", // Optional alias to simplify imports
    },
  },
  server: {
    port: 3000, // Change if needed
    open: true, // Automatically open in browser
  },
});
