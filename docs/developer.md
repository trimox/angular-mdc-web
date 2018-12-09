# Developing for Angular MDC

 - [Infrastructure and Tooling](#tools)
 - [Setup your development environment](#setup)
 - [Install demo dependencies](#setupdemos)
 - [Running the Demos](#demo-server)
 - [Linting](#lint)
 - [Testing / Coverage Enforcement](#test)
 - [Building](#build)
 - [Code Style](#code-style)

## <a name="setup"></a> Setup your development environment
You'll need a recent version of nodejs and yarn.
Once ready, simply clone our repo (or your fork of it) and install developer dependencies.
```
git clone https://github.com/trimox/angular-mdc-web.git  # or a path to your fork
cd angular-mdc-web
yarn
```

## <a name="setupdemos"></a> Install demo dependencies
Change path to `/path/to/angular-mdc-web/demos`
```
cd /path/to/angular-mdc-web/demos
yarn
```

## <a name="demo-server"></a> Running the demos
Change path to `/path/to/angular-mdc-web/demos`
```
cd /path/to/angular-mdc-web/demos
yarn start
```
After your development server is running, open a browser to url: http://localhost:4200

## <a name="lint"></a> Linting
Change path to `/path/to/angular-mdc-web`
```
cd /path/to/angular-mdc-web
yarn lint # Lints typescript using tslint
yarn lint:css # Lints (S)CSS using stylelint
```

## <a name="test"></a> Testing / Coverage Enforcement
Change path to `/path/to/angular-mdc-web`
```
cd /path/to/angular-mdc-web
yarn test:watch # Runs karma on ChromeHeadless, re-running when source files change
yarn test # Runs karma, and then runs coverage enforcement checks a single time.
```

## <a name="build"></a> Building Angular MDC
Change path to `/path/to/angular-mdc-web`
```
cd /path/to/angular-mdc-web
yarn build:release # Builds Angular MDC inside of dist/releases/web
```

## <a name="code-style"></a> Code Style
We follow [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) and our entire coding style is enforced automatically through the use of linters.
* [tslint rules](https://github.com/trimox/angular-mdc-web/blob/master/tslint.json)
* [stylelint config](https://github.com/trimox/angular-mdc-web/blob/master/.stylelint-config.yaml)
