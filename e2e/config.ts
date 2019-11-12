import { Config } from 'protractor';
import * as _ from 'lodash';
import { ParallelTestHelpers } from './helpers/ParallelTestHelper';


export const config: Config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  ignoreSynchronization: false,

  specs: ['../../e2e/features/'],

  maxSessions: 9,

  capabilities: {
    chrome: {
      browserName: 'chrome',
      maxInstances: 1,
      count: 1
    },
    firefox: {
      browserName: 'firefox',
      maxInstances: 1,
      count: 1,
      acceptInsecureCerts: true
    }
  },

  cucumberOpts: {
    format: ['json:reports/jsonReports/cucumber.json'],
    require: [
      'stepDefinitions/**/*.js',
      'stepDefinitions/*.js',
      'support/*.js',
      'pages/**/*.js'
    ],
    'dry-run': false,
    strict: true
  },

  params: {
    hostname: 'http://localhost:4200'
  },

  /**
   * Default browser is chrome but can include multiple browsers via a comma seperated list
   */
  browsers: 'chrome,firefox',

  /**
   * Booleans to shard tests by either feature or by scenarios
   * Default it by test feature
   */
  isParallelByFeature: true,
  isParallelByScenario: false,

  /**
   * Configures and assigns a set of tests to a browser
   */
  getMultiCapabilities: async function(): Promise<any> {
    let browserCapabilities: object[] = [];
    const browsers = this.browsers.split(',');
    browserCapabilities = browsers.map((browserName: string) => this.capabilities[browserName]);
    if (this.maxSessions === 1) {
      return ParallelTestHelpers.getSingleInstanceCapabilities(browserCapabilities);
    } else {
      config.specs = []; // Reset the specs so protactor does not override the config
      this.specs = [];
      return await ParallelTestHelpers.getParallelBrowserCapabilities(this, browserCapabilities);
    }
  }
};
