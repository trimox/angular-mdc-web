# Developing for Angular MDC

 - [Infrastructure and Tooling](#tools)
 - [Setup your development environment](#setup)
 - [Running the Development Server](#dev-server)
 - [Linting](#lint)
 - [Testing / Coverage Enforcement](#test)
 - [Building](#build)
 - [Code Style](#code-style)

## <a name="tools"></a> Infrastructure and Tooling

Build System
- [Rollup](https://github.com/rollup/rollup)
  * Provides next-generation ES6 module bundling.

Development Server
- [WebPack](https://webpack.js.org/)
  - Fast, modern development environment (incremental compilation, source maps, live reloading, etc.)

## <a name="setup"></a> Setup your development environment
You'll need a recent version of nodejs and yarn.
Once ready, simply clone our repo (or your fork of it) and install developer dependencies.
```
git clone https://github.com/trimox/angular-mdc-web.git  # or a path to your fork
cd angular-mdc-web
yarn # Install developer dependencies
```

## <a name="dev-server"></a> Running the development server
Run a webpack-dev-server instance that should assist with initial development. (content served from `src/demo-app/`)
```
cd /path/to/angular-mdc-web
npm run start
```
After your development server is running, open a browser to url: http://localhost:4000

## <a name="lint"></a> Linting
```
npm run lint:ts # Lints typescript using tslint
npm run lint:css # Lints (S)CSS using stylelint
npm run lint # Runs both of the above commands in parallel
```

## <a name="test"></a> Testing / Coverage Enforcement
```
npm run test:watch # Runs karma on ChromeHeadless, re-running when source files change
npm test # Runs karma, and then runs coverage enforcement checks a single time.
```

## <a name="build"></a> Building Angular MDC
```
npm run build:release # Builds Angular MDC inside of dist/releases/web
```

## <a name="code-style"></a> Code Style
We follow [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) and our entire coding style is enforced automatically through the use of linters.
* [tslint rules](https://github.com/trimox/angular-mdc-web/blob/master/tslint.json)
* [stylelint config](https://github.com/trimox/angular-mdc-web/blob/master/.stylelint-config.yaml)
