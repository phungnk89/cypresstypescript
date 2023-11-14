import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
  env: {
    appUrl: "https://hellobear-app-qa.azurewebsites.net/login",
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
});
