# Developer guide

## <a name="setup"></a> Setup your development environment

1. Make sure you have both `node` and `yarn` installed.
2. Angular MDC uses Bazel which requires certain Bash and UNIX tools.
   - On Windows: Follow the [instructions](https://docs.bazel.build/versions/master/install-windows.html#5-optional-install-compilers-and-language-runtimes)
   to install [`MSYS2`](https://www.msys2.org/) and the listed "Common MSYS2 packages".
   Afterwards add `C:\msys64\usr\bin` to the `PATH` environment variable.
3. Fork the `angular-mdc/web` repo on GitHub.
4. Clone your fork to your machine with `git clone`.
5. From the root of the project, run `yarn` to install the dependencies.

## <a name="demo-server"></a> Run demo application
From the root of the project,
```
yarn demo-app
```
After your development server is running, open a browser to url: http://localhost:4200

## <a name="lint"></a> Linting
From the root of the project,
```
yarn lint # Lints typescript using tslint
yarn lint:css # Lints (S)CSS using stylelint
```

## <a name="test"></a> Testing / Coverage Enforcement
From the root of the project,
```
yarn test:watch # Runs karma on ChromeHeadless, re-running when source files change
yarn test # Runs karma, and then runs coverage enforcement checks a single time
```

## <a name="build"></a> Build release
From the root of the project,
```
yarn build # Builds Angular MDC inside of dist/releases/packages
```

## <a name="code-style"></a> Code Style
We follow [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) and our entire coding style is enforced automatically through the use of linters.
* [tslint rules](https://github.com/trimox/angular-mdc-web/blob/master/tslint.json)
* [stylelint config](https://github.com/trimox/angular-mdc-web/blob/master/.stylelint-config.yaml)
