describe("shadow dom", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/shadowdom");
  });

  it("interact with element inside", () => {
    cy.get("my-paragraph")
      .first()
      .then((shadowDOM) => {
        const shadowDOMBody = shadowDOM[0].shadowRoot;
        const element = shadowDOMBody?.querySelector('[name="my-text"]');
        cy.wrap(element).contains("My default text");
      });
    cy.get("my-paragraph")
      .last()
      .then((shadowDOM) => {
        const shadowDOMBody = shadowDOM[0].shadowRoot;
        const element = shadowDOMBody?.querySelector('[name="my-text"]');
        cy.wrap(element).contains("My default text");
      });
  });
});
