const doctor_name = "Anais";
const patient_name = "Minny";
const password = "12345678";

describe("The patient dashboard", function () {
  it("Cannot be visited if the user is not a patient", function () {
    cy.intercept("POST", "login").as("logIn");

    cy.logIn(doctor_name, password);

    cy.get('[data-cy="patient-dashboard"]').should("not.exist");
    cy.get('[data-cy="doctor-dashboard"]').should("exist");
  });

  it("Can be visited if the user is a patient", function () {
    cy.intercept("POST", "login").as("logIn");

    cy.logIn(patient_name, password);

    cy.get('[data-cy="patient-dashboard"]').should("exist");
  });
});
