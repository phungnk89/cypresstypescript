import { defineConfig } from "cypress";
import { DatabaseService } from "../CypressTS/cypress/support/database";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        cleanUp() {
          const databaseService = new DatabaseService();
          databaseService.config = config.env.databaseConfiguration;
          let rowAffected = databaseService.cleanUpDB();

          return rowAffected;
        },
        queryDB(query: string) {
          const databaseService = new DatabaseService();
          databaseService.config = config.env.databaseConfiguration;
          let result = databaseService.executeQuery(query);

          return result;
        },
      });
    },
  },
  env: {
    appUrl: "https://hellobear-app-qa.azurewebsites.net/login",
    databaseConfiguration: {
      server: "",
      database: "",
      user: "su",
      password: "",
      options: {
        encrypt: true,
      },
    },
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    reportFilename: '[name].html',
    overwrite: false,
    html: false,
    json: true,
  },
});
