import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { inject } from '@angular/core';

describe('GameOfLife App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('GameOfLife');
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

  describe('Login to GameOfIfe', () => {
    it('should have a login Button', () => {
        expect(true).toBe(true);
    });

    it(' should show login',() => {

    });

    it(' should show login',() => {

    });
  }
});
