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

  it('saves form data correctly', () => {
    const alertAttribute = 'alert';
    const loadingBarAttribute = 'loading-bar';

    cy.navigateToAccountPage(loginTestData.email, loginTestData.password);

    cy.get(byDataTest('firstname-input-field')).type('first name test');
    cy.get(byDataTest('surname-input-field')).type('surname test');

    cy.get(byDataTest(loadingBarAttribute)).should('not.exist');
    cy.get(byDataTest(alert)).should('not.exist');

    cy.get(byDataTest('account-save-button')).click();

    cy.get(byDataTest(loadingBarAttribute)).should('exist');

    // fake network activity
    cy.wait(2500);

    cy.get(byDataTest(loadingBarAttribute)).should('not.exist');

    cy.get(byDataTest(alertAttribute)).should('exist').and('contain.text', 'Account details saved');
  });

  it('prevents submission of empty form', () => {
    const loadingBarAttribute = 'loading-bar';

    cy.navigateToAccountPage(loginTestData.email, loginTestData.password);

    cy.get(byDataTest('account-save-button')).click();

    cy.get(byDataTest(loadingBarAttribute)).should('not.exist');

    cy.get(byDataTest('account-form')).should('contain.text', 'Invalid first name');
    cy.get(byDataTest('account-form')).should('contain.text', 'Invalid surname');
  });

  it('prompts before navigating away with a dirty form', () => {
    cy.navigateToAccountPage(loginTestData.email, loginTestData.password);

    cy.get(byDataTest('firstname-input-field')).type('first name test');
    cy.get(byDataTest('surname-input-field')).type('surname test');

    cy.get(byDataTest('unsaved-changes-modal')).should('not.exist');

    cy.get(byDataTest('navbar-home-link')).click();

    cy.get(byDataTest('unsaved-changes-modal')).should('exist');
  });

  it('closes unsaved data modal when the cancel button is pressed', () => {
    cy.navigateToAccountPage(loginTestData.email, loginTestData.password);

    cy.get(byDataTest('firstname-input-field')).type('first name test');
    cy.get(byDataTest('surname-input-field')).type('surname test');

    cy.get(byDataTest('navbar-home-link')).click();

    cy.get(byDataTest('unsaved-changes-modal')).should('exist');

    cy.get(byDataTest('unsaved-data-cancel-button')).click();

    cy.get(byDataTest('unsaved-changes-modal')).should('not.exist');

    cy.url().should('equal', 'http://localhost:3000/private/account');

    cy.get(byDataTest('title-account-page')).should('have.text', 'Account Details Page');
  });

  it('closes unsaved data modal without saving data when the No button is pressed', () => {
    cy.navigateToAccountPage(loginTestData.email, loginTestData.password);

    cy.get(byDataTest('firstname-input-field')).type('first name test');
    cy.get(byDataTest('surname-input-field')).type('surname test');

    cy.get(byDataTest('navbar-home-link')).click();

    cy.get(byDataTest('unsaved-changes-modal')).should('exist');

    cy.get(byDataTest('unsaved-data-no-button')).click();

    cy.get(byDataTest('unsaved-changes-modal')).should('not.exist');

    cy.get(byDataTest('loading-bar')).should('not.exist');

    cy.url().should('equal', 'http://localhost:3000/');

    cy.get(byDataTest('title-home-page')).should('have.text', 'Home Page');
  });

  it('closes unsaved data modal, saves data and navigate away when the Yes button is pressed', () => {
    cy.navigateToAccountPage(loginTestData.email, loginTestData.password);

    cy.get(byDataTest('firstname-input-field')).type('first name test');
    cy.get(byDataTest('surname-input-field')).type('surname test');

    cy.get(byDataTest('navbar-home-link')).click();

    cy.get(byDataTest('unsaved-changes-modal')).should('exist');

    cy.get(byDataTest('unsaved-data-yes-button')).click();

    cy.get(byDataTest('unsaved-changes-modal')).should('not.exist');

    cy.get(byDataTest('loading-bar')).should('exist');

    // fake network activity
    cy.wait(2500);

    cy.get(byDataTest('loading-bar')).should('not.exist');

    cy.get(byDataTest('alert')).should('exist').and('contain.text', 'Account details saved');

    cy.url().should('equal', 'http://localhost:3000/');

    cy.get(byDataTest('title-home-page')).should('have.text', 'Home Page');
  });

  it('closes unsaved data modal, stays on the current page and display form validation when the Yes button is pressed and the form is invalid', () => {
    // TODO
  });
});
