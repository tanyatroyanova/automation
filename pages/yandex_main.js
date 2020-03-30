let waits = require('../pages/waits');  

let main_page = function() {   
    let changeLocationButton = element(by.className('home-link geolink link_geosuggest_yes home-link_black_yes'));
    
    this.moreButton = element(by.className('home-link home-link_blue_yes home-tabs__link home-tabs__more-switcher dropdown2__switcher'));
    this.list = element.all(by.className('home-link home-tabs__more-link home-link_black_yes'));
     
    this.get = async function() {
        browser.waitForAngularEnabled(false); 
        await browser.get('https://yandex.by/');
    };

    this.enterName = async function(name) {
        await nameTextBox.sendKeys(name);
    };
     
    this.clickLocation = async function() {
        await changeLocationButton.click();
    };     

    this.swithToTheTab = async function(number) {
        await browser.getAllWindowHandles().then(async function (handles){
            await browser.switchTo().window(handles[number])
        });
    };

    this.rememberTheMoreList = async function() {
        await waits.waitForVisibleElement(this.moreButton);     
        await this.moreButton.click();
        let theMoreList = element.all(by.className('home-link home-tabs__more-link home-link_black_yes')).getText();
        return theMoreList;
    };
};
module.exports = new main_page();
