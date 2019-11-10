import { WikiPage } from '../../pages/github/AngularCliWikiPage';
import { Given } from 'cucumber';
import { browser } from 'protractor';
import * as chai from 'chai';

const wikiPage: WikiPage = new WikiPage();

Given('I should be on the angular wiki page', async function() {
  await wikiPage.getTextFromLocator(wikiPage.pageHeader);
  const currentUrl: string =  await browser.getCurrentUrl();
  chai.assert.equal(currentUrl, "https://github.com/angular/angular-cli/wiki", "Incorrect wiki page opened");
});
