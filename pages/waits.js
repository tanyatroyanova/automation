class Waits {
    constructor() {
        this.waitForVisibleElement = async function(elem) {
            let until = protractor.ExpectedConditions;
            await browser.wait(until.presenceOf(elem), 40000, `Element taking too long to appear in the DOM`);
        };

        this.waitForURL = async function(url) {
            let until = protractor.ExpectedConditions;
            await browser.wait(until.urlContains(url), 40000, `URL is not correspond`);
        };
    };
    }  
    
module.exports = Waits;
