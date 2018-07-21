import {
  Component,
  ComponentRef,
  ElementRef,
  Inject,
  Input,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

import {
  BasePortalOutlet,
  ComponentPortal,
  CdkPortalOutlet
} from '@angular-mdc/web/portal';

import { MdcDialogConfig } from './dialog-config';

@Component({
  moduleId: module.id,
  selector: 'mdc-dialog-container',
  template: '<ng-template cdkPortalOutlet></ng-template>',
  encapsulation: ViewEncapsulation.None
})
export class MdcDialogContainer extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;
  config: MdcDialogConfig;

  constructor(
    protected _elementRef: ElementRef,
    @Optional() @Inject(DOCUMENT) private _document: any) {

    super();
  }

  closed(): void {
    this._afterExit.next();
  }

  /** A subject emitting after the dialog exits the view. */
  _afterExit: Subject<void> = new Subject();

  /**
   * Attach a ComponentPortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalOutlet.attachComponentPortal(portal);
  }
}
