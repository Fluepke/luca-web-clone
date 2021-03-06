import { login } from '../helpers/functions';
import { E2E_DEFAULT_GROUP_NAME } from '../helpers/locations';
import { DATA_TRANSFERS_ROUTE, PROFILE_ROUTE } from '../helpers/routes';

describe('Redirecting to the base when clicking on logo in header', () => {
  beforeEach(() => {
    login();
  });
  it('redirects the user to the base group from data transfers', () => {
    cy.visit(DATA_TRANSFERS_ROUTE);
    cy.getByCy('groupName').should('not.exist');
    cy.getByCy('home').click();
    // Expect default group to be active
    cy.getByCy('groupName').should('exist');
    cy.getByCy('groupName').contains(E2E_DEFAULT_GROUP_NAME);
  });

  it('redirects the user to the base group from profile', () => {
    cy.visit(PROFILE_ROUTE);
    cy.getByCy('groupName').should('not.exist');
    cy.getByCy('home').click();
    // Expect default group to be active
    cy.getByCy('groupName').should('exist');
    cy.getByCy('groupName').contains(E2E_DEFAULT_GROUP_NAME);
  });
});
