describe("iframe tests", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/frames");
  });

  it("interact with iframe", () => {
    cy.get('[href="/iframe"]').click();
    cy.get("#mce_0_ifr").then((iframe) => {
      const iframeBody = iframe.contents();
      cy.wrap(iframeBody).find("#tinymce p").clear();
      cy.wrap(iframeBody).find("#tinymce p").type("Automation test");
    });
  });

  it("interact with nested frames", () => {
    cy.get('[href="/nested_frames"]').click();
    cy.get('[src="/frame_top"]').then((topframe) => {
      const topframeBody = topframe.contents();
      cy.wrap(topframeBody)
        .find('[src="/frame_left"]')
        .then((topleftframe) => {
          const topleftframeBody = topleftframe.contents();
          cy.wrap(topleftframeBody).find("body").contains("LEFT");
        });
      cy.wrap(topframeBody)
        .find('[src="/frame_middle"]')
        .then((topmiddleframe) => {
          const topmiddleframeBody = topmiddleframe.contents();
          cy.wrap(topmiddleframeBody).find("#content").contains("MIDDLE");
        });
      cy.wrap(topframeBody)
        .find('[src="/frame_right"]')
        .then((toprightframe) => {
          const toprightframeBody = toprightframe.contents();
          cy.wrap(toprightframeBody).find("body").contains("RIGHT");
        });
    });
    cy.get('[src="/frame_bottom"]').then((bottomframe)=>{
        const bottomframeBody = bottomframe.contents();
        cy.wrap(bottomframeBody).find('body').contains("BOTTOM");
    })
  });
});
