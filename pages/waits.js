class Waits {
    constructor() {
        this.waitForVisibleElement = async function(elem) {
            let until = protractor.ExpectedConditions;
            await browser.wait(until.visibilityOf(elem), 40000, `Element taking too long to appear in the DOM`);
        };

        this.waitForInVisibleElement = async function(elem) {
            let until = protractor.ExpectedConditions;
            await browser.wait(until.invisibilityOf(elem), 40000, `Element taking too long to appear in the DOM`);
        };

        this.waitForURL = async function(url) {
            let until = protractor.ExpectedConditions;
            await browser.wait(until.urlContains(url), 40000, `URL is not correspond`);
        };
    };
    }  
    
module.exports = Waits;
