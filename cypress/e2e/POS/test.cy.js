import Countries from "../../fixtures/example";
import HomePage from "../POM/homePage";

let selector = new HomePage();

describe('Shipment Quote Calculation', () => {

    beforeEach(() => {
        // Intercept the API call for shipment price calculation
        cy.intercept('POST', '**/api/price').as('getData');
    });

    Countries.forEach((data, i) => {
        it(`TC_${i + 1} should verify multiple quotes for shipment from Malaysia to ${data.country}`, () => {

            // Visit POS application URL
            selector.VisitUrl(selector.selector.POSUrl);

            // Enter the sender's postcode
            selector.inputBoxDataFill(selector.selector.postCode, data.postalCode);

            // Enter the recipient's country in the 'To' field
            selector.clearField(selector.selector.countryInputBox);
            selector.inputBoxDataFill(selector.selector.countryInputBox, data.country);

            // Select the recipient's country from the dropdown list
            cy.get(selector.selector.selectCountryList).contains(data.country).click();

            // Enter the package weight
            selector.inputBoxDataFill(selector.selector.weight, data.weight);

            // Click the 'Calculate' button
            selector.ClickOnBtn(selector.selector.calculateBtn);

            // Wait for API response and verify it was successful
            // Validate the API response against the UI
            cy.wait('@getData').then(({ response }) => {
                let expectedValues = response.body;

                cy.get(selector.selector.calculateRateTable).each(($el, index) => {
                    let { name, totalAmount, estimateDelivery } = expectedValues[index];

                    // Validate service name
                    expect($el.find('dd').first().text().trim()).to.eq(name)

                    // Validate estimated delivery time
                    expect($el.find('dd').eq(1).text().trim()).to.eq(estimateDelivery)

                    // Validate total cost
                    expect($el.find('h3').first().text().trim()).to.eq(`RM ${totalAmount}`);
                });
            });

            // Verify that the 'Your Quote' section is displayed
            cy.get(selector.selector.yourQuoteText).should('contain.text', 'Your Quote');
        });
    });
});


