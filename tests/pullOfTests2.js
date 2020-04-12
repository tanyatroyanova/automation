const Market_page = require('../pages/market');
const Yandex_mail = require('../pages/yandex_mail');
const Waits = require('../pages/waits');

fdescribe("Pull of tests #2", function() {
    let market_page;
    let yandex_mail;
    let waits;

    beforeEach(async function() {
        yandex_mail = new Yandex_mail();
        market_page = new Market_page();
        waits = new Waits();
        await yandex_mail.get('https://yandex.by/');
    })

    fit('Test 1: Яндекс маркет - добавление в сравнение', async function() {
        await yandex_mail.marketLink.click();
        await yandex_mail.swithToTheTab(1);
        await market_page.insertTextInInput(market_page.searchInput, 'Note 8');
        await market_page.addToElementsToCompare();
        let firstElem = market_page.firstElement.getAttribute('title');
        let secondElem = market_page.secondElement.getAttribute('title');
        await market_page.openCompare();
        let firstElemInCompare = market_page.firstElemInCompare.getText();
        let secondElemInCompare = market_page.secondElemInCompare.getText();
        expect(firstElem).toEqual(firstElemInCompare);
        expect(secondElem).toEqual(secondElemInCompare);
    });

    fit('Test 2: Удаление добавленных товаров', async function() {
        await yandex_mail.marketLink.click();
        await yandex_mail.swithToTheTab(1);
        await market_page.insertTextInInput(market_page.searchInput, 'Note 8');
        await market_page.addToElementsToCompare();
        await market_page.openCompare();
        await market_page.clearTheCompare();
        await waits.waitForVisibleElement(market_page.emptyContent);
        expect(market_page.emptyContent.isDisplayed()).toBe(true);
    });

    it('Test 3: Яндекс маркет - сортировка по цене', async function() {
        await yandex_mail.marketLink.click();
        await yandex_mail.swithToTheTab(1);
        await market_page.openElectronicCategory();
        await market_page.sortByCena();
        await market_page.sortByCena();
        let cenaArr = element(by.className("n-snippet-card2__main-price-wrapper")).getText();
        let sortedCenaArr = cenaArr;
        await market_page.sortArr(sortedCenaArr);
        expect(cenaArr).toEqual(sortedCenaArr);
    });
    /* - Яндекс маркет - сортировка по тегу:
1. Перейти на https://yandex.by/
2. В навигации над строкой поиска кликнуть на маркет
3. В категории бытовая техника выбрать холодильники 
4. Выбрать тег "Шириной до 50"
5. Убедиться, что отсортированы оп ширине  */
});