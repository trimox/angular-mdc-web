const webpackConfig = require('./test/karma.webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    webpack: webpackConfig,
    frameworks: ['jasmine'],
    middleware: ['fake-url'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-coverage-istanbul-reporter'),
      {
        'middleware:fake-url': [
          'factory',
          function () {
            // Middleware that avoids triggering 404s during tests that need to reference
            // image paths. Assumes that the image path will start with `/$`.
            return function (request, response, next) {
              if (request.url.indexOf('/$') === 0) {
                response.writeHead(200);
                return response.end();
              }

              next();
            }
          }
        ]
      }
    ],
    files: [
      { pattern: 'node_modules/core-js/client/core.min.js', included: true, watched: false },
      { pattern: 'node_modules/core-js/client/core.min.js.map', included: false, watched: false },
      { pattern: 'node_modules/tslib/tslib.js', included: false, watched: false },
      { pattern: 'node_modules/zone.js/dist/zone.min.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/proxy.min.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/sync-test.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/jasmine-patch.min.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/fake-async-test.js', included: true, watched: false },
      // Include all Angular dependencies
      { pattern: 'node_modules/@angular/**/*', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*', included: false, watched: false },
      { pattern: 'test/main.tests.ts', included: true, watched: false }
    ],
    reporters: ['dots', 'coverage-istanbul'],
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    preprocessors: {
      'test/main.tests.ts': 'webpack'
    },
    coverageIstanbulReporter: {
      dir: 'coverage',
      reports: ['html', 'lcov'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        statements: 90,
        lines: 90,
        functions: 90
      }
    },
    port: 9876,
    browserDisconnectTimeout: 40000,
    browserNoActivityTimeout: 120000,
    captureTimeout: 240000,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      "ChromeHeadlessCI": {
        "base": "ChromeHeadless",
        "flags": [
          "--window-size=1024,768",
          "--no-sandbox"
        ]
      }
    }
  });
};
