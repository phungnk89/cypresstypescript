describe("authorization for each role", () => {
  beforeEach(() => {
    let appUrl = Cypress.env("appUrl");

    cy.visit(appUrl);
  });

  it("admin user", () => {
    cy.fixture("credential").then((credential) => {
      const { admin } = credential;

      cy.get("#email").type(admin.email);
      cy.get("#password").type(admin.password);
      cy.contains("Sign In").click();
      cy.get('[href="/users"]').should("be.visible");
      cy.get('[href="/classes"]').should("be.visible");
      cy.get('[href="/textbooks"]').should("be.visible");
      cy.get('[href="/reports"]').should("be.visible");
    });
  });

  it("teacher user", () => {
    cy.fixture("credential").then((credential) => {
      const { teacher } = credential;

      cy.get("#email").type(teacher.email);
      cy.get("#password").type(teacher.password);
      cy.contains("Sign In").click();
      cy.get('[href="/users"]').should("not.exist");
      cy.get('[href="/classes"]').should("be.visible");
      cy.get('[href="/textbooks"]').should("not.exist");
      cy.get('[href="/reports"]').should("not.exist");
    });
  });

  it("school owner user", () => {
    cy.fixture("credential").then((credential) => {
      const { owner } = credential;

      cy.get("#email").type(owner.email);
      cy.get("#password").type(owner.password);
      cy.contains("Sign In").click();
      cy.get('[href="/users"]').should("be.visible");
      cy.get('[href="/classes"]').should("be.visible");
      cy.get('[href="/textbooks"]').should("not.exist");
      cy.get('[href="/reports"]').should("not.exist");
    });
  });
});
