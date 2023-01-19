describe("Navigation", function () {
  it("Can navigate to log in from home", function () {
    cy.visit("/#/");
    cy.get("a").contains("Log in").click();
    cy.hash().should("eq", "#/log-in");
  });

  it("Can navigate to home from log in", function () {
    cy.visit("/#/log-in");
    cy.get("a").contains("Inicio").click();
    cy.hash().should("eq", "#/");
  });
});
