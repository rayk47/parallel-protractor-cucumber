import { BasePage } from './BasePage';
import { Locator, by } from 'protractor';

export class HomePage extends BasePage {
  public readonly cliDocs: Locator = by.id('cli-docs');
}

