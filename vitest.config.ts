import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["projects/dd-softlab-design-lib/src/test-setup.ts"],
    include: ["projects/dd-softlab-design-lib/src/**/*.spec.ts"],
  },
});
