import {
  Component,
  ComponentRef,
  ElementRef,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ComponentPortal,
  BasePortalHost,
  PortalHostDirective
} from '../cdk/portal/index';

@Component({
  selector: 'mdc-snackbar-container',
  template: `<ng-template cdkPortalHost></ng-template>`,
})
export class MdcSnackbarContainer extends BasePortalHost {
  @ViewChild(PortalHostDirective) _portalHost: PortalHostDirective;

  constructor(
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    public elementRef: ElementRef) {
    super();
  }

  /** Attach a component portal as content to this snackbar container. */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalHost.attachComponentPortal(portal);
  }
}
