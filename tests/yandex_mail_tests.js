const Yandex_mail = require('../pages/yandex_mail');
const Waits = require('../pages/waits');

describe("Pull of tests 1", function() {
    let yandex_mail;
    let waits;

    beforeEach(async function() {
        yandex_mail = new Yandex_mail();
        waits = new Waits();
        await yandex_mail.get('https://yandex.by/');
    })

    fit("Test #1: Логин на яндекс почту", async function() {
        await yandex_mail.clickOnOpenMailLoginPage();
        await yandex_mail.swithToTheTab(1);
        let login = await yandex_mail.insertLogin();
        await yandex_mail.clickOnLoginButton();
        await yandex_mail.insertPassword();
        await yandex_mail.clickOnLoginButton();
        expect(yandex_mail.checkUserName()).toEqual(login);
    });

    fit("Test #2: Яндекс почта - логаут", async function() {
        await yandex_mail.clickOnOpenMailLoginPage();
        await yandex_mail.swithToTheTab(1);
        await yandex_mail.insertLogin();
        await yandex_mail.clickOnLoginButton();
        await yandex_mail.insertPassword();
        await yandex_mail.clickOnLoginButton();
        await yandex_mail.clickOnLogoutButton();
        await yandex_mail.checkThatUserIsLogout();
    });

    it("Test #3: Яндекс почта - невалидный пароль", async function() {
        await yandex_mail.clickOnOpenMailLoginPage();
        await yandex_mail.swithToTheTab(1);
        await yandex_mail.insertLogin("AutotestUser");
        await yandex_mail.clickOnLoginButton();
        await yandex_mail.insertPassword("NoAutotestUser123");
        await yandex_mail.clickOnLoginButton();
        let errorMessage = await yandex_mail.getErrorMessage();
        await expect(errorMessage).toBe('Неверный пароль');
    });

    it("Test #4: Яндекс почта - невалидный логин", async function() {
        await yandex_mail.clickOnOpenMailLoginPage();
        await yandex_mail.swithToTheTab(1);
        await yandex_mail.insertLogin("NoAutotestUser");
        await yandex_mail.clickOnLoginButton();
        //await yandex_mail.insertPassword("AutotestUser123");
        //await yandex_mail.clickOnLoginButton();
        let errorMessage = await yandex_mail.getErrorMessage();
        await expect(errorMessage).toBe('Такого аккаунта нет');
    });

    it("Test #5: Яндекс - навигация", async function() {
        // Видео
        await yandex_mail.clickOnTheLink(yandex_mail.videoLink);
        await yandex_mail.checkUrl('video')
        
        // Картинки
        await yandex_mail.clickOnTheLink(yandex_mail.imageLink);
        await yandex_mail.checkUrl('images')

        //Новости
        await yandex_mail.clickOnTheLink(yandex_mail.newsLink);
        await yandex_mail.checkUrl('news')

        //Карты
        await yandex_mail.clickOnTheLink(yandex_mail.mapsLink);
        await yandex_mail.checkUrl('maps')

        //Маркет
        await yandex_mail.clickOnTheLink(yandex_mail.marketLink);
        await yandex_mail.checkUrl('market')

        //Переводчик
        await yandex_mail.clickOnTheLink(yandex_mail.translaterLink);
        await yandex_mail.checkUrl('translate')

        //Музыка
        await yandex_mail.clickOnTheLink(yandex_mail.musicLink);
        await yandex_mail.checkUrl('music')
    });

    it("Test #6: Яндекс - переключение языка на английский", async function() {
        await yandex_mail.changeLanguage();
        await expect(yandex_mail.langDropDown.getText()).toEqual('eng');
    });

});
