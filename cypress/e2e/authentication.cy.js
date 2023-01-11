const username = "Minny";
const password = "12345678";
const email = "minny@email.com";

describe("Authentication", function () {
  it("Can log in.", function () {
    cy.logIn(username, password);
    cy.hash().should("eq", "#/");
    cy.get("button").contains("Log out");
  });

  it("Cannot visit the login page when logged in.", function () {
    cy.logIn(username, password);
    cy.visit("/#/log-in");
    cy.hash().should("eq", "#/");
  });

  it("Cannot visit the sign up page when logged in.", function () {
    cy.logIn(username, password);
    cy.visit("/#/sign-up");
    cy.hash().should("eq", "#/");
  });

  it("Cannot see links when logged in.", function () {
    cy.logIn(username, password);
    cy.get('[data-cy="signUp"]').should("not.exist");
    cy.get('[data-cy="logIn"]').should("not.exist");
  });

  it("Shows an alert on login error.", function () {
    const { username, password } = Cypress.env("credentials");
    cy.intercept("POST", "login", {
      statusCode: 400,
      body: {
        detail: [
          "Please enter a correct username and password. " +
            "Note that both fields may be case-sensitive.",
        ],
      },
    }).as("logIn");
    cy.visit("/#/log-in");
    cy.get("input#username").type(username);
    cy.get("input#password").type(password, { log: false });
    cy.get("button").contains("Log in").click();
    cy.wait("@logIn");
    cy.get("div.alert").contains(
      "Please enter a correct username and password. " +
        "Note that both fields may be case-sensitive."
    );
    cy.hash().should("eq", "#/log-in");
  });

  it("Can log out.", function () {
    cy.logIn(username, password);
    cy.get('[data-cy="logOut"]')
      .click()
      .should(() => {
        expect(window.localStorage.getItem("yatahta.auth")).to.be.null;
      });
    cy.get('[data-cy="logOut"]').should("not.exist");
  });

  it.skip("Can sign up.", function () {
    cy.addUser("testuser", "testuser@email.com", password, password);
  });

  it("Show invalid fields on sign up error.", function () {
    cy.intercept("POST", "add_doctor", {
      statusCode: 400,
      body: {
        username: ["A user with that username already exists."],
      },
    }).as("signUp");

    cy.visit("/#/sign-up");
    cy.get("input#username").type("gary.cole");
    cy.get("input#email").type("gary.cole@example.com");
    cy.get("input#password1").type("pAssw0rd", { log: false });
    cy.get("input#password2").type("pAssw0rd", { log: false });
    cy.get("button").contains("Registrarme").click();
    cy.wait("@signUp");
    cy.get("div.invalid-feedback").contains(
      "A user with that username already exists"
    );
    cy.hash().should("eq", "#/sign-up");
  });
});
