import {
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Optional,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MdcDialogConfig } from './dialog-config';

import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular-mdc/web/portal';

@Component({
  moduleId: module.id,
  selector: 'mdc-dialog-container',
  template: `<ng-template cdkPortalOutlet></ng-template>`,
  encapsulation: ViewEncapsulation.None
})
export class MdcDialogContainer extends BasePortalOutlet {
  /** Element that was focused before the dialog was opened. Save this to restore upon close. */
  private _elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

  /** The dialog configuration. */
  _config: MdcDialogConfig;

  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;

  constructor(
    public elementRef: ElementRef,
    @Optional() @Inject(DOCUMENT) private _document: any) {
    super();
  }

  /** Attach a component portal as content to this container. */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    this._savePreviouslyFocusedElement();
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    this._savePreviouslyFocusedElement();
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  /** Saves a reference to the element that was focused before the dialog was opened. */
  private _savePreviouslyFocusedElement() {
    if (this._document) {
      this._elementFocusedBeforeDialogWasOpened = this._document.activeElement as HTMLElement;
    }
  }
}
