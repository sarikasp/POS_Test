class HomePage{

    selector = {

       POSUrl: "https://pos.com.my/send/ratecalculator",  
       postCode : 'input[formcontrolname="postcodeFrom"]',
       countryInputBox : '[placeholder="Select country"]',
       selectCountryList: 'span[class="mdc-list-item__primary-text"] > div',
       weight: '[formcontrolname="itemWeight"]',
       calculateBtn: '[type=" button"]',
       calculateRateTable:'div.mx-auto > .border-b.border-gray-300',
       yourQuoteText: '.border-b h1'
   
    }

    VisitUrl(url){
        cy.visit(url)
    }

    inputBoxDataFill(element,data){
        cy.get(element).type(data, { force: true });
    }

    clearField(element){
        cy.get(element).click({ force: true }).clear()
    }

    ClickOnBtn(btn){
        cy.get(btn).click({ force: true })
    }


 
 
}
export default HomePage