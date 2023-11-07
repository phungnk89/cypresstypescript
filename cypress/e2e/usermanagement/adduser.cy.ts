describe("add a new user", () => {
    beforeEach(() => {
      cy.fixture("appsettings").then((appsetinggs) => {
        cy.fixture("credential").then((credential) => {
          const { adminURL } = appsetinggs;
          const { admin } = credential;
  
          cy.visit(adminURL);
          cy.get("#email").type(admin.email);
          cy.get("#password").type(admin.password);
          cy.contains("Sign In").click();
          cy.get('[href="/users"]').click();
        });
      });
    });
  
    // it("successfully add a new user", () => {
    //   cy.get("table tbody tr").should('have.length.greaterThan', 1);
    //   cy.contains("New User").click();
    //   cy.get("#firstName").should("be.visible");
    //   cy.get("#firstName").type("Cy");
    //   cy.get("#lastName").type("Press");
    //   cy.get("#email").type("cypress@auto.practice");
    //   cy.get("#roleId").click();
    //   cy.contains("Administrator").click();
    //   cy.contains("Save").click();
    //   cy.contains("Saved").should("be.visible");
    // });
  
    it("should prevent adding duplicated user", () => {
      cy.get("table tbody tr").should('have.length.greaterThan', 1);
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
  