const doctor_name = "Anais";
const patient_name = "Minny";
const password = "12345678";

describe("The doctor dashboard", function () {
  it("Cannot be visited if the user is not a doctor", function () {
    cy.intercept("POST", "login").as("logIn");

    cy.logIn(patient_name, password);

    cy.get('[data-cy="patient-dashboard"]').should("exist");
    cy.get('[data-cy="doctor-dashboard"]').should("not.exist");
  });

  it("Can be visited if the user is a doctor", function () {
    cy.intercept("POST", "login").as("logIn");

    cy.logIn(doctor_name, password);

    cy.get('[data-cy="doctor-dashboard"]').should("exist");
  });
});
