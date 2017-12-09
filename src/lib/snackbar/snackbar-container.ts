import {
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
} from '@angular-mdc/web/cdk';

@Component({
  moduleId: module.id,
  selector: 'mdc-snackbar-container',
  template: `<ng-template cdkPortalOutlet></ng-template>`,
})
export class MdcSnackbarContainer extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;

  constructor(
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    public elementRef: ElementRef) {
    super();
  }

  /** Attach a component portal as content to this snackbar container. */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /** Attach a template portal as content to this snackbar container. */
  attachTemplatePortal(): EmbeddedViewRef<any> {
    throw Error('Not yet implemented');
  }
}
