import path from "node:path"
import { fileURLToPath } from "node:url"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/entities": path.resolve(__dirname, "./src/entities"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/widgets": path.resolve(__dirname, "./src/widgets"),
      "@/pages": path.resolve(__dirname, "./src/views"),
      "@/processes": path.resolve(__dirname, "./src/processes"),
      "@workspace/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@workspace/api": path.resolve(__dirname, "../../packages/api/src"),
    },
  },
})
