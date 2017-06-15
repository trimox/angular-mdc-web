<a name="0.0.0"></a>
# [0.1.12](https://github.com/trimox/angular-mdc-web/compare/v0.1.11...v0.1.12) (2017-06-15)


### Features

* **button:** Add Ripple public property ([cb6187c](https://github.com/trimox/angular-mdc-web/commit/cb6187c))
* **checkbox:** Checkbox Improvements - Complete overhaul ([a9324ae](https://github.com/trimox/angular-mdc-web/commit/a9324ae))
* **fab:** Exposed Ripple as public property ([61a698e](https://github.com/trimox/angular-mdc-web/commit/61a698e))
* **linear-progress:** Add setProgress() and setBuffer() foundation methods as public ([10682d1](https://github.com/trimox/angular-mdc-web/commit/10682d1))
* **menu:** Menu Improvements - Complete overhaul ([cb4061d](https://github.com/trimox/angular-mdc-web/commit/cb4061d))
* **package:** Update to Material Design Components v0.13.0 ([88c3fa0](https://github.com/trimox/angular-mdc-web/commit/88c3fa0))
* **ripple:** Add public activate() and deactivate() foundation methods ([1a5359d](https://github.com/trimox/angular-mdc-web/commit/1a5359d))
* **snackbar:** Add optional 'dismissOnAction' argument to show() method. ([28af9a8](https://github.com/trimox/angular-mdc-web/commit/28af9a8))
* **switch:** Switch Improvements - Complete overhaul ([ce676bd](https://github.com/trimox/angular-mdc-web/commit/ce676bd))
* **toolbar:** Allow mdc-toolbar-title to act as component & directive. ([ad9686f](https://github.com/trimox/angular-mdc-web/commit/ad9686f))


### BREAKING CHANGES

* **switch:** Removed mdc-switch-label directive
* **checkbox:** Removed mdc-checkbox-label directive
* **linear-progress:** Removed component both Input() buffer and progress
* **menu:** Removed [items] property. You'll need to start using the new mdc-menu-item
directive.



<a name="0.0.0"></a>
# [0.1.11](https://github.com/trimox/angular-mdc-web/compare/v0.1.8...v0.1.11) (2017-06-12)


### Bug Fixes

* **checkbox:** Remove ChangeDetectionStategy as it breaks ngModel binding ([8f4ef37](https://github.com/trimox/angular-mdc-web/commit/8f4ef37))
* **switch:** Remove ChangeDetectionStrategy as it breaks ngModel binding ([0bc4ae3](https://github.com/trimox/angular-mdc-web/commit/0bc4ae3))
* **textfield:** Fixed model binding of values if componenent had an *ngIf applied. ([93c823c](https://github.com/trimox/angular-mdc-web/commit/93c823c))


### Features

* **snackbar-demo:** Added ngModel binding for Snackbar demo; change snackbar properties dynamically ([a7ca243](https://github.com/trimox/angular-mdc-web/commit/a7ca243))


### Performance Improvements

* **common:** Core production library is now minified. Smaller production footprint. ([ba304b2](https://github.com/trimox/angular-mdc-web/commit/ba304b2))



<a name="0.1.8"></a>
# [0.1.8](https://github.com/trimox/angular-mdc-web/compare/v0.1.7...v0.1.8) (2017-06-07)


### Features

* **typography:** Add MDC Typography directives. ([134aea6](https://github.com/trimox/angular-mdc-web/commit/134aea6))
* **demo-app:** Add MDC Typography demo and documentation ([b961fb4](https://github.com/trimox/angular-mdc-web/commit/b961fb4))
* **package:** Upgrade to Material Design Components 0.12.1. ([516815b](https://github.com/trimox/angular-mdc-web/commit/516815b))
* **demo-app:** Add 'disabled' attribute demo with checkbox for textfield. ([b4752eb](https://github.com/trimox/angular-mdc-web/commit/b4752eb))
* **textfield:** Add disabled Input using Foundation API ([0ef970f](https://github.com/trimox/angular-mdc-web/commit/0ef970f))



<a name="0.1.7"></a>
# [0.1.7](https://github.com/trimox/angular-mdc-web/compare/v0.1.6...v0.1.7) (2017-06-06)


### Bug Fixes

* **demo-app:** Add responsive styling to demo app ([2a9b492](https://github.com/trimox/angular-mdc-web/commit/2a9b492))


### Features

* **checkbox:** Add `disabled` boolean attribute ([7b04cb9](https://github.com/trimox/angular-mdc-web/commit/7b04cb9))
* **demo-app:** Add demo for Linear Progress. ([9e56936](https://github.com/trimox/angular-mdc-web/commit/9e56936))
* **linear-progress:** Add MDC Linear Progress component wrapper ([d823078](https://github.com/trimox/angular-mdc-web/commit/d823078))



<a name="0.1.6"></a>
# [0.1.6](https://github.com/trimox/angular-mdc-web/compare/v0.1.5...v0.1.6) (2017-05-30)


### Features

* **snackbar:** Add `dismissOnAction` function made available in MDC 0.12.0 ([af1a5b2](https://github.com/trimox/angular-mdc-web/commit/af1a5b2))



<a name="0.0.0"></a>
# [0.1.5](https://github.com/trimox/angular-mdc-web/compare/v0.1.4...v0.1.5) (2017-05-30)


### Features

* **toolbar:** Add MDC Toolbar wrapper ([7f58efc](https://github.com/trimox/angular-mdc-web/commit/7f58efc))
* **demo-app:** Add MDC toolbar to the top of the demo-app. Better examples will follow.. ([7234309](https://github.com/trimox/angular-mdc-web/commit/7234309))


<a name="0.1.4"></a>
# [0.1.4](https://github.com/trimox/angular-mdc-web/compare/v0.1.3...v0.1.4) (2017-05-28)


### Features

* **checkbox:** Implement MDC checkbox wrapper ([#9](https://github.com/trimox/angular-mdc-web/issues/9)) ([14695c0](https://github.com/trimox/angular-mdc-web/commit/14695c0))
* **demo-app:** Add demo-app source back into the repo ([#8](https://github.com/trimox/angular-mdc-web/issues/8)) ([d7e431a](https://github.com/trimox/angular-mdc-web/commit/d7e431a))



<a name="0.1.3"></a>
# [0.1.3](https://github.com/trimox/angular-mdc-web/compare/v0.1.0...v0.1.3) (2017-05-16)


### Features

* **button:** Button selector changed from 'mdc-button' to 'button'. Disabled input added. ([c95dc01](https://github.com/trimox/angular-mdc-web/commit/c95dc01))
* **fab:** FAB selector changed from 'mdc-fab' to 'button'. Disabled input added. ([ec21648](https://github.com/trimox/angular-mdc-web/commit/ec21648))
* **textfield:** Add MDC Textfield's new property badInput; validity check in getNativeInput() ([08d1129](https://github.com/trimox/angular-mdc-web/commit/08d1129))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/trimox/angular-mdc-web/compare/v0.0.2...v0.1.0) (2017-05-12)


### Bug Fixes

* **snackbar:** Remove check for root element on deRegister events ([40cdf83](https://github.com/trimox/angular-mdc-web/commit/40cdf83))


### Features

* **form-field:** Implement MDC Form Field using foundation API. ([7b7c750](https://github.com/trimox/angular-mdc-web/commit/7b7c750))
* **switch:** Implement MDC Switch ([ee55286](https://github.com/trimox/angular-mdc-web/commit/ee55286))



<a name="0.0.2"></a>
## [0.0.2](https://github.com/trimox/angular-mdc-web/compare/0cc205d...v0.0.2) (2017-05-11)


### Bug Fixes

* **textfield:** Add prefilled value check to writeValue ([a27b2a1](https://github.com/trimox/angular-mdc-web/commit/a27b2a1))
* **textfield:** Add support for prefilled values ([20099a6](https://github.com/trimox/angular-mdc-web/commit/20099a6))


### Features

* **button:** Change ripple on button to a provider. Show ripple on keyboard up and down events. ([d424b32](https://github.com/trimox/angular-mdc-web/commit/d424b32))
* **demo:** Add MenuModule to application and include MDC theme, elevation and typography scss ([a9a34b1](https://github.com/trimox/angular-mdc-web/commit/a9a34b1))
* **demo:** Import our new RippleModule for demo-app ([430ca24](https://github.com/trimox/angular-mdc-web/commit/430ca24))
* **demo-app:** Add MDC FAB example ([b50605f](https://github.com/trimox/angular-mdc-web/commit/b50605f))
* **demo-app:** Add MDC simple menu example to demo page.. ([86fde6b](https://github.com/trimox/angular-mdc-web/commit/86fde6b))
* **demo-app:** Add MDC Snackbar example using Angular ([a7fa5c5](https://github.com/trimox/angular-mdc-web/commit/a7fa5c5))
* **demo-app:** Initial commit ([73123b3](https://github.com/trimox/angular-mdc-web/commit/73123b3))
* **menu:** Add menu-item directive ([2e94d8b](https://github.com/trimox/angular-mdc-web/commit/2e94d8b))
* **menu:** Initial commit for MDC menu foundation integration ([5587eb2](https://github.com/trimox/angular-mdc-web/commit/5587eb2))
* **publish:** Initial commit ([0cc205d](https://github.com/trimox/angular-mdc-web/commit/0cc205d))
* **ripple:** Adds /ripple/index.ts for simpler import of ripple class ([0ad6dea](https://github.com/trimox/angular-mdc-web/commit/0ad6dea))
* **ripple:** Ripple redone using MDCRippleFoundation with adapter API ([939bd63](https://github.com/trimox/angular-mdc-web/commit/939bd63))
* **snackbar:** Implemented MDC Snackbar wrapper ([ebbbc4f](https://github.com/trimox/angular-mdc-web/commit/ebbbc4f))

