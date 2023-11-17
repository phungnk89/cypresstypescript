describe("handle alert", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
  });

  it("javascript alert", () => {
    cy.get('[onclick="jsAlert()"]').click();
    cy.on("window:alert", (text) => {
      expect(text).to.contain("I am a JS Alert");

      return true;
    });
    cy.get("#result").contains("You successfully clicked an alert");
  });

  it("javascript confirm OK", () => {
    cy.get('[onclick="jsConfirm()"]').click();
    cy.on("window:confirm", (text) => {
      expect(text).to.contain("I am a JS Confirm");

      return true;
    });
    cy.get("#result").contains("You clicked: Ok");
  });

  it("javascript confirm Cancel", () => {
    cy.get('[onclick="jsConfirm()"]').click();
    cy.on("window:confirm", (text) => {
      expect(text).to.contain("I am a JS Confirm");

      return false;
    });
    cy.get("#result").contains("You clicked: Cancel");
  });

  it("javascript prompt", () => {
    let input = "Input something";

    cy.window().then((win) => {
        cy.stub(win, 'prompt').returns(input);
        cy.get('[onclick="jsPrompt()"]').click();
      });
    cy.get("#result").contains(`You entered: ${input}`);
  });
});
