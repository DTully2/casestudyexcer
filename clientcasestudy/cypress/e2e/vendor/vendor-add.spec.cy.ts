describe('vendor add test', () => {
    it('visits the root', () => {
      cy.visit('/');
    });
    it('clicks the menu button vendors option', () => {
      cy.get('mat-icon').click();
      cy.contains('a', 'vendors').click();
    });
    it('clicks add icon', () => {
      cy.contains('control_point').click();
    });
    it('fills in fields', () => {
      cy.get('input[formcontrolname=address1').type('Mr.');
      cy.get('input[formcontrolname=city').type('John');;
      cy.get('mat-select[formcontrolname=province]').click();
      cy.contains('Ontario').click();
      cy.get('input[formcontrolname=postalcode').type('(N5V1H3');
      cy.get('input[formcontrolname=phone').type('(555)555-5555');
      cy.get('mat-select[formcontrolname=type]').click();
      cy.contains('Trusted').click();
      cy.get('input[formcontrolname=name').type('John');
      cy.get('input[formcontrolname=email').type('jd@here.com');
    });
    it('clicks the save button', () => {
      cy.get('button').contains('Save').click();
      cy.wait(500);
    });
    it('confirms add', () => {
      cy.contains('added!');
    });
  });