/// <reference types="cypress" />

import { byDataTest } from '../support/helper';

describe('Login Page', () => {
  let loginTestData;

  before(() => {
    cy.fixture('login.json').then((data) => (loginTestData = data));
  });

  beforeEach(() => {
    cy.visit('/login');
  });

  it('navigates to login page', () => {
    cy.url().should('equal', 'http://localhost:3000/login');
    cy.get(byDataTest('title-login-page')).should('have.text', 'Login Page');
  });

  it('has email input field', () => {
    const attribute = 'email-input-field';
    cy.get(byDataTest(attribute)).should('exist');
    cy.get(byDataTest(attribute)).should('have.attr', 'type', 'email');
  });

  it('has password input field', () => {
    const attribute = 'password-input-field';
    cy.get(byDataTest(attribute)).should('exist');
    cy.get(byDataTest(attribute)).should('have.attr', 'type', 'password');
  });

  it('has login button', () => {
    const attribute = 'login-button';
    cy.get(byDataTest(attribute)).should('exist');
    cy.get(byDataTest(attribute)).should('have.attr', 'type', 'button');
  });

  it('displays error message when login fails', () => {
    const alertAttribute = 'alert';
    const loadingBarAttribute = 'loading-bar';

    cy.get(byDataTest(loadingBarAttribute)).should('not.exist');
    cy.get(byDataTest(alert)).should('not.exist');

    cy.get(byDataTest('email-input-field')).type('invalid@email.address');
    cy.get(byDataTest('password-input-field')).type('invalid-password');
    cy.get(byDataTest('login-button')).click();

    cy.get(byDataTest(loadingBarAttribute)).should('exist');

    // fake network activity
    cy.wait(2500);

    cy.get(byDataTest(loadingBarAttribute)).should('not.exist');

    cy.get(byDataTest(alertAttribute)).should('exist').and('contain.text', 'Invalid email or password');
  });

  it('displays success message when login succeeds', () => {
    const alertAttribute = 'alert';
    const loadingBarAttribute = 'loading-bar';

    cy.get(byDataTest(loadingBarAttribute)).should('not.exist');
    cy.get(byDataTest(alert)).should('not.exist');

    cy.get(byDataTest('email-input-field')).type(loginTestData.email);
    cy.get(byDataTest('password-input-field')).type(loginTestData.password);
    cy.get(byDataTest('login-button')).click();

    cy.get(byDataTest(loadingBarAttribute)).should('exist');

    // fake network activity
    cy.wait(2500);

    cy.get(byDataTest(loadingBarAttribute)).should('not.exist');

    cy.get(byDataTest(alertAttribute)).should('exist').and('contain.text', 'You are now logged in');
  });
});
