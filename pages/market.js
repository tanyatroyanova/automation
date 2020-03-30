let market_page = function() {

    this.popularQuestionsText = element(by.className("_1GbfG8Wxnd"));
    this.checkBox = element(by.id("local-offers-first"));
    this.radioButtonDelivery = element(by.className("_2zRi9ex2Rl"));
    this.categoryText = element(by.className("_3xtMbW8XL4"));   
    this.searchInput = element(by.className("input__control"));
    this.Buttondropdown = element(by.buttonText("Показывать по 48"));
    this.selectOptions = element.all(by.className("select__text"));
    
    this.appleCheckBox = element(by.className("LhMupC0dLR"));
    this.searchInputSpan = element(by.className("suggest2-autocomplete__entered"));

    this.get = async function() {
        browser.waitForAngularEnabled(false); 
        await browser.get("https://market.yandex.by/catalog--mobilnye-telefony-v-minske/54726/list?local-offers-first=0&onstock=1");
    };

    this.scrollToTheElement = function(element) {
        browser.actions().mouseMove(element).perform();
    };

    this.clickOncheckBox = function(element) {  
            element.click();         
    };

    this.checkRadioButton = function(element) {
        element.click();
    };
    this.insertTextInInput = function(element, text) {
        element.sendKeys(text);
    };

    this.getInsertedText = function(element) {
        return element.getText();
    };

    this.getValue = async function(element) {
        return await element.getAttribute('value');
    };

    this.getClass = async function(element) {
        return await element.getAttribute('class');
    };

    this.selectFirstValueFromDropDown = async function(options, number = 0) { 
        await options.get(number).click();
    };
}

module.exports = new market_page();
