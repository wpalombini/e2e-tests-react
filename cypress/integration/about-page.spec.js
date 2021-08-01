/// <reference types="cypress" />

import { byDataTest } from '../support/helper';

describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('navigates to about page', () => {
    cy.url().should('equal', 'http://localhost:3000/about');
    cy.get(byDataTest('title-about-page')).should('have.text', 'About Page');
  });
});
