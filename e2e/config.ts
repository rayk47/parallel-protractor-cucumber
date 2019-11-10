import { Config } from 'protractor';

export const config: Config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  ignoreSynchronization: false,

  specs: ['../../e2e/features/'],

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
  }
};
