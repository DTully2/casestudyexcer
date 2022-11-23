describe('PO add test', () => {
    it('visits the root', () => {
      cy.visit('/');
    });
    it('clicks the menu button products option', () => {
      cy.get('mat-icon').click();
      cy.contains('a', 'generator').click();
    });
    it('selects a vendor', () => {
      cy.get('mat-select[formControlName=vendorid').click();
      cy.contains('Devon Tully').click();
    });
    it('selects a product', () => {
      cy.get('mat-select[formControlName=productid').click();
      cy.contains('Wheelbarrow').click();
      
    });
    it('selects a Qty of EOQ', () => {
      cy.get('mat-select[formControlName=eoq').click();
      cy.contains(2).click({force:true});
      
    });
    it('clicks the save button', () => {
      cy.get('button').contains('Save Report').click({force:true});
      cy.wait(500);
    });
    it('confirms PO was added', () => {
      cy.contains('added!');
    });
  });
  