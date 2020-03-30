let market_page = require('../pages/market');

xdescribe("Работа с базовыми контролами", function() { 
  beforeAll(function() { 
    market_page.get();
    browser.sleep(20000);
  });

  it("check and uncheck", async function() {
    await market_page.clickOncheckBox(market_page.checkBox);
    await market_page.clickOncheckBox(market_page.checkBox);
  });

  it("scroll", async function() {
    await market_page.scrollToTheElement(market_page.popularQuestionsText);  
  });

  it("check RadioButton", async function() {
    await market_page.scrollToTheElement(market_page.categoryText);
    await market_page.checkRadioButton(market_page.radioButtonDelivery);
  });
  
  it("ввести текст в инпут и получить введеный текст(getAttribute)", async function() {
    await market_page.scrollToTheElement(market_page.searchInput);
    await market_page.insertTextInInput(market_page.searchInput, "hello Tanya!!!");
    console.log(await market_page.getInsertedText(market_page.searchInput));
  });

  it("getAttribute(получить значение аттрибутов class, value)", async function() {
    console.log(await market_page.getValue(market_page.searchInput));
    console.log(await market_page.getClass(market_page.searchInput));
  });

  it("select Value from dropdown", async function() {
    await market_page.scrollToTheElement(market_page.Buttondropdown);
    await market_page.Buttondropdown.click();
    await market_page.selectFirstValueFromDropDown(market_page.selectOptions);
  });

});
