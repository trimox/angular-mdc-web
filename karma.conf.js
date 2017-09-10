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
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {type: 'lcovonly', subdir: '.'},
        {type: 'json', subdir: '.', file: 'coverage.json'},
        {type: 'html'},
      ],
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
