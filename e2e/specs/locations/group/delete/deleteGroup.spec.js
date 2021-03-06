import { login, createGroup } from '../../helpers/functions';

describe('Group deletion', () => {
  beforeEach(() => {
    login();
  });

  it('deletes a group', () => {
    createGroup();
    cy.getByCy('groupName').should('exist');
    cy.getByCy('groupName').should('contain', 'Testing group');
    cy.getByCy('groupName').click();
    cy.getByCy('groupSettingsHeader').should('contain', 'Testing group');
    cy.getByCy('deleteGroup').click();
    cy.get('.ant-popover-buttons .ant-btn-primary').click();
    cy.getByCy('groupName').should('not.contain', 'Testing group');
  });
});
