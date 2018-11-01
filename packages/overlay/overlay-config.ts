/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Initial configuration used when creating an overlay. */
export class OverlayConfig {
  /**
   * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  disposeOnNavigation?: boolean = false;

  constructor(config?: OverlayConfig) {
    if (config) {
      Object.keys(config).forEach(k => {
        const key = k as keyof OverlayConfig;
        if (typeof config[key] !== 'undefined') {
          this[key] = config[key];
        }
      });
    }
  }
}
