import {
  ProtractorExpectedConditions,
  protractor,
  ElementFinder,
  browser,
  element,
  by,
  Locator
} from 'protractor';
import { inspect } from 'util';

export class BasePage {
  ec: ProtractorExpectedConditions = protractor.ExpectedConditions;
  private WAIT_TIMEOUT = 20000;
  constructor() {}

  public async waitForElementFinderPresence(ef: ElementFinder): Promise<void> {
    try {
      await browser.wait(this.ec.presenceOf(ef), this.WAIT_TIMEOUT);
    } catch (error) {
      throw error;
    }
  }

  public async getTextFromLocator(locator: Locator): Promise<string> {
    const ef: ElementFinder = await element(locator);
    return await this.getTextFromElementFinder(ef);
  }

  public async getTextFromElementFinder(ef: ElementFinder): Promise<string> {
    await this.waitForElementFinderPresence(ef);
    return await ef.getText();
  }

  public async clickText(textValue: string) {
    const locator: Locator = by.linkText(textValue);
    await this.clickLocator(locator);
  }

  public async clickLocator(locator: Locator): Promise<void> {
    const ef: ElementFinder = await element(locator);
    await this.clickElementFinder(ef);
  }

  public async clickElementFinder(ef: ElementFinder): Promise<void> {
    await this.waitForElementFinderPresence(ef);
    await browser.wait(
      async () => {
        try {
          await browser.sleep(500); // Protractor does not allow for polling in the wait functionality so we have to hack a custom way
          await ef.click();
          return true;
        } catch (error) {
          console.log('Clicking of element was not successful: ' + error);
          return false;
        }
      },
      this.WAIT_TIMEOUT,
      'Clicking of the element failed: ' + inspect(ef)
    );
  }

  public async switchWindows(windowNumber:number){
    let windows = await browser.getAllWindowHandles();
    await browser.switchTo().window(windows[windowNumber]);
  }
}
