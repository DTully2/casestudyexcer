describe('vendor add test', () => {
    it('visits the root', () => {
      cy.visit('/');
    });
    it('clicks the menu button vendors option', () => {
      cy.get('mat-icon').click();
      cy.contains('a', 'product').click();
    });
    it('clicks add icon', () => {
      cy.contains('control_point').click();
    });
    it('fills in fields', () => {
      cy.get('input[formcontrolname=id').type('Test-1');
      cy.get('mat-select[formcontrolname=vendorid').click();
      cy.contains('ABC Supply Co.').click();
      cy.get('input[formcontrolname=name').type('Name Test');
      cy.get('input[formcontrolname=msrp').clear().type('13.45');
      cy.get('input[formcontrolname=costprice').clear().type('54.31');
      cy.get('.mat-expansion-indicator').eq(1).click();
      cy.get('input[formcontrolname=rop').clear().type('12');
      cy.get('input[formcontrolname=eoq').clear().type('34');
      cy.get('input[formcontrolname=qoh').clear().type('56');
      cy.get('input[formcontrolname=qoo').clear().type('78');
    });
    it('clicks the save button', () => {
      cy.get('button').contains('Save').click();
      cy.wait(500);
    });
    it('confirms add', () => {
      cy.contains('updated!');
    });
  });

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
  
