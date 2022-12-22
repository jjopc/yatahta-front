describe("Authentication", function () {
  it("Can log in.", function () {
    cy.intercept("POST", "login", {
      statusCode: 200,
      body: {
        access: "ACCESS_TOKEN",
        refresh: "REFRESH_TOKEN",
      },
    }).as("logIn");

    cy.visit("/#/log-in");
    cy.get("input#username").type("gary.cole@example.com");
    cy.get("input#password").type("pAssw0rd", { log: false });
    cy.get("button").contains("Log in").click();

    cy.wait("@logIn");

    cy.hash().should("eq", "#/");
    cy.get("button").contains("Log out");
  });

  it("Cannot visit the login page when logged in.", function () {
    const { username, password } = Cypress.env("credentials");

    // Log in.
    cy.intercept("POST", "login", {
      statusCode: 200,
      body: {
        access: "ACCESS_TOKEN",
        refresh: "REFRESH_TOKEN",
      },
    }).as("logIn");
    cy.visit("/#/log-in");
    cy.get("input#username").type(username);
    cy.get("input#password").type(password, { log: false });
    cy.get("button").contains("Log in").click();
    cy.hash().should("eq", "#/");
    cy.get("button").contains("Log out");
    cy.wait("@logIn");

    cy.visit("/#/log-in");
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
