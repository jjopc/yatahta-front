// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const addUser = (username, email, password1, password2) => {
  cy.intercept("POST", "signup").as("signUp");

  cy.visit("/#/sign-up");
  cy.get("input#username").type(username);
  cy.get("input#email").type(email);
  cy.get("input#password1").type(password1, { log: false });
  cy.get("input#password2").type(password2, { log: false });

  cy.get("button").contains("Registrarme").click();
  cy.wait("@signUp");
  cy.hash().should("eq", "#/log-in");
};

const logIn = (username, password) => {
  cy.intercept("POST", "login").as("logIn");

  // Log into the app.
  cy.visit("/#/log-in");
  cy.get("input#username").type(username);
  cy.get("input#password").type(password, { log: false });
  cy.get("button").contains("Log in").click();
  cy.wait("@logIn");
};

Cypress.Commands.add("addUser", addUser);
Cypress.Commands.add("logIn", logIn);
