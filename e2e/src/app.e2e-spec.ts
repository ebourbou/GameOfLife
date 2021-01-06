import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { inject } from '@angular/core';
import { LoginComponent } from '../../src/app/auth/login/login.component';
import { ComponentFixture } from '@angular/core/testing';

describe('GameOfLife App', () => {
  let page: AppPage;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('GameOfLife', (expectationFailOutput) => {
      console.log('------' + expectationFailOutput);
      console.log('------' + expectationFailOutput);
    });
    // page.clickLogin();
    // page.clickLogin().then((value) => console.log('_______' + value));
    // typeof page;
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  describe('Login to GameOfLife', () => {
    it('should have a login Button', () => {
      expect(true).toBe(true);
    });

    it(' should show login', () => {});
  });
});
