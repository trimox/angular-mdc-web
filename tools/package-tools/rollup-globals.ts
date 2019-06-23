import {getSubdirectoryNames} from './secondary-entry-points';
import {buildConfig} from './build-config';

/** Method that converts dash-case strings to a camel-based string. */
export const dashCaseToCamelCase =
  (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

/** Generates rollup entry point mappings for the given package and entry points. */
function generateRollupEntryPoints(packageName: string, entryPoints: string[]): {[k: string]: string} {
  return entryPoints.reduce((globals: {[k: string]: string}, entryPoint: string) => {
    globals[`@angular-mdc/${packageName}/${entryPoint}`] =
      `ng.${dashCaseToCamelCase(packageName)}.${dashCaseToCamelCase(entryPoint)}`;
    return globals;
  }, {});
}

/** List of potential secondary entry-points for the mdc package. */
const mdcSecondaryEntryPoints = getSubdirectoryNames(buildConfig.packagesDir);

/** Object with all mdc entry points in the format of Rollup globals. */
const rollupMdcEntryPoints = generateRollupEntryPoints('web', mdcSecondaryEntryPoints);

/** Map of globals that are used inside of the different packages. */
export const rollupGlobals = {
  'tslib': 'tslib',
  'focus-trap': 'focustrap',

  // MDC Web
  '@material/animation': 'mdc.animation',
  '@material/auto-init': 'mdc.autoInit',
  '@material/base': 'mdc.base',
  '@material/checkbox': 'mdc.checkbox',
  '@material/chips': 'mdc.chips',
  '@material/chips/chip': 'mdc.chips.chip',
  '@material/chips/chip-set': 'mdc.chip.chipset',
  '@material/dialog': 'mdc.dialog',
  '@material/drawer': 'mdc.drawer',
  '@material/floating-label': 'mdc.floatingLabel',
  '@material/form-field': 'mdc.formField',
  '@material/grid-list': 'mdc.gridList',
  '@material/icon-button': 'mdc.iconButton',
  '@material/line-ripple': 'mdc.lineRipple',
  '@material/linear-progress': 'mdc.linearProgress',
  '@material/list': 'mdc.list',
  '@material/menu': 'mdc.menu',
  '@material/menu-surface': 'mdc.menuSurface',
  '@material/notched-outline': 'mdc.notchedOutline',
  '@material/radio': 'mdc.radio',
  '@material/ripple': 'mdc.ripple',
  '@material/select': 'mdc.select',
  '@material/slider': 'mdc.slider',
  '@material/snackbar': 'mdc.snackbar',
  '@material/switch': 'mdc.switch',
  '@material/tab': 'mdc.tab',
  '@material/tab-bar': 'mdc.tabBar',
  '@material/tab-indicator': 'mdc.tabIndicator',
  '@material/tab-scroller': 'mdc.tabScroller',
  '@material/textfield': 'mdc.textfield',
  '@material/toolbar': 'mdc.toolbar',
  '@material/top-app-bar': 'mdc.topAppBar',

  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/common/http': 'ng.common.http',
  '@angular/forms': 'ng.forms',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

  // Some packages are not really needed for the UMD bundles, but for the missingRollupGlobals rule.
  '@angular-mdc/web': 'ng.web',

  // Include secondary entry-points of the mdc packages
  ...rollupMdcEntryPoints,

  'rxjs': 'rxjs',
  'rxjs/operators': 'rxjs.operators',
};
