/// <reference types="vitest" />
/// <reference types="@vitest/browser/matchers" />
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), viteStaticCopy({
    targets: [
      {
        src: 'oss-attribution/**/*',
        dest: "./",
      },
      {
        src: 'src/i18n/locales/**/*',
        dest: "./locales/",
      },
    ],
  }),
  ],
  server: {
    port: 3000,
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version || '0.0.0'),
    '__APP_NAME__': JSON.stringify(process.env.npm_package_name || 'BlocksA'),
  },
  test: {
    setupFiles: ['./tests/setupTests.ts'],

    browser: {
      provider: "playwright",
      enabled: true,
      instances: [{ browser: "chromium" }],
      headless: true,
    },
  },
});
