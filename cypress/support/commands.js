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

import { byDataTest } from '../support/helper';

Cypress.Commands.add('login', (email, password) => {
  cy.get(byDataTest('navbar-login-button')).click();

  cy.get(byDataTest('email-input-field')).type(email);
  cy.get(byDataTest('password-input-field')).type(password);
  cy.get(byDataTest('login-button')).click();
});

Cypress.Commands.add('navigateToAccountPage', (email, password) => {
  cy.login(email, password);

  cy.get(byDataTest('side-menu-button')).click();

  cy.get(byDataTest('side-menu-link-account')).click();
});
