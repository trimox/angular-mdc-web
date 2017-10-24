<a name="0.0.0"></a>
# [0.5.5](https://github.com/trimox/angular-mdc-web/compare/v0.5.4...v0.5.5) (2017-10-24)


### Bug Fixes

* **package:** Add export for MaterialModule ([#315](https://github.com/trimox/angular-mdc-web/issues/315)) ([6b2d22d](https://github.com/trimox/angular-mdc-web/commit/6b2d22d)), closes [#309](https://github.com/trimox/angular-mdc-web/issues/309)
* **select:** Hidden label on scroll ([63c096c](https://github.com/trimox/angular-mdc-web/commit/63c096c)), closes [#306](https://github.com/trimox/angular-mdc-web/issues/306)


### Performance Improvements

* **select:** Use Observable subscription to detect scroll ([354659e](https://github.com/trimox/angular-mdc-web/commit/354659e))



<a name="0.0.0"></a>
# [0.5.4](https://github.com/trimox/angular-mdc-web/compare/v0.5.3...v0.5.4) (2017-10-21)


### Bug Fixes

* **card:** Conditional card expression changed error ([#294](https://github.com/trimox/angular-mdc-web/issues/294)) ([576964c](https://github.com/trimox/angular-mdc-web/commit/576964c)), closes [#293](https://github.com/trimox/angular-mdc-web/issues/293)
* **tabs:** Correct `mdc-tab-bar-scroller` class binding ([#283](https://github.com/trimox/angular-mdc-web/issues/283)) ([626d216](https://github.com/trimox/angular-mdc-web/commit/626d216))
* **textfield:** Use tabIndex instead of tabindex ([#301](https://github.com/trimox/angular-mdc-web/issues/301)) ([a49c68f](https://github.com/trimox/angular-mdc-web/commit/a49c68f))
* **toolbar:** Remove fixed toolbar's `margin-top` OnDestroy ([#292](https://github.com/trimox/angular-mdc-web/issues/292)) ([2e618fa](https://github.com/trimox/angular-mdc-web/commit/2e618fa)), closes [#267](https://github.com/trimox/angular-mdc-web/issues/267)


### Features

* **select:** Implement MDC Select ([#278](https://github.com/trimox/angular-mdc-web/issues/278)) ([ada36aa](https://github.com/trimox/angular-mdc-web/commit/ada36aa)), closes [#65](https://github.com/trimox/angular-mdc-web/issues/65)
* **textfield:** Updated UX states for Text Field ([#285](https://github.com/trimox/angular-mdc-web/issues/285)) ([cbe1953](https://github.com/trimox/angular-mdc-web/commit/cbe1953)), closes [#236](https://github.com/trimox/angular-mdc-web/issues/236) [#297](https://github.com/trimox/angular-mdc-web/issues/297)
* **toolbar:** Add `adjustBodyMargin` property ([#300](https://github.com/trimox/angular-mdc-web/issues/300)) ([04bcb77](https://github.com/trimox/angular-mdc-web/commit/04bcb77)), closes [#298](https://github.com/trimox/angular-mdc-web/issues/298)
* **toolbar:** Rename Toolbar menu icon directive ([#289](https://github.com/trimox/angular-mdc-web/issues/289)) ([fa169be](https://github.com/trimox/angular-mdc-web/commit/fa169be)), closes [#288](https://github.com/trimox/angular-mdc-web/issues/288)
* **icon:** Add array support to `fontIcon` property ([#290](https://github.com/trimox/angular-mdc-web/issues/290)) ([00588b7](https://github.com/trimox/angular-mdc-web/commit/00588b7)), closes [#280](https://github.com/trimox/angular-mdc-web/issues/280)


### BREAKING CHANGES

* **textfield:** Remove `multiline` property from `mdc-textarea`.
* **toolbar:** Renamed `mdc-toolbar-icon-menu` to `mdc-toolbar-menu-icon` per MDC. Please update your code accordingly.



<a name="0.0.0"></a>
# [0.5.3](https://github.com/trimox/angular-mdc-web/compare/v0.5.1...v0.5.3) (2017-10-13)


### Bug Fixes

* **card:** Horizontal card does not show supporting text ([#274](https://github.com/trimox/angular-mdc-web/issues/274)) ([680edfc](https://github.com/trimox/angular-mdc-web/commit/680edfc)), closes [#266](https://github.com/trimox/angular-mdc-web/issues/266)
* **dialog:** Issues with `clickOutsideToClose` and `escapeToClose` ([#263](https://github.com/trimox/angular-mdc-web/issues/263)) ([b5989da](https://github.com/trimox/angular-mdc-web/commit/b5989da))
* **dialog:** Pass `shouldNotify` to MDC foundation methods ([#273](https://github.com/trimox/angular-mdc-web/issues/273)) ([22d5e42](https://github.com/trimox/angular-mdc-web/commit/22d5e42))
* **dialog:** Set Dialog button `action` property to secondary color ([#262](https://github.com/trimox/angular-mdc-web/issues/262)) ([ef2e96c](https://github.com/trimox/angular-mdc-web/commit/ef2e96c))
* **fab:** Set correct position in media query ([#260](https://github.com/trimox/angular-mdc-web/issues/260)) ([73eb62c](https://github.com/trimox/angular-mdc-web/commit/73eb62c))
* **list:** Checkbox height inside list-item ([#261](https://github.com/trimox/angular-mdc-web/issues/261)) ([31d030d](https://github.com/trimox/angular-mdc-web/commit/31d030d)), closes [#172](https://github.com/trimox/angular-mdc-web/issues/172)


### Features

* **core:** Make cursor a pointer for `mdc-surface` ([#264](https://github.com/trimox/angular-mdc-web/issues/264)) ([43dc9f2](https://github.com/trimox/angular-mdc-web/commit/43dc9f2))
* **demo:** Demo App Improvements ([#252](https://github.com/trimox/angular-mdc-web/issues/252)) ([2437511](https://github.com/trimox/angular-mdc-web/commit/2437511)), closes [#254](https://github.com/trimox/angular-mdc-web/issues/254)
* **drawer:** Add `fixed` property to Permanent Drawer ([#256](https://github.com/trimox/angular-mdc-web/issues/256)) ([4b8a712](https://github.com/trimox/angular-mdc-web/commit/4b8a712)), closes [#255](https://github.com/trimox/angular-mdc-web/issues/255)
* **elevation:** MdcElevation moved to MdcCoreModule ([#245](https://github.com/trimox/angular-mdc-web/issues/245)) ([9cf2647](https://github.com/trimox/angular-mdc-web/commit/9cf2647))
* **fab:** Add `position` property for absolute positioning ([#259](https://github.com/trimox/angular-mdc-web/issues/259)) ([d80bb2f](https://github.com/trimox/angular-mdc-web/commit/d80bb2f)), closes [#258](https://github.com/trimox/angular-mdc-web/issues/258)
* **icon:** Add `mdc-icon--avatar` CSS class ([#270](https://github.com/trimox/angular-mdc-web/issues/270)) ([fb9a66b](https://github.com/trimox/angular-mdc-web/commit/fb9a66b)), closes [#268](https://github.com/trimox/angular-mdc-web/issues/268)
* **icon:** Implement `mdc-icon` component ([#246](https://github.com/trimox/angular-mdc-web/issues/246)) ([2127275](https://github.com/trimox/angular-mdc-web/commit/2127275)), closes [#241](https://github.com/trimox/angular-mdc-web/issues/241)
* **list:** Add [border] property ([#276](https://github.com/trimox/angular-mdc-web/issues/276)) ([6e9c80b](https://github.com/trimox/angular-mdc-web/commit/6e9c80b)), closes [#269](https://github.com/trimox/angular-mdc-web/issues/269)
* **list:** Avatar icons + Improvements ([#272](https://github.com/trimox/angular-mdc-web/issues/272)) ([1bad2e8](https://github.com/trimox/angular-mdc-web/commit/1bad2e8)), closes [#271](https://github.com/trimox/angular-mdc-web/issues/271)
* **ripple:** Add `mdc-ripple` and `mdc-surface` directives ([#237](https://github.com/trimox/angular-mdc-web/issues/237)) ([68d22b5](https://github.com/trimox/angular-mdc-web/commit/68d22b5)), closes [#234](https://github.com/trimox/angular-mdc-web/issues/234)
* **ripple:** MdcRipple moved to MdcCoreModule ([#247](https://github.com/trimox/angular-mdc-web/issues/247)) ([4035f58](https://github.com/trimox/angular-mdc-web/commit/4035f58)), closes [#243](https://github.com/trimox/angular-mdc-web/issues/243)
* **typography:** MdcTypography moved to MdcCoreModule ([#244](https://github.com/trimox/angular-mdc-web/issues/244)) ([c19b9ab](https://github.com/trimox/angular-mdc-web/commit/c19b9ab))
* **core:** MdcThemeModule moved into MdcCoreModule ([#277](https://github.com/trimox/angular-mdc-web/issues/277)) ([68bb43c](https://github.com/trimox/angular-mdc-web/commit/68bb43c)), closes [#243](https://github.com/trimox/angular-mdc-web/issues/243)


### BREAKING CHANGES

* **icon:** `mdc-icon-button` was removed in favor of `mdc-icon`. Please update your code accordingly.
`mdc-fab-icon` was removed in favor of `mdc-icon`. Please update your code accordingly.
`mdc-tab-icon` was removed in favor of `mdc-icon`. Please update your code accordingly.
* **elevation:** Remove `MdcElevationModule` from your code. Replace with `MdcCoreModule` if not previously imported.
* **typography:** Remove `MdcTypographyModule` from your code, and if necessary add an import of `MdcCoreModule`.
* **core:** Remove `MdcThemeModule` import from your code, and replace it with `MdcCoreModule` if not already imported.



<a name="0.0.0"></a>
# [0.5.1](https://github.com/trimox/angular-mdc-web/compare/v0.5.0...v0.5.1) (2017-10-01)


### Bug Fixes

* **icon-toggle:** Return boolean from isOn() ([#220](https://github.com/trimox/angular-mdc-web/issues/220)) ([93778ae](https://github.com/trimox/angular-mdc-web/commit/93778ae))


### Features

* **snackbar:** Implement MDC Snackbar Service ([#226](https://github.com/trimox/angular-mdc-web/issues/226)) ([279fe07](https://github.com/trimox/angular-mdc-web/commit/279fe07)), closes [#225](https://github.com/trimox/angular-mdc-web/issues/225)
* **fab:** Add `exited` animation property + toggleExited() method ([#222](https://github.com/trimox/angular-mdc-web/issues/222)) ([fae29fc](https://github.com/trimox/angular-mdc-web/commit/fae29fc)), closes [#217](https://github.com/trimox/angular-mdc-web/issues/217)
* **fab:** Add `tabIndex` property ([#216](https://github.com/trimox/angular-mdc-web/issues/216)) ([f975d44](https://github.com/trimox/angular-mdc-web/commit/f975d44))
* **fab:** Publicize `elementRef` for button + icon ([#227](https://github.com/trimox/angular-mdc-web/issues/227)) ([1c89641](https://github.com/trimox/angular-mdc-web/commit/1c89641)), closes [#224](https://github.com/trimox/angular-mdc-web/issues/224)

### BREAKING CHANGES
* **snackbar:** Snackbar was re-architected into an Angular service. View the documentation and example at https://trimox.github.io/angular-mdc-web/#/snackbar-demo to update your code accordingly.


<a name="0.0.0"></a>
# [0.5.0](https://github.com/trimox/angular-mdc-web/compare/v0.4.8...v0.5.0) (2017-09-24)


### Bug Fixes

* **list:** Use ripple init() for list item ([#196](https://github.com/trimox/angular-mdc-web/issues/196)) ([a1edcf7](https://github.com/trimox/angular-mdc-web/commit/a1edcf7))


### Features

* **theme:** Implement MDC Theme + Sass extensions ([#206](https://github.com/trimox/angular-mdc-web/issues/206)) ([c6bb89b](https://github.com/trimox/angular-mdc-web/commit/c6bb89b)), closes [#112](https://github.com/trimox/angular-mdc-web/issues/112)
* **slider:** Implement MDC Slider ([#186](https://github.com/trimox/angular-mdc-web/issues/186)) ([b3f4996](https://github.com/trimox/angular-mdc-web/commit/b3f4996)), closes [#111](https://github.com/trimox/angular-mdc-web/issues/111)
* **button:** Add `mdc-icon-button` directive ([#192](https://github.com/trimox/angular-mdc-web/issues/192)) ([3f0afbb](https://github.com/trimox/angular-mdc-web/commit/3f0afbb)), closes [#189](https://github.com/trimox/angular-mdc-web/issues/189)
* **package:** Update material-components-web to v0.21.1 ([#202](https://github.com/trimox/angular-mdc-web/issues/202)) ([bfc5419](https://github.com/trimox/angular-mdc-web/commit/bfc5419))
* **snackbar:** Improvements + test coverage ([#200](https://github.com/trimox/angular-mdc-web/issues/200)) ([b9f978f](https://github.com/trimox/angular-mdc-web/commit/b9f978f))
* **tabs:** Add scrollToTabAtIndex + findTab as public methods ([#204](https://github.com/trimox/angular-mdc-web/issues/204)) ([d50599f](https://github.com/trimox/angular-mdc-web/commit/d50599f)), closes [#193](https://github.com/trimox/angular-mdc-web/issues/193)

### BREAKING CHANGES

* **angular-mdc/theme:** Replace your project's MDC Sass import with `@import "~@angular-mdc/theme/material";`
> You can also remove `IncludePaths` for `node_modules/@material/*` from your `Webpack` or `angular-cli.json` config files since it was a requirement of the old `material-components-web` theme.

<a name="0.0.0"></a>
# [0.4.8](https://github.com/trimox/angular-mdc-web/compare/v0.4.5...v0.4.8) (2017-09-17)


### Bug Fixes

* **button:** Prevent `click()` event propagation if disabled ([2ef9d7b](https://github.com/trimox/angular-mdc-web/commit/2ef9d7b))
* **button:** Remove type attribute ([#176](https://github.com/trimox/angular-mdc-web/issues/176)) ([15152f7](https://github.com/trimox/angular-mdc-web/commit/15152f7)), closes [#174](https://github.com/trimox/angular-mdc-web/issues/174)
* **checkbox:** Correct camelcase property of `tabIndex` ([41af1ad](https://github.com/trimox/angular-mdc-web/commit/41af1ad))
* **textfield:** Label overlap if value is undefined ([#188](https://github.com/trimox/angular-mdc-web/issues/188)) ([b2ee5c9](https://github.com/trimox/angular-mdc-web/commit/b2ee5c9)), closes [#187](https://github.com/trimox/angular-mdc-web/issues/187)


### Features

* Add `applyCssTransform` function ([#170](https://github.com/trimox/angular-mdc-web/issues/170)) ([4115006](https://github.com/trimox/angular-mdc-web/commit/4115006))
* **button:** Set `aria-disabled` if disabled ([a6c1802](https://github.com/trimox/angular-mdc-web/commit/a6c1802))
* **checkbox:** Add focus() as public method ([#161](https://github.com/trimox/angular-mdc-web/issues/161)) ([fe7d1a9](https://github.com/trimox/angular-mdc-web/commit/fe7d1a9))
* **checkbox:** Provision host + input `id` if not user defined ([e686dac](https://github.com/trimox/angular-mdc-web/commit/e686dac))
* **infrastructure:** Implement Test Infrastructure ([#150](https://github.com/trimox/angular-mdc-web/issues/150)) ([c079cd3](https://github.com/trimox/angular-mdc-web/commit/c079cd3)), closes [#114](https://github.com/trimox/angular-mdc-web/issues/114)
* Injectable `MdcRipple` + EventRegistry provider ([#181](https://github.com/trimox/angular-mdc-web/issues/181)) ([99923e7](https://github.com/trimox/angular-mdc-web/commit/99923e7)), closes [#164](https://github.com/trimox/angular-mdc-web/issues/164)
* **radio:** Improvements + test coverage ([#183](https://github.com/trimox/angular-mdc-web/issues/183)) ([bb45d77](https://github.com/trimox/angular-mdc-web/commit/bb45d77))
* **switch:** Improvements + test coverage ([#182](https://github.com/trimox/angular-mdc-web/issues/182)) ([60653dc](https://github.com/trimox/angular-mdc-web/commit/60653dc))
* **tabs:** Add test coverage ([#185](https://github.com/trimox/angular-mdc-web/issues/185)) ([0d01b48](https://github.com/trimox/angular-mdc-web/commit/0d01b48))
* **textfield:** Add `setValid` method to set a custom validity ([#190](https://github.com/trimox/angular-mdc-web/issues/190)) ([8dee576](https://github.com/trimox/angular-mdc-web/commit/8dee576))


### BREAKING CHANGES

* **textfield:** `updateErrorState` method was renamed to `setValid` keeping with MDC foundation naming.
* `MdcRippleModule` was removed, please update your code accordingly.



<a name="0.0.0"></a>
# [0.4.5](https://github.com/trimox/angular-mdc-web/compare/v0.4.0...v0.4.5) (2017-09-09)


### Bug Fixes

* Set correct type of ImplicitAny members ([#136](https://github.com/trimox/angular-mdc-web/issues/136)) ([adf20e4](https://github.com/trimox/angular-mdc-web/commit/adf20e4))


### Features

* **button:** Implement stroked button ([#132](https://github.com/trimox/angular-mdc-web/issues/132)) ([193140b](https://github.com/trimox/angular-mdc-web/commit/193140b)), closes [#131](https://github.com/trimox/angular-mdc-web/issues/131)
* Rename all occurences of property `accent` to `secondary` ([#139](https://github.com/trimox/angular-mdc-web/issues/139)) ([4a710e4](https://github.com/trimox/angular-mdc-web/commit/4a710e4)), closes [#138](https://github.com/trimox/angular-mdc-web/issues/138)
* **dialog:** Add `escapeToClose` property ([#146](https://github.com/trimox/angular-mdc-web/issues/146)) ([5c92a6d](https://github.com/trimox/angular-mdc-web/commit/5c92a6d)), closes [#145](https://github.com/trimox/angular-mdc-web/issues/145)
* **fab:** Remove [plain] property ([#140](https://github.com/trimox/angular-mdc-web/issues/140)) ([b40c018](https://github.com/trimox/angular-mdc-web/commit/b40c018))
* **package:** Update MDC dependency to v0.20.0 ([#137](https://github.com/trimox/angular-mdc-web/issues/137)) ([4857b88](https://github.com/trimox/angular-mdc-web/commit/4857b88))
* **typography:** Implement `mdc-typography-button` directive ([#148](https://github.com/trimox/angular-mdc-web/issues/148)) ([0727217](https://github.com/trimox/angular-mdc-web/commit/0727217)), closes [#142](https://github.com/trimox/angular-mdc-web/issues/142)


### BREAKING CHANGES

* **fab:** Remove the [plain] property from any Floating Action Button in your code.
* The `accent` property on Button, Icon-toggle, Linear-progress was renamed to `secondary`.
The `accentColor` and `primaryColor` properties on Tabs was renamed to `accent` and `primary`.



<a name="0.0.0"></a>
# [0.4.0](https://github.com/trimox/angular-mdc-web/compare/v0.3.0...v0.4.0) (2017-09-01)


### Bug Fixes

* **menu:** Fix class binding of openFrom property ([#119](https://github.com/trimox/angular-mdc-web/issues/119)) ([12a1d12](https://github.com/trimox/angular-mdc-web/commit/12a1d12)), closes [#116](https://github.com/trimox/angular-mdc-web/issues/116)
* **menu:** Open method required a focusIndex ([#117](https://github.com/trimox/angular-mdc-web/issues/117)) ([73956ca](https://github.com/trimox/angular-mdc-web/commit/73956ca))
* **textfield:** Fix expression changed after check error ([#123](https://github.com/trimox/angular-mdc-web/issues/123)) ([b254ad9](https://github.com/trimox/angular-mdc-web/commit/b254ad9)), closes [#121](https://github.com/trimox/angular-mdc-web/issues/121)


### Features

* **fab:** Remove [disabled] property ([#115](https://github.com/trimox/angular-mdc-web/issues/115)) ([eacbbae](https://github.com/trimox/angular-mdc-web/commit/eacbbae)), closes [#113](https://github.com/trimox/angular-mdc-web/issues/113)
* **fab:** Remove forced material-icon class binding ([#127](https://github.com/trimox/angular-mdc-web/issues/127)) ([919a2c7](https://github.com/trimox/angular-mdc-web/commit/919a2c7)), closes [#102](https://github.com/trimox/angular-mdc-web/issues/102)
* **package:** Add Mdc prefix to class names ([#122](https://github.com/trimox/angular-mdc-web/issues/122)) ([5b8014c](https://github.com/trimox/angular-mdc-web/commit/5b8014c)), closes [#120](https://github.com/trimox/angular-mdc-web/issues/120)


### BREAKING CHANGES

* **package:** All component classes are now prefixed with `Mdc` to prevent name conflicts with other libraries. Please update your code accordingly.
Example: `ButtonComponent` to `MdcButtonComponent`
* **fab:** Add a `material-icon` directive to mdc-fab-icon if using Material Icons. If not,
apply custom styling for Font Awesome or text. Please see examples on demo page.
* **fab:** Remove [disabled] from any FAB component used in your code.



<a name="0.0.0"></a>
# [0.3.0](https://github.com/trimox/angular-mdc-web/compare/v0.2.9...v0.3.0) (2017-08-26)


### Bug Fixes

* **dialog:** Set initialFocus to Dialog node, if [accept] is false ([#92](https://github.com/trimox/angular-mdc-web/issues/92)) ([1086817](https://github.com/trimox/angular-mdc-web/commit/1086817))


### Features

* **button:** Add unelevated property to button ([#106](https://github.com/trimox/angular-mdc-web/issues/106)) ([22d74ab](https://github.com/trimox/angular-mdc-web/commit/22d74ab)), closes [#101](https://github.com/trimox/angular-mdc-web/issues/101)
* **card:** Add [mdc-card-button] + refactoring ([#90](https://github.com/trimox/angular-mdc-web/issues/90)) ([3c6ccc1](https://github.com/trimox/angular-mdc-web/commit/3c6ccc1))
* **dialog:** Add [focused] property to Dialog Button ([#100](https://github.com/trimox/angular-mdc-web/issues/100)) ([0ac5394](https://github.com/trimox/angular-mdc-web/commit/0ac5394)), closes [#96](https://github.com/trimox/angular-mdc-web/issues/96)
* **dialog:** Add MDC v0.18's layoutFooterRipples() adapter method ([#91](https://github.com/trimox/angular-mdc-web/issues/91)) ([c3c024e](https://github.com/trimox/angular-mdc-web/commit/c3c024e))
* **package:** Update MDC dependency to v0.19.0 ([#104](https://github.com/trimox/angular-mdc-web/issues/104)) ([d97fda4](https://github.com/trimox/angular-mdc-web/commit/d97fda4))
* **ripple:** Expose foundation's layout() as public method ([0205483](https://github.com/trimox/angular-mdc-web/commit/0205483))
* **textfield:** Implement MDC Textarea Component ([#98](https://github.com/trimox/angular-mdc-web/issues/98)) ([e3f1eff](https://github.com/trimox/angular-mdc-web/commit/e3f1eff)), closes [#95](https://github.com/trimox/angular-mdc-web/issues/95)
* **textfield:** Improvements + new features! ([#99](https://github.com/trimox/angular-mdc-web/issues/99)) ([f01339c](https://github.com/trimox/angular-mdc-web/commit/f01339c)), closes [#97](https://github.com/trimox/angular-mdc-web/issues/97)


### BREAKING CHANGES

* **textfield:** Multiline textarea was refactored out as the new MDC Textarea component. Please update your code accordingly.
Example: `<mdc-textarea label="Comments" rows="8" cols="40" [multiline]="true"></mdc-textarea>`
* **dialog:** Removed [mdc-dialog-button-accept] and [mdc-dialog-button-cancel] directives.
Please update your code to use [mdc-dialog-button].
* **card:** Property [cardAction] of mdc-button was removed, you'll need to use
mdc-card-button. Please update your code accordingly.
* **card:** [darkTheme] property was removed from Card. Use [mdc-theme-dark] instead.



<a name="0.0.0"></a>
# [0.2.9](https://github.com/trimox/angular-mdc-web/compare/v0.2.8...v0.2.9) (2017-08-18)


### Bug Fixes

* **menu:** Fix select event to emit selected item's DOM element ([#80](https://github.com/trimox/angular-mdc-web/issues/80)) ([74fb5ec](https://github.com/trimox/angular-mdc-web/commit/74fb5ec)), closes [#79](https://github.com/trimox/angular-mdc-web/issues/79)
* fix npm copy-types command ([#82](https://github.com/trimox/angular-mdc-web/issues/82)) ([28d2600](https://github.com/trimox/angular-mdc-web/commit/28d2600))


### Features

* **dialog:** Add clickOutsideToClose + mdc-dialog-button ([#84](https://github.com/trimox/angular-mdc-web/issues/84)) ([7d5f7a7](https://github.com/trimox/angular-mdc-web/commit/7d5f7a7))


### BREAKING CHANGES

* **dialog:** Depreciated `mdc-dialog-button-accept` and `mdc-dialog-button-cancel`.
Use new [mdc-dialog-button] with [accept] and [cancel] properties instead.
  <mdc-dialog-footer>
    <button mdc-dialog-button [cancel]="true">Cancel</button>
    <button mdc-dialog-button [accept]="true">Discard</button>
  </mdc-dialog-footer>



<a name="0.0.0"></a>
# [0.2.8](https://github.com/trimox/angular-mdc-web/compare/v0.2.5...v0.2.8) (2017-08-15)


### Bug Fixes

* **package:** Resolve problems using ES5, ES2015 and UMD npm package files ([#75](https://github.com/trimox/angular-mdc-web/issues/75)) ([7fe6063](https://github.com/trimox/angular-mdc-web/commit/7fe6063))


### Features

* **icon-toggle:** Implement MDC Icon Toggle ([#76](https://github.com/trimox/angular-mdc-web/issues/76)) ([41fd1bb](https://github.com/trimox/angular-mdc-web/commit/41fd1bb))



<a name="0.0.0"></a>
# [0.2.5](https://github.com/trimox/angular-mdc-web/compare/v0.2.4...v0.2.5) (2017-08-09)


### Bug Fixes

* **fab:** Remove duplicate HostBinding ([#74](https://github.com/trimox/angular-mdc-web/issues/74)) ([dd3637f](https://github.com/trimox/angular-mdc-web/commit/dd3637f))
* **textfield:** Fix Text Field boxes NgModule value accessor ([36ce97a](https://github.com/trimox/angular-mdc-web/commit/36ce97a))
* **textfield:** Pre-filled Text Field uses floating label correctly ([bda0f9f](https://github.com/trimox/angular-mdc-web/commit/bda0f9f))


### Features

* **dialog:** Implement MDC Dialog ([#70](https://github.com/trimox/angular-mdc-web/issues/70)) ([31a278a](https://github.com/trimox/angular-mdc-web/commit/31a278a))
* **list:** Add component selector option to mdc-list-item-secondary ([4b3a5bf](https://github.com/trimox/angular-mdc-web/commit/4b3a5bf))
* **list:** Add component selector option to mdc-list-item-text ([9df6a4d](https://github.com/trimox/angular-mdc-web/commit/9df6a4d))
* **package:** Update MDC dependency to v0.17.0 ([f9bab7a](https://github.com/trimox/angular-mdc-web/commit/f9bab7a))
* **textfield:** Add 'aria-hidden' HostBinding to Helptext directive ([6545321](https://github.com/trimox/angular-mdc-web/commit/6545321))
* **textfield:** Add [mdc-textfield-bottom-line] directive for Text Field boxes ([5f76809](https://github.com/trimox/angular-mdc-web/commit/5f76809))
* **textfield:** Add [mdc-textfield-label] directive ([483fd98](https://github.com/trimox/angular-mdc-web/commit/483fd98))
* **textfield:** Auto generate [id] if none supplied ([3c70203](https://github.com/trimox/angular-mdc-web/commit/3c70203))



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

