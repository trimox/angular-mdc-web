/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Initial configuration used when creating an overlay. */
export class OverlayConfig {
  /** Custom class to add to the overlay pane. */
  panelClass?: string | string[] = '';

  /** Whether the overlay has a backdrop. */
  hasBackdrop?: boolean = false;

  /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
  width?: number | string;

  /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
  height?: number | string;

  /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
  minWidth?: number | string;

  /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
  minHeight?: number | string;

  /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
  maxWidth?: number | string;

  /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
  maxHeight?: number | string;

  /**
   * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  disposeOnNavigation?: boolean = false;

  constructor(config?: OverlayConfig) {
    if (config) {
      Object.keys(config)
        .filter(key => typeof config[key] !== 'undefined')
        .forEach(key => this[key] = config[key]);
    }
  }
}
