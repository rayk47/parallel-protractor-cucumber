import { BasePage } from '../BasePage';
import { Locator, by } from 'protractor';

export class GithubBasePage extends BasePage {

  public readonly currentPage: Locator = by.css('a[aria-current="page"]');
}
