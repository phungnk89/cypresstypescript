import { DatabaseService } from "../../support/database";
import { ExampleService } from "../../support/stringhelper";

const stringService = new ExampleService();

const email = `cypress.${stringService.generateRandomString(5)}@auto.practice`;

describe("add a new user", () => {
  before(() => {
    const databaseService = new DatabaseService();
    databaseService.cleanUpDB();
  });

  beforeEach(() => {
    cy.fixture("credential").then((credential) => {
      const { admin } = credential;

      let url = Cypress.env("appUrl");

      cy.visit(url);
      cy.get("#email").type(admin.email);
      cy.get("#password").type(admin.password);
      cy.contains("Sign In").click();
      cy.get('[href="/users"]').click();
    });
  });

  it("successfully add a new user", () => {
    cy.get("table tbody tr").should("have.length.greaterThan", 1);
    cy.contains("New User").click();
    cy.get("#firstName").should("be.visible");
    cy.get("#firstName").type("Cy");
    cy.get("#lastName").type("Press");
    cy.get("#email").type(email);
    cy.get("#roleId").click();
    cy.contains("Administrator").click();
    cy.contains("Save").click();
    cy.contains("Saved").should("be.visible");
  });

  it("should prevent adding duplicated user", () => {
    cy.get("table tbody tr").should("have.length.greaterThan", 1);
    cy.contains("New User").click();
    cy.get("#firstName").should("be.visible");
    cy.get("#firstName").type("Cy");
    cy.get("#lastName").type("Press");
    cy.get("#email").type("auto.admin@yopmail.com");
    cy.get("#roleId").click();
    cy.contains("Administrator").click();
    cy.contains("Save").click();
    cy.contains("The email already exists").should("be.visible");
  });
});
