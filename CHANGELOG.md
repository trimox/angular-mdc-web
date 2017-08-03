<a name="0.0.0"></a>
# [0.2.4](https://github.com/trimox/angular-mdc-web/compare/v0.2.3...v0.2.4) (2017-08-03)


### Bug Fixes

* **button:** Fix keyboard event propagation + refactor ([4b17028](https://github.com/trimox/angular-mdc-web/commit/4b17028)), closes [#60](https://github.com/trimox/angular-mdc-web/issues/60)
* **fab:** Fix keyboard event propagation + refactor ([fc310fe](https://github.com/trimox/angular-mdc-web/commit/fc310fe)), closes [#60](https://github.com/trimox/angular-mdc-web/issues/60)
* **fab:** Disabled FAB will now remove Ripple classes ([f1e7919](https://github.com/trimox/angular-mdc-web/commit/f1e7919))
* **switch:** Disabled Switch will now remove Ripple classes ([94dd087](https://github.com/trimox/angular-mdc-web/commit/94dd087))
* **textfield:** Use correct Ripple import path ([c4d23b6](https://github.com/trimox/angular-mdc-web/commit/c4d23b6))


### Features

* **tabs:** Implement MDC Tabs ([f713789](https://github.com/trimox/angular-mdc-web/commit/f713789))
* **package:** Export individual component & directive classes ([#62](https://github.com/trimox/angular-mdc-web/issues/62)) ([75b6f21](https://github.com/trimox/angular-mdc-web/commit/75b6f21))



<a name="0.0.0"></a>
# [0.2.3](https://github.com/trimox/angular-mdc-web/compare/v0.2.2...v0.2.3) (2017-07-25)


### Features

* **drawer:** Implement MDC Drawer ([#54](https://github.com/trimox/angular-mdc-web/issues/54)) ([a4796b8](https://github.com/trimox/angular-mdc-web/commit/a4796b8))
* **package:** Update to Material Design Components v0.16.0 ([e004529](https://github.com/trimox/angular-mdc-web/commit/e004529))
* **textfield:** Add [dense] bool property to shrink font size/height. ([df4443d](https://github.com/trimox/angular-mdc-web/commit/df4443d))
* **textfield:** Implement MDC Text field boxes ([e440d73](https://github.com/trimox/angular-mdc-web/commit/e440d73)), closes [#57](https://github.com/trimox/angular-mdc-web/issues/57)



<a name="0.0.0"></a>
# [0.2.2](https://github.com/trimox/angular-mdc-web/compare/v0.2.1...v0.2.2) (2017-07-17)


### Bug Fixes

* **snackbar:** Fix actionHandler was required if actionText is empty ([59de0a8](https://github.com/trimox/angular-mdc-web/commit/59de0a8))


### Features

* **list:** Implement MDC List ([#51](https://github.com/trimox/angular-mdc-web/issues/51)) ([8738b18](https://github.com/trimox/angular-mdc-web/commit/8738b18)), closes [#50](https://github.com/trimox/angular-mdc-web/issues/50)
* **form-field:** Implement MDC Form Field ([f6a3c7a](https://github.com/trimox/angular-mdc-web/commit/f6a3c7a))
* **ripple:** Improvements + add disabled property ([3eab913](https://github.com/trimox/angular-mdc-web/commit/3eab913))
* **button:** Add [disableRipple] property + remove form-field import ([7ee954d](https://github.com/trimox/angular-mdc-web/commit/7ee954d))
* **checkbox:** Add [disableRipple] + remove form-field import ([2805e20](https://github.com/trimox/angular-mdc-web/commit/2805e20))
* **fab:** Add [disableRipple] + refactoring ([adfffa2](https://github.com/trimox/angular-mdc-web/commit/adfffa2))
* **infrastructure:** Add EventRegistry for Listen/Unlisten management ([d02e7c3](https://github.com/trimox/angular-mdc-web/commit/d02e7c3))
* **radio:** Add [disableRipple] + remove form-field import ([d13937c](https://github.com/trimox/angular-mdc-web/commit/d13937c))
* **switch:** Add [disableRipple] + remove form-field import ([19ae3b3](https://github.com/trimox/angular-mdc-web/commit/19ae3b3))
* **theme:** Add boolean property to [mdc-theme-dark] directive ([07ec20a](https://github.com/trimox/angular-mdc-web/commit/07ec20a))



<a name="0.2.1"></a>
# [0.2.1](https://github.com/trimox/angular-mdc-web/compare/v0.2.0...v0.2.1) (2017-07-14)

### Bug Fixes

* **switch:** Remove redundant [ngModel] bind from html template ([a594aa5](https://github.com/trimox/angular-mdc-web/commit/a594aa5))
* **typography:** Fix missing module import of [typography] ([67517dd](https://github.com/trimox/angular-mdc-web/commit/67517dd))


### Code Refactoring

* **infrastructure:** refactor(infrastructure): Use ES2015 import for MDC Foundation API's. ([dd21a75](https://github.com/trimox/angular-mdc-web/commit/dd21a75))


### Features

* **package:** Update to Material Design Components v0.15.0 ([0985e5c](https://github.com/trimox/angular-mdc-web/commit/0985e5c))
* **button:** Add [disabled] boolean input property. ([9a437c8](https://github.com/trimox/angular-mdc-web/commit/9a437c8))
* **button:** Add native <a> element support with "href" attribute. ([1c6dabf](https://github.com/trimox/angular-mdc-web/commit/1c6dabf))
* **fab:** Add [disabled] boolean input property. ([9315f41](https://github.com/trimox/angular-mdc-web/commit/9315f41))
* **fab:** Add native <a> element support with "href" attribute. ([e8cb314](https://github.com/trimox/angular-mdc-web/commit/e8cb314))
* **infrastructure:** Add toBoolean function to lib/common ([23ddbc6](https://github.com/trimox/angular-mdc-web/commit/23ddbc6))
* **material-icon:** Add [material-icon] directive ([7ee67e5](https://github.com/trimox/angular-mdc-web/commit/7ee67e5))
* **menu:** Add/Export MenuOpenFrom enum from Menu ([066294c](https://github.com/trimox/angular-mdc-web/commit/066294c))
* **snackbar:** Add [alignStart] boolean input ([b51181b](https://github.com/trimox/angular-mdc-web/commit/b51181b))
* **snackbar:** Add [dismissOnAction] boolean input ([563eb9b](https://github.com/trimox/angular-mdc-web/commit/563eb9b))
* **snackbar:** Add directives for action-wrapper, action-button and text ([4ac2c76](https://github.com/trimox/angular-mdc-web/commit/4ac2c76))
* **snackbar:** Add exported SnackbarMessage interface ([b654bb3](https://github.com/trimox/angular-mdc-web/commit/b654bb3))
* **snackbar:** Add MDC's upcoming foundation adapter functions ([14ec2be](https://github.com/trimox/angular-mdc-web/commit/14ec2be))
* **snackbar:** Export SnackbarMessage from Snackbar ([65538e1](https://github.com/trimox/angular-mdc-web/commit/65538e1))
* **snackbar:** Improvements + added MDC v0.15 upcoming features. ([b2c4147](https://github.com/trimox/angular-mdc-web/commit/b2c4147))


### Performance Improvements

* **demo:** Ahead-of-Time compilation + Rollup bundling ([#49](https://github.com/trimox/angular-mdc-web/issues/49)) ([7c2293d](https://github.com/trimox/angular-mdc-web/commit/7c2293d))


### BREAKING CHANGES

* **menu:** MenuOpenFrom enum replaces MDC_OPEN_FROM and now can be imported. Please update
your code accordingly.



<a name="0.2.0"></a>
# [0.2.0](https://github.com/trimox/angular-mdc-web/compare/v0.1.19...v0.2.0) (2017-07-06)


### Code Refactoring

* **toolbar:** Refactor foundation adapter and child directives. ([b3ba3b0](https://github.com/trimox/angular-mdc-web/commit/b3ba3b0))


### Features

* **toolbar:** Add foundation updateAdjustElementStyles() public method. ([d06d671](https://github.com/trimox/angular-mdc-web/commit/d06d671))
* **toolbar:** Fixed toolbars will programmatically set `FixedAdjustElement` style on next node element ([2b7d221](https://github.com/trimox/angular-mdc-web/commit/2b7d221))
* **docs:** Add getting started walkthrough + developer guide ([f6cdba1](https://github.com/trimox/angular-mdc-web/commit/f6cdba1))

### Performance Improvements

* **infrastructure:** Implement Rollup ES6 module bundling. *Breaking changes* ([ba521d6](https://github.com/trimox/angular-mdc-web/commit/ba521d6))


### BREAKING CHANGES

* **toolbar:** [flexibleDefaultBehavior] replaces [flexibleTitle]. Please update your code accordingly.
* **infrastructure:** We no longer import the SCSS for each component. Please update your code to import the MDC Theme for your application.

The reason we do not import our component SCSS anymore is we need to provide developers flexibility and creativity for theming their apps. For example, if using Angular CLI you can now import the MDC theme.
```ts
@import "material-components-web/material-components-web";
```


<a name="0.0.0"></a>
# [0.1.19](https://github.com/trimox/angular-mdc-web/compare/v0.1.18...v0.1.19) (2017-07-03)


### Bug Fixes

* **textfield:** Fix getNativeInput adapter method and use foundation isDisabled. ([f7600ed](https://github.com/trimox/angular-mdc-web/commit/f7600ed))


### Features

* **checkbox:** Add value, name binding and refactor foundation wrapper integration. ([#38](https://github.com/trimox/angular-mdc-web/issues/38)) ([68a2e47](https://github.com/trimox/angular-mdc-web/commit/68a2e47))
* **elevation:** Add MDC Elevation using [mdc-elevation]="#" directive. ([257cb04](https://github.com/trimox/angular-mdc-web/commit/257cb04))
* **theme:** Implement MDC Theme - mdc-theme-dark directive. ([0583bf7](https://github.com/trimox/angular-mdc-web/commit/0583bf7))
* **toolbar:** Add mdc-toolbar-icon and mdc-toolbar-icon-menu directives. ([1965a3a](https://github.com/trimox/angular-mdc-web/commit/1965a3a))


### Performance Improvements

* **linear-progress:** Use foundation api for indeterminate and reverse property sets. ([8382aa8](https://github.com/trimox/angular-mdc-web/commit/8382aa8))


### BREAKING CHANGES

* **elevation:** Removed depreciated mdc-elevation-z# directives. Please update your code
accordingly.



<a name="0.0.0"></a>
# [0.1.18](https://github.com/trimox/angular-mdc-web/compare/v0.1.17...v0.1.18) (2017-07-02)


### Bug Fixes

* **menu:** Fix openFrom attribute & convert values to string enum. ([#37](https://github.com/trimox/angular-mdc-web/issues/37)) ([32e722d](https://github.com/trimox/angular-mdc-web/commit/32e722d))
* **radio:** Fix ngModel binding. Major refactoring of foundation wrapper. ([#36](https://github.com/trimox/angular-mdc-web/issues/36)) ([584d3d2](https://github.com/trimox/angular-mdc-web/commit/584d3d2))


### Features

* **elevation:** Implement MDC Elevation and Transition ([#32](https://github.com/trimox/angular-mdc-web/issues/32)) ([7f676ae](https://github.com/trimox/angular-mdc-web/commit/7f676ae))
* **infrastructure:** Add Angular Universal (server rendering) support. ([#34](https://github.com/trimox/angular-mdc-web/issues/34)) ([c865d8e](https://github.com/trimox/angular-mdc-web/commit/c865d8e)), closes [#33](https://github.com/trimox/angular-mdc-web/issues/33)



<a name="0.0.0"></a>
# [0.1.17](https://github.com/trimox/angular-mdc-web/compare/v0.1.16...v0.1.17) (2017-06-24)


### Bug Fixes

* **card:** Rename ambiguous Input from titleLarge to large. ([dd96c06](https://github.com/trimox/angular-mdc-web/commit/dd96c06))
* **components:** Fix class overriding for each component. ([#29](https://github.com/trimox/angular-mdc-web/issues/29)) ([41e38e0](https://github.com/trimox/angular-mdc-web/commit/41e38e0)), closes [#25](https://github.com/trimox/angular-mdc-web/issues/25)


### Features

* **docs:** Add/Update Getting Started guide, README and CONTRIBUTING ([#30](https://github.com/trimox/angular-mdc-web/issues/30)) ([89144b7](https://github.com/trimox/angular-mdc-web/commit/89144b7))
* **typography:** Add mdc-typography directive to define basic properties on a site. ([d100bcc](https://github.com/trimox/angular-mdc-web/commit/d100bcc))


### BREAKING CHANGES

* **card:** Input `titleLarge` has been renamed to `large`. Please update your code
accordingly.



<a name="0.0.0"></a>
# [0.1.16](https://github.com/trimox/angular-mdc-web/compare/v0.1.15...v0.1.16) (2017-06-23)


### Bug Fixes

* **toolbar:** Fix class overriding custom entries. ([#28](https://github.com/trimox/angular-mdc-web/issues/28)) ([a448f60](https://github.com/trimox/angular-mdc-web/commit/a448f60))


### Features

* **card:** Implement MDC Card component. ([#24](https://github.com/trimox/angular-mdc-web/issues/24)) ([301dbf](https://github.com/trimox/angular-mdc-web/commit/301dbf))
* **infrastructure:** Add new test for style-lint during Travis-CI and local builds. ([#27](https://github.com/trimox/angular-mdc-web/issues/27)) ([ef7104a](https://github.com/trimox/angular-mdc-web/commit/ef7104a))
* **toolbar:** Add ToolbarFixedAdjust directive. ([#18](https://github.com/trimox/angular-mdc-web/issues/18)) ([5ea4719](https://github.com/trimox/angular-mdc-web/commit/5ea4719))



<a name="0.0.0"></a>
# [0.1.15](https://github.com/trimox/angular-mdc-web/compare/v0.1.12...v0.1.15) (2017-06-20)


### Features

* **radio:** Add MDC Radio Button component ([840d35a](https://github.com/trimox/angular-mdc-web/commit/840d35a))
* **checkbox:** Add aria-label and aria-labelledby properties. Refactored disabled property. ([229377e](https://github.com/trimox/angular-mdc-web/commit/229377e))
* **codecov:** Add Codecov for code coverage reporting. ([#16](https://github.com/trimox/angular-mdc-web/issues/16)) ([4eefcde](https://github.com/trimox/angular-mdc-web/commit/4eefcde)), closes [#12](https://github.com/trimox/angular-mdc-web/issues/12)
* **menu:** Add openFrom property for overriding opening point. ([24911c5](https://github.com/trimox/angular-mdc-web/commit/24911c5))
* **switch:** Add aria-label and aria-labelledby properties. Refactored disabled property. ([f65fc5a](https://github.com/trimox/angular-mdc-web/commit/f65fc5a))



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

