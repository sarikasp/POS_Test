describe('Shipment Quote Calculation', () => {
    beforeEach(() => {
        cy.visit('https://pos.com.my/send/ratecalculator');
    });

    it('should verify multiple quotes for shipment from Malaysia to India', () => {

        cy.get('input[formcontrolname="postcodeFrom"]').type('35600', { force: true });

        // Select 'India' in the 'To' country dropdown
        cy.get('[placeholder="Select country"]').click({ force: true }).clear()
        cy.get('[placeholder="Select country"]').type('India')
        cy.wait(2000)
        cy.get('[role="listbox"] small').click()

        // Enter weight
        cy.get('[formcontrolname="itemWeight"]').type('1', { force: true });

        // Click Calculate button
        cy.get('[type=" button"]').click({ force: true });

        // Verify multiple quotes appear (Assuming quotes are in a list with class 'quote-item')
        cy.get('.border-b h1').should('have.text', ' Your Quote ')
        cy.get('.border-gray-300').should('have.length.greaterThan', 1);

    });
});