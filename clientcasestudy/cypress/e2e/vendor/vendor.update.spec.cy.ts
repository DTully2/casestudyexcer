// describe('employee update test', () => {
//   it('visits the root', () => {
//     cy.visit('/');
//   });
//   it('clicks the menu button employees option', () => {
//     cy.get('mat-icon').click();
//     cy.contains('a', 'employees').click();
//   });
//   it('selects Devon', () => {
//     cy.contains('Devon').click();
//   });
//   it('updates Devon Firstname', () => {
//     cy.get('input[formcontrolname=firstname').clear();
//     cy.get('input[formcontrolname=firstname').type('Tully');
//     cy.get('input[formcontrolname=lastname').clear();
//     cy.get('input[formcontrolname=lastname').type('Devon');
//   });
//   it('submits the update', () => {
//     cy.get('form').submit();
//   });
//   it('confirms update', () => {
//     cy.contains('updated!');
//   });
// });

describe('Vendor update test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button employees option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'vendors').click();
  });
  it('selects Devon Tully', () => {
    cy.contains('Devon Tully').click();
  });
  it('updates Devon email', () => {
    cy.get("[type='email']").clear();
    cy.get("[type='email']").type('someemail@domain.com');
  });
  it('submits the update', () => {
    cy.get('form').submit();
  });
  it('confirms update', () => {
    cy.contains('updated!');
  });
});
