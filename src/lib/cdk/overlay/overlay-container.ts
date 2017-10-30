/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Injectable,
  OnDestroy,
  Optional,
  SkipSelf,
} from '@angular/core';

@Injectable()
export class OverlayContainer implements OnDestroy {
  protected _containerElement: HTMLElement;

  ngOnDestroy() {
    if (this._containerElement && this._containerElement.parentNode) {
      this._containerElement.parentNode.removeChild(this._containerElement);
    }
  }

  getContainerElement(): HTMLElement {
    if (!this._containerElement) { this._createContainer(); }
    return this._containerElement;
  }

  protected _createContainer(): void {
    let container = document.createElement('div');

    document.body.appendChild(container);
    this._containerElement = container;
  }
}

export function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer: OverlayContainer) {
  return parentContainer || new OverlayContainer();
}

export const OVERLAY_CONTAINER_PROVIDER = {
  // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
  provide: OverlayContainer,
  deps: [[new Optional(), new SkipSelf(), OverlayContainer]],
  useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};
