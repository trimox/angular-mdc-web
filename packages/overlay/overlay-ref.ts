/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ComponentPortal, Portal, PortalOutlet, TemplatePortal } from '@angular-mdc/web/portal';
import { ComponentRef, EmbeddedViewRef, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject, merge, SubscriptionLike, Subscription, Observer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { OverlayConfig } from './overlay-config';
import { OverlayReference } from './overlay-reference';

/** An object where all of its properties cannot be written. */
export type ImmutableObject<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export class OverlayRef implements PortalOutlet, OverlayReference {
  private _attachments = new Subject<void>();
  private _detachments = new Subject<void>();
  private _locationChanges: SubscriptionLike = Subscription.EMPTY;

  /**
   * Reference to the parent of the `_host` at the time it was detached. Used to restore
   * the `_host` to its original position in the DOM when it gets re-attached.
   */
  private _previousHostParent: HTMLElement;

  constructor(
    private _portalOutlet: PortalOutlet,
    private _host: HTMLElement,
    private _pane: HTMLElement,
    private _config: ImmutableObject<OverlayConfig>,
    private _ngZone: NgZone,
    private _document: Document,
    // @breaking-change 8.0.0 `_location` parameter to be made required.
    private _location?: Location) { }

  /** The overlay's HTML element */
  get overlayElement(): HTMLElement {
    return this._pane;
  }

  /**
   * Wrapper around the panel element. Can be used for advanced
   * positioning where a wrapper with specific styling is
   * required around the overlay pane.
   */
  get hostElement(): HTMLElement {
    return this._host;
  }

  attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  attach<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
  attach(portal: any): any;

  /**
   * Attaches content, given via a Portal, to the overlay.
   * If the overlay is configured to have a backdrop, it will be created.
   *
   * @param portal Portal instance to which to attach the overlay.
   * @returns The portal attachment result.
   */
  attach(portal: Portal<any>): any {
    const attachResult = this._portalOutlet.attach(portal);

    // Update the pane element with the given configuration.
    if (!this._host.parentElement && this._previousHostParent) {
      this._previousHostParent.appendChild(this._host);
    }

    this._updateStackingOrder();

    // Enable pointer events for the overlay pane element.
    this._togglePointerEvents(true);

    // Only emit the `attachments` event once all other setup is done.
    this._attachments.next();

    // @breaking-change 8.0.0 remove the null check for `_location`
    // once the constructor parameter is made required.
    if (this._config.disposeOnNavigation && this._location) {
      this._locationChanges = this._location.subscribe(() => this.dispose());
    }

    return attachResult;
  }

  /**
   * Detaches an overlay from a portal.
   * @returns The portal detachment result.
   */
  detach(): any {
    if (!this.hasAttached()) {
      return;
    }

    // When the overlay is detached, the pane element should disable pointer events.
    // This is necessary because otherwise the pane element will cover the page and disable
    // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
    this._togglePointerEvents(false);

    const detachmentResult = this._portalOutlet.detach();

    // Only emit after everything is detached.
    this._detachments.next();

    // Keeping the host element in DOM the can cause scroll jank, because it still gets
    // rendered, even though it's transparent and unclickable which is why we remove it.
    this._detachContentWhenStable();

    // Stop listening for location changes.
    this._locationChanges.unsubscribe();

    return detachmentResult;
  }

  /** Cleans up the overlay from the DOM. */
  dispose(): void {
    const isAttached = this.hasAttached();

    this._locationChanges.unsubscribe();
    this._portalOutlet.dispose();
    this._attachments.complete();

    if (this._host && this._host.parentNode) {
      this._host.parentNode.removeChild(this._host);
      this._host = null!;
    }

    this._previousHostParent = this._pane = null!;

    if (isAttached) {
      this._detachments.next();
    }

    this._detachments.complete();
  }

  /** Whether the overlay has attached content. */
  hasAttached(): boolean {
    return this._portalOutlet.hasAttached();
  }

  /** Gets an observable that emits when the overlay has been attached. */
  attachments(): Observable<void> {
    return this._attachments.asObservable();
  }

  /** Gets an observable that emits when the overlay has been detached. */
  detachments(): Observable<void> {
    return this._detachments.asObservable();
  }

  /** Gets the the current overlay configuration, which is immutable. */
  getConfig(): OverlayConfig {
    return this._config;
  }

  /** Toggles the pointer events for the overlay pane element. */
  private _togglePointerEvents(enablePointer: boolean) {
    this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
  }

  /**
   * Updates the stacking order of the element, moving it to the top if necessary.
   * This is required in cases where one overlay was detached, while another one,
   * that should be behind it, was destroyed. The next time both of them are opened,
   * the stacking will be wrong, because the detached element's pane will still be
   * in its original DOM position.
   */
  private _updateStackingOrder() {
    if (this._host.nextSibling) {
      this._host.parentNode!.appendChild(this._host);
    }
  }

  /** Detaches the overlay content next time the zone stabilizes. */
  private _detachContentWhenStable() {
    // Normally we wouldn't have to explicitly run this outside the `NgZone`, however
    // if the consumer is using `zone-patch-rxjs`, the `Subscription.unsubscribe` call will
    // be patched to run inside the zone, which will throw us into an infinite loop.
    this._ngZone.runOutsideAngular(() => {
      // We can't remove the host here immediately, because the overlay pane's content
      // might still be animating. This stream helps us avoid interrupting the animation
      // by waiting for the pane to become empty.
      const subscription = this._ngZone.onStable
        .asObservable()
        .pipe(takeUntil(merge(this._attachments, this._detachments)))
        .subscribe(() => {
          // Needs a couple of checks for the pane and host, because
          // they may have been removed by the time the zone stabilizes.
          if (!this._pane || !this._host || this._pane.children.length === 0) {
            if (this._host && this._host.parentElement) {
              this._previousHostParent = this._host.parentElement;
              this._previousHostParent.removeChild(this._host);
            }

            subscription.unsubscribe();
          }
        });
    });
  }
}
