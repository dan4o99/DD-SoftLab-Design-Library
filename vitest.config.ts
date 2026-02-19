import { defineConfig } from "vitest/config";
import angular from "@analogjs/vite-plugin-angular";

export default defineConfig({
  plugins: [
    angular({ tsconfig: "projects/dd-softlab-design-lib/tsconfig.spec.json" }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        resources: "usable",
        url: "http://localhost:3000",
      },
    },
    setupFiles: ["projects/dd-softlab-design-lib/src/test-setup.ts"],
    maxWorkers: 1,
    include: ["projects/dd-softlab-design-lib/**/*.spec.ts"],
    snapshotFormat: {
      printBasicPrototype: false,
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["projects/dd-softlab-design-lib/src/lib/**/*.ts"],
      exclude: [
        "**/*.spec.ts",
        "**/index.ts",
        "**/public-api.ts",
        "**/*.style.ts",
      ],
    },
  },
});
