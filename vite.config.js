import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/plantShopping/", // Ensure correct path when deploying to GitHub Pages
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "/index.html", // Ensures index.html is in the correct place
    },
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
