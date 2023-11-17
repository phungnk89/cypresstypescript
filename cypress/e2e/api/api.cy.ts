describe("API testing", () => {
  it("send a request and get status 200", () => {
    cy.request({
      method: "GET",
      url: "https://the-internet.herokuapp.com/status_codes/200",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("send a request and get status 500", () => {
    cy.request({
      method: "GET",
      url: "https://the-internet.herokuapp.com/status_codes/500",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(500);
    });
  });
});
