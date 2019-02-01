import { join } from 'path';
import { getSubdirectoryNames } from './secondary-entry-points';
import { buildConfig } from './build-config';

/** Method that converts dash-case strings to a camel-based string. */
export const dashCaseToCamelCase =
  (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

/** List of potential secondary entry-points for the Angular MDC package. */
const mdcSecondaryEntryPoints = getSubdirectoryNames(buildConfig.packagesDir);

/** Object with all Angular MDC entry points in the format of Rollup globals. */
const rollupMdcEntryPoints = mdcSecondaryEntryPoints.reduce((globals: any, entryPoint: string) => {
  globals[`@angular-mdc/web/${entryPoint}`] = `ng.web.${dashCaseToCamelCase(entryPoint)}`;
  return globals;
}, {});

/** Map of globals that are used inside of the different packages. */
export const rollupGlobals = {
  'tslib': 'tslib',

  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/forms': 'ng.forms',
  '@angular/common/http': 'ng.common.http',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

  // Some packages are not really needed for the UMD bundles, but for the missingRollupGlobals rule.
  '@angular-mdc/web': 'ng.web',

  '@material/checkbox/index': 'mdc.checkbox',
  '@material/chips/chip/index': 'mdc.chips.chip',
  '@material/chips/chip-set/index': 'mdc.chips.chip-set',
  '@material/dom/ponyfill': 'mdc.dom.ponyfill',
  '@material/dialog/index': 'mdc.dialog',
  '@material/dialog/util': 'mdc.dialog.util',
  '@material/dialog/constants': 'mdc.dialog.constants',
  '@material/drawer/index': 'mdc.drawer',
  '@material/floating-label/index': 'mdc.floating-label',
  '@material/icon-button/index': 'mdc.icon-button',
  '@material/line-ripple/index': 'mdc.line-ripple',
  '@material/linear-progress/index': 'mdc.linear-progress',
  '@material/list/index': 'mdc.list',
  '@material/list/constants': 'mdc.list.constants',
  '@material/menu/index': 'mdc.menu',
  '@material/menu-surface/index': 'mdc.menu-surface',
  '@material/menu-surface/util': 'mdc.menu-surface.util',
  '@material/menu-surface/constants': 'mdc.menu-surface.constants',
  '@material/notched-outline/index': 'mdc.notched-outline',
  '@material/radio/index': 'mdc.radio',
  '@material/ripple/index': 'mdc.ripple',
  '@material/ripple/util': 'mdc.ripple.util',
  '@material/select/index': 'mdc.select',
  '@material/select/helper-text/index': 'mdc.select.helpertext',
  '@material/select/constants': 'mdc.select.constants',
  '@material/slider/index': 'mdc.slider',
  '@material/slider/constants': 'mdc.slider.constants',
  '@material/snackbar/index': 'mdc.snackbar',
  '@material/snackbar/util': 'mdc.snackbar.util',
  '@material/switch/index': 'mdc.switch',
  '@material/tab/index': 'mdc.tab',
  '@material/tab-bar/index': 'mdc.tab-bar',
  '@material/tab-indicator/index': 'mdc.tab-indicator',
  '@material/tab-scroller/index': 'mdc.tab-scroller',
  '@material/textfield/index': 'mdc.textfield',
  '@material/textfield/helper-text/index': 'mdc.textfield.helpertext',
  '@material/top-app-bar/index': 'mdc.top-app-bar',
  '@material/top-app-bar/constants': 'mdc.top-app-bar.constants',

  'focus-trap': 'focus-trap',

  // Include secondary entry-points of the mdc packages
  ...rollupMdcEntryPoints,

  'rxjs': 'rxjs',
  'rxjs/operators': 'rxjs.operators',
};

/** Map of externals that are used inside of the different packages. */
export const rollupExternals = {
  'tslib': 'tslib',

  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/forms': 'ng.forms',
  '@angular/common/http': 'ng.common.http',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

  '@angular-mdc/web': 'ng.mdc',

  // Include secondary entry-points of the mdc packages
  ...rollupMdcEntryPoints,

  'rxjs': 'rxjs',
  'rxjs/operators': 'rxjs.operators',
};
