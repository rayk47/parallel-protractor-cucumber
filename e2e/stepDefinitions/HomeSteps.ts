import { Given } from 'cucumber';
import { HomePage } from '../pages/HomePage';
import { browser } from 'protractor';

const homePage: HomePage = new HomePage();

Given('I navigate to {string}', async function(page: string) {
  await homePage.clickText(page);
  await homePage.switchWindows(1);
  await browser.waitForAngularEnabled(false);
});
