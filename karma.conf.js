const webpackConfig = require('./test/webpack.test.js');

module.exports = function(config) {
  config.set({
    webpack: webpackConfig,
    frameworks: ['jasmine'],
    reporters: ['dots', 'coverage'],
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    files: [
      'test/index.ts',
    ],
    preprocessors: {
      'test/index.ts': ['webpack']
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {type: 'lcovonly', subdir: '.'},
        {type: 'json', subdir: '.', file: 'coverage.json'},
        {type: 'html'},
      ],
    },
    webpackMiddleware: {
      noInfo: true,
    },
    port: 9876,
    browserDisconnectTimeout: 40000,
    browserNoActivityTimeout: 120000,
    captureTimeout: 240000,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
  });
};
