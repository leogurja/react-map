import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    clearMocks: true,
    expect: {
      requireAssertions: true,
    },
    coverage: {
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["src/maps"],
      skipFull: true,
    },
    uiBase: "/",
    isolate: false,
    pool: "threads",
  },
});
