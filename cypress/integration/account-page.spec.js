/// <reference types="cypress" />

import { byDataTest } from '../support/helper';

describe('Account Page', () => {
  let loginTestData;

  before(() => {
    cy.fixture('login.json').then((data) => (loginTestData = data));
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates to account page', () => {
    // Custom command. See commands.js
    cy.login(loginTestData.email, loginTestData.password);

    cy.get(byDataTest('side-menu-button')).click();

    cy.get(byDataTest('side-menu-link-account')).click();

    cy.get(byDataTest('title-account-page')).should('have.text', 'Account Details Page');
  });

  it('prevents unauthorized access to account page', () => {
    cy.visit('/private/account');

    cy.url().should('equal', 'http://localhost:3000/login');
    cy.get(byDataTest('title-login-page')).should('have.text', 'Login Page');
  });
});
