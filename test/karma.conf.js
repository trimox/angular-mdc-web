const path = require('path');
const {customLaunchers} = require('./browser-providers');

module.exports = config => {
  config.set({
    basePath: path.join(__dirname, '..'),
    frameworks: ['jasmine'],
    middleware: ['fake-url'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-firefox-launcher'),
      {
        'middleware:fake-url': [
          'factory',
          function() {
            // Middleware that avoids triggering 404s during tests that need to reference
            // image paths. Assumes that the image path will start with `/$`.
            return function(request, response, next) {
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
      {pattern: 'node_modules/core-js/client/core.min.js', included: true, watched: false},
      {pattern: 'node_modules/core-js/client/core.min.js.map', included: false, watched: false},
      {pattern: 'node_modules/tslib/tslib.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/system.js', included: true, watched: false},
      {pattern: 'node_modules/systemjs/dist/system.js.map', included: false, watched: false},
      {pattern: 'node_modules/zone.js/dist/zone.min.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/proxy.min.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/sync-test.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/jasmine-patch.min.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/fake-async-test.js', included: true, watched: false},
      {pattern: 'node_modules/@material/*/dist/*', included: false, watched: false},

      // Include all Angular dependencies
      {pattern: 'node_modules/@angular/**/*', included: false, watched: false},
      {pattern: 'node_modules/rxjs/**/*', included: false, watched: false},

      // The Karma system configuration is built by Bazel. The built System config
      // is copied into the "dist/" folder so that the Karma config can use it.
      {pattern: 'dist/karma-system-config.js', included: true, watched: false},
      {pattern: 'test/karma-test-shim.js', included: true, watched: false},

      // Needed for exposing the RxJS operators through the RxJS UMD bundle. This
      // is done for performance reasons since fetching individual files is slow.
      {pattern: 'tools/system-rxjs-operators.js', included: false, watched: false},

      // Includes all package tests and source files into karma. Those files will be watched.
      // This pattern also matches all sourcemap files and TypeScript files for debugging.
      {pattern: 'dist/packages/**/*', included: false, watched: true},
    ],

    customLaunchers: customLaunchers,

    preprocessors: {'dist/packages/**/*.js': ['sourcemap']},

    reporters: ['dots'],
    autoWatch: false,

    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 300000,

    browsers: ['ChromeHeadlessLocal'],
    singleRun: false,

    // Try Websocket for a faster transmission first. Fallback to polling if necessary.
    transports: ['websocket', 'polling'],

    browserConsoleLogOptions: {terminal: true, level: 'log'},

    client: {
      jasmine: {
        random: false
      }
    },
  });
};
