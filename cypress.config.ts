import { defineConfig } from "cypress";
import { DatabaseService } from "../CypressTS/cypress/support/database";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        cleanUp() {
          const databaseService = new DatabaseService();
          let rowAffected = databaseService.cleanUpDB();

          return rowAffected;
        },
      });
    },
  },
  env: {
    appUrl: "https://hellobear-app-qa.azurewebsites.net/login",
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
});
