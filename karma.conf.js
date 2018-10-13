const webpackConfig = require('./test/webpack.test.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    webpack: webpackConfig,
    frameworks: ['jasmine'],
    reporters: ['dots', 'coverage-istanbul'],
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    files: [
      'test/test.ts'
    ],
    preprocessors: {
      'test/test.ts': 'webpack'
    },
    coverageIstanbulReporter: {
      dir: 'coverage',
      reports: ['html', 'lcovonly', 'json'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true
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
