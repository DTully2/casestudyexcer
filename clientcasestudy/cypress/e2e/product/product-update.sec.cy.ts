describe('vendor update test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button vendors option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'product').click();
  });
  it('selects Test-1', () => {
    cy.contains('0Test-1').click();
  });
  it('updates in fields', () => {
    cy.get('input[formcontrolname=costprice').clear().type('12.34');
  });
  it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
    cy.wait(500);
  });
  it('confirms update', () => {
    cy.contains('updated!');
  });
});
