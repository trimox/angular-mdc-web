const path = require('path');
const webpackConfig = require('./config/webpack/webpack.test.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'mocha'],
    reporters: ['dots', 'coverage'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    files: [
      'test/unit/index.ts',
    ],
    preprocessors: {
      'test/unit/index.ts': ['webpack']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage/remaped-html',
        lcovonly: 'coverage/lcov.info',
        'text-summary': null
      }
    },
    client: {
      mocha: {
        reporter: 'html',
        ui: 'qunit',
      },
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    port: 9876,
    browserDisconnectTimeout: 40000,
    browserNoActivityTimeout: 120000,
    captureTimeout: 240000,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
  });
};

if (process.env['TRAVIS']) {
  // TODO(trimox): Create test steps for travis-ci
};