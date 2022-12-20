describe("Authentication", function () {
  it("Can log in.", function () {
    cy.visit("/#/log-in");
    cy.get("input#username").type("gary.cole@example.com");
    cy.get("input#password").type("pAssw0rd", { log: false });
    cy.get("button").contains("Log in").click();
    cy.hash().should("eq", "#/");
  });

  it("Can sign up.", function () {
    cy.visit("/#/sign-up");
    cy.get("input#username").type("gary.cole");
    cy.get("input#email").type("gary.cole@example.com");
    cy.get("input#password1").type("pAssw0rd", { log: false });
    cy.get("input#password2").type("pAssw0rd", { log: false });
    cy.get("button").contains("Registrarme").click();
    cy.hash().should("eq", "#/log-in");
  });
});
