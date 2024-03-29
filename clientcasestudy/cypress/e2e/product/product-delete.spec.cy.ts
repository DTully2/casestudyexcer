describe('vendor delete test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button vendors option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'product').click();
  });
  it('selects Test Vendor', () => {
    cy.contains('0Test-1').click();
  });
  it('clicks the delete button', () => {
    cy.get('button').contains('Delete').click();
  });
  it('confirms delete', () => {
    cy.contains('deleted!');
  });
});
