import {
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Inject,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import {
  BasePortalOutlet,
  ComponentPortal,
  CdkPortalOutlet,
  TemplatePortal
} from '@angular-mdc/web/portal';

import { MdcDialogConfig } from './dialog-config';

/**
 * Throws an exception for the case when a ComponentPortal is
 * attached to a DomPortalOutlet without an origin.
 */
export function throwMdcDialogContentAlreadyAttachedError() {
  throw Error('Attempting to attach dialog content after content is already attached');
}

@Component({
  moduleId: module.id,
  selector: 'mdc-dialog-portal',
  host: {
    '[attr.id]': '_id'
  },
  template: '<ng-template cdkPortalOutlet></ng-template>',
  encapsulation: ViewEncapsulation.None
})
export class MdcDialogPortal extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet) _portalOutlet!: CdkPortalOutlet;

  /** A subject emitting after the dialog exits the view. */
  _afterExit: Subject<void> = new Subject();

  /** ID for the container DOM element. */
  _id!: string;

  /**
   * Attach a ComponentPortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this._portalOutlet.hasAttached()) {
      throwMdcDialogContentAlreadyAttachedError();
    }

    return this._portalOutlet.attachComponentPortal(portal);
  }

  /**
   * Attach a TemplatePortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this._portalOutlet.hasAttached()) {
      throwMdcDialogContentAlreadyAttachedError();
    }

    return this._portalOutlet.attachTemplatePortal(portal);
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(DOCUMENT) private _document: any,
    /** The dialog configuration. */
    public _config: MdcDialogConfig) {

    super();
  }
}
