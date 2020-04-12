const Yandex_mail = require('../pages/yandex_mail');
const Waits = require('../pages/waits');

describe("Actions", function() {
    let yandex_mail;
    let waits;
    
    let elem_to_scroll = element(by.className('media-service__title'));
    let input_elem = element(by.className('input__control input__input mini-suggest__input'));

    beforeEach(async function() {
        yandex_mail = new Yandex_mail();
        waits = new Waits();
        await yandex_mail.get('https://yandex.by/');
    })

    it("Click and scroll", async function() {
        await browser.actions().
        mouseMove(elem_to_scroll). 
        mouseMove(yandex_mail.videoLink).   
        click().   
        perform();
        //await waits.waitForURL('portal/video');
    });
    
    it("Input text", async function() {
        await browser.actions().
        mouseMove(input_elem).  
        click().
        sendKeys('123'). 
        perform();
        browser.sleep(10000);
    });

    it('JS click and JS Input', async () => {
        await browser.executeScript("document.getElementsByClassName('input__control input__input mini-suggest__input').value='hello!!!'");
        await browser.executeScript("arguments[0].click()", yandex_mail.musicLink);
    });
});
