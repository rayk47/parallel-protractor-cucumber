# Run protractor in parallel mode

Protractor with cucumber does not allow tests to run in parallel (There is a bug that the full test suite is duplicated across each instance of the browser).
This repo shows between the config.ts file and ParallelTestHelper.ts how to run tests in parallel for 1 or n browsers with multiple instances of each browser.
