const Waits = require('../pages/waits'); 
class Yandex_mail {

    constructor() {
        let waits = new Waits();
        this.openLoginViewButton = element(by.linkText('Почта'));
        this.loginField = element(by.name('login'));
        this.passwordField = element(by.name('passwd'));
        this.loginButton = element(by.className('passp-button passp-sign-in-button'));
        this.userName = element(by.className('mail-User-Name'));
        this.signOut = element(by.linkText('Выйти из сервисов Яндекса'));
        
        this.userCard = element(by.className('username desk-notif-card__user-name'));
        this.loginError = element(by.className('passp-form-field__error'));

        this.videoLink = element(by.linkText('Видео'));
        this.imageLink = element(by.linkText('Картинки'));
        this.newsLink = element(by.linkText('Новости'));
        this.mapsLink = element(by.linkText('Карты'));
        this.marketLink = element(by.linkText('Маркет'));
        this.translaterLink = element(by.linkText('Переводчик'));
        this.musicLink = element(by.linkText('Музыка'));

        this.langDropDown = element(by.className('b-langs'));
        this.langList = element.all(by.className('menu__item menu__item_type_link'));
        this.moreLangButton = element(by.css('[href*="https://yandex.by/tune/lang"].menu__item'));
        this.interfaceLangDropDownButton = element(by.className('button_arrow_down'));
        this.englishLangFromDropDownList = element(by.cssContainingText('.select__text', 'English'));
        this.saveButton = element(by.className('form__save'));

        this.get = async function(url) {
            browser.waitForAngularEnabled(false); 
            await browser.get(url);
        };

        this.clickOnOpenMailLoginPage = async function() {
            await this.openLoginViewButton.click();
        };

        this.swithToTheTab = async function(number) {
            await browser.getAllWindowHandles().then(async function (handles){
                await browser.switchTo().window(handles[number])
            });
        };

        this.insertLogin = async function(login = "AutotestUser") {
            await this.loginField.sendKeys(login);
            return login;
        };

        this.insertPassword = async function(password = "AutotestUser123") {
            await waits.waitForVisibleElement(this.passwordField)
            await this.passwordField.sendKeys(password);  
        };

        this.clickOnLoginButton = async function() {
            await this.loginButton.click();
        };

        this.checkUserName = async function() {
            await waits.waitForVisibleElement(this.userName);
            return this.userName.getText();
        };

        this.clickOnLogoutButton = async function() {
            await waits.waitForVisibleElement(this.userName);
            await this.userName.click();
            await waits.waitForVisibleElement(this.signOut);
            await this.signOut.click();
        };

        this.checkThatUserIsLogout = async function() {
            await expect(this.userCard.isPresent()).toBeFalsy();
        };

        this.getErrorMessage = async function() {
            await waits.waitForVisibleElement(this.loginError);
            return this.loginError.getText();
        };

        this.clickOnTheLink = async function(link) {
            await link.click();
            await this.swithToTheTab(1);
        };

        this.checkUrl = async function(text) {
            const EC = protractor.ExpectedConditions;
            await browser.wait(EC.urlContains(text), 5000, `The ${text} is not in the URL`);
            await browser.close();
            await this.swithToTheTab(0);
        };

        this.clickOnMoreButton = async function() {
            await waits.waitForVisibleElement(this.moreLangButton);
            await this.moreLangButton.click();
        };

        this.changeLanguage = async function() {
            await waits.waitForVisibleElement(this.langDropDown);
            await this.langDropDown.click();
            await this.clickOnMoreButton();
            await this.interfaceLangDropDownButton.click();
            await this.englishLangFromDropDownList.click();
            await this.saveButton.click();
        };
    }
}

module.exports =  Yandex_mail;
