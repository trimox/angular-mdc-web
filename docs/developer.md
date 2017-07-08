# Developing for Angular MDC

 - [Infrastructure and Tooling](#tools)
 - [Setup your development environment](#setup)
 - [Running the Development Server](#dev-server)
 - [Linting / Testing](#lint)
 - [Building](#build)
 - [Code Style](#code-style)
 - [Submit Pull Request](#pull-req)

## <a name="tools"></a> Infrastructure and Tooling

Build System
- [Rollup](https://github.com/rollup/rollup)
  * Provides next-generation ES6 module bundling.

Development Server
- [WebPack](https://webpack.js.org/)
  - Fast, modern development environment (incremental compilation, source maps, live reloading, etc.)

## <a name="setup"></a> Setup your development environment
You'll need a recent version of nodejs.
```
npm i npm@latest -g
```
Once node is installed, simply clone our repo (or your fork of it) and install developer dependencies.
```
git clone https://github.com/trimox/angular-mdc-web.git  # or a path to your fork
cd angular-mdc-web
npm i # Install developer dependencies
```

## <a name="dev-server"></a> Running the development server
Run a webpack-dev-server instance that should assist with initial development. (content served from `src/demo-app/`)
```
cd /path/to/angular-mdc-web
npm run start
```
After your development server is running, open a browser to url: http://localhost:4000

## <a name="lint"></a> Linting / Testing
```
npm run lint:ts # Lints typescript using tslint
npm run lint:css # Lints (S)CSS using stylelint
npm run lint # Runs both of the above commands in parallel
```

## <a name="build"></a> Building Angular MDC
```
npm run build # Builds Angular MDC inside of dist/
```

## <a name="code-style"></a> Code Style
We follow [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) and our entire coding style is enforced automatically through the use of linters.
* [tslint rules](https://github.com/trimox/angular-mdc-web/blob/master/tslint.json)
* [stylelint config](https://github.com/trimox/angular-mdc-web/blob/master/.stylelint-config.yaml)

## <a name="pull-req"></a> Submit a Pull Request
When submitting PRs, make sure you're following our commit message conventions; our commit-msg hook should automatically enforce this. We also use [commitizen](https://www.npmjs.com/package/commitizen), which you can use to auto-format commit messages for you.

When submitting PRs for large changes, be sure to include an adequate background in the description so that reviewers of the PR know what the changes entail at a high-level, the motivations for making these changes, and what they affect.
