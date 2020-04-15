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

    it('Test 1: Яндекс маркет - добавление в сравнение', async function() {
        await yandex_mail.marketLink.click();
        await yandex_mail.swithToTheTab(1);
        await market_page.insertTextInInput(market_page.searchInput, 'Note 8');
        await waits.waitForVisibleElement(market_page.searchButton);
        await market_page.searchButton.click();
        await market_page.addToElementsToCompare();
        let firstElem = market_page.firstElement.getAttribute('title');
        let secondElem = market_page.secondElement.getAttribute('title');
        await market_page.openCompare();
        let firstElemInCompare = market_page.firstElemInCompare.getText();
        let secondElemInCompare = market_page.secondElemInCompare.getText();
        expect(firstElem).toEqual(firstElemInCompare);
        expect(secondElem).toEqual(secondElemInCompare);
    });

    it('Test 2: Удаление добавленных товаров', async function() {
        await yandex_mail.marketLink.click();
        await yandex_mail.swithToTheTab(1);
        await market_page.insertTextInInput(market_page.searchInput, 'Note 8');
        await waits.waitForVisibleElement(market_page.searchButton);
        await market_page.searchButton.click();
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
        let res = await market_page.checkSortOfCena();
        expect(res).toBeTrue;
    });

    it('Test 4: Яндекс маркет - сортировка по тегу', async function() {
        await yandex_mail.marketLink.click();
        await yandex_mail.swithToTheTab(1);
        await market_page.openHolodilnikiCategory();
        await market_page.insertTextInInput(market_page.widthDo, 50);
        let width = await market_page.getWidthOfHolodilnik();
        console.log(width);
        expect(width).toBeTrue;   
    });

    it('Test 5: Яндекс - музыка', async function() {
        await yandex_mail.musicLink.click();
        await yandex_mail.swithToTheTab(1);
        await market_page.insertTextInInput(market_page.musicSearchButton, "Metal");
        await waits.waitForVisibleElement(market_page.metalikaLink);
        await market_page.metalikaLink.click();
        await waits.waitForVisibleElement(market_page.ispolnitel);
        let ispolnitel = market_page.ispolnitel.getText();
        await waits.waitForVisibleElement(market_page.artistInThePopAlbums);
        let artistInThePopAlbums = market_page.artistInThePopAlbums.getText();
        expect(ispolnitel).toBe("Metallica");
        expect(artistInThePopAlbums).toBe("Metallica");    
    });

    fit('Test 6: Яндекс - музыка - вопроизведение', async function() {
        await yandex_mail.musicLink.click();
        await yandex_mail.swithToTheTab(1);
        await market_page.insertTextInInput(market_page.musicSearchButton, "beyo");
        await waits.waitForVisibleElement(market_page.beyonceLink);
        await market_page.beyonceLink.click();
        await market_page.clickOnFirstPopTrack();
        await waits.waitForVisibleElement(market_page.pauseIcon);
        let icon = await market_page.pauseIcon.isDisplayed();
        expect(icon).toBeTrue;
        await waits.waitForVisibleElement(market_page.playIcon);
        await market_page.pauseIcon.click();
        iconTitle = await market_page.playIcon.isDisplayed();
        expect(iconTitle).toBeTrue;    
    });
});
