<a name="0.41.0"></a>
# [0.41.0](https://github.com/trimox/angular-mdc-web/compare/v0.41.0-pre.1...v0.41.0) (2018-11-02)


### Bug Fixes

* **chips:** Remove deselect from chip-set ([2167c4b](https://github.com/trimox/angular-mdc-web/commit/2167c4b)), closes [#1499](https://github.com/trimox/angular-mdc-web/issues/1499)
* **radio:** Remove native control adapter methods ([#1498](https://github.com/trimox/angular-mdc-web/issues/1498)) ([8bec0d9](https://github.com/trimox/angular-mdc-web/commit/8bec0d9)), closes [material-components/material-components-web#3785](https://github.com/material-components/material-components-web/issues/3785)
* **text-field:** Check value type during change event ([#1496](https://github.com/trimox/angular-mdc-web/issues/1496)) ([cb72bca](https://github.com/trimox/angular-mdc-web/commit/cb72bca)), closes [#773](https://github.com/trimox/angular-mdc-web/issues/773)
* **text-field:** Fix problems with validation ([#1506](https://github.com/trimox/angular-mdc-web/issues/1506)) ([4dbda25](https://github.com/trimox/angular-mdc-web/commit/4dbda25)), closes [#1504](https://github.com/trimox/angular-mdc-web/issues/1504)
* **text-field:** textarea should handle click + keydown ([#1507](https://github.com/trimox/angular-mdc-web/issues/1507)) ([f4ac7c8](https://github.com/trimox/angular-mdc-web/commit/f4ac7c8))
* Set focusable="false" for svg elements ([#1511](https://github.com/trimox/angular-mdc-web/issues/1511)) ([2efd50f](https://github.com/trimox/angular-mdc-web/commit/2efd50f))
* **chip:** Set default value of removable to be true ([#1489](https://github.com/trimox/angular-mdc-web/issues/1489)) ([89d3182](https://github.com/trimox/angular-mdc-web/commit/89d3182))
* **drawer:** Add support for SSR ([#1483](https://github.com/trimox/angular-mdc-web/issues/1483)) ([7070730](https://github.com/trimox/angular-mdc-web/commit/7070730)), closes [#1446](https://github.com/trimox/angular-mdc-web/issues/1446)
* **drawer:** Support server side rendering ([#1471](https://github.com/trimox/angular-mdc-web/issues/1471)) ([bcf085c](https://github.com/trimox/angular-mdc-web/commit/bcf085c)), closes [#1470](https://github.com/trimox/angular-mdc-web/issues/1470)
* **menu-surface:** Coordinates and destroy hoisted menu ([#1453](https://github.com/trimox/angular-mdc-web/issues/1453)) ([cb0fc3a](https://github.com/trimox/angular-mdc-web/commit/cb0fc3a))
* **ripple:** Activation should not fire twice ([#1478](https://github.com/trimox/angular-mdc-web/issues/1478)) ([f523b99](https://github.com/trimox/angular-mdc-web/commit/f523b99)), closes [#1466](https://github.com/trimox/angular-mdc-web/issues/1466)
* **select:** Add support for SSR ([#1481](https://github.com/trimox/angular-mdc-web/issues/1481)) ([7086660](https://github.com/trimox/angular-mdc-web/commit/7086660))
* **slider:** Add support for SSR ([#1482](https://github.com/trimox/angular-mdc-web/issues/1482)) ([df3a397](https://github.com/trimox/angular-mdc-web/commit/df3a397)), closes [#1446](https://github.com/trimox/angular-mdc-web/issues/1446)
* **slider:** Support server side rendering ([#1472](https://github.com/trimox/angular-mdc-web/issues/1472)) ([39b1f5d](https://github.com/trimox/angular-mdc-web/commit/39b1f5d))
* **tab-bar:** Support for SSR ([#1485](https://github.com/trimox/angular-mdc-web/issues/1485)) ([5301962](https://github.com/trimox/angular-mdc-web/commit/5301962))
* **tab-scroller:** Support server side rendering ([#1475](https://github.com/trimox/angular-mdc-web/issues/1475)) ([79a9aae](https://github.com/trimox/angular-mdc-web/commit/79a9aae)), closes [#1474](https://github.com/trimox/angular-mdc-web/issues/1474)
* **tab-scroller:** Support SSR ([#1484](https://github.com/trimox/angular-mdc-web/issues/1484)) ([da7c605](https://github.com/trimox/angular-mdc-web/commit/da7c605))
* **text-field:** Check for SSR inside getNativeInput() ([#1445](https://github.com/trimox/angular-mdc-web/issues/1445)) ([6c1d0e8](https://github.com/trimox/angular-mdc-web/commit/6c1d0e8)), closes [#1441](https://github.com/trimox/angular-mdc-web/issues/1441)
* **text-field:** Replace MutationObserver + fix validations ([#1494](https://github.com/trimox/angular-mdc-web/issues/1494)) ([dafda96](https://github.com/trimox/angular-mdc-web/commit/dafda96)), closes [#1486](https://github.com/trimox/angular-mdc-web/issues/1486) [#1493](https://github.com/trimox/angular-mdc-web/issues/1493)


### Features

* Upgrade to material-components-web v0.41.0 ([b4af0c4](https://github.com/trimox/angular-mdc-web/commit/b4af0c4)), closes [#1495](https://github.com/trimox/angular-mdc-web/issues/1495)
* **select:** Add helper text, leading icon and more ([#1503](https://github.com/trimox/angular-mdc-web/issues/1503)) ([e54c7dc](https://github.com/trimox/angular-mdc-web/commit/e54c7dc)), closes [#1461](https://github.com/trimox/angular-mdc-web/issues/1461) [#1460](https://github.com/trimox/angular-mdc-web/issues/1460) [#1459](https://github.com/trimox/angular-mdc-web/issues/1459) [#1146](https://github.com/trimox/angular-mdc-web/issues/1146)
* **slider:** Expose sliderThumb elementRef ([#1516](https://github.com/trimox/angular-mdc-web/issues/1516)) ([acdf1cb](https://github.com/trimox/angular-mdc-web/commit/acdf1cb)), closes [#1510](https://github.com/trimox/angular-mdc-web/issues/1510)
* **tab-bar:** Add focusOnActivate prop ([#1501](https://github.com/trimox/angular-mdc-web/issues/1501)) ([1b66c3b](https://github.com/trimox/angular-mdc-web/commit/1b66c3b)), closes [#1458](https://github.com/trimox/angular-mdc-web/issues/1458)
* **button:** Remove deprecated icon property ([#1487](https://github.com/trimox/angular-mdc-web/issues/1487)) ([6e3b071](https://github.com/trimox/angular-mdc-web/commit/6e3b071))
* **icon:** Add MdcIconRegistry + support SVG ([#1452](https://github.com/trimox/angular-mdc-web/issues/1452)) ([de6ea18](https://github.com/trimox/angular-mdc-web/commit/de6ea18))
* **menu-surface:** Implement MDC Menu Surface component ([#1451](https://github.com/trimox/angular-mdc-web/issues/1451)) ([e8e6b2e](https://github.com/trimox/angular-mdc-web/commit/e8e6b2e))

### Performance Improvements

* **text-field:** Refactoring for performance ([#1447](https://github.com/trimox/angular-mdc-web/issues/1447)) ([739b8af](https://github.com/trimox/angular-mdc-web/commit/739b8af))


### BREAKING CHANGES

* **chips:** Removes deselect() from chip-set. Update your code to use select() for toggling.
* **button:** Removes the deprecated icon property from button, as it's no longer needed.



<a name="0.40.2"></a>
## [0.40.2](https://github.com/trimox/angular-mdc-web/compare/v0.40.1...v0.40.2) (2018-10-13)


### Bug Fixes

* **drawer:** Set open to false after scrim click ([#1422](https://github.com/trimox/angular-mdc-web/issues/1422)) ([a3da1f1](https://github.com/trimox/angular-mdc-web/commit/a3da1f1))
* **image-list:** Remove HostBindings ([#1437](https://github.com/trimox/angular-mdc-web/issues/1437)) ([511087b](https://github.com/trimox/angular-mdc-web/commit/511087b))
* **list:** Should unsubscribe from _changeSubscription ([#1428](https://github.com/trimox/angular-mdc-web/issues/1428)) ([f05f729](https://github.com/trimox/angular-mdc-web/commit/f05f729))
* **radio:** Set radio name from group name ([#1416](https://github.com/trimox/angular-mdc-web/issues/1416)) ([4d12ff4](https://github.com/trimox/angular-mdc-web/commit/4d12ff4))
* **ripple:** Add SSR check ([#1405](https://github.com/trimox/angular-mdc-web/issues/1405)) ([c280aed](https://github.com/trimox/angular-mdc-web/commit/c280aed)), closes [#1401](https://github.com/trimox/angular-mdc-web/issues/1401)
* **switch:** Apply ripple to thumb underlay ([#1414](https://github.com/trimox/angular-mdc-web/issues/1414)) ([0763ad2](https://github.com/trimox/angular-mdc-web/commit/0763ad2))
* **text-field:** Resolve promise inside layout() ([#1434](https://github.com/trimox/angular-mdc-web/issues/1434)) ([8dc5e6b](https://github.com/trimox/angular-mdc-web/commit/8dc5e6b))
* **top-app-bar:** Should check if browser when setting scrollTarget ([#1420](https://github.com/trimox/angular-mdc-web/issues/1420)) ([66509b8](https://github.com/trimox/angular-mdc-web/commit/66509b8)), closes [#1419](https://github.com/trimox/angular-mdc-web/issues/1419)
* **typography:** Remove HostBinding ([#1433](https://github.com/trimox/angular-mdc-web/issues/1433)) ([3aa1c7e](https://github.com/trimox/angular-mdc-web/commit/3aa1c7e))


### Features

* Upgrade to material-components-web v0.40.1 ([#1425](https://github.com/trimox/angular-mdc-web/issues/1425)) ([a358689](https://github.com/trimox/angular-mdc-web/commit/a358689)), closes [#1424](https://github.com/trimox/angular-mdc-web/issues/1424)
* **button:** Remove unneeded icon property ([#1412](https://github.com/trimox/angular-mdc-web/issues/1412)) ([e12f6c6](https://github.com/trimox/angular-mdc-web/commit/e12f6c6)), closes [#1175](https://github.com/trimox/angular-mdc-web/issues/1175) [#1409](https://github.com/trimox/angular-mdc-web/issues/1409)
* **chip:** Improved chip and chip-set ([#1430](https://github.com/trimox/angular-mdc-web/issues/1430)) ([4929e8b](https://github.com/trimox/angular-mdc-web/commit/4929e8b))
* **form-field:** Replace MDC foundation/adapter logic ([#1415](https://github.com/trimox/angular-mdc-web/issues/1415)) ([ccac367](https://github.com/trimox/angular-mdc-web/commit/ccac367)), closes [#1323](https://github.com/trimox/angular-mdc-web/issues/1323)
* **menu:** Add hoistToBody option ([#1417](https://github.com/trimox/angular-mdc-web/issues/1417)) ([4fc14e1](https://github.com/trimox/angular-mdc-web/commit/4fc14e1))
* **menu-surface:** Convert mdcMenuSurfaceAnchor to directive ([#1418](https://github.com/trimox/angular-mdc-web/issues/1418)) ([a52d535](https://github.com/trimox/angular-mdc-web/commit/a52d535))
* **ripple:** Use passive listeners for mouse and touch events ([#1413](https://github.com/trimox/angular-mdc-web/issues/1413)) ([00b2e36](https://github.com/trimox/angular-mdc-web/commit/00b2e36)), closes [#1411](https://github.com/trimox/angular-mdc-web/issues/1411)


### Performance Improvements

* **text-field:** Speed and refactoring of foundation classes ([#1431](https://github.com/trimox/angular-mdc-web/issues/1431)) ([f8677f1](https://github.com/trimox/angular-mdc-web/commit/f8677f1))



<a name="0.40.1"></a>
## [0.40.1](https://github.com/trimox/angular-mdc-web/compare/v0.40.0...v0.40.1) (2018-10-02)


### Bug Fixes

* **portal:** Define attached host for portals when attach to hosts ([#1391](https://github.com/trimox/angular-mdc-web/issues/1391)) ([3a52dc1](https://github.com/trimox/angular-mdc-web/commit/3a52dc1))
* **radio:** Should not show ripple if disabled ([#1394](https://github.com/trimox/angular-mdc-web/issues/1394)) ([7b5fc3a](https://github.com/trimox/angular-mdc-web/commit/7b5fc3a))
* **snackbar:** Should check if action button exists ([#1390](https://github.com/trimox/angular-mdc-web/issues/1390)) ([31bac8e](https://github.com/trimox/angular-mdc-web/commit/31bac8e))


### Features

* **tab:** Add disabled property ([#1395](https://github.com/trimox/angular-mdc-web/issues/1395)) ([dd31b85](https://github.com/trimox/angular-mdc-web/commit/dd31b85)), closes [#1392](https://github.com/trimox/angular-mdc-web/issues/1392)
* **text-field:** Add autocomplete property ([#1396](https://github.com/trimox/angular-mdc-web/issues/1396)) ([3bc4135](https://github.com/trimox/angular-mdc-web/commit/3bc4135)), closes [#1393](https://github.com/trimox/angular-mdc-web/issues/1393)



<a name="0.40.0"></a>
# [0.40.0](https://github.com/trimox/angular-mdc-web/compare/v0.39.3...v0.40.0) (2018-09-30)


### Bug Fixes

* **card:** Remove erroneous directive config line ([b69198d](https://github.com/trimox/angular-mdc-web/commit/b69198d))
* **checkbox:** Prevent bubbling for second event ([#1385](https://github.com/trimox/angular-mdc-web/issues/1385)) ([870d360](https://github.com/trimox/angular-mdc-web/commit/870d360))
* **chips:** Use rxjs for event listening ([#1358](https://github.com/trimox/angular-mdc-web/issues/1358)) ([cbd01b8](https://github.com/trimox/angular-mdc-web/commit/cbd01b8))
* **drawer:** Fix focus-trap import and use factory ([#1370](https://github.com/trimox/angular-mdc-web/issues/1370)) ([6007f89](https://github.com/trimox/angular-mdc-web/commit/6007f89)), closes [#1369](https://github.com/trimox/angular-mdc-web/issues/1369)
* **drawer:** Run transitionend listener outside angular with filter ([#1349](https://github.com/trimox/angular-mdc-web/issues/1349)) ([79eb2fb](https://github.com/trimox/angular-mdc-web/commit/79eb2fb))
* **select:** Set transform origin for line ripple ([#1386](https://github.com/trimox/angular-mdc-web/issues/1386)) ([b1c5242](https://github.com/trimox/angular-mdc-web/commit/b1c5242))
* **tab-scroller:** Should run outside angular, and filter on transitionend ([#1346](https://github.com/trimox/angular-mdc-web/issues/1346)) ([91c6956](https://github.com/trimox/angular-mdc-web/commit/91c6956))
* **top-app-bar:** Should destroy ripple ([#1355](https://github.com/trimox/angular-mdc-web/issues/1355)) ([aff2c87](https://github.com/trimox/angular-mdc-web/commit/aff2c87))


### Features

* **card:** Improvements ([#1352](https://github.com/trimox/angular-mdc-web/issues/1352)) ([aad3d5b](https://github.com/trimox/angular-mdc-web/commit/aad3d5b))
* **checkbox:** Remove foundation getters/setters + improvements ([#1368](https://github.com/trimox/angular-mdc-web/issues/1368)) ([4e0e833](https://github.com/trimox/angular-mdc-web/commit/4e0e833))
* **dialog:** Improved MDC Dialog ([#1374](https://github.com/trimox/angular-mdc-web/issues/1374)) ([d2a28b3](https://github.com/trimox/angular-mdc-web/commit/d2a28b3)), closes [#1341](https://github.com/trimox/angular-mdc-web/issues/1341) [#1272](https://github.com/trimox/angular-mdc-web/issues/1272)
* **drawer:** Replace open() and close() with open: boolean ([#1340](https://github.com/trimox/angular-mdc-web/issues/1340)) ([0c81dd4](https://github.com/trimox/angular-mdc-web/commit/0c81dd4)), closes [#1307](https://github.com/trimox/angular-mdc-web/issues/1307)
* **fab:** Position values renamed to bottomLeft and bottomRight ([#1350](https://github.com/trimox/angular-mdc-web/issues/1350)) ([fdb90ec](https://github.com/trimox/angular-mdc-web/commit/fdb90ec))
* **form-field:** Remove unneeded setInput method ([#1383](https://github.com/trimox/angular-mdc-web/issues/1383)) ([a7ec92b](https://github.com/trimox/angular-mdc-web/commit/a7ec92b))
* **linear-progress:** Improvements ([#1356](https://github.com/trimox/angular-mdc-web/issues/1356)) ([1ccc860](https://github.com/trimox/angular-mdc-web/commit/1ccc860))
* **list:** Toggle radio checkbox ([#1379](https://github.com/trimox/angular-mdc-web/issues/1379)) ([67848b1](https://github.com/trimox/angular-mdc-web/commit/67848b1))
* **menu:** Add absolutePosition property ([#1336](https://github.com/trimox/angular-mdc-web/issues/1336)) ([8b104e0](https://github.com/trimox/angular-mdc-web/commit/8b104e0)), closes [#1333](https://github.com/trimox/angular-mdc-web/issues/1333)
* **menu:** Add additional selector for menu anchor ([#1339](https://github.com/trimox/angular-mdc-web/issues/1339)) ([e263bd2](https://github.com/trimox/angular-mdc-web/commit/e263bd2))
* **menu:** Add anchorMargin property ([#1337](https://github.com/trimox/angular-mdc-web/issues/1337)) ([217c3f5](https://github.com/trimox/angular-mdc-web/commit/217c3f5)), closes [#1334](https://github.com/trimox/angular-mdc-web/issues/1334)
* **menu:** Replace open() and close() with open: boolean ([#1338](https://github.com/trimox/angular-mdc-web/issues/1338)) ([7267143](https://github.com/trimox/angular-mdc-web/commit/7267143)), closes [#1335](https://github.com/trimox/angular-mdc-web/issues/1335)
* **ripple:** Improved Ripple ([#1362](https://github.com/trimox/angular-mdc-web/issues/1362)) ([2230ff2](https://github.com/trimox/angular-mdc-web/commit/2230ff2))
* **select:** Remove the non-box variant of select ([#1378](https://github.com/trimox/angular-mdc-web/issues/1378)) ([5214c33](https://github.com/trimox/angular-mdc-web/commit/5214c33)), closes [#1048](https://github.com/trimox/angular-mdc-web/issues/1048)
* **snackbar:** Use [@angular](https://github.com/angular)/cdk portals package ([#1371](https://github.com/trimox/angular-mdc-web/issues/1371)) ([25dc369](https://github.com/trimox/angular-mdc-web/commit/25dc369)), closes [#1173](https://github.com/trimox/angular-mdc-web/issues/1173)
* **tab-bar:** Always honor the activeTabIndex property ([#1348](https://github.com/trimox/angular-mdc-web/issues/1348)) ([5225436](https://github.com/trimox/angular-mdc-web/commit/5225436)), closes [#1342](https://github.com/trimox/angular-mdc-web/issues/1342)
* **tab-bar:** Support for manual and automatic activation behavior ([#1347](https://github.com/trimox/angular-mdc-web/issues/1347)) ([ff6dd64](https://github.com/trimox/angular-mdc-web/commit/ff6dd64)), closes [#1344](https://github.com/trimox/angular-mdc-web/issues/1344)
* **text-field:** Add support for leading/trailing icons at the same time ([#1376](https://github.com/trimox/angular-mdc-web/issues/1376)) ([2512f03](https://github.com/trimox/angular-mdc-web/commit/2512f03)), closes [#1351](https://github.com/trimox/angular-mdc-web/issues/1351)
* **text-field:** New mdcTextFieldIcon + improvements ([#1320](https://github.com/trimox/angular-mdc-web/issues/1320)) ([3299486](https://github.com/trimox/angular-mdc-web/commit/3299486)), closes [#1322](https://github.com/trimox/angular-mdc-web/issues/1322) [#1325](https://github.com/trimox/angular-mdc-web/issues/1325)
* JeetChaudhari adds SSR support ([#1381](https://github.com/trimox/angular-mdc-web/issues/1381)) ([090d197](https://github.com/trimox/angular-mdc-web/commit/090d197)), closes [#1268](https://github.com/trimox/angular-mdc-web/issues/1268)
* Upgrade to material-components-web v0.40.0 ([#1367](https://github.com/trimox/angular-mdc-web/issues/1367)) ([5ec1ec4](https://github.com/trimox/angular-mdc-web/commit/5ec1ec4)), closes [#1366](https://github.com/trimox/angular-mdc-web/issues/1366)

### Performance Improvements

* **text-field:** Performance improvements ([#1364](https://github.com/trimox/angular-mdc-web/issues/1364)) ([dcd8f06](https://github.com/trimox/angular-mdc-web/commit/dcd8f06))


### BREAKING CHANGES

* **dialog:** MDCDialog has been reimplemented to support more use cases, so APIs and the DOM structure have changed. See the updated documentation for more information.
* MDC Shape package has been removed and replaced with mixins implementing the Shape system. This system implements only rounded corners to provide a straightforward CSS-only solution. Replaced all *-corner-radius component mixins with *-shape-radius mixins to integrate with Shape system.
* **linear-progress:** Please reference updated documentation for implementation details.
* **card:** `MdcRipple` is now automatically injected into `mdc-card-primary-action`, so just remove previous `mdc-ripple` directives applied manually.
* **card:** Removed `icons: boolean` from `mdc-card-actions`. Please update your code to use `mdc-card-action-icons`.
* **card:** Removed `buttons: boolean` from `mdc-card-actions`. Please update your code to use `mdc-card-action-buttons`.
* **fab:** Position values renamed to `bottomLeft` and `bottomRight`.
* **drawer:** Removed `open()` and `close()` methods. Please update your code to use `open: boolean`.
* **drawer:** Removed `isOpen()` method. Please use `open: boolean`
* **text-field:** Use directive `mdcTextFieldIcon` on an `mdc-icon` inside an `mdc-text-field`.
* **text-field:** Renamed `nativeValidation` to `useNativeValidation`
* **text-field:** Removed `getValue()` method, please update your code to use `value`.
* **text-field:** Removed `setValid()` method, please update your code to use `valid`.
* **text-field:** Removed `focused` property, this is now handled by the foundation.
* **text-field:** Removed `setHelperTextContent()` property.
* **menu:** Removed `open()` and `close()` methods. Please update your code to use `open: boolean`.



<a name="0.39.3"></a>
## [0.39.3](https://github.com/trimox/angular-mdc-web/compare/v0.39.1...v0.39.3) (2018-09-16)


### Bug Fixes

* **checkbox:** Remove unused event ([#1330](https://github.com/trimox/angular-mdc-web/issues/1330)) ([842c92d](https://github.com/trimox/angular-mdc-web/commit/842c92d))
* **checkbox:** Should not stopPropagation for click event ([#1328](https://github.com/trimox/angular-mdc-web/issues/1328)) ([462fe0b](https://github.com/trimox/angular-mdc-web/commit/462fe0b)), closes [#1326](https://github.com/trimox/angular-mdc-web/issues/1326)
* **drawer:** Deduplication of activated/selected classes ([#1308](https://github.com/trimox/angular-mdc-web/issues/1308)) ([b15b209](https://github.com/trimox/angular-mdc-web/commit/b15b209))


### Features

* Upgrade to material-components-web v0.39.3 ([#1312](https://github.com/trimox/angular-mdc-web/issues/1312)) ([c534af3](https://github.com/trimox/angular-mdc-web/commit/c534af3))
* **snackbar:** Add RTL support ([#1329](https://github.com/trimox/angular-mdc-web/issues/1329)) ([6dbcc1b](https://github.com/trimox/angular-mdc-web/commit/6dbcc1b)), closes [#1327](https://github.com/trimox/angular-mdc-web/issues/1327)
* **tab-bar:** Add activeTabIndex ([#1314](https://github.com/trimox/angular-mdc-web/issues/1314)) ([d718efd](https://github.com/trimox/angular-mdc-web/commit/d718efd)), closes [#1311](https://github.com/trimox/angular-mdc-web/issues/1311)
* **text-field:** Add pattern, minlength, max and min ([#1313](https://github.com/trimox/angular-mdc-web/issues/1313)) ([413f4a4](https://github.com/trimox/angular-mdc-web/commit/413f4a4)), closes [#1309](https://github.com/trimox/angular-mdc-web/issues/1309)
* **text-field:** Add size and step properties ([#1318](https://github.com/trimox/angular-mdc-web/issues/1318)) ([bf950a5](https://github.com/trimox/angular-mdc-web/commit/bf950a5)), closes [#1320](https://github.com/trimox/angular-mdc-web/issues/1320) [#1315](https://github.com/trimox/angular-mdc-web/issues/1315)



<a name="0.39.1"></a>
## [0.39.1](https://github.com/trimox/angular-mdc-web/compare/v0.39.0...v0.39.1) (2018-09-08)


### Bug Fixes

* **drawer:** Remove setTimeout during list init ([#1299](https://github.com/trimox/angular-mdc-web/issues/1299)) ([913c416](https://github.com/trimox/angular-mdc-web/commit/913c416))
* **tab:** Use camelCase for `exportAs` ([#1303](https://github.com/trimox/angular-mdc-web/issues/1303)) ([d703ceb](https://github.com/trimox/angular-mdc-web/commit/d703ceb))
* **tab-bar:** Should defer setting active tab on load ([#1298](https://github.com/trimox/angular-mdc-web/issues/1298)) ([dedc959](https://github.com/trimox/angular-mdc-web/commit/dedc959))


### Features

* **radio:** Improved Radio with new Radio Group ([#1302](https://github.com/trimox/angular-mdc-web/issues/1302)) ([0341432](https://github.com/trimox/angular-mdc-web/commit/0341432)), closes [#1300](https://github.com/trimox/angular-mdc-web/issues/1300) [#952](https://github.com/trimox/angular-mdc-web/issues/952)



<a name="0.39.0"></a>
# [0.39.0](https://github.com/trimox/angular-mdc-web/compare/v0.38.2...v0.39.0) (2018-09-07)


### Bug Fixes

* **list:** Should correctly listen and handle async changes
* **checkbox:** Should listen on input element for change ([#1233](https://github.com/trimox/angular-mdc-web/issues/1233)) ([7cb5ec1](https://github.com/trimox/angular-mdc-web/commit/7cb5ec1))
* **demos:** Cleanup and fixes for outlined change ([#1257](https://github.com/trimox/angular-mdc-web/issues/1257)) ([9fba0ff](https://github.com/trimox/angular-mdc-web/commit/9fba0ff))
* **select:** Default autosize to false and coerce string value ([#1244](https://github.com/trimox/angular-mdc-web/issues/1244)) ([99414ad](https://github.com/trimox/angular-mdc-web/commit/99414ad)), closes [#1241](https://github.com/trimox/angular-mdc-web/issues/1241)
* **select:** Only add line ripple listeners when line ripple is present ([#1274](https://github.com/trimox/angular-mdc-web/issues/1274)) ([8164c53](https://github.com/trimox/angular-mdc-web/commit/8164c53))
* **select:** Should display outlined with coerced value ([#1238](https://github.com/trimox/angular-mdc-web/issues/1238)) ([2da3857](https://github.com/trimox/angular-mdc-web/commit/2da3857)), closes [#1237](https://github.com/trimox/angular-mdc-web/issues/1237)
* **snackbar:** Doesn't close while other element is focused ([#1242](https://github.com/trimox/angular-mdc-web/issues/1242)) ([9f2f912](https://github.com/trimox/angular-mdc-web/commit/9f2f912))
* **tab:** Fixed width indicator should be same width as content ([#1285](https://github.com/trimox/angular-mdc-web/issues/1285)) ([4ad5780](https://github.com/trimox/angular-mdc-web/commit/4ad5780)), closes [#1236](https://github.com/trimox/angular-mdc-web/issues/1236)
* **tab-bar:** Adds new MDC adapter methods ([#1270](https://github.com/trimox/angular-mdc-web/issues/1270)) ([c3ea7fe](https://github.com/trimox/angular-mdc-web/commit/c3ea7fe))
* Use directive configurations + clean-up ([#1295](https://github.com/trimox/angular-mdc-web/issues/1295)) ([ec0393e](https://github.com/trimox/angular-mdc-web/commit/ec0393e))


### Features

* **checkbox:** Move component specific logic out of foundation ([#1273](https://github.com/trimox/angular-mdc-web/issues/1273)) ([fa46240](https://github.com/trimox/angular-mdc-web/commit/fa46240))
* **chips:** Add select, deselect and getSelectedChipIds methods ([#1254](https://github.com/trimox/angular-mdc-web/issues/1254)) ([db60366](https://github.com/trimox/angular-mdc-web/commit/db60366)), closes [#1252](https://github.com/trimox/angular-mdc-web/issues/1252)
* **chips:** Pass chip ids instead of foundations in events ([#1253](https://github.com/trimox/angular-mdc-web/issues/1253)) ([79471a8](https://github.com/trimox/angular-mdc-web/commit/79471a8))
* **drawer:** Add optional selectors + refactoring ([#1292](https://github.com/trimox/angular-mdc-web/issues/1292)) ([6dd62d0](https://github.com/trimox/angular-mdc-web/commit/6dd62d0))
* **drawer:** Improved navigation drawer ([#1279](https://github.com/trimox/angular-mdc-web/issues/1279)) ([0400ea8](https://github.com/trimox/angular-mdc-web/commit/0400ea8)), closes [#1255](https://github.com/trimox/angular-mdc-web/issues/1255)
* **fab:** Add icon property ([#1294](https://github.com/trimox/angular-mdc-web/issues/1294)) ([a638359](https://github.com/trimox/angular-mdc-web/commit/a638359))
* **icon-button:** Add `icon` prop for non-toggling icon ([#1289](https://github.com/trimox/angular-mdc-web/issues/1289)) ([4c14d31](https://github.com/trimox/angular-mdc-web/commit/4c14d31))
* **icon-button:** Improved MDC Icon Button ([#1265](https://github.com/trimox/angular-mdc-web/issues/1265)) ([f58160f](https://github.com/trimox/angular-mdc-web/commit/f58160f)), closes [#1245](https://github.com/trimox/angular-mdc-web/issues/1245)
* **list:** Add wrapFocus property ([#1269](https://github.com/trimox/angular-mdc-web/issues/1269)) ([2ccdae4](https://github.com/trimox/angular-mdc-web/commit/2ccdae4))
* **switch:** Move component specific logic out of foundation ([#1246](https://github.com/trimox/angular-mdc-web/issues/1246)) ([757f696](https://github.com/trimox/angular-mdc-web/commit/757f696))
* **tab:** Add focus() method ([#1271](https://github.com/trimox/angular-mdc-web/issues/1271)) ([ebe3939](https://github.com/trimox/angular-mdc-web/commit/ebe3939))
* **tab-indicator:** Remove transitionend event handling ([#1243](https://github.com/trimox/angular-mdc-web/issues/1243)) ([5c49274](https://github.com/trimox/angular-mdc-web/commit/5c49274))
* Implement platform detection service ([#1277](https://github.com/trimox/angular-mdc-web/issues/1277)) ([a72f550](https://github.com/trimox/angular-mdc-web/commit/a72f550))
* Move [materialIcons] selector to MdcIconModule ([#1281](https://github.com/trimox/angular-mdc-web/issues/1281)) ([23b6285](https://github.com/trimox/angular-mdc-web/commit/23b6285))
* Implement MDC Menu Surface, improved Menu ([#1280](https://github.com/trimox/angular-mdc-web/issues/1280)) ([4f3f0cc](https://github.com/trimox/angular-mdc-web/commit/4f3f0cc)), closes [#1255](https://github.com/trimox/angular-mdc-web/issues/1255)
* **text-field:** Add `nativeValidation` to enable/disable custom validity ([#1258](https://github.com/trimox/angular-mdc-web/issues/1258)) ([f7c4f49](https://github.com/trimox/angular-mdc-web/commit/f7c4f49)), closes [#1256](https://github.com/trimox/angular-mdc-web/issues/1256)
* **text-field:** Remove `box` property and make box variant new default ([#1247](https://github.com/trimox/angular-mdc-web/issues/1247)) ([e2edbe3](https://github.com/trimox/angular-mdc-web/commit/e2edbe3)), closes [#1049](https://github.com/trimox/angular-mdc-web/issues/1049)
* **text-field:** Rename property `outline` to `outlined` ([#1249](https://github.com/trimox/angular-mdc-web/issues/1249)) ([c181cee](https://github.com/trimox/angular-mdc-web/commit/c181cee))
* **top-app-bar:** Implement MDC Top App Bar ([#1261](https://github.com/trimox/angular-mdc-web/issues/1261)) ([1a3f979](https://github.com/trimox/angular-mdc-web/commit/1a3f979)), closes [#1260](https://github.com/trimox/angular-mdc-web/issues/1260)
* **list:** Add `singleSelection` property
* **list:** Add `disabled` property for list item
* **list:** Add `useActivatedClass` property
* **list:** Add `useSelectedClass` property
* **list:** Add `verticalOrientation` property
* Update material-components-web to v0.39.1 ([#1275](https://github.com/trimox/angular-mdc-web/issues/1275)) ([b88dad6](https://github.com/trimox/angular-mdc-web/commit/b88dad6))


### BREAKING CHANGES

* **drawer:** Drawer has new DOM structure, mixins and properties. Please reference documentation for implementation details.
* **icon-button:** Icon Button has new DOM structure, mixins and properties. Please reference documentation for implementation details.
* **menu:** Menu has new DOM structure, mixins and properties. Please reference documentation for implementation details.
* **top-app-bar:** Insert `top` prefix  for all existing selectors (e.g.: `mdc-app-bar` to `mdc-top-app-bar`)
* **text-field:** Removes the margin-top from the mdc-text-field container. This can cause a UI to shift/change.
* **text-field:** Removes `box` property and makes box the new default style.
* **text-field:** Property `outline` was renamed to `outlined`.
* **text-field:** Setting the validity state using setValid no longer ignores native input validation. New API `nativeValidation` is introduced to enable / disable native validation for custom validity.
* **list:** Removed `selection` property. Please use `singleSelection` instead.
* **list:** Removed `lines` property. Please use `twoLine: boolean` to increase the height of a row.
* **list:** Removed `clearSelected` method.
* Removed `MdcThemeModule`. Import `MdcIconModule` to use `[materialIcons]` directive if needed.
* **select:** Property `autosize` defaults to false, please update your code accordingly.



<a name="0.38.2"></a>
## [0.38.2](https://github.com/trimox/angular-mdc-web/compare/v0.38.1...v0.38.2) (2018-08-17)


### Bug Fixes

* **app-bar:** Execute prominent app-bar following timeout ([#1229](https://github.com/trimox/angular-mdc-web/issues/1229)) ([f8a3eb6](https://github.com/trimox/angular-mdc-web/commit/f8a3eb6)), closes [#1226](https://github.com/trimox/angular-mdc-web/issues/1226)
* **tab-bar:** Should reset subscriptions listening for tab changes ([#1225](https://github.com/trimox/angular-mdc-web/issues/1225)) ([ea09759](https://github.com/trimox/angular-mdc-web/commit/ea09759)), closes [#1223](https://github.com/trimox/angular-mdc-web/issues/1223)
* **text-field:** Should compare using coerced value ([#1231](https://github.com/trimox/angular-mdc-web/issues/1231)) ([f40759f](https://github.com/trimox/angular-mdc-web/commit/f40759f))


### Features

* Bump material-components-web to v0.38.2 ([#1207](https://github.com/trimox/angular-mdc-web/issues/1207)) ([2b198b1](https://github.com/trimox/angular-mdc-web/commit/2b198b1))
* **app-bar:** Add isCollapsed() for checking collapsed state ([#1230](https://github.com/trimox/angular-mdc-web/issues/1230)) ([f29cb70](https://github.com/trimox/angular-mdc-web/commit/f29cb70))
* **checkbox:** Re-export MdcFormFieldModule ([#1208](https://github.com/trimox/angular-mdc-web/issues/1208)) ([df1094c](https://github.com/trimox/angular-mdc-web/commit/df1094c))
* **fab:** Re-export MdcIconModule ([#1217](https://github.com/trimox/angular-mdc-web/issues/1217)) ([06e2fde](https://github.com/trimox/angular-mdc-web/commit/06e2fde))
* **icon-button:** Re-export MdcIconModule ([#1216](https://github.com/trimox/angular-mdc-web/issues/1216)) ([a33c8e7](https://github.com/trimox/angular-mdc-web/commit/a33c8e7))
* **list:** Add `subheader` prop for mdc-list-group ([#1211](https://github.com/trimox/angular-mdc-web/issues/1211)) ([8f00ebd](https://github.com/trimox/angular-mdc-web/commit/8f00ebd))
* **list:** Remove deprecated `multiple` property ([#1221](https://github.com/trimox/angular-mdc-web/issues/1221)) ([be2fa23](https://github.com/trimox/angular-mdc-web/commit/be2fa23))
* **radio:** Re-export MdcFormFieldModule ([#1210](https://github.com/trimox/angular-mdc-web/issues/1210)) ([7377d1b](https://github.com/trimox/angular-mdc-web/commit/7377d1b))
* **switch:** Re-export MdcFormFieldModule ([#1209](https://github.com/trimox/angular-mdc-web/issues/1209)) ([e061e64](https://github.com/trimox/angular-mdc-web/commit/e061e64))
* **tab:** Injection token to provide MdcTabBar interface ([#1204](https://github.com/trimox/angular-mdc-web/issues/1204)) ([a0ed4d2](https://github.com/trimox/angular-mdc-web/commit/a0ed4d2))

### How to handle browser refresh with Tabs
View a StackBlitz example: https://github.com/trimox/angular-mdc-web/issues/1206

### BREAKING CHANGES

* **list:** Removed `multiple: boolean` from mdc-list. Please update your code accordingly.



<a name="0.38.1"></a>
## [0.38.1](https://github.com/trimox/angular-mdc-web/compare/v0.38.0...v0.38.1) (2018-08-11)


### Bug Fixes

* **chips:** Add return value type to handleTrailingIconInteraction ([#1189](https://github.com/trimox/angular-mdc-web/issues/1189)) ([c2b16ed](https://github.com/trimox/angular-mdc-web/commit/c2b16ed))
* **chips:** Fix event interactions and selections + improvements ([#1196](https://github.com/trimox/angular-mdc-web/issues/1196)) ([f0d812f](https://github.com/trimox/angular-mdc-web/commit/f0d812f)), closes [#1195](https://github.com/trimox/angular-mdc-web/issues/1195)
* **demos:** Add alternate color example for mdc-switch ([#1187](https://github.com/trimox/angular-mdc-web/issues/1187)) ([cf038b1](https://github.com/trimox/angular-mdc-web/commit/cf038b1))
* **dialog:** Coerce accept, cancel and action props to boolean ([#1192](https://github.com/trimox/angular-mdc-web/issues/1192)) ([9448a5e](https://github.com/trimox/angular-mdc-web/commit/9448a5e))
* **slider:** Null check before calling destroy ([#1191](https://github.com/trimox/angular-mdc-web/issues/1191)) ([ca40ad6](https://github.com/trimox/angular-mdc-web/commit/ca40ad6)), closes [#1190](https://github.com/trimox/angular-mdc-web/issues/1190)


### Features

* **ripple:** Remove usage of EventRegistry ([#1194](https://github.com/trimox/angular-mdc-web/issues/1194)) ([18b00bc](https://github.com/trimox/angular-mdc-web/commit/18b00bc))
* **snackbar:** Use ChangeDetectionStrategy.OnPush + refactoring ([#1199](https://github.com/trimox/angular-mdc-web/issues/1199)) ([d5bc071](https://github.com/trimox/angular-mdc-web/commit/d5bc071))



<a name="0.38.0"></a>
# [0.38.0](https://github.com/trimox/angular-mdc-web/compare/v0.37.3...v0.38.0) (2018-08-08)


### Bug Fixes

* **chips:** Should use foundation handleChipRemoval method ([#1185](https://github.com/trimox/angular-mdc-web/issues/1185)) ([c930820](https://github.com/trimox/angular-mdc-web/commit/c930820))
* **list:** Coerce border and dense string values to boolean ([#1163](https://github.com/trimox/angular-mdc-web/issues/1163)) ([17bbdf3](https://github.com/trimox/angular-mdc-web/commit/17bbdf3))
* **text-field:** Coerce disabled, persistent and validation strings to boolean ([#1182](https://github.com/trimox/angular-mdc-web/issues/1182)) ([992031a](https://github.com/trimox/angular-mdc-web/commit/992031a))
* **text-field:** Should set outline if value is coerced ([#1161](https://github.com/trimox/angular-mdc-web/issues/1161)) ([8467030](https://github.com/trimox/angular-mdc-web/commit/8467030))


### Features

* **icon-button:** Add additional selector `mdc-icon-button` ([#1178](https://github.com/trimox/angular-mdc-web/issues/1178)) ([bf5278f](https://github.com/trimox/angular-mdc-web/commit/bf5278f))
* **icon-toggle:** Remove deprecated mdc-icon-toggle component ([#1166](https://github.com/trimox/angular-mdc-web/issues/1166)) ([8cd4d69](https://github.com/trimox/angular-mdc-web/commit/8cd4d69))
* **list:** Add single selection ([#1179](https://github.com/trimox/angular-mdc-web/issues/1179)) ([00ad94c](https://github.com/trimox/angular-mdc-web/commit/00ad94c)), closes [#1084](https://github.com/trimox/angular-mdc-web/issues/1084)
* **list:** Updated two-line list to use typography baseline to match spec ([#1177](https://github.com/trimox/angular-mdc-web/issues/1177)) ([be1b1b7](https://github.com/trimox/angular-mdc-web/commit/be1b1b7))
* **switch:** Update MDC Switch to new Material spec ([#1171](https://github.com/trimox/angular-mdc-web/issues/1171)) ([4635a1e](https://github.com/trimox/angular-mdc-web/commit/4635a1e)), closes [#1170](https://github.com/trimox/angular-mdc-web/issues/1170)
* **tabs:** Remove deprecated mdc-tabs ([#1165](https://github.com/trimox/angular-mdc-web/issues/1165)) ([f538d43](https://github.com/trimox/angular-mdc-web/commit/f538d43)), closes [#1115](https://github.com/trimox/angular-mdc-web/issues/1115) [#1105](https://github.com/trimox/angular-mdc-web/issues/1105)
* **toolbar:** Remove deprecated mdc-toolbar component ([#1167](https://github.com/trimox/angular-mdc-web/issues/1167)) ([ba4f50b](https://github.com/trimox/angular-mdc-web/commit/ba4f50b)), closes [#1124](https://github.com/trimox/angular-mdc-web/issues/1124) [#1114](https://github.com/trimox/angular-mdc-web/issues/1114)
* Implement MdcOption and MdcSelectionModel ([#1156](https://github.com/trimox/angular-mdc-web/issues/1156)) ([f1f039b](https://github.com/trimox/angular-mdc-web/commit/f1f039b)), closes [#1155](https://github.com/trimox/angular-mdc-web/issues/1155)
* Implement MDC Tab Indicator ([#1172](https://github.com/trimox/angular-mdc-web/issues/1172)) ([c1c1569](https://github.com/trimox/angular-mdc-web/commit/c1c1569)), closes [#1117](https://github.com/trimox/angular-mdc-web/issues/1117)
* Implement MDC Tab Scroller ([#1174](https://github.com/trimox/angular-mdc-web/issues/1174)) ([985eddb](https://github.com/trimox/angular-mdc-web/commit/985eddb)), closes [#1116](https://github.com/trimox/angular-mdc-web/issues/1116)
* Implement MDC Tab-Bar + Tab ([#1176](https://github.com/trimox/angular-mdc-web/issues/1176)) ([a3d3995](https://github.com/trimox/angular-mdc-web/commit/a3d3995)), closes [#1118](https://github.com/trimox/angular-mdc-web/issues/1118) [#1119](https://github.com/trimox/angular-mdc-web/issues/1119)
* Update material-components-web dependency to v0.38.0 ([#1164](https://github.com/trimox/angular-mdc-web/issues/1164)) ([d26519c](https://github.com/trimox/angular-mdc-web/commit/d26519c)), closes [#1162](https://github.com/trimox/angular-mdc-web/issues/1162)


### BREAKING CHANGES

* **toolbar:** mdc-toolbar is deprecated and no longer bundled. You are encouraged to use the new mdc-app-bar package.
* **icon-toggle:** mdc-icon-toggle is deprecated and no longer bundled. You are encouraged to use the new mdc-icon-button package.
* **tabs:** mdc-tabs is deprecated and no longer bundled. You are encouraged to use the new mdc-tab / mdc-tab-bar / mdc-tab-scroller / mdc-tab-indicator package(s) by importing MdcTabBarModule. Please see documentation for implementation.
* **select:** Removed `setValue(value: any)`, please use `setSelectionByValue(value: any)` instead.
* Added `source` argument for `selectionChange(source: MdcSelect, index: number, value: string)`



<a name="0.37.3"></a>
## [0.37.3](https://github.com/trimox/angular-mdc-web/compare/v0.37.2...v0.37.3) (2018-07-26)


### Bug Fixes

* **list:** `multiple` prop should not clear selections ([#1151](https://github.com/trimox/angular-mdc-web/issues/1151)) ([ba8efce](https://github.com/trimox/angular-mdc-web/commit/ba8efce)), closes [#1152](https://github.com/trimox/angular-mdc-web/issues/1152)


### Features

* **button:** Coerce data-bound string values to boolean ([#1129](https://github.com/trimox/angular-mdc-web/issues/1129)) ([88308f4](https://github.com/trimox/angular-mdc-web/commit/88308f4))
* Coerce data-bound string values to boolean ([#1130](https://github.com/trimox/angular-mdc-web/issues/1130)) ([c1c2383](https://github.com/trimox/angular-mdc-web/commit/c1c2383))
* **list:** Add `selection` variant ([#1153](https://github.com/trimox/angular-mdc-web/issues/1153)) ([94e5e96](https://github.com/trimox/angular-mdc-web/commit/94e5e96)), closes [#1138](https://github.com/trimox/angular-mdc-web/issues/1138)
* **list:** Add property secondaryText for mdc-list-item-text ([#1128](https://github.com/trimox/angular-mdc-web/issues/1128)) ([c660fed](https://github.com/trimox/angular-mdc-web/commit/c660fed)), closes [#1127](https://github.com/trimox/angular-mdc-web/issues/1127)

BREAKING CHANGES:
- Added  `selection: boolean` property to `mdc-list`; enables whether or not the list items are selectable. Default is false.


<a name="0.37.2"></a>
## [0.37.2](https://github.com/trimox/angular-mdc-web/compare/v0.37.1...v0.37.2) (2018-07-18)


### Bug Fixes

* **dialog:** Remove adapter hardcoded result values ([#1112](https://github.com/trimox/angular-mdc-web/issues/1112)) ([93f2365](https://github.com/trimox/angular-mdc-web/commit/93f2365)), closes [#1111](https://github.com/trimox/angular-mdc-web/issues/1111)
* **dialog:** Remove dialog reference after closing ([#1113](https://github.com/trimox/angular-mdc-web/issues/1113)) ([34d5099](https://github.com/trimox/angular-mdc-web/commit/34d5099)), closes [#1110](https://github.com/trimox/angular-mdc-web/issues/1110)
* **snackbar:** Should display from async request ([#1121](https://github.com/trimox/angular-mdc-web/issues/1121)) ([d92ce8d](https://github.com/trimox/angular-mdc-web/commit/d92ce8d)), closes [#1120](https://github.com/trimox/angular-mdc-web/issues/1120)


### Features

* Update to material-components-web v0.37.1 ([#1123](https://github.com/trimox/angular-mdc-web/issues/1123)) ([9bdc335](https://github.com/trimox/angular-mdc-web/commit/9bdc335)), closes [#1122](https://github.com/trimox/angular-mdc-web/issues/1122)



<a name="0.37.1"></a>
## [0.37.1](https://github.com/trimox/angular-mdc-web/compare/v0.37.0...v0.37.1) (2018-07-11)


### Bug Fixes

* **app-bar:** Should set padding-top with correct class ([#1104](https://github.com/trimox/angular-mdc-web/issues/1104)) ([f95d7fc](https://github.com/trimox/angular-mdc-web/commit/f95d7fc)), closes [#1103](https://github.com/trimox/angular-mdc-web/issues/1103)


### Features

* **app-bar:** Add title property to MdcAppBarSection ([#1108](https://github.com/trimox/angular-mdc-web/issues/1108)) ([9e3e442](https://github.com/trimox/angular-mdc-web/commit/9e3e442)), closes [#1107](https://github.com/trimox/angular-mdc-web/issues/1107)



<a name="0.37.0"></a>
# [0.37.0](https://github.com/trimox/angular-mdc-web/compare/v0.36.3...v0.37.0) (2018-07-09)


### Bug Fixes

* **chips:** Fix package build issue ([#1101](https://github.com/trimox/angular-mdc-web/issues/1101)) ([e0c7560](https://github.com/trimox/angular-mdc-web/commit/e0c7560))
* **icon-button:** Remove unused adapter methods ([#1069](https://github.com/trimox/angular-mdc-web/issues/1069)) ([be6877a](https://github.com/trimox/angular-mdc-web/commit/be6877a))
* **list:** Remove ancillary event parameter ([#1062](https://github.com/trimox/angular-mdc-web/issues/1062)) ([02f3381](https://github.com/trimox/angular-mdc-web/commit/02f3381)), closes [#1061](https://github.com/trimox/angular-mdc-web/issues/1061)
* **list:** Should not set cursor to pointer ([#1090](https://github.com/trimox/angular-mdc-web/issues/1090)) ([b21a8b4](https://github.com/trimox/angular-mdc-web/commit/b21a8b4)), closes [#1089](https://github.com/trimox/angular-mdc-web/issues/1089)
* **text-field:** Should notch value after toggling box/outlined ([#1073](https://github.com/trimox/angular-mdc-web/issues/1073)) ([6bd7650](https://github.com/trimox/angular-mdc-web/commit/6bd7650)), closes [#1070](https://github.com/trimox/angular-mdc-web/issues/1070)


### Features

* Update material-components-web to 0.37.0
* **chips:** Add label property to chip ([#1079](https://github.com/trimox/angular-mdc-web/issues/1079)) ([e56d0eb](https://github.com/trimox/angular-mdc-web/commit/e56d0eb)), closes [#1078](https://github.com/trimox/angular-mdc-web/issues/1078)
* **chips:** Add removable property for mdc-chip ([#1080](https://github.com/trimox/angular-mdc-web/issues/1080)) ([ed9c3f5](https://github.com/trimox/angular-mdc-web/commit/ed9c3f5)), closes [#1075](https://github.com/trimox/angular-mdc-web/issues/1075)
* **dialog:** Create new dialog service and component ([#1057](https://github.com/trimox/angular-mdc-web/issues/1057)) ([68a81ff](https://github.com/trimox/angular-mdc-web/commit/68a81ff)), closes [#1007](https://github.com/trimox/angular-mdc-web/issues/1007) [#1056](https://github.com/trimox/angular-mdc-web/issues/1056) [#1058](https://github.com/trimox/angular-mdc-web/issues/1058) [#1064](https://github.com/trimox/angular-mdc-web/issues/1064)
* **dialog:** Set list item cursor to pointer ([#1092](https://github.com/trimox/angular-mdc-web/issues/1092)) ([50a2b05](https://github.com/trimox/angular-mdc-web/commit/50a2b05)), closes [#1091](https://github.com/trimox/angular-mdc-web/issues/1091)
* **elevation:** Rename mdc-elevation to mdcElevation ([#1082](https://github.com/trimox/angular-mdc-web/issues/1082)) ([d4725e6](https://github.com/trimox/angular-mdc-web/commit/d4725e6)), closes [#1081](https://github.com/trimox/angular-mdc-web/issues/1081)
* **fab:** Add Extended FAB ([#1074](https://github.com/trimox/angular-mdc-web/issues/1074)) ([14c7f5d](https://github.com/trimox/angular-mdc-web/commit/14c7f5d)), closes [#1045](https://github.com/trimox/angular-mdc-web/issues/1045)
* **icon:** Add directive selector mdcIcon ([#1088](https://github.com/trimox/angular-mdc-web/issues/1088)) ([f993a87](https://github.com/trimox/angular-mdc-web/commit/f993a87)), closes [#1086](https://github.com/trimox/angular-mdc-web/issues/1086)
* **list:** Add arrow key a11y support ([#1076](https://github.com/trimox/angular-mdc-web/issues/1076)) ([373fa7d](https://github.com/trimox/angular-mdc-web/commit/373fa7d)), closes [#1047](https://github.com/trimox/angular-mdc-web/issues/1047)
* **select:** Add outlined variant ([#1071](https://github.com/trimox/angular-mdc-web/issues/1071)) ([94c9e40](https://github.com/trimox/angular-mdc-web/commit/94c9e40)), closes [#1038](https://github.com/trimox/angular-mdc-web/issues/1038) [#1046](https://github.com/trimox/angular-mdc-web/issues/1046)
* **text-field:** Set default variant to box ([#1095](https://github.com/trimox/angular-mdc-web/issues/1095)) ([4353b70](https://github.com/trimox/angular-mdc-web/commit/4353b70)), closes [#1094](https://github.com/trimox/angular-mdc-web/issues/1094)


### BREAKING CHANGES

* **elevation:** Renamed `[mdc-elevation]` to `[mdcElevation]`, please update your code accordingly.
* **dialog:** - Add required directive `mdc-dialog-surface` as child to `mdc-dialog`. Please review the updated dialog documentation.
* **text-field:** As per material spec updates, the default variant for Text Field is box.
* **list:** - Removed deprecated selectors:
  - `[mdc-list-divider]` use `mdcListDivider`
  - `[mdc-list-group-subheader]`, use `mdcListGroupSubheader`
  - `[mdc-list-group]`, use `mdcListGroup`
  - `[mdc-list-item-graphic]`, use `mdcListItemGraphic`
  - `[mdc-list-item-meta]`, use `mdcListItemMeta`
  - `[mdc-list-item-text]`, use `mdcListItemText`
  - `[mdc-list-item-secondary]`, use `mdcListItemSecondary`



<a name="0.36.3"></a>
## [0.36.3](https://github.com/trimox/angular-mdc-web/compare/v0.36.2...v0.36.3) (2018-06-20)


### Bug Fixes

* **list:** Should not have selected state if non-interactive ([#1054](https://github.com/trimox/angular-mdc-web/issues/1054)) ([7dfff6b](https://github.com/trimox/angular-mdc-web/commit/7dfff6b)), closes [#999](https://github.com/trimox/angular-mdc-web/issues/999)
* **ripple:** Should detach on destroy ([#1052](https://github.com/trimox/angular-mdc-web/issues/1052)) ([d21294d](https://github.com/trimox/angular-mdc-web/commit/d21294d)), closes [#1014](https://github.com/trimox/angular-mdc-web/issues/1014)
* **tabs:** Should emit one selectedTabChange event ([#1055](https://github.com/trimox/angular-mdc-web/issues/1055)) ([c8e73f3](https://github.com/trimox/angular-mdc-web/commit/c8e73f3)), closes [#1039](https://github.com/trimox/angular-mdc-web/issues/1039)


### Features

* **list:** Add [mdcListGroup] selector ([#1053](https://github.com/trimox/angular-mdc-web/issues/1053)) ([071941d](https://github.com/trimox/angular-mdc-web/commit/071941d))



<a name="0.36.2"></a>
## [0.36.2](https://github.com/trimox/angular-mdc-web/compare/v0.36.1...v0.36.2) (2018-06-15)


### Features

* **text-field:** Improvements + refactoring ([#1051](https://github.com/trimox/angular-mdc-web/issues/1051)) ([585b697](https://github.com/trimox/angular-mdc-web/commit/585b697)), closes [#1040](https://github.com/trimox/angular-mdc-web/issues/1040)

### Text Field improvements
- Should allow changing variants (e.g.: `outline` to `box`).
- Add `label[mdcFloatingLabel]` selector
- Add `mdcLineRipple` selector
- Rewrote `notched-outline` component
- Should not set `type` on `mdc-textarea`
- Should set `type` on `mdc-text-field`, if not set
- Remove Renderer2 usage
- Fixed quite a few issues for `mdc-text-field`


<a name="0.36.0"></a>
# [0.36.0](https://github.com/trimox/angular-mdc-web/compare/v0.35.7...v0.36.0) (2018-06-12)


### Bug Fixes

* **app-bar:** Should follow material spec ([#1042](https://github.com/trimox/angular-mdc-web/issues/1042)) ([6ebeb2c](https://github.com/trimox/angular-mdc-web/commit/6ebeb2c)), closes [#998](https://github.com/trimox/angular-mdc-web/issues/998)
* **checkbox:** Remove unneeded FormsModule import ([#1034](https://github.com/trimox/angular-mdc-web/issues/1034)) ([b395dc9](https://github.com/trimox/angular-mdc-web/commit/b395dc9))
* **checkbox:** Should call ControlValueAccessor setDisabledState() ([#1032](https://github.com/trimox/angular-mdc-web/issues/1032)) ([3dbd7ac](https://github.com/trimox/angular-mdc-web/commit/3dbd7ac)), closes [#1030](https://github.com/trimox/angular-mdc-web/issues/1030)
* **checkbox:** Should check vendor prefixes in registerAnimationEndHandler ([#1033](https://github.com/trimox/angular-mdc-web/issues/1033)) ([12f1a63](https://github.com/trimox/angular-mdc-web/commit/12f1a63))
* **ripple:** Should not ripple for disabled inputs ([#1036](https://github.com/trimox/angular-mdc-web/issues/1036)) ([f493770](https://github.com/trimox/angular-mdc-web/commit/f493770)), closes [#1035](https://github.com/trimox/angular-mdc-web/issues/1035)
* **select:** Should not autosize with empty placeholder ([#997](https://github.com/trimox/angular-mdc-web/issues/997)) ([a41b524](https://github.com/trimox/angular-mdc-web/commit/a41b524)), closes [#996](https://github.com/trimox/angular-mdc-web/issues/996)
* **text-field:** Make ValidationAttributeChangeHandler expect array of strings ([#1013](https://github.com/trimox/angular-mdc-web/issues/1013)) ([00038b2](https://github.com/trimox/angular-mdc-web/commit/00038b2))


### Features

* **icon:** Adds public UX state methods ([#1021](https://github.com/trimox/angular-mdc-web/issues/1021)) ([de4a1dc](https://github.com/trimox/angular-mdc-web/commit/de4a1dc)), closes [#1018](https://github.com/trimox/angular-mdc-web/issues/1018) [#1019](https://github.com/trimox/angular-mdc-web/issues/1019) [#1020](https://github.com/trimox/angular-mdc-web/issues/1020)
* **icon-button:** Implement MDC Icon Button ([#1025](https://github.com/trimox/angular-mdc-web/issues/1025)) ([02a2652](https://github.com/trimox/angular-mdc-web/commit/02a2652))
* Add [materialIcons] selector ([#1027](https://github.com/trimox/angular-mdc-web/issues/1027)) ([c01c1c3](https://github.com/trimox/angular-mdc-web/commit/c01c1c3))
* Update to material-components-web v0.36.0 ([#1026](https://github.com/trimox/angular-mdc-web/issues/1026)) ([4ef8a73](https://github.com/trimox/angular-mdc-web/commit/4ef8a73))
* **icon-button:** Should use material-icons as default library ([#1031](https://github.com/trimox/angular-mdc-web/issues/1031)) ([d76be18](https://github.com/trimox/angular-mdc-web/commit/d76be18))
* **snackbar:** Add afterDismiss() and afterOpen() observables ([#1006](https://github.com/trimox/angular-mdc-web/issues/1006)) ([80fc319](https://github.com/trimox/angular-mdc-web/commit/80fc319))
* **text-field:** Add setIconContent() and setIconAriaLabel() methods ([#1022](https://github.com/trimox/angular-mdc-web/issues/1022)) ([276d46e](https://github.com/trimox/angular-mdc-web/commit/276d46e)), closes [#1010](https://github.com/trimox/angular-mdc-web/issues/1010) [#1011](https://github.com/trimox/angular-mdc-web/issues/1011)



<a name="0.35.7"></a>
## [0.35.7](https://github.com/trimox/angular-mdc-web/compare/v0.35.6...v0.35.7) (2018-05-24)


### Features

* Update to material-components-web v0.35.2 ([#994](https://github.com/trimox/angular-mdc-web/issues/994)) ([23fe5e7](https://github.com/trimox/angular-mdc-web/commit/23fe5e7)), closes [#993](https://github.com/trimox/angular-mdc-web/issues/993)



<a name="0.35.6"></a>
## [0.35.6](https://github.com/trimox/angular-mdc-web/compare/v0.35.5...v0.35.6) (2018-05-18)


### Bug Fixes

* **package:** Should transpile material-components-web ([#990](https://github.com/trimox/angular-mdc-web/issues/990)) ([68d55a5](https://github.com/trimox/angular-mdc-web/commit/68d55a5)), closes [#988](https://github.com/trimox/angular-mdc-web/issues/988)



<a name="0.35.5"></a>
## [0.35.5](https://github.com/trimox/angular-mdc-web/compare/v0.35.3...v0.35.5) (2018-05-18)


### Bug Fixes

* **app-bar:** Should remove `mdc-top-app-bar--short-has-action-item` ([#973](https://github.com/trimox/angular-mdc-web/issues/973)) ([5875ab5](https://github.com/trimox/angular-mdc-web/commit/5875ab5)), closes [#972](https://github.com/trimox/angular-mdc-web/issues/972)
* **form-field:** Should interact with control label ([#987](https://github.com/trimox/angular-mdc-web/issues/987)) ([73c026a](https://github.com/trimox/angular-mdc-web/commit/73c026a)), closes [#986](https://github.com/trimox/angular-mdc-web/issues/986)
* **select:** Should float label for selected html option ([#979](https://github.com/trimox/angular-mdc-web/issues/979)) ([ccb0133](https://github.com/trimox/angular-mdc-web/commit/ccb0133)), closes [#976](https://github.com/trimox/angular-mdc-web/issues/976) [#963](https://github.com/trimox/angular-mdc-web/issues/963)


### Features

* Upgrade to RxJS v6.0 and Angular v6.0 ([#964](https://github.com/trimox/angular-mdc-web/issues/964)) ([c461b88](https://github.com/trimox/angular-mdc-web/commit/c461b88)), closes [#947](https://github.com/trimox/angular-mdc-web/issues/947) [#918](https://github.com/trimox/angular-mdc-web/issues/918)



<a name="0.35.3"></a>
## [0.35.3](https://github.com/trimox/angular-mdc-web/compare/v0.35.2...v0.35.3) (2018-05-11)


### Features

* **app-bar:** Add camelCase selectors ([#954](https://github.com/trimox/angular-mdc-web/issues/954)) ([b507c68](https://github.com/trimox/angular-mdc-web/commit/b507c68))
* **button:** Add SVG icon support ([#962](https://github.com/trimox/angular-mdc-web/issues/962)) ([37ddd1f](https://github.com/trimox/angular-mdc-web/commit/37ddd1f)), closes [#000000](https://github.com/trimox/angular-mdc-web/issues/000000) [#879](https://github.com/trimox/angular-mdc-web/issues/879)
* **icon-toggle:** New UX state methods + improvements ([#961](https://github.com/trimox/angular-mdc-web/issues/961)) ([b6b3865](https://github.com/trimox/angular-mdc-web/commit/b6b3865))
* **list:** Add camelCase selectors ([#955](https://github.com/trimox/angular-mdc-web/issues/955)) ([e19e369](https://github.com/trimox/angular-mdc-web/commit/e19e369))
* **shape:** Bind mdcShapeContainerCorner to @Input alias ([#958](https://github.com/trimox/angular-mdc-web/issues/958)) ([b78f184](https://github.com/trimox/angular-mdc-web/commit/b78f184)), closes [#957](https://github.com/trimox/angular-mdc-web/issues/957)


### BREAKING CHANGES

* **shape:** Removed `mdc-shape-container-corner`, please update your code accordingly to use `mdcShapeContainerCorner`.



<a name="0.35.2"></a>
## [0.35.2](https://github.com/trimox/angular-mdc-web/compare/v0.35.1...v0.35.2) (2018-05-08)


### Bug Fixes

* **card:** Remove unneeded display: inline-flex ([#950](https://github.com/trimox/angular-mdc-web/issues/950)) ([550e360](https://github.com/trimox/angular-mdc-web/commit/550e360))


### Features

* **typography:** Add camelCase selectors ([#951](https://github.com/trimox/angular-mdc-web/issues/951)) ([813aaeb](https://github.com/trimox/angular-mdc-web/commit/813aaeb))



<a name="0.35.1"></a>
## [0.35.1](https://github.com/trimox/angular-mdc-web/compare/v0.35.0...v0.35.1) (2018-05-05)


### Bug Fixes

* **app-bar:** Should remove short-collapsed class ([#946](https://github.com/trimox/angular-mdc-web/issues/946)) ([2f06042](https://github.com/trimox/angular-mdc-web/commit/2f06042))


### Features

* Add component portal service ([#945](https://github.com/trimox/angular-mdc-web/issues/945)) ([af687d8](https://github.com/trimox/angular-mdc-web/commit/af687d8))
* Upgrade to material-components-web v0.35.1 ([#944](https://github.com/trimox/angular-mdc-web/issues/944)) ([245d821](https://github.com/trimox/angular-mdc-web/commit/245d821))



<a name="0.35.0"></a>
# [0.35.0](https://github.com/trimox/angular-mdc-web/compare/v0.34.5...v0.35.0) (2018-05-05)


### Bug Fixes

* **demo-app:** Overflow scroll for demo-content__drawer ([#905](https://github.com/trimox/angular-mdc-web/issues/905)) ([3e4001e](https://github.com/trimox/angular-mdc-web/commit/3e4001e))
* **select:** Should clear value on empty option selected ([#926](https://github.com/trimox/angular-mdc-web/issues/926)) ([5d6a41c](https://github.com/trimox/angular-mdc-web/commit/5d6a41c)), closes [#923](https://github.com/trimox/angular-mdc-web/issues/923)
* **text-field:** Should clear ngModel when empty ([#940](https://github.com/trimox/angular-mdc-web/issues/940)) ([ea18f49](https://github.com/trimox/angular-mdc-web/commit/ea18f49)), closes [#939](https://github.com/trimox/angular-mdc-web/issues/939)
* **toolbar:** Should remove `margin-top` on destroy ([#934](https://github.com/trimox/angular-mdc-web/issues/934)) ([1e6253d](https://github.com/trimox/angular-mdc-web/commit/1e6253d)), closes [#933](https://github.com/trimox/angular-mdc-web/issues/933)


### Features

* Upgrade to material-components-web v0.35.0 ([#919](https://github.com/trimox/angular-mdc-web/issues/919)) ([f6602d7](https://github.com/trimox/angular-mdc-web/commit/f6602d7))
* **app-bar:** Add fixed property ([#931](https://github.com/trimox/angular-mdc-web/issues/931)) ([ff62516](https://github.com/trimox/angular-mdc-web/commit/ff62516)), closes [#912](https://github.com/trimox/angular-mdc-web/issues/912)
* **app-bar:** Use Foundation API for scrolling ([#942](https://github.com/trimox/angular-mdc-web/issues/942)) ([ae2f53f](https://github.com/trimox/angular-mdc-web/commit/ae2f53f))
* **button:** Add outlined property ([#928](https://github.com/trimox/angular-mdc-web/issues/928)) ([8bafbfa](https://github.com/trimox/angular-mdc-web/commit/8bafbfa)), closes [#920](https://github.com/trimox/angular-mdc-web/issues/920)
* **card:** Add outlined property ([#930](https://github.com/trimox/angular-mdc-web/issues/930)) ([64d6a6b](https://github.com/trimox/angular-mdc-web/commit/64d6a6b))
* **chips:** Add input chips ([#938](https://github.com/trimox/angular-mdc-web/issues/938)) ([f899d07](https://github.com/trimox/angular-mdc-web/commit/f899d07)), closes [#909](https://github.com/trimox/angular-mdc-web/issues/909)
* **chips:** Add primary and secondary properties ([#937](https://github.com/trimox/angular-mdc-web/issues/937)) ([97f82eb](https://github.com/trimox/angular-mdc-web/commit/97f82eb)), closes [#936](https://github.com/trimox/angular-mdc-web/issues/936)
* **demo-app:** Getting Started guides + improvements ([#914](https://github.com/trimox/angular-mdc-web/issues/914)) ([260d648](https://github.com/trimox/angular-mdc-web/commit/260d648))
* **dialog:** Remove layoutFooterRipples() ([#927](https://github.com/trimox/angular-mdc-web/issues/927)) ([6be757a](https://github.com/trimox/angular-mdc-web/commit/6be757a))
* **linear-progress:** Add determinate property ([#917](https://github.com/trimox/angular-mdc-web/issues/917)) ([70bd1e3](https://github.com/trimox/angular-mdc-web/commit/70bd1e3))
* **shape:** Implement MDC Shape ([#935](https://github.com/trimox/angular-mdc-web/issues/935)) ([7ce01ab](https://github.com/trimox/angular-mdc-web/commit/7ce01ab)), closes [#908](https://github.com/trimox/angular-mdc-web/issues/908)
* **typography:** Update styles to match guidance ([#932](https://github.com/trimox/angular-mdc-web/issues/932)) ([7a4f0ac](https://github.com/trimox/angular-mdc-web/commit/7a4f0ac)), closes [#911](https://github.com/trimox/angular-mdc-web/issues/911)


### BREAKING CHANGES

* **typography:** All legacy typography directives will continue to work for the near future.
* **card:** Renamed `stroked` property to `outlined`
* **button:** Property `stroked` renamed to `outlined`
* Sass mixin `mdc-button-stroked-width` renamed to `mdc-button-outline-width`
* Sass mixin `mdc-button-stroked-color` renamed to `mdc-button-outline-color`
* **dialog:** Removes layoutFooterRipples() as per material-components-web v0.35.0
* **linear-progress:** Removed indeterminate property, please update your code accordingly.



<a name="0.34.5"></a>
## [0.34.5](https://github.com/trimox/angular-mdc-web/compare/v0.34.4...v0.34.5) (2018-04-22)


### Bug Fixes

* **card:** Set `display: inline-flex` ([#896](https://github.com/trimox/angular-mdc-web/issues/896)) ([47f78a0](https://github.com/trimox/angular-mdc-web/commit/47f78a0)), closes [#895](https://github.com/trimox/angular-mdc-web/issues/895)
* **drawer:** Should hide persistent drawer when collapsed ([#899](https://github.com/trimox/angular-mdc-web/issues/899)) ([77503bf](https://github.com/trimox/angular-mdc-web/commit/77503bf)), closes [#731](https://github.com/trimox/angular-mdc-web/issues/731)
* **ripple:** Should appropriately size mdcRipple ([#897](https://github.com/trimox/angular-mdc-web/issues/897)) ([c742668](https://github.com/trimox/angular-mdc-web/commit/c742668)), closes [#894](https://github.com/trimox/angular-mdc-web/issues/894)


### Features

* **demo-app:** Remove [@angular](https://github.com/angular)/flex-layout dependency ([#900](https://github.com/trimox/angular-mdc-web/issues/900)) ([ab0ae3e](https://github.com/trimox/angular-mdc-web/commit/ab0ae3e))
* **drawer:** New UX state methods + improvements ([#903](https://github.com/trimox/angular-mdc-web/issues/903)) ([0de8bb9](https://github.com/trimox/angular-mdc-web/commit/0de8bb9)), closes [#892](https://github.com/trimox/angular-mdc-web/issues/892)
* **text-field:** Add [mdcTextFieldHelperText] selector ([#902](https://github.com/trimox/angular-mdc-web/issues/902)) ([2fbc810](https://github.com/trimox/angular-mdc-web/commit/2fbc810))



<a name="0.34.4"></a>
## [0.34.4](https://github.com/trimox/angular-mdc-web/compare/v0.34.3...v0.34.4) (2018-04-20)


### Bug Fixes

* Set components internal nodes to block ([#871](https://github.com/trimox/angular-mdc-web/issues/871)) ([d78af8c](https://github.com/trimox/angular-mdc-web/commit/d78af8c))
* **switch:** Add role="switch" to input ([#875](https://github.com/trimox/angular-mdc-web/issues/875)) ([1034500](https://github.com/trimox/angular-mdc-web/commit/1034500))
* **text-field:** Add role="button" to icon ([#874](https://github.com/trimox/angular-mdc-web/issues/874)) ([dde07ef](https://github.com/trimox/angular-mdc-web/commit/dde07ef))


### Features

* **app-bar:** Add additional selectors ([#882](https://github.com/trimox/angular-mdc-web/issues/882)) ([6f7b96d](https://github.com/trimox/angular-mdc-web/commit/6f7b96d))
* **button:** New UX state methods ([#878](https://github.com/trimox/angular-mdc-web/issues/878)) ([886fb53](https://github.com/trimox/angular-mdc-web/commit/886fb53))
* **cards:** New UX state methods + [wide] property ([#877](https://github.com/trimox/angular-mdc-web/issues/877)) ([35e061e](https://github.com/trimox/angular-mdc-web/commit/35e061e))
* **chips:** New UX state methods ([#883](https://github.com/trimox/angular-mdc-web/issues/883)) ([4753e48](https://github.com/trimox/angular-mdc-web/commit/4753e48))
* **menu:** New UX state methods + improvements ([#876](https://github.com/trimox/angular-mdc-web/issues/876)) ([ccb3d6a](https://github.com/trimox/angular-mdc-web/commit/ccb3d6a))
* **radio:** Enhance ngForm and FormControl usage ([#870](https://github.com/trimox/angular-mdc-web/issues/870)) ([5f00df4](https://github.com/trimox/angular-mdc-web/commit/5f00df4))
* **slider:** New UX state methods + improvements ([#885](https://github.com/trimox/angular-mdc-web/issues/885)) ([62bf4f4](https://github.com/trimox/angular-mdc-web/commit/62bf4f4)), closes [#881](https://github.com/trimox/angular-mdc-web/issues/881)


### BREAKING CHANGES

* **radio:** Update mdc-radio change event listener to use MdcRadioChange class.
* **card:** Renamed [rectangle] to [wide]. Please update your code accordingly.
* **slider:** Update mdc-slider (change) and (input) listeners to use class MdcSliderChange.

### mdc-menu - [View all mdc-menu changes](https://github.com/trimox/angular-mdc-web/pull/876)
- Update your code to use MdcMenuChange class for select event listener.
- Update your code to bind an element to [anchor] property. Please refer to documentation.
- Removed @Input() direction
- Removed isFocused(): boolean method
- Removed getFocusedItemIndex(): number method
- Removed hasAnchor(): boolean method
- Removed isRtl(): boolean method



<a name="0.34.3"></a>
## [0.34.3](https://github.com/trimox/angular-mdc-web/compare/v0.34.2...v0.34.3) (2018-04-14)


### Features

* **checkbox:** Add public methods + improvements ([#866](https://github.com/trimox/angular-mdc-web/issues/866)) ([a2096a9](https://github.com/trimox/angular-mdc-web/commit/a2096a9))
* **switch:** New UX state methods + improvements ([#868](https://github.com/trimox/angular-mdc-web/issues/868)) ([405b367](https://github.com/trimox/angular-mdc-web/commit/405b367))
* **text-field:** Add public methods for UX states ([#867](https://github.com/trimox/angular-mdc-web/issues/867)) ([fc77f64](https://github.com/trimox/angular-mdc-web/commit/fc77f64))


### BREAKING CHANGES

* **switch:** Update `(change)` event listener to match `MdcSwitchChange` class.
* **checkbox:** Update `(change)` event listener to match `MdcCheckboxChange` class.



<a name="0.34.2"></a>
## [0.34.2](https://github.com/trimox/angular-mdc-web/compare/v0.34.1...v0.34.2) (2018-04-13)


### Bug Fixes

* **app-bar:** Should remove short-collapsed class ([#852](https://github.com/trimox/angular-mdc-web/issues/852)) ([1743f01](https://github.com/trimox/angular-mdc-web/commit/1743f01))
* **checkbox:** Set ripple interaction to native input ([#853](https://github.com/trimox/angular-mdc-web/issues/853)) ([d748635](https://github.com/trimox/angular-mdc-web/commit/d748635))
* **checkbox:** Should use stopPropagation for click event ([#854](https://github.com/trimox/angular-mdc-web/issues/854)) ([ad6b2b1](https://github.com/trimox/angular-mdc-web/commit/ad6b2b1))
* **dialog:** Remove unused declarations ([#862](https://github.com/trimox/angular-mdc-web/issues/862)) ([e7353cf](https://github.com/trimox/angular-mdc-web/commit/e7353cf))
* **text-field:** Errors for Outlined init ([#849](https://github.com/trimox/angular-mdc-web/issues/849)) ([9baabfa](https://github.com/trimox/angular-mdc-web/commit/9baabfa))
* **text-field:** Set display property for mdc-text-field-helper-text ([#851](https://github.com/trimox/angular-mdc-web/issues/851)) ([4d48108](https://github.com/trimox/angular-mdc-web/commit/4d48108))
* **text-field:** Should reset ngModel and FormControl values ([#861](https://github.com/trimox/angular-mdc-web/issues/861)) ([f31df0e](https://github.com/trimox/angular-mdc-web/commit/f31df0e)), closes [#848](https://github.com/trimox/angular-mdc-web/issues/848)


### Features

* **image-list:** Implement MDC Image List ([#847](https://github.com/trimox/angular-mdc-web/issues/847)) ([3a01d66](https://github.com/trimox/angular-mdc-web/commit/3a01d66))
* **fab:** Add public methods for UX states ([#850](https://github.com/trimox/angular-mdc-web/issues/850)) ([c1fe757](https://github.com/trimox/angular-mdc-web/commit/c1fe757))
* **grid-list:** Add selector mdcGridTilePrimaryContent ([#860](https://github.com/trimox/angular-mdc-web/issues/860)) ([7de1d71](https://github.com/trimox/angular-mdc-web/commit/7de1d71))
* **lists:** Add multiple property + Improvements ([#856](https://github.com/trimox/angular-mdc-web/issues/856)) ([103c8af](https://github.com/trimox/angular-mdc-web/commit/103c8af)), closes [#829](https://github.com/trimox/angular-mdc-web/issues/829) [#855](https://github.com/trimox/angular-mdc-web/issues/855) [#826](https://github.com/trimox/angular-mdc-web/issues/826)


### BREAKING CHANGES

* Removed `toggle()`, `select()` and `deselect()` methods from mdc-list-item. Please update your code to use `setSelected(selected: boolean)`.



<a name="0.34.1"></a>
## [0.34.1](https://github.com/trimox/angular-mdc-web/compare/v0.33.0...v0.34.1) (2018-04-09)


### Bug Fixes

* **chips:** Casing for isLeadingIconVisibile method ([#844](https://github.com/trimox/angular-mdc-web/issues/844)) ([ee622e9](https://github.com/trimox/angular-mdc-web/commit/ee622e9))
* **line-ripple:** Rename adapter method setAttr to setStyle ([#835](https://github.com/trimox/angular-mdc-web/issues/835)) ([e46730e](https://github.com/trimox/angular-mdc-web/commit/e46730e))
* **select:** Use templateRef for options ([#845](https://github.com/trimox/angular-mdc-web/issues/845)) ([aca8fa2](https://github.com/trimox/angular-mdc-web/commit/aca8fa2))
* **text-field:** Should display notched outline ([#827](https://github.com/trimox/angular-mdc-web/issues/827)) ([6f5d6b6](https://github.com/trimox/angular-mdc-web/commit/6f5d6b6))


### Features

* Update to material-components-web v0.34.1 ([#841](https://github.com/trimox/angular-mdc-web/issues/841)) ([4c239b8](https://github.com/trimox/angular-mdc-web/commit/4c239b8))
* **app-bar:** Add dense property ([#831](https://github.com/trimox/angular-mdc-web/issues/831)) ([3d86e1c](https://github.com/trimox/angular-mdc-web/commit/3d86e1c))
* **app-bar:** Rename collapsed to shortCollapsed ([#832](https://github.com/trimox/angular-mdc-web/issues/832)) ([d4f6ad5](https://github.com/trimox/angular-mdc-web/commit/d4f6ad5))
* **notched-outline:** Add MDC Foundation methods ([#836](https://github.com/trimox/angular-mdc-web/issues/836)) ([8b87e14](https://github.com/trimox/angular-mdc-web/commit/8b87e14))
* **select:** Replace menu with native html select ([#834](https://github.com/trimox/angular-mdc-web/issues/834)) ([61a3171](https://github.com/trimox/angular-mdc-web/commit/61a3171))


### BREAKING CHANGES

* **app-bar:** Renamed [collapsed] to [shortCollapsed]. Please update your code accordingly.
* **select:** - The template and adapter APIs have changed to take advantage of the native select element; see the MDC Select README for more information.
* **select:** - Removed mdc-select-item component. Replace with HTML5's native option element.


<a name="0.33.0"></a>
# [0.33.0](https://github.com/trimox/angular-mdc-web/compare/v0.32.1...v0.33.0) (2018-04-01)


### Bug Fixes

* **text-field:** Add return type for setValidation ([#814](https://github.com/trimox/angular-mdc-web/issues/814)) ([299e9aa](https://github.com/trimox/angular-mdc-web/commit/299e9aa))
* **text-field:** Apply ripple when text-field is box ([#802](https://github.com/trimox/angular-mdc-web/issues/802)) ([6dccd59](https://github.com/trimox/angular-mdc-web/commit/6dccd59))
* **text-field:** Clicking icon should not cause ripple ([#822](https://github.com/trimox/angular-mdc-web/issues/822)) ([840dd8d](https://github.com/trimox/angular-mdc-web/commit/840dd8d))
* **text-field:** Clicking mdc-floating-label should focus textfield ([#821](https://github.com/trimox/angular-mdc-web/issues/821)) ([13f9fa0](https://github.com/trimox/angular-mdc-web/commit/13f9fa0))


### Features

* **app-bar:** Add prominent property ([#805](https://github.com/trimox/angular-mdc-web/issues/805)) ([8112fbe](https://github.com/trimox/angular-mdc-web/commit/8112fbe)), closes [#789](https://github.com/trimox/angular-mdc-web/issues/789)
* **chips:** Replace leading icon with checkmark in selected filter chips ([#810](https://github.com/trimox/angular-mdc-web/issues/810)) ([0f47eba](https://github.com/trimox/angular-mdc-web/commit/0f47eba)), closes [#790](https://github.com/trimox/angular-mdc-web/issues/790)
* **grid-list:** Implement MDC Grid List ([#813](https://github.com/trimox/angular-mdc-web/issues/813)) ([a0c8d52](https://github.com/trimox/angular-mdc-web/commit/a0c8d52)), closes [#772](https://github.com/trimox/angular-mdc-web/issues/772)
* **icon:** Add clickable property ([#818](https://github.com/trimox/angular-mdc-web/issues/818)) ([00fc5df](https://github.com/trimox/angular-mdc-web/commit/00fc5df)), closes [#792](https://github.com/trimox/angular-mdc-web/issues/792) [#593](https://github.com/trimox/angular-mdc-web/issues/593)
* **notched-outline:** Implement MDC Notched Outline ([#806](https://github.com/trimox/angular-mdc-web/issues/806)) ([601c8a6](https://github.com/trimox/angular-mdc-web/commit/601c8a6))
* **radio:** Make Radio button MDC Foundation methods public ([#812](https://github.com/trimox/angular-mdc-web/issues/812)) ([120acb9](https://github.com/trimox/angular-mdc-web/commit/120acb9))
* **ripple:** Add mdcRipple directive + attachTo property ([#809](https://github.com/trimox/angular-mdc-web/issues/809)) ([f60a7d8](https://github.com/trimox/angular-mdc-web/commit/f60a7d8)), closes [#808](https://github.com/trimox/angular-mdc-web/issues/808)
* **typography:** Remove mdc-typography-adjust-margin directive ([#816](https://github.com/trimox/angular-mdc-web/issues/816)) ([3fe0b39](https://github.com/trimox/angular-mdc-web/commit/3fe0b39)), closes [#815](https://github.com/trimox/angular-mdc-web/issues/815)
* Updated to `material-components-web` v0.33.0


### BREAKING CHANGES

* **typography:** Removed the mdc-typography-adjust-margin feature. Please update your code
accordingly.



<a name="0.32.1"></a>
## [0.32.1](https://github.com/trimox/angular-mdc-web/compare/v0.32.0...v0.32.1) (2018-03-21)


### Bug Fixes

* **tabs:** Ink color for hover state ([#797](https://github.com/trimox/angular-mdc-web/issues/797)) ([395bf62](https://github.com/trimox/angular-mdc-web/commit/395bf62))
* **tabs:** Set active tab from mdcRouter ([#791](https://github.com/trimox/angular-mdc-web/issues/791)) ([cec662f](https://github.com/trimox/angular-mdc-web/commit/cec662f))
* **text-field:** Numeric value returned by ControlValueAccessor ([#794](https://github.com/trimox/angular-mdc-web/issues/794)) ([6895446](https://github.com/trimox/angular-mdc-web/commit/6895446)), closes [#773](https://github.com/trimox/angular-mdc-web/issues/773)
* **text-field:** Value undefined for floating label ([#795](https://github.com/trimox/angular-mdc-web/issues/795)) ([07b7120](https://github.com/trimox/angular-mdc-web/commit/07b7120))


### Features

* **text-field:** Add `box` property ([#798](https://github.com/trimox/angular-mdc-web/issues/798)) ([c6438ac](https://github.com/trimox/angular-mdc-web/commit/c6438ac)), closes [#796](https://github.com/trimox/angular-mdc-web/issues/796)
* **text-field:** Add setOutline method ([#799](https://github.com/trimox/angular-mdc-web/issues/799)) ([a614dec](https://github.com/trimox/angular-mdc-web/commit/a614dec))


### Performance Improvements

* **demo:** Improve Sass processing time ([#780](https://github.com/trimox/angular-mdc-web/issues/780)) ([b0ec2f3](https://github.com/trimox/angular-mdc-web/commit/b0ec2f3))
* **drawer:** Use passive event listener for interactions ([#787](https://github.com/trimox/angular-mdc-web/issues/787)) ([d5f4cbd](https://github.com/trimox/angular-mdc-web/commit/d5f4cbd))


### BREAKING CHANGES

* **text-field:** - `mdc-text-field-box` directive is deprecated and no longer supported. Please update your code accordingly. Example: `<mdc-text-field [box]="true"></mdc-text-field>`



<a name="0.32.0"></a>
# [0.32.0](https://github.com/trimox/angular-mdc-web/compare/v0.31.1...v0.32.0) (2018-03-16)


### Bug Fixes

* **chips:** Set enabled chip tabindex to 0 ([#747](https://github.com/trimox/angular-mdc-web/issues/747)) ([2dcd1ee](https://github.com/trimox/angular-mdc-web/commit/2dcd1ee))
* **select:** Fix prefilled select set as dirty ([#734](https://github.com/trimox/angular-mdc-web/issues/734)) ([32b24fa](https://github.com/trimox/angular-mdc-web/commit/32b24fa)), closes [#733](https://github.com/trimox/angular-mdc-web/issues/733)
* **tabs:** Add/remove tabs asynchronously ([#771](https://github.com/trimox/angular-mdc-web/issues/771)) ([bdb9986](https://github.com/trimox/angular-mdc-web/commit/bdb9986))
* **tabs:** Wrong color on inactive and disabled tabs ([#767](https://github.com/trimox/angular-mdc-web/issues/767)) ([cfd79d9](https://github.com/trimox/angular-mdc-web/commit/cfd79d9))
* **text-field:** Disable validation check in setRequired ([#748](https://github.com/trimox/angular-mdc-web/issues/748)) ([f052c86](https://github.com/trimox/angular-mdc-web/commit/f052c86))
* **text-field:** Make Outline use OnInit and OnDestroy ([#749](https://github.com/trimox/angular-mdc-web/issues/749)) ([f2bd30a](https://github.com/trimox/angular-mdc-web/commit/f2bd30a))


### Features

* **app-bar:** Add fixedAdjustElement property ([#763](https://github.com/trimox/angular-mdc-web/issues/763)) ([b8ab99a](https://github.com/trimox/angular-mdc-web/commit/b8ab99a))
* **app-bar:** Implement MDC App Bar ([#757](https://github.com/trimox/angular-mdc-web/issues/757)) ([e2d4a59](https://github.com/trimox/angular-mdc-web/commit/e2d4a59)), closes [#724](https://github.com/trimox/angular-mdc-web/issues/724)
* **button:** Remove compact property ([#759](https://github.com/trimox/angular-mdc-web/issues/759)) ([fc83408](https://github.com/trimox/angular-mdc-web/commit/fc83408))
* **chips:** Add chip subscriptions interaction handling ([#774](https://github.com/trimox/angular-mdc-web/issues/774)) ([4c7a56f](https://github.com/trimox/angular-mdc-web/commit/4c7a56f))
* **chips:** Add choice property to mdc-chip-set ([#744](https://github.com/trimox/angular-mdc-web/issues/744)) ([e4b11fb](https://github.com/trimox/angular-mdc-web/commit/e4b11fb)), closes [#743](https://github.com/trimox/angular-mdc-web/issues/743)
* **chips:** Add filter property to mdc-chip-set ([#745](https://github.com/trimox/angular-mdc-web/issues/745)) ([1200ae6](https://github.com/trimox/angular-mdc-web/commit/1200ae6)), closes [#725](https://github.com/trimox/angular-mdc-web/issues/725)
* **chips:** Emit selectionChangeEvent on chip toggle ([#756](https://github.com/trimox/angular-mdc-web/issues/756)) ([fa82cf3](https://github.com/trimox/angular-mdc-web/commit/fa82cf3))
* **chips:** New MDCChipAdapter methods for handling trailing icons ([#750](https://github.com/trimox/angular-mdc-web/issues/750)) ([73542e0](https://github.com/trimox/angular-mdc-web/commit/73542e0))
* Update material-components-web to v0.32 ([#738](https://github.com/trimox/angular-mdc-web/issues/738)) ([ec148e8](https://github.com/trimox/angular-mdc-web/commit/ec148e8))
* **floating-label:** Implement MDC Floating Label ([#742](https://github.com/trimox/angular-mdc-web/issues/742)) ([5cb8127](https://github.com/trimox/angular-mdc-web/commit/5cb8127)), closes [#741](https://github.com/trimox/angular-mdc-web/issues/741)
* **tabs:** Add [mdcRouter] for `[@angular](https://github.com/angular)/router` support ([#770](https://github.com/trimox/angular-mdc-web/issues/770)) ([a5e30c8](https://github.com/trimox/angular-mdc-web/commit/a5e30c8)), closes [#735](https://github.com/trimox/angular-mdc-web/issues/735)
* **tabs:** Improvements + fixes ([#732](https://github.com/trimox/angular-mdc-web/issues/732)) ([009057d](https://github.com/trimox/angular-mdc-web/commit/009057d)), closes [#720](https://github.com/trimox/angular-mdc-web/issues/720) [#729](https://github.com/trimox/angular-mdc-web/issues/729) [#730](https://github.com/trimox/angular-mdc-web/issues/730)
* **tabs:** Re-add active property to mdc-tab ([#768](https://github.com/trimox/angular-mdc-web/issues/768)) ([c3abbbc](https://github.com/trimox/angular-mdc-web/commit/c3abbbc))
* **text-field:** Use mdc-floating-label ([#746](https://github.com/trimox/angular-mdc-web/issues/746)) ([582620e](https://github.com/trimox/angular-mdc-web/commit/582620e))


### BREAKING CHANGES

* **button:** The compact variant of MDC Button is removed.
### Tabs
* Removed `select` event from `mdc-tab`.
* Removed `change` event from `mdc-tab-bar`. Please update your code to use `selectedTabChange: EventEmitter<MdcTabChangeEvent>`.
* Moved `disableRipple: boolean` to `mdc-tab-bar`
* Moved `primary` and `secondary` to `mdc-tab-bar`



<a name="0.31.1"></a>
## [0.31.1](https://github.com/trimox/angular-mdc-web/compare/v0.31.0...v0.31.1) (2018-02-27)


### Features

* Transpile material-components-web + IE11 support ([#719](https://github.com/trimox/angular-mdc-web/issues/719)) ([3fc92c2](https://github.com/trimox/angular-mdc-web/commit/3fc92c2)), closes [#708](https://github.com/trimox/angular-mdc-web/issues/708)



<a name="0.31.0"></a>
# [0.31.0](https://github.com/trimox/angular-mdc-web/compare/v0.7.5...v0.31.0) (2018-02-21)


### Bug Fixes

* **dialog:** Remove uneeded MdcButtonModule import ([#677](https://github.com/trimox/angular-mdc-web/issues/677)) ([e2f3907](https://github.com/trimox/angular-mdc-web/commit/e2f3907))
* **icon:** Handle values with extra spaces ([#683](https://github.com/trimox/angular-mdc-web/issues/683)) ([4938f07](https://github.com/trimox/angular-mdc-web/commit/4938f07))
* **icon-toggle:** Fix primary/secondary class on icon element ([#660](https://github.com/trimox/angular-mdc-web/issues/660)) ([456d250](https://github.com/trimox/angular-mdc-web/commit/456d250))
* **icon-toggle:** Listen for keydown events + fix ripple ([#667](https://github.com/trimox/angular-mdc-web/issues/667)) ([6ab3a8e](https://github.com/trimox/angular-mdc-web/commit/6ab3a8e))
* **list:** Prevent multiple activated items on option change ([#668](https://github.com/trimox/angular-mdc-web/issues/668)) ([8f32136](https://github.com/trimox/angular-mdc-web/commit/8f32136)), closes [#637](https://github.com/trimox/angular-mdc-web/issues/637)
* **menu:** Close when list-item on page clicked ([#628](https://github.com/trimox/angular-mdc-web/issues/628)) ([ec9c0c7](https://github.com/trimox/angular-mdc-web/commit/ec9c0c7)), closes [#621](https://github.com/trimox/angular-mdc-web/issues/621)
* **select:** Call change event for formGroup and formControl values ([#641](https://github.com/trimox/angular-mdc-web/issues/641)) ([67d05ba](https://github.com/trimox/angular-mdc-web/commit/67d05ba)), closes [#640](https://github.com/trimox/angular-mdc-web/issues/640)
* **select:** Check if ngControl valueAccessor exists ([#685](https://github.com/trimox/angular-mdc-web/issues/685)) ([ee2f566](https://github.com/trimox/angular-mdc-web/commit/ee2f566))
* **select:** Style floating label on propagation of changes ([#703](https://github.com/trimox/angular-mdc-web/issues/703)) ([25be844](https://github.com/trimox/angular-mdc-web/commit/25be844))
* Compilation errors found with `fullTemplateTypeCheck` ([#680](https://github.com/trimox/angular-mdc-web/issues/680)) ([54b7948](https://github.com/trimox/angular-mdc-web/commit/54b7948))
* **tabs:** Clicking tab with *ngFor results in ExpressionChangedAfterItHasBeenCheckedError ([b9b5851](https://github.com/trimox/angular-mdc-web/commit/b9b5851)), closes [#664](https://github.com/trimox/angular-mdc-web/issues/664)
* **text-field:** Import MdcLineRippleModule ([#676](https://github.com/trimox/angular-mdc-web/issues/676)) ([70f5e9b](https://github.com/trimox/angular-mdc-web/commit/70f5e9b))
* **text-field:** Set _focused inside onFocus() ([#654](https://github.com/trimox/angular-mdc-web/issues/654)) ([f759410](https://github.com/trimox/angular-mdc-web/commit/f759410))
* **text-field:** Set disabled state with formControl ([#690](https://github.com/trimox/angular-mdc-web/issues/690)) ([31c0138](https://github.com/trimox/angular-mdc-web/commit/31c0138)), closes [#636](https://github.com/trimox/angular-mdc-web/issues/636)
* **toolbar:** Fix mobile flexible toolbar title alignment ([#695](https://github.com/trimox/angular-mdc-web/issues/695)) ([fe933be](https://github.com/trimox/angular-mdc-web/commit/fe933be))
* **toolbar:** Line height on flexible toolbar title ([#655](https://github.com/trimox/angular-mdc-web/issues/655)) ([db8f348](https://github.com/trimox/angular-mdc-web/commit/db8f348))
* **toolbar:** z-index of mdc-menu positioned over mdc-tab ([#656](https://github.com/trimox/angular-mdc-web/issues/656)) ([df405d9](https://github.com/trimox/angular-mdc-web/commit/df405d9)), closes [#638](https://github.com/trimox/angular-mdc-web/issues/638)


### Features

* Update material-components-web to v0.31.0 ([#699](https://github.com/trimox/angular-mdc-web/issues/699)) ([55cb7ec](https://github.com/trimox/angular-mdc-web/commit/55cb7ec))
* **chip:** Implement MDC Chips ([#639](https://github.com/trimox/angular-mdc-web/issues/639)) ([ba31e00](https://github.com/trimox/angular-mdc-web/commit/ba31e00)), closes [#592](https://github.com/trimox/angular-mdc-web/issues/592)
* **chips:** Add mdc-chip-icon directive ([#702](https://github.com/trimox/angular-mdc-web/issues/702)) ([b25ed7b](https://github.com/trimox/angular-mdc-web/commit/b25ed7b))
* **button:** Add exportAs declaration ([#662](https://github.com/trimox/angular-mdc-web/issues/662)) ([6ba9048](https://github.com/trimox/angular-mdc-web/commit/6ba9048))
* **button:** Add icon boolean property ([#663](https://github.com/trimox/angular-mdc-web/issues/663)) ([7bf1c71](https://github.com/trimox/angular-mdc-web/commit/7bf1c71))
* **card:** Add mdc-card-primary-action directive ([#700](https://github.com/trimox/angular-mdc-web/issues/700)) ([e3936fe](https://github.com/trimox/angular-mdc-web/commit/e3936fe))
* **card:** Implement MDC Card ([#647](https://github.com/trimox/angular-mdc-web/issues/647)) ([e24a54a](https://github.com/trimox/angular-mdc-web/commit/e24a54a)), closes [#617](https://github.com/trimox/angular-mdc-web/issues/617) [#616](https://github.com/trimox/angular-mdc-web/issues/616) [#617](https://github.com/trimox/angular-mdc-web/issues/617) [#616](https://github.com/trimox/angular-mdc-web/issues/616)
* **checkbox:** Add exportAs declaration ([#633](https://github.com/trimox/angular-mdc-web/issues/633)) ([a5f64d2](https://github.com/trimox/angular-mdc-web/commit/a5f64d2))
* **checkbox:** Add public methods for UX state ([#632](https://github.com/trimox/angular-mdc-web/issues/632)) ([7d09af3](https://github.com/trimox/angular-mdc-web/commit/7d09af3))
* **form-field:** Add exportAs declaration ([#643](https://github.com/trimox/angular-mdc-web/issues/643)) ([10f8dce](https://github.com/trimox/angular-mdc-web/commit/10f8dce))
* **form-field:** Add public isAlignEnd() method ([#645](https://github.com/trimox/angular-mdc-web/issues/645)) ([462a8ef](https://github.com/trimox/angular-mdc-web/commit/462a8ef))
* **icon:** Add exportAs declaration ([#651](https://github.com/trimox/angular-mdc-web/issues/651)) ([d184ea0](https://github.com/trimox/angular-mdc-web/commit/d184ea0))
* **icon:** Set Sass default icon height ([#649](https://github.com/trimox/angular-mdc-web/issues/649)) ([78eb734](https://github.com/trimox/angular-mdc-web/commit/78eb734))
* **icon-toggle:** Add exportAs declaration ([#661](https://github.com/trimox/angular-mdc-web/issues/661)) ([ad2334b](https://github.com/trimox/angular-mdc-web/commit/ad2334b))
* **line-ripple:** Implement MDC Line Ripple ([#626](https://github.com/trimox/angular-mdc-web/issues/626)) ([c8e0ec2](https://github.com/trimox/angular-mdc-web/commit/c8e0ec2)), closes [#620](https://github.com/trimox/angular-mdc-web/issues/620)
* **linear-progress:** Add exportAs declaration ([#658](https://github.com/trimox/angular-mdc-web/issues/658)) ([f12b9a9](https://github.com/trimox/angular-mdc-web/commit/f12b9a9))
* **list:** Add exportAs declarations  ([#669](https://github.com/trimox/angular-mdc-web/issues/669)) ([cfb2924](https://github.com/trimox/angular-mdc-web/commit/cfb2924))
* **list:** Add selectionChange event ([#670](https://github.com/trimox/angular-mdc-web/issues/670)) ([d729cc9](https://github.com/trimox/angular-mdc-web/commit/d729cc9))
* **list:** Remove deprecated `twoLine` property ([#679](https://github.com/trimox/angular-mdc-web/issues/679)) ([453f6f7](https://github.com/trimox/angular-mdc-web/commit/453f6f7))
* **menu:** Add exportAs declaration ([#634](https://github.com/trimox/angular-mdc-web/issues/634)) ([6894d15](https://github.com/trimox/angular-mdc-web/commit/6894d15))
* **menu:** Add quick open option ([#629](https://github.com/trimox/angular-mdc-web/issues/629)) ([f309d53](https://github.com/trimox/angular-mdc-web/commit/f309d53)), closes [#619](https://github.com/trimox/angular-mdc-web/issues/619)
* **menu:** Add selected property to menu items ([#665](https://github.com/trimox/angular-mdc-web/issues/665)) ([25be411](https://github.com/trimox/angular-mdc-web/commit/25be411)), closes [#618](https://github.com/trimox/angular-mdc-web/issues/618)
* **ripple:** Deduplicate ripple on parents whose children activated ([#635](https://github.com/trimox/angular-mdc-web/issues/635)) ([8f28970](https://github.com/trimox/angular-mdc-web/commit/8f28970)), closes [#596](https://github.com/trimox/angular-mdc-web/issues/596)
* **ripple:** Redesign Ripple service + component ([#648](https://github.com/trimox/angular-mdc-web/issues/648)) ([f103461](https://github.com/trimox/angular-mdc-web/commit/f103461))
* **select:** Add `box: boolean` property ([6413276](https://github.com/trimox/angular-mdc-web/commit/6413276)), closes [#595](https://github.com/trimox/angular-mdc-web/issues/595)
* **select:** Add exportAs declarations ([#684](https://github.com/trimox/angular-mdc-web/issues/684)) ([d75b1b3](https://github.com/trimox/angular-mdc-web/commit/d75b1b3))
* **select:** Add property for floating label visibility ([#689](https://github.com/trimox/angular-mdc-web/issues/689)) ([8844e5d](https://github.com/trimox/angular-mdc-web/commit/8844e5d)), closes [#623](https://github.com/trimox/angular-mdc-web/issues/623)
* **select:** Add support for multiple selected options ([#687](https://github.com/trimox/angular-mdc-web/issues/687)) ([5b7e7e4](https://github.com/trimox/angular-mdc-web/commit/5b7e7e4))
* **select:** Decouple label from mdc-select ([#701](https://github.com/trimox/angular-mdc-web/issues/701)) ([eae9abe](https://github.com/trimox/angular-mdc-web/commit/eae9abe))
* **tabs:** Add exportAs declarations ([#666](https://github.com/trimox/angular-mdc-web/issues/666)) ([c4d94e7](https://github.com/trimox/angular-mdc-web/commit/c4d94e7))
* **tabs:** Add Sass modifier for indicator bar color ([#696](https://github.com/trimox/angular-mdc-web/issues/696)) ([be97c20](https://github.com/trimox/angular-mdc-web/commit/be97c20))
* **text-field:** Add exportAs declarations ([#691](https://github.com/trimox/angular-mdc-web/issues/691)) ([6f71acc](https://github.com/trimox/angular-mdc-web/commit/6f71acc))
* **theme:** Removal of dark theme ([#681](https://github.com/trimox/angular-mdc-web/issues/681)) ([6cb07e1](https://github.com/trimox/angular-mdc-web/commit/6cb07e1))


### Performance Improvements

* **form-field:** Use ChangeDetectionStrategy.OnPush ([#642](https://github.com/trimox/angular-mdc-web/issues/642)) ([bf9c4ff](https://github.com/trimox/angular-mdc-web/commit/bf9c4ff))
* **icon:** Use ChangeDetectionStrategy.OnPush ([#650](https://github.com/trimox/angular-mdc-web/issues/650)) ([7bcc62c](https://github.com/trimox/angular-mdc-web/commit/7bcc62c))


### BREAKING CHANGES

* **theme:** Removed dark theme component per MDC v0.30.0. Please design application theme choices with Sass.
* **list:** Removed `twoLine` property. Please use `lines: number` with a value of `2`.
* **button:** `MdcButton` no longer automatically adds `mdc-button__icon` class, if `mdc-icon` is detected. Please update your code to use `[icon]: boolean` property.
* **card:** All directives for content layouts have been removed. Developers should decide what kind of layout is best for their specific use case. Please see Card documentation for updated examples.



<a name="0.7.5"></a>
## [0.7.5](https://github.com/trimox/angular-mdc-web/compare/v0.7.4...v0.7.5) (2018-02-06)


### Bug Fixes

* **toolbar:** Alignment for mdc-toolbar-title if flexible toolbar ([#611](https://github.com/trimox/angular-mdc-web/issues/611)) ([7f48474](https://github.com/trimox/angular-mdc-web/commit/7f48474))
* **toolbar:** Instantiate MDCToolbarFoundation before lifecycles ([#612](https://github.com/trimox/angular-mdc-web/issues/612)) ([fccd90d](https://github.com/trimox/angular-mdc-web/commit/fccd90d))



<a name="0.7.4"></a>
## [0.7.4](https://github.com/trimox/angular-mdc-web/compare/v0.7.3...v0.7.4) (2018-02-05)


### Bug Fixes

* **drawer:** Change fixedAdjustElement type ([#606](https://github.com/trimox/angular-mdc-web/issues/606)) ([9e0f100](https://github.com/trimox/angular-mdc-web/commit/9e0f100))
* **select:** Menu flickers before disappearing ([#599](https://github.com/trimox/angular-mdc-web/issues/599)) ([ac5d438](https://github.com/trimox/angular-mdc-web/commit/ac5d438)), closes [#509](https://github.com/trimox/angular-mdc-web/issues/509)
* **text-field:** Fix error if disabled prior to foundation init ([#589](https://github.com/trimox/angular-mdc-web/issues/589)) ([25bf71f](https://github.com/trimox/angular-mdc-web/commit/25bf71f)), closes [#588](https://github.com/trimox/angular-mdc-web/issues/588)


### Features

* **drawer:** Add exportAs declarations ([#608](https://github.com/trimox/angular-mdc-web/issues/608)) ([0dbea96](https://github.com/trimox/angular-mdc-web/commit/0dbea96))
* **drawer:** Remove mdc-elevation(1) on fixed drawer ([#601](https://github.com/trimox/angular-mdc-web/issues/601)) ([c39881c](https://github.com/trimox/angular-mdc-web/commit/c39881c))
* **drawer:** Use ChangeDetectionStrategy.OnPush ([#607](https://github.com/trimox/angular-mdc-web/issues/607)) ([59365d9](https://github.com/trimox/angular-mdc-web/commit/59365d9))
* **select:** Add selectionChange event ([#600](https://github.com/trimox/angular-mdc-web/issues/600)) ([f4990ac](https://github.com/trimox/angular-mdc-web/commit/f4990ac)), closes [#591](https://github.com/trimox/angular-mdc-web/issues/591)
* **toolbar:** Add exportAs declarations ([#605](https://github.com/trimox/angular-mdc-web/issues/605)) ([c932ea6](https://github.com/trimox/angular-mdc-web/commit/c932ea6))
* **toolbar:** ChangeDetection OnPush + fixedAdjustElement improvements ([#603](https://github.com/trimox/angular-mdc-web/issues/603)) ([749d173](https://github.com/trimox/angular-mdc-web/commit/749d173))
* **toolbar:** Use passive event listener on scroll ([#604](https://github.com/trimox/angular-mdc-web/issues/604)) ([0771432](https://github.com/trimox/angular-mdc-web/commit/0771432))



<a name="0.7.3"></a>
## [0.7.3](https://github.com/trimox/angular-mdc-web/compare/v0.7.2...v0.7.3) (2018-01-30)


### Features

* **drawer:** Add [primary] on mdc-drawer-header-content ([#583](https://github.com/trimox/angular-mdc-web/issues/583)) ([500021f](https://github.com/trimox/angular-mdc-web/commit/500021f))



<a name="0.7.2"></a>
## [0.7.2](https://github.com/trimox/angular-mdc-web/compare/v0.7.1...v0.7.2) (2018-01-30)

### Bug Fixes

* **text-field:** Workaround for outlined float MDC bug ([#577](https://github.com/trimox/angular-mdc-web/issues/577)) ([ad4736d](https://github.com/trimox/angular-mdc-web/commit/ad4736d))


### Features

* **drawer:** Dynamic drawer switching ([#580](https://github.com/trimox/angular-mdc-web/issues/580)) ([8700191](https://github.com/trimox/angular-mdc-web/commit/8700191)), closes [#579](https://github.com/trimox/angular-mdc-web/issues/579)
* **toolbar:** Add [fixedAdjustElement] input property ([#578](https://github.com/trimox/angular-mdc-web/issues/578)) ([ced579f](https://github.com/trimox/angular-mdc-web/commit/ced579f))


### BREAKING CHANGES

* Rename instances of `mdc-drawer-temporary`, `mdc-drawer-persistent` or `mdc-drawer-permanent` to `mdc-drawer`.
* Set drawer type via `drawer: string` property. Valid values are `'permanent' | 'persistent' | 'temporary'`
* Removed `[absolute]` input property. Logic replaced with `fixedAdjustElement` input use.



<a name="0.7.1"></a>
## [0.7.1](https://github.com/trimox/angular-mdc-web/compare/v0.7.0...v0.7.1) (2018-01-24)


### Bug Fixes

* **text-field:** Fix outlined border missing if prefilled ([#569](https://github.com/trimox/angular-mdc-web/issues/569)) ([1476c9d](https://github.com/trimox/angular-mdc-web/commit/1476c9d))


### Features

* Update to material-components-web v0.29.0 ([#570](https://github.com/trimox/angular-mdc-web/issues/570)) ([cb8a274](https://github.com/trimox/angular-mdc-web/commit/cb8a274))
* **text-field:** Add getValue() method ([#573](https://github.com/trimox/angular-mdc-web/issues/573)) ([7f265cb](https://github.com/trimox/angular-mdc-web/commit/7f265cb))
* **text-field:** Add setPersistent and setValidation methods ([#572](https://github.com/trimox/angular-mdc-web/issues/572)) ([80e9d7b](https://github.com/trimox/angular-mdc-web/commit/80e9d7b))
* **text-field:** Add setRequired() and isRequired() methods ([#574](https://github.com/trimox/angular-mdc-web/issues/574)) ([76b32f0](https://github.com/trimox/angular-mdc-web/commit/76b32f0))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/trimox/angular-mdc-web/compare/v0.6.6...v0.7.0) (2018-01-21)


### Bug Fixes

* **build:** Wrong sourcemap paths ([#541](https://github.com/trimox/angular-mdc-web/issues/541)) ([bd23934](https://github.com/trimox/angular-mdc-web/commit/bd23934))
* **dialog:** Fix DOM cleanup on close ([#560](https://github.com/trimox/angular-mdc-web/issues/560)) ([d14de0e](https://github.com/trimox/angular-mdc-web/commit/d14de0e)), closes [#538](https://github.com/trimox/angular-mdc-web/issues/538)
* **drawer:** Content is overlapping the drawer in rtl ([#502](https://github.com/trimox/angular-mdc-web/issues/502)) ([c4cf2c9](https://github.com/trimox/angular-mdc-web/commit/c4cf2c9))
* **slider:** Workaround for MDC foundation export ([#542](https://github.com/trimox/angular-mdc-web/issues/542)) ([3cd3d4f](https://github.com/trimox/angular-mdc-web/commit/3cd3d4f))
* **text-field:** Set custom validity with setValid(isValid) ([#563](https://github.com/trimox/angular-mdc-web/issues/563)) ([d5af654](https://github.com/trimox/angular-mdc-web/commit/d5af654)), closes [#562](https://github.com/trimox/angular-mdc-web/issues/562)


### Features

* **drawer:** Rename permanent drawer ([#530](https://github.com/trimox/angular-mdc-web/issues/530)) ([58f60df](https://github.com/trimox/angular-mdc-web/commit/58f60df)), closes [#529](https://github.com/trimox/angular-mdc-web/issues/529)
* **drawer:** Rename persistent drawer ([#532](https://github.com/trimox/angular-mdc-web/issues/532)) ([94a8962](https://github.com/trimox/angular-mdc-web/commit/94a8962)), closes [#531](https://github.com/trimox/angular-mdc-web/issues/531)
* **drawer:** Rename temporary drawer ([#535](https://github.com/trimox/angular-mdc-web/issues/535)) ([e4c439a](https://github.com/trimox/angular-mdc-web/commit/e4c439a)), closes [#534](https://github.com/trimox/angular-mdc-web/issues/534)
* **drawer:** Toggle visibility of a persistent drawer ([#533](https://github.com/trimox/angular-mdc-web/issues/533)) ([378c11c](https://github.com/trimox/angular-mdc-web/commit/378c11c))
* **icon-toggle:** Add `on` property for toggle binding ([#555](https://github.com/trimox/angular-mdc-web/issues/555)) ([182701c](https://github.com/trimox/angular-mdc-web/commit/182701c)), closes [#554](https://github.com/trimox/angular-mdc-web/issues/554)
* **linear-progress:** Add progress and buffer properties ([#544](https://github.com/trimox/angular-mdc-web/issues/544)) ([2b783a4](https://github.com/trimox/angular-mdc-web/commit/2b783a4))
* **linear-progress:** Set progress buffer color to $mdc-theme-secondary-light ([#543](https://github.com/trimox/angular-mdc-web/issues/543)) ([4865295](https://github.com/trimox/angular-mdc-web/commit/4865295))
* **menu:** Add new anchor positioning APIs ([#519](https://github.com/trimox/angular-mdc-web/issues/519)) ([349ea76](https://github.com/trimox/angular-mdc-web/commit/349ea76)), closes [#511](https://github.com/trimox/angular-mdc-web/issues/511)
* **ripple:** Add new DocumentInteractionHandler APIs ([#528](https://github.com/trimox/angular-mdc-web/issues/528)) ([40b5a6e](https://github.com/trimox/angular-mdc-web/commit/40b5a6e)), closes [#440](https://github.com/trimox/angular-mdc-web/issues/440) [#513](https://github.com/trimox/angular-mdc-web/issues/513)
* **ripple:** Add primary + secondary Sass color mixin ([#522](https://github.com/trimox/angular-mdc-web/issues/522)) ([3f3b67b](https://github.com/trimox/angular-mdc-web/commit/3f3b67b)), closes [#518](https://github.com/trimox/angular-mdc-web/issues/518)
* **ripple:** Add setUnbounded() method ([#546](https://github.com/trimox/angular-mdc-web/issues/546)) ([127aad0](https://github.com/trimox/angular-mdc-web/commit/127aad0)), closes [#527](https://github.com/trimox/angular-mdc-web/issues/527)
* **ripple:** Expose MdcRippleOrchestration on mdc-ripple ([#545](https://github.com/trimox/angular-mdc-web/issues/545)) ([23866e6](https://github.com/trimox/angular-mdc-web/commit/23866e6))
* **select:** Add autosize property to set width automatically ([#496](https://github.com/trimox/angular-mdc-web/issues/496)) ([cfaf961](https://github.com/trimox/angular-mdc-web/commit/cfaf961)), closes [#495](https://github.com/trimox/angular-mdc-web/issues/495)
* Create export of `[@angular-mdc](https://github.com/angular-mdc)/web/theme` directives ([#501](https://github.com/trimox/angular-mdc-web/issues/501)) ([67ebf4a](https://github.com/trimox/angular-mdc-web/commit/67ebf4a))
* **snackbar:** Add show/hide events + refactoring ([#552](https://github.com/trimox/angular-mdc-web/issues/552)) ([8de4fff](https://github.com/trimox/angular-mdc-web/commit/8de4fff)), closes [#520](https://github.com/trimox/angular-mdc-web/issues/520)
* **text-field:** Add `helperText` property to expand functionality ([#559](https://github.com/trimox/angular-mdc-web/issues/559)) ([d23ac40](https://github.com/trimox/angular-mdc-web/commit/d23ac40))
* **text-field:** Add blur(value) EventEmitter ([#558](https://github.com/trimox/angular-mdc-web/issues/558)) ([35a0f61](https://github.com/trimox/angular-mdc-web/commit/35a0f61)), closes [#557](https://github.com/trimox/angular-mdc-web/issues/557)
* **text-field:** Implement MDC Outlined Text Field ([#564](https://github.com/trimox/angular-mdc-web/issues/564)) ([0624a94](https://github.com/trimox/angular-mdc-web/commit/0624a94)), closes [#521](https://github.com/trimox/angular-mdc-web/issues/521)
* **text-field:** Support custom validity checks for valid() ([#565](https://github.com/trimox/angular-mdc-web/issues/565)) ([d0afe72](https://github.com/trimox/angular-mdc-web/commit/d0afe72))
* **textfield:** Add [focused] property + styling ([#547](https://github.com/trimox/angular-mdc-web/issues/547)) ([3bd8209](https://github.com/trimox/angular-mdc-web/commit/3bd8209)), closes [#517](https://github.com/trimox/angular-mdc-web/issues/517)
* **textfield:** Add RTL support via [direction] property ([#548](https://github.com/trimox/angular-mdc-web/issues/548)) ([098bd97](https://github.com/trimox/angular-mdc-web/commit/098bd97))
* **textfield:** Implement MDCTextFieldIconFoundation ([#549](https://github.com/trimox/angular-mdc-web/issues/549)) ([8945629](https://github.com/trimox/angular-mdc-web/commit/8945629)), closes [#514](https://github.com/trimox/angular-mdc-web/issues/514)
* **textfield:** Implement MDCTextFieldLabelFoundation ([#550](https://github.com/trimox/angular-mdc-web/issues/550)) ([ecb1119](https://github.com/trimox/angular-mdc-web/commit/ecb1119)), closes [#512](https://github.com/trimox/angular-mdc-web/issues/512)


### BREAKING CHANGES

* **menu:** * Removed `openFrom` property. Please update your code to use the `anchorCorner` property.
* **drawer:** * Renamed selector `mdc-persistent-drawer` to `mdc-drawer-permanent`.
* **drawer:** * Renamed selector `mdc-persistent-drawer` to `mdc-drawer-permanent`.
* **drawer:** * Renamed selector `mdc-temporary-drawer` to `mdc-drawer-temporary`.
* Renamed class `MdcPersistentDrawer` to `MdcDrawerPersistent`.
* Renamed selector `mdc-persistent-drawer-spacer` to `mdc-drawer-spacer`.
* Renamed selector `mdc-persistent-drawer-content` to `mdc-drawer-content`.
* Renamed `mdc-persistent-drawer-header` to `mdc-drawer-header`
* Renamed `mdc-persistent-drawer-header-content` to `mdc-drawer-header-content`
* Renamed class `MdcPermanentDrawer` to `MdcDrawerPermanent`.
* Renamed selector `mdc-permanent-drawer-spacer` to `mdc-drawer-spacer`.
* Renamed selector `mdc-permanent-drawer-content` to `mdc-drawer-content`.
* Removed `MdcMaterialIconModule`. If needed, please use `MdcThemeModule` instead.



<a name="0.6.6"></a>
## [0.6.6](https://github.com/trimox/angular-mdc-web/compare/v0.6.5...v0.6.6) (2017-12-20)


### Bug Fixes

* **dialog:** Inaccurate hasAttached result + portal cleared if attached early ([#490](https://github.com/trimox/angular-mdc-web/issues/490)) ([a4ec3f2](https://github.com/trimox/angular-mdc-web/commit/a4ec3f2))
* **select:** Correctly set aria-disabled based on disabled value ([#494](https://github.com/trimox/angular-mdc-web/issues/494)) ([5c39a02](https://github.com/trimox/angular-mdc-web/commit/5c39a02)), closes [#493](https://github.com/trimox/angular-mdc-web/issues/493)
* **textfield:** Fix setting disabled on text fields ([#477](https://github.com/trimox/angular-mdc-web/issues/477)) ([579eb2d](https://github.com/trimox/angular-mdc-web/commit/579eb2d)), closes [#476](https://github.com/trimox/angular-mdc-web/issues/476)


### Features

* Update to `material-components-web` v0.27.0
* **drawer:** Add adapter method `eventTargetHasClass` ([#467](https://github.com/trimox/angular-mdc-web/issues/467)) ([f7a8ff8](https://github.com/trimox/angular-mdc-web/commit/f7a8ff8)), closes [#446](https://github.com/trimox/angular-mdc-web/issues/446)
* **elevation:** Eject from Core and export [@angular-mdc](https://github.com/angular-mdc)/web/elevation ([#487](https://github.com/trimox/angular-mdc-web/issues/487)) ([2e1b6db](https://github.com/trimox/angular-mdc-web/commit/2e1b6db))
* **linear-progress:** Add `closed` property ([#463](https://github.com/trimox/angular-mdc-web/issues/463)) ([3ad21a4](https://github.com/trimox/angular-mdc-web/commit/3ad21a4))
* **linear-progress:** Add setReverse and setDeterminate methods ([#464](https://github.com/trimox/angular-mdc-web/issues/464)) ([d95b15b](https://github.com/trimox/angular-mdc-web/commit/d95b15b))
* **list:** Add `lines` property to replace `twoLine` ([#489](https://github.com/trimox/angular-mdc-web/issues/489)) ([9a30ea5](https://github.com/trimox/angular-mdc-web/commit/9a30ea5))
* **list:** Add `padded` property to list divider ([#481](https://github.com/trimox/angular-mdc-web/issues/481)) ([3a34e1a](https://github.com/trimox/angular-mdc-web/commit/3a34e1a)), closes [#480](https://github.com/trimox/angular-mdc-web/issues/480)
* **list:** Add interactive property to set list item state ([#485](https://github.com/trimox/angular-mdc-web/issues/485)) ([26053ff](https://github.com/trimox/angular-mdc-web/commit/26053ff))
* **list:** Add new UX styles and improvements ([#473](https://github.com/trimox/angular-mdc-web/issues/473)) ([b00b9f2](https://github.com/trimox/angular-mdc-web/commit/b00b9f2)), closes [#449](https://github.com/trimox/angular-mdc-web/issues/449) [#469](https://github.com/trimox/angular-mdc-web/issues/469) [#470](https://github.com/trimox/angular-mdc-web/issues/470)
* **menu:** Add adapter method `eventTargetHasClass` ([#466](https://github.com/trimox/angular-mdc-web/issues/466)) ([d741569](https://github.com/trimox/angular-mdc-web/commit/d741569)), closes [#444](https://github.com/trimox/angular-mdc-web/issues/444)
* **ripple:** Remove from Core + Export [@angular-mdc](https://github.com/angular-mdc)/web/ripple ([#486](https://github.com/trimox/angular-mdc-web/issues/486)) ([12c7ec7](https://github.com/trimox/angular-mdc-web/commit/12c7ec7))
* **select:** Add new UX styles and behaviors ([#491](https://github.com/trimox/angular-mdc-web/issues/491)) ([9b56af4](https://github.com/trimox/angular-mdc-web/commit/9b56af4)), closes [#448](https://github.com/trimox/angular-mdc-web/issues/448)
* **theme:** Add MDC color-palette.scss to [@angular-mdc](https://github.com/angular-mdc)/theme ([#492](https://github.com/trimox/angular-mdc-web/issues/492)) ([3b9d2f6](https://github.com/trimox/angular-mdc-web/commit/3b9d2f6))
* **typography:** Eject from Core and export [@angular-mdc](https://github.com/angular-mdc)/web/typography ([#488](https://github.com/trimox/angular-mdc-web/issues/488)) ([f25a6b1](https://github.com/trimox/angular-mdc-web/commit/f25a6b1))
* **select:** Add autosize property ([#496](https://github.com/trimox/angular-mdc-web/pull/496))


### Performance Improvements

* **linear-progress:** ChangeDetection set to OnPush ([#462](https://github.com/trimox/angular-mdc-web/issues/462)) ([dec4c4f](https://github.com/trimox/angular-mdc-web/commit/dec4c4f))


### BREAKING CHANGES

* **list:** Removed `disableRipple` property. Please update your code to use `interactive` property.
* **list:** Renamed `active` property to `selected`.
* **list:** Renamed `mdc-list-item-start` to `mdc-list-item-graphic`
* **list:** Renamed `mdc-list-item-end` to `mdc-list-item-meta`
* **list:** Removed `isActive()` method
* **list:** Deprecated `twoLines` property. Use `lines: number` instead.


<a name="0.6.5"></a>
## [0.6.5](https://github.com/trimox/angular-mdc-web/compare/v0.6.4...v0.6.5) (2017-12-14)


### Bug Fixes

* **checkbox:** Allow keyboard event to trigger ripple ([#459](https://github.com/trimox/angular-mdc-web/issues/459)) ([a885ffb](https://github.com/trimox/angular-mdc-web/commit/a885ffb))
* **ripple:** Fix ripple active surface detection ([#457](https://github.com/trimox/angular-mdc-web/issues/457)) ([afd5151](https://github.com/trimox/angular-mdc-web/commit/afd5151)), closes [#440](https://github.com/trimox/angular-mdc-web/issues/440)

### Performance
* **perf(button):** Set ChangeDetection to OnPush + add focus method ([#458](https://github.com/trimox/angular-mdc-web/pull/458))
* **fab:** Set ChangeDetection OnPush + add focus method ([#456](https://github.com/trimox/angular-mdc-web/pull/456))


<a name="0.6.3"></a>
## [0.6.3](https://github.com/trimox/angular-mdc-web/compare/v0.6.2...v0.6.3) (2017-12-12)


### Bug Fixes

* **select:** Handle selection changes accessed early ([#450](https://github.com/trimox/angular-mdc-web/issues/450)) ([eaf2c17](https://github.com/trimox/angular-mdc-web/commit/eaf2c17))
* **select:** Remove duplicate Subscription import ([#439](https://github.com/trimox/angular-mdc-web/issues/439)) ([60a7196](https://github.com/trimox/angular-mdc-web/commit/60a7196))


### Features

* **build:** Export `MdcIconModule` from `MdcFabModule` ([#442](https://github.com/trimox/angular-mdc-web/issues/442)) ([c4c5d52](https://github.com/trimox/angular-mdc-web/commit/c4c5d52))
* **dialog:** Add observable subjects + improvements ([#399](https://github.com/trimox/angular-mdc-web/issues/399)) ([784d87d](https://github.com/trimox/angular-mdc-web/commit/784d87d)), closes [#397](https://github.com/trimox/angular-mdc-web/issues/397)
* **infrastructure:** Redesign development environment ([#436](https://github.com/trimox/angular-mdc-web/issues/436)) ([9710d38](https://github.com/trimox/angular-mdc-web/commit/9710d38)), closes [#431](https://github.com/trimox/angular-mdc-web/issues/431)
* **feat(textfield):** Add `empty` getter ([#451](https://github.com/trimox/angular-mdc-web/pull/451))


<a name="0.6.2"></a>
## [0.6.2](https://github.com/trimox/angular-mdc-web/compare/v0.6.1...v0.6.2) (2017-12-06)


### Bug Fixes

* **select:** Propagate value in formControl ([#427](https://github.com/trimox/angular-mdc-web/issues/427)) ([4254035](https://github.com/trimox/angular-mdc-web/commit/4254035)), closes [#411](https://github.com/trimox/angular-mdc-web/issues/411)
* **textfield:** Prefilled value not floating label ([#413](https://github.com/trimox/angular-mdc-web/issues/413)) ([2166588](https://github.com/trimox/angular-mdc-web/commit/2166588)), closes [#410](https://github.com/trimox/angular-mdc-web/issues/410)


### Features

* Update to material-components-web v0.26.0 ([#422](https://github.com/trimox/angular-mdc-web/issues/422)) ([34852a9](https://github.com/trimox/angular-mdc-web/commit/34852a9))
* **build:** Implement modular component packaging ([#419](https://github.com/trimox/angular-mdc-web/issues/419)) ([5cb2897](https://github.com/trimox/angular-mdc-web/commit/5cb2897)), closes [#416](https://github.com/trimox/angular-mdc-web/issues/416)
* **checkbox:** New features + refactoring ([#409](https://github.com/trimox/angular-mdc-web/issues/409)) ([2624b7c](https://github.com/trimox/angular-mdc-web/commit/2624b7c)), closes [#408](https://github.com/trimox/angular-mdc-web/issues/408) [#407](https://github.com/trimox/angular-mdc-web/issues/407) [#406](https://github.com/trimox/angular-mdc-web/issues/406) [#405](https://github.com/trimox/angular-mdc-web/issues/405)
* **dialog:** Add `ariaLabel` to config options ([#398](https://github.com/trimox/angular-mdc-web/issues/398)) ([c2f2176](https://github.com/trimox/angular-mdc-web/commit/c2f2176))
* **ripple:** Add primary and secondary theme color properties ([#400](https://github.com/trimox/angular-mdc-web/issues/400)) ([c66a0d9](https://github.com/trimox/angular-mdc-web/commit/c66a0d9)), closes [#322](https://github.com/trimox/angular-mdc-web/issues/322)
* **textfield:** Add selectAll() function ([#401](https://github.com/trimox/angular-mdc-web/issues/401)) ([ed8cb29](https://github.com/trimox/angular-mdc-web/commit/ed8cb29))
* **textfield:** Implement HelperText + BottomLine foundations ([#424](https://github.com/trimox/angular-mdc-web/issues/424)) ([27372cc](https://github.com/trimox/angular-mdc-web/commit/27372cc)), closes [#423](https://github.com/trimox/angular-mdc-web/issues/423)


### BREAKING CHANGES

* **select:** 
  * Removed `clearSelection()`. Just reset an NgModel by setting it to null.
  * Removed `CloseOnScroll` as upstream MDC PR fixed the scrolling of open menus.
* **checkbox:** `change(Event)` was changed to `change(MdcCheckBox)`. Please update your code accordingly.

### IMPORTANT INFO REGARDING PACKAGING
* **build:** * `MaterialModule` has been removed.

We've found that, with the current state of tree-shaking in the world, that using an aggregate NgModule like MaterialModule leads to tools not being able to eliminate code for components that aren't used.

In order to ensure that users end up with the smallest code size possible.

To replace MaterialModule, users can create their own "Material" module within their application (e.g., AppMaterialModule) that imports only the set of components actually used in the application.

* `MdcCoreModule` has been removed. It's modules have been broken out as shown below.
  * Use `MdcElevationModule` for MDC Elevation directives
  * Use `MdcThemeModule` for MDC Theme directives
  * Use `MdcTypographyModule` for MDC Typography directives
  * Use `MdcMaterialIconModule` for MDC Material Icon directive



<a name="0.0.0"></a>
# [0.6.1](https://github.com/trimox/angular-mdc-web/compare/v0.6.0...v0.6.1) (2017-11-20)


### Bug Fixes

* **checkbox:** Close path tag to remove IE console warnings ([#377](https://github.com/trimox/angular-mdc-web/issues/377)) ([0ec464c](https://github.com/trimox/angular-mdc-web/commit/0ec464c))


### Features

* Update material-components-web to v0.25.0 ([#381](https://github.com/trimox/angular-mdc-web/issues/381)) ([e6b9a56](https://github.com/trimox/angular-mdc-web/commit/e6b9a56))
* **dialog:** Add declarative dialog ([#383](https://github.com/trimox/angular-mdc-web/issues/383)) ([97372d6](https://github.com/trimox/angular-mdc-web/commit/97372d6)), closes [#370](https://github.com/trimox/angular-mdc-web/issues/370)
* **drawer:** Add selection state to Drawer lists ([#389](https://github.com/trimox/angular-mdc-web/issues/389)) ([7584deb](https://github.com/trimox/angular-mdc-web/commit/7584deb)), closes [#143](https://github.com/trimox/angular-mdc-web/issues/143)
* **linear-progress:** Add Sass color mixin for `--secondary` ([#384](https://github.com/trimox/angular-mdc-web/issues/384)) ([c4770e9](https://github.com/trimox/angular-mdc-web/commit/c4770e9))
* **menu:** Improvements and new properties ([#386](https://github.com/trimox/angular-mdc-web/issues/386)) ([e679e32](https://github.com/trimox/angular-mdc-web/commit/e679e32)), closes [#385](https://github.com/trimox/angular-mdc-web/issues/385)
* **textfield:** Rename mdc-text-field-helptext to mdc-text-field-helper-text ([#388](https://github.com/trimox/angular-mdc-web/issues/388)) ([7ddb8f5](https://github.com/trimox/angular-mdc-web/commit/7ddb8f5)), closes [#387](https://github.com/trimox/angular-mdc-web/issues/387)
* **textfield:** Rename mdc-textfield to mdc-text-field ([#382](https://github.com/trimox/angular-mdc-web/issues/382)) ([b27f6f0](https://github.com/trimox/angular-mdc-web/commit/b27f6f0)), closes [#379](https://github.com/trimox/angular-mdc-web/issues/379)


### BREAKING CHANGES

* **drawer:** List property `disableRipples` was renamed to `disableRipple`.
* **menu:** Removed `MenuOpenFrom`. Update your code to use `MdcMenuOpenFrom` with accepted values of 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
### Text Field renamed due to MDC upstream change
* **textfield:** Rename `mdc-text-field-helptext` to `mdc-text-field-helper-text` and update your code accordingly.
* **textfield:** Rename the following in your code.
* `MdcTextfieldModule` to `MdcTextFieldModule`.
* `MdcTextfield` to `MdcTextField`
* `MdcTextfieldBox` to `MdcTextFieldBox`
* `mdc-textfield` to `mdc-text-field`
* `mdc-textfield-box` to `mdc-text-field-box`
* `mdc-textfield-helptext` to `mdc-text-field-helptext`



<a name="0.0.0"></a>
# [0.6.0](https://github.com/trimox/angular-mdc-web/compare/v0.5.6...v0.6.0) (2017-11-13)


### Features

* Update material-components-web to v0.24.0 ([#346](https://github.com/trimox/angular-mdc-web/issues/346)) ([c8ef513](https://github.com/trimox/angular-mdc-web/commit/c8ef513)), closes [#347](https://github.com/trimox/angular-mdc-web/issues/347)
* **dialog:** Implement MDC Dialog Service ([#334](https://github.com/trimox/angular-mdc-web/issues/334)) ([ba19c51](https://github.com/trimox/angular-mdc-web/commit/ba19c51)), closes [#141](https://github.com/trimox/angular-mdc-web/issues/141)
* **drawer:** Add `absolute` property ([#351](https://github.com/trimox/angular-mdc-web/issues/351)) ([4c5760c](https://github.com/trimox/angular-mdc-web/commit/4c5760c)), closes [#350](https://github.com/trimox/angular-mdc-web/issues/350)
* **icon:** Add `fontSize` property ([#357](https://github.com/trimox/angular-mdc-web/issues/357)) ([7050f7d](https://github.com/trimox/angular-mdc-web/commit/7050f7d))
* **package:** Update to Angular v5.0.1 ([#368](https://github.com/trimox/angular-mdc-web/issues/368)) ([7ba346a](https://github.com/trimox/angular-mdc-web/commit/7ba346a))
* **select:** Add placeholder property + fix clearSelection() ([#372](https://github.com/trimox/angular-mdc-web/issues/372)) ([563d287](https://github.com/trimox/angular-mdc-web/commit/563d287)), closes [#371](https://github.com/trimox/angular-mdc-web/issues/371)
* **tabs:** Add disabled tab + improvements ([#369](https://github.com/trimox/angular-mdc-web/issues/369)) ([f073c92](https://github.com/trimox/angular-mdc-web/commit/f073c92)), closes [#349](https://github.com/trimox/angular-mdc-web/issues/349) [#281](https://github.com/trimox/angular-mdc-web/issues/281) [#349](https://github.com/trimox/angular-mdc-web/issues/349) [#147](https://github.com/trimox/angular-mdc-web/issues/147) [#281](https://github.com/trimox/angular-mdc-web/issues/281)
* **theme:** Add [mdc-content] modifier + directive ([#352](https://github.com/trimox/angular-mdc-web/issues/352)) ([a1d40f6](https://github.com/trimox/angular-mdc-web/commit/a1d40f6)), closes [#156](https://github.com/trimox/angular-mdc-web/issues/156)


### BREAKING CHANGES

* **tabs:** Removed `mdc-tab-bar-scroll-button` directive. Use `mdc-icon` instead. Please update your code accordingly.
Example:
```html
<mdc-tab-bar-scroll-back>
  <mdc-icon>navigate_before</mdc-icon>
</mdc-tab-bar-scroll-back>
```
* **tabs:** Changed format of change event data from `{activeTabIndex: number}` to `{index: number, tab: MdcTab}`.
* **select:** Removed `label` setter and `setLabel()` function. Use `placeholder` and `setPlaceholder` instead.



<a name="0.0.0"></a>
# [0.5.6](https://github.com/trimox/angular-mdc-web/compare/v0.5.5...v0.5.6) (2017-10-30)


### Library improvements ([#328](https://github.com/trimox/angular-mdc-web/issues/328)) ([27354e0](https://github.com/trimox/angular-mdc-web/commit/27354e0))

  - Rename `_root` to `elementRef`
  - Make directive and component `ElementRef` public accessible
  - Remove `directive` and `component` from `src/lib` file names
  - Make event registry `listen` and `unlisten` public accessible
  - Add `passive` event handling to event registry
  - Prefix private variables with leading underscore
  - Functions must specify strongly-typed object(s)
  - Add `pointerup` + `mouseup` types to ripple's interaction handler
  - Set default property values
  - Rename MDC adapter files to `adapter.d.ts`
  - Refactor MdcFormField
  - Prefix events with `on` instead of `handle` (e.g.: onKeyPress)
  - Set `encapsulation` to `ViewEncapsulation.None`
  - Refactor `mdc-icon-toggle` to use `mdc-icon`
  - Change `MdcList` to Directive

### Features

* **drawer:** Add `closeOnClick` to temporary drawer close behavior ([02816bd](https://github.com/trimox/angular-mdc-web/commit/3497503963f76d5a1dc8afc7781bc2f0273ca166))
* **menu:** Add focus/isFocused methods + refactoring ([#323](https://github.com/trimox/angular-mdc-web/issues/323)) ([02816bd](https://github.com/trimox/angular-mdc-web/commit/02816bd))
* **ripple:** Add optional event parameter to activate/deactivate ([#321](https://github.com/trimox/angular-mdc-web/issues/321)) ([72ac60b](https://github.com/trimox/angular-mdc-web/commit/72ac60b))
* **select:** Improvements + ngModel fix ([#326](https://github.com/trimox/angular-mdc-web/issues/326)) ([7dcb7ab](https://github.com/trimox/angular-mdc-web/commit/7dcb7ab)), closes [#319](https://github.com/trimox/angular-mdc-web/issues/319)



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

* **dialog:** Deprecated `mdc-dialog-button-accept` and `mdc-dialog-button-cancel`.
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

* **elevation:** Removed deprecated mdc-elevation-z# directives. Please update your code
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

