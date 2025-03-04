import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/plantShopping/", // Ensure correct base path
  build: {
    outDir: "dist",
  },
});
