import { LoginPage } from './login.po';
import { HomeComponent } from '../../../src/app/home/home.component';
import { HomePage } from '../home/home.po';
import { browser } from 'protractor';

describe('Login page', () => {
  let page: LoginPage;
  let homePage: HomePage;

  const wrongCredentias = {
    username: 'wrongname',
    password: 'wrongpasswd',
  };

  beforeEach(() => {
    page = new LoginPage();
  });

  it('when user trying to login with wrong credentials he should stay on “login” page', () => {
    page.navigateTo();
    page.fillCredentials(wrongCredentias);

    //  expect(page.getPageTitleText()).toEqual('Login');
    //  expect(page.getErrorMessage()).toEqual('Username or password is incorrect');
  });

  /* it('when login is successful should be redirect to home page', () => {
    page.navigateTo();
    page.fillCredentials();
    expect(homePage.getPageTitleText()).toEqual('Public');
  });*/
});
