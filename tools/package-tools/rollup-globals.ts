import { join } from 'path';
import { getSubdirectoryNames } from './secondary-entry-points';
import { buildConfig } from './build-config';

/** Method that converts dash-case strings to a camel-based string. */
export const dashCaseToCamelCase =
  (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

/** List of potential secondary entry-points for the Angular MDC package. */
const mdcSecondaryEntryPoints = getSubdirectoryNames(join(buildConfig.packagesDir, 'lib'));

/** Object with all Angular MDC entry points in the format of Rollup globals. */
const rollupMdcEntryPoints = mdcSecondaryEntryPoints.reduce((globals: any, entryPoint: string) => {
  globals[`@angular-mdc/web/${entryPoint}`] = `ng.mdc.${dashCaseToCamelCase(entryPoint)}`;
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
  '@angular-mdc/web': 'ng.mdc',
  '@material/animation': 'mdc.animation',
  '@material/checkbox': 'mdc.checkbox',
  '@material/chips': 'mdc.chips',
  '@material/dialog': 'mdc.dialog',
  '@material/drawer': 'mdc.drawer',
  '@material/form-field': 'mdc.form-field',
  '@material/icon-toggle': 'mdc.icon-toggle',
  '@material/line-ripple': 'mdc.line-ripple',
  '@material/linear-progress': 'mdc.linear-progress',
  '@material/menu': 'mdc.menu',
  '@material/radio': 'mdc.radio',
  '@material/ripple': 'mdc.ripple',
  '@material/select': 'mdc.select',
  '@material/slider': 'mdc.slider',
  '@material/snackbar': 'mdc.snackbar',
  '@material/tabs': 'mdc.tabs',
  '@material/textfield': 'mdc.textfield',
  '@material/textfield/helper-text': 'mdc.textfield.helpertext',
  '@material/textfield/icon': 'mdc.textfield.icon',
  '@material/textfield/label': 'mdc.textfield.label',
  '@material/textfield/outline': 'mdc.textfield.outline',
  '@material/toolbar': 'mdc.toolbar',

  'focus-trap': 'focus-trap',

  // Include secondary entry-points of the mdc packages
  ...rollupMdcEntryPoints,

  'rxjs/BehaviorSubject': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subscriber': 'Rx',

  'rxjs/observable/combineLatest': 'Rx.Observable',
  'rxjs/observable/forkJoin': 'Rx.Observable',
  'rxjs/observable/fromEvent': 'Rx.Observable',
  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/observable/of': 'Rx.Observable',
  'rxjs/observable/throw': 'Rx.Observable',
  'rxjs/observable/defer': 'Rx.Observable',
  'rxjs/observable/fromEventPattern': 'Rx.Observable',
  'rxjs/observable/empty': 'Rx.Observable',

  'rxjs/operators/debounceTime': 'Rx.operators',
  'rxjs/operators/takeUntil': 'Rx.operators',
  'rxjs/operators/take': 'Rx.operators',
  'rxjs/operators/first': 'Rx.operators',
  'rxjs/operators/filter': 'Rx.operators',
  'rxjs/operators/map': 'Rx.operators',
  'rxjs/operators/tap': 'Rx.operators',
  'rxjs/operators/startWith': 'Rx.operators',
  'rxjs/operators/auditTime': 'Rx.operators',
  'rxjs/operators/switchMap': 'Rx.operators',
  'rxjs/operators/finalize': 'Rx.operators',
  'rxjs/operators/catchError': 'Rx.operators',
  'rxjs/operators/share': 'Rx.operators',
  'rxjs/operators/delay': 'Rx.operators',
  'rxjs/operators/combineLatest': 'Rx.operators'
};
