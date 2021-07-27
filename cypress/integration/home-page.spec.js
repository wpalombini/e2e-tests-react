/// <reference types="cypress" />

import { byDataTest } from '../support/helper';

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates to home page', () => {
    cy.url().should('equal', 'http://localhost:3000/');
    cy.get(byDataTest('title-home-page')).should('have.text', 'Home Page');
  });
});
