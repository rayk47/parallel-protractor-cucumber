import { GithubBasePage } from './GithubBasePage';
import { Locator, by } from 'protractor';

export class WikiPage extends GithubBasePage {
  public readonly pageHeader: Locator = by.id('wiki-content');
}
