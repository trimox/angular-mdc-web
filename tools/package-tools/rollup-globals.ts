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
  '@angular/router': 'ng.router',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

  // Some packages are not really needed for the UMD bundles, but for the missingRollupGlobals rule.
  '@angular-mdc/web': 'ng.web',
  '@material/animation': 'mdc.animation',
  '@material/checkbox': 'mdc.checkbox',
  '@material/chips': 'mdc.chips',
  '@material/dialog': 'mdc.dialog',
  '@material/drawer': 'mdc.drawer',
  '@material/floating-label': 'mdc.floating-label',
  '@material/form-field': 'mdc.form-field',
  '@material/icon-button': 'mdc.icon-button',
  '@material/icon-toggle': 'mdc.icon-toggle',
  '@material/line-ripple': 'mdc.line-ripple',
  '@material/linear-progress': 'mdc.linear-progress',
  '@material/list': 'mdc.list',
  '@material/menu': 'mdc.menu',
  '@material/menu/util': 'mdc.menu.util',
  '@material/notched-outline': 'mdc.notched-outline',
  '@material/grid-list': 'mdc.grid-list',
  '@material/radio': 'mdc.radio',
  '@material/ripple': 'mdc.ripple',
  '@material/select': 'mdc.select',
  '@material/slider': 'mdc.slider',
  '@material/snackbar': 'mdc.snackbar',
  '@material/tabs': 'mdc.tabs',
  '@material/textfield': 'mdc.textfield',
  '@material/textfield/helper-text': 'mdc.textfield.helpertext',
  '@material/textfield/icon': 'mdc.textfield.icon',
  '@material/toolbar': 'mdc.toolbar',
  '@material/top-app-bar': 'mdc.top-app-bar',

  'focus-trap': 'focus-trap',

  // Include secondary entry-points of the mdc packages
  ...rollupMdcEntryPoints,

  'rxjs': 'Rx',
  'rxjs/operators': 'Rx.operators',
};

/** Map of externals that are used inside of the different packages. */
export const rollupExternals = {
  'tslib': 'tslib',

  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/forms': 'ng.forms',
  '@angular/common/http': 'ng.common.http',
  '@angular/router': 'ng.router',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

  '@angular-mdc/web': 'ng.mdc',

  // Include secondary entry-points of the mdc packages
  ...rollupMdcEntryPoints,

  'rxjs': 'Rx',
  'rxjs/operators': 'Rx.operators',
};
