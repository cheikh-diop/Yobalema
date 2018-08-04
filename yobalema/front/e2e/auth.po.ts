import {browser, by, element, protractor} from 'protractor';

export class Login {
    navigateTo(){
        return browser.get('/login');
    }

    checkauth(){
        const email = element(by.id('login-email'));
        const password = element(by.id('login-password'));
        const submit = element(by.id('btn-login'));
        email.sendKeys('test@gmail.com');
        password.sendKeys('testtest');
        submit.click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/dashboard');
    }

    checkunauth(){

        const email = element(by.id('login-email'));
        const password = element(by.id('login-password'));
        email.sendKeys('toto@gmail.com');
        password.sendKeys('0000');
        const submit = element(by.id('btn-login'));
        submit.click();
        const alertDialog = browser.switchTo().alert();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1500);
        expect(alertDialog.getText()).toEqual('Utilisteur Inconu Veuillez resaisir un Email et Password Valide ');
        alertDialog.accept();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/home');


    }
}