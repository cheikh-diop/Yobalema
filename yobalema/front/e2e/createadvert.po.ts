import { browser, by, element, protractor, Key } from 'protractor';

export class CreateAdvert {
    navigateTo() {
        const navigatbutton = element(by.id('addadvert'));
        navigatbutton.click();
    }

    addadvert() {
        const advert = element(by.id('advertlink'));
        advert.click();
        const adverttitle = element(by.id('title'));
        const submit = element(by.id('btn-advert'));
        adverttitle.sendKeys('iphone10');
        submit.click();

        const alertDialog = browser.switchTo().alert();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1500);
        expect(alertDialog.getText()).toEqual('Annonce crée avec succes');

        alertDialog.accept();
    }

    noAddAdvert(){
        const advert = element(by.id('advertlink'));
        advert.click();
        const adverttitle = element(by.id('title'));
        const submit = element(by.id('btn-advert'));
        adverttitle.clear().then(function () {
            adverttitle.sendKeys('iphone10');
        });
        submit.click();
        const alertDialog = browser.switchTo().alert();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1500);
        expect(alertDialog.getText()).toEqual('Impossible de créer cette annonce');
        
        alertDialog.accept();
    }

}   