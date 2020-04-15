const Waits = require('../pages/waits');
const Yandex_mail = require('../pages/yandex_mail');

class Market_page {

    constructor() {
        let waits = new Waits();
        let yandex_mail = new Yandex_mail();

        this.popularQuestionsText = element(by.className("_1GbfG8Wxnd"));
        this.checkBox = element(by.id("local-offers-first"));
        this.radioButtonDelivery = element(by.className("_2zRi9ex2Rl"));
        this.categoryText = element(by.className("_3xtMbW8XL4"));   
        this.searchInput = element(by.id("header-search"));  
        this.Buttondropdown = element(by.buttonText("Показывать по 48"));
        this.selectOptions = element.all(by.className("select__text"));
        
        this.appleCheckBox = element(by.className("LhMupC0dLR"));
        this.searchInputSpan = element(by.className("suggest2-autocomplete__entered"));

        this.searchButton = element(by.className('suggest2-form__button button2_theme_action'));
        this.elementFromList = element(by.css('.n-snippet-cell2__image'));
        this.addToCompare1 = element(by.xpath("(//*[contains(@class,'n-user-lists_type_compare')])[1]"));
        this.addToCompare2 = element(by.xpath("(//*[contains(@class,'n-user-lists_type_compare')])[2]"));
        this.openCompareButton = element(by.css('[href*="/compare?track=head"]'));
        
        this.firstElement = element(by.xpath("(//*[contains(@class,'n-snippet-cell2__title')]/a)[1]"));
        this.secondElement = element(by.xpath("(//*[contains(@class,'n-snippet-cell2__title')]/a)[2]"));
        this.firstElemInCompare = element(by.xpath("(//*[contains(@class,'n-compare-head__name link')])[2]"));
        this.secondElemInCompare = element(by.xpath("(//*[contains(@class,'n-compare-head__name link')])[1]"));
        this.clearCompare = element(by.className("n-compare-toolbar__action-clear link")); 
        this.emptyContent = element(by.className('n-compare-empty__text'));
        this.camerasLink = element(by.linkText('Экшн-камеры'));
        this.electronicaLink = element(by.css('[href*="/catalog--elektronika/54440"]'));
        this.categoriesButton = element(by.className('_3Lwc_UVFq4'));
        this.sortByCenaElem = element(by.xpath("(//*[contains(@class,'n-filter-sorter i-bem')])[2]"));
        this.arrayOfCena = element.all(by.css(".n-snippet-card2__main-price-wrapper .price"));
        this.technika = element(by.xpath("(//*[contains(@class,'_35SYuInI1T _1vnugfYUli')])[3]"));
        this.holodilniki = element(by.linkText('Холодильники'));
        this.widthDo = element(by.xpath("(//*[contains(@class,'_2yK7W3SWQ- _1f2usTwyAs')])[3]"));
        this.widthOfTheElem = element.all(by.css('.n-snippet-card2__desc-item'));
        this.processBar = element.all(by.css(".spin2_progress_yes")).get(0);

        this.musicSearchButton = element(by.className("d-input__field deco-input deco-input_suggest"));
        this.ispolnitel = element(by.className("page-artist__title typo-h1 typo-h1_big"));
        this.metalikaLink = element(by.css('[href*="/artist/3121"]'));
        this.artistInThePopAlbums = element(by.className("album__artist deco-typo-secondary typo-add"));
        this.beyonceLink = element(by.css('[href*="/artist/27995"]'));
        this.firstTrack = element.all(by.css(".d-track .entity-cover__image")).first();
        
        this.playFirstPopTrack = element(by.className("d-button-play__wrap"));
        this.pauseIcon = element(by.css(".deco-player-controls .player-controls__btn_pause div"));
        this.playIcon = element(by.css(".deco-player-controls .player-controls__btn_play div"));
        
        this.get = async function() {
            await browser.waitForAngularEnabled(true); 
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
        this.insertTextInInput = async function(element, text) {
            await waits.waitForVisibleElement(element);
            await element.sendKeys(text);
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
        
        this.addToElementsToCompare = async function() {
            await waits.waitForVisibleElement(this.addToCompare1);
            await browser.actions().
            mouseMove(this.addToCompare1).  
            click(). 
            perform();
            await waits.waitForVisibleElement(this.addToCompare2);
            await browser.actions().
            mouseMove(this.addToCompare2).  
            click(). 
            perform();
        };

        this.openCompare = async function() {
            await waits.waitForVisibleElement(this.openCompareButton);
            await this.openCompareButton.click();
        };

        this.clearTheCompare = async function() {
            await waits.waitForVisibleElement(this.clearCompare);
            await this.clearCompare.click();
        };

        this.openElectronicCategory = async function() {
            await waits.waitForVisibleElement(this.categoriesButton);
            await this.categoriesButton.click();
            await waits.waitForVisibleElement(this.electronicaLink);
            await browser.actions().
            mouseMove(this.electronicaLink).
            click().
            perform();
            await waits.waitForVisibleElement(this.camerasLink);
            await this.camerasLink.click();
        };

        this.openHolodilnikiCategory = async function() {
            await waits.waitForVisibleElement(this.technika);
            await this.technika.click();
            await waits.waitForVisibleElement(this.holodilniki);
            await this.holodilniki.click();
        };

        this.getWidthOfHolodilnik = async function() {
            await waits.waitForInVisibleElement(await this.processBar);
            await waits.waitForVisibleElement(this.widthOfTheElem.first());
            let widths = [];
            for (let i = 0; i < await this.widthOfTheElem.count(); i++) {
                widths.unshift(await this.widthOfTheElem.get(i).getText()); 
            }
            
            let fist = widths[4].split(': ')[1];
            let fist_value = fist.split('х')[0];  
            let second =  widths[9].split(': ')[1];
            let second_value = second.split('х')[0]; 
            if(+fist_value <= 50 && +second_value <= 50) {
                return true;
            }
            return false;
        };

        this.sortByCena = async function() {
            await waits.waitForVisibleElement(this.sortByCenaElem);
            await this.sortByCenaElem.click();
        };

        this.checkSortOfCena = async function(arr) {
            await waits.waitForInVisibleElement(await this.processBar);
            await waits.waitForVisibleElement(this.arrayOfCena.first());
            let cenaStr = [];
            let onlyCena = [];
            for (let i = 0; i < await this.arrayOfCena.count(); i++) {
                cenaStr.unshift(await this.arrayOfCena.get(i).getText());
               
            }
            for (let i = 0; i < cenaStr.length; i++) {
                onlyCena.unshift(cenaStr[i].split(' б')[0]);   
            }
            for (let i = 0; i < onlyCena.length; i++) {
                if(+onlyCena[i] < +onlyCena[i+1]) {
                    return false;
                } else {
                    continue;
                }          
              }
            return true;
        };

        this.clickOnFirstPopTrack = async function() {
            await waits.waitForVisibleElement(this.firstTrack);
            await browser.actions().
            mouseMove(this.firstTrack).
            perform();
            await browser.sleep(5000);
            await this.firstTrack.click();
        };

    }  
}
module.exports = Market_page;
