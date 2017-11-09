/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgZone } from '@angular/core';
import { PortalOutlet, Portal } from '../portal/portal';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export class OverlayRef implements PortalOutlet {
  constructor(
    private _portalOutlet: PortalOutlet,
    private _pane: HTMLElement,
    private _ngZone: NgZone) {
  }

  /** The overlay's HTML element */
  get overlayElement(): HTMLElement {
    return this._pane;
  }

  /**
   * Attaches the overlay to a portal instance and adds the backdrop.
   * @param portal Portal instance to which to attach the overlay.
   * @returns The portal attachment result.
   */
  attach(portal: Portal<any>): any {
    const attachResult = this._portalOutlet.attach(portal);

    // Update the pane element with the given state configuration.
    this._updateStackingOrder();

    return attachResult;
  }

  /**
   * Cleans up the overlay from the DOM.
   */
  dispose(): void {
    this._portalOutlet.dispose();
  }

  /**
   * Checks whether the overlay has been attached.
   */
  hasAttached(): boolean {
    return this._portalOutlet.hasAttached();
  }

  /**
     * Detaches an overlay from a portal.
     * @returns Resolves when the overlay has been detached.
     */
  detach(): any {
    const detachmentResult = this._portalOutlet.detach();

    return detachmentResult;
  }

  /**
    * Updates the stacking order of the element, moving it to the top if necessary.
    * This is required in cases where one overlay was detached, while another one,
    * that should be behind it, was destroyed. The next time both of them are opened,
    * the stacking will be wrong, because the detached element's pane will still be
    * in its original DOM position.
    */
  private _updateStackingOrder() {
    if (this._pane.nextSibling) {
      this._pane.parentNode!.appendChild(this._pane);
    }
  }
}
