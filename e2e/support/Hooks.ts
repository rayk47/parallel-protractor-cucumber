import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  HookScenarioResult,
  setDefaultTimeout
} from 'cucumber';
import { browser } from 'protractor';
import * as moment from 'moment';
let startTime: string;
let endTime: string;

BeforeAll({}, async function() {
  startTime = moment().toLocaleString();
  setDefaultTimeout(50000);
});

Before({ tags: '@wip' }, async function() {
  return 'skipped';
});

Before({}, async function() {
  await browser.waitForAngularEnabled(true); // Only use if it's an angular app
  await browser.get(browser.params.hostname);
});

After({}, async function(result: HookScenarioResult) {

});

AfterAll({}, async function() {
  await browser.quit();
  endTime = moment().toLocaleString();
  console.log('Start Time: ' + startTime);
  console.log('End Time: ' + endTime);
});
