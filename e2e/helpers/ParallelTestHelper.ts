const { PickleFilter, getTestCasesFromFilesystem } = require('cucumber');
import * as _ from 'lodash';
import glob = require('glob');
import { EventEmitter } from 'events';
import { Config } from 'protractor';
const eventBroadcaster = new EventEmitter();

export class ParallelTestHelpers {
  constructor() {}

  /**
   * Shard the tests by parallel run type (by feature or scenario)
   */
  static getTestsShardedByParallelType(testConfig: Config, testCases: any[]): string[] {
    const shardedTests: string[] = [];
    for (let i = 0; i < testCases.length; i++) {
      const testCase: any = testCases[i];
      if (testConfig.isParallelByFeature) {
        shardedTests.push(testCase.uri);
      } else if (testConfig.isParallelByScenario) {
        const testScenario = testCase.uri + ':' + testCase.pickle.locations[0].line;
        shardedTests.push(testScenario);
      } else {
        throw Error(
          'You must set a sharding type [isParallelByFeature = true OR isParallelByScenario = true]'
        );
      }
    }
    return _.uniq(shardedTests);
  }

  /**
   * Get all the cucumber tests that satisfy the conditions of our cucumber configuration (tags etc..)
   */
static async getCucumberTestsByConfig(testConfig: Config): Promise<any> {
    const cucumberTestSuiteTags: string = ParallelTestHelpers.getCucumberTagsFromCli(testConfig);
    const cucumberFeatureFilePaths: string[] = ParallelTestHelpers.getFeatureFilePaths();
    const tests = await getTestCasesFromFilesystem({
      cwd: '',
      eventBroadcaster: eventBroadcaster,
      featurePaths: cucumberFeatureFilePaths,
      order: 'random',
      pickleFilter: new PickleFilter({
        tagExpression: cucumberTestSuiteTags
      })
    });
    return _.uniq(tests);
  }

  /**
   * Get the paths of all feature files included in the project
   */
  static getFeatureFilePaths(): string[] {
    const featureFilePaths = glob.sync('e2e/features/**/*.feature');
    return _.sortedUniq(featureFilePaths);
  }

  /**
   * Get all the tags being run
   * E.g. (not @wip) and (@feature1)
   */
  static getCucumberTagsFromCli(testConfig: Config): string {
    return testConfig.cucumberOpts.tags || '';
  }

  static getSingleInstanceCapabilities(capabilities: any): object {
    console.log('Not running tests in parallel');
    return capabilities;
  }

  static async getParallelBrowserCapabilities(testConfig: Config, capabilities: any[]): Promise<any> {
    console.log('Running tests in parallel');
    const allTestCases =  await ParallelTestHelpers.getCucumberTestsByConfig(testConfig);
    const shardedTestCases = ParallelTestHelpers.getTestsShardedByParallelType(testConfig, allTestCases);
    const configs = [];
    _.map(shardedTestCases, shard => {
      _.map(capabilities, function(capability) {
        const browserConfig = {
          specs: ['../../' + shard],
          shardTestFiles: false,
          maxInstances: 1
        };
        configs.push(_.merge(browserConfig, capability));
      });
    });
    return configs;
  }
}
