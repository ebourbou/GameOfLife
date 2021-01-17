import { browser, by, element } from 'protractor';

export class LoginPage {
  private credentials = {
    username: 'user',
    password: 'useruser',
  };

  // tslint:disable-next-line:typedef
  navigateTo() {
    return browser.get('/auth/login');
  }

  fillCredentials(credentias: any = this.credentials): void {
    element(by.css('[name="username"]')).sendKeys(credentias.username);
    element(by.css('[name="password"]')).sendKeys(credentias.password);
    element(by.css('.btn-primary')).click();
  }

  // tslint:disable-next-line:typedef
  getValidationText() {
    return element(by.css('app-root h2')).getText();
  }

  // tslint:disable-next-line:typedef
  getErrorMessage() {
    return element(by.css('.alert-danger')).getText();
  }
}
