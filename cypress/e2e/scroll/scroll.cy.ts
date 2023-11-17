describe("handle scrolling", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/infinite_scroll");
  });

  it("scroll x times", () => {
    const scrolls = 5;
    const scrollPage = () => {
      cy.scrollTo("bottom");
      cy.wait(1000);
    };

    for (let i = 0; i < scrolls; i++) {
      scrollPage();
    }
  });
});
